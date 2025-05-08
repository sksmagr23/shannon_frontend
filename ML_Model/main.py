
import requests
import torch
import json
import pickle
import uvicorn
from datetime import datetime, timedelta 
import torch.nn as nn
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import torch.nn as nn
import requests
from datetime import datetime, timedelta
import numpy as np
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
def mean_every_four(lst):
    arr = np.array(lst)
    return arr.reshape(-1, 4).mean(axis=1).tolist()
import torch
def min_max_norm(tensor, min_vals = torch.tensor([3.55000e+01, 9.86325e+02, 0.00000e+00, 7.50000e-02, 1.51250e+01, 2.25000e+01, 0.00000e+00, 0.00000e+00, 4.90000e+00, 1.31000e+00]), max_vals = torch.tensor([9.725000e+01 , 1.013900e+03, 1.000000e+02, 2.552250e+02, 1.330000e+02,3.570000e+01, 4.274752e+04, 1.344000e+02, 3.840000e+01,2.664000e+01]), dim=0):
    min_vals = min_vals.to(device)
    max_vals = max_vals.to(device)
    return (tensor - min_vals) / (max_vals - min_vals + 1e-8)

def input_extract(lat , long , past , fore):

    api_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={long}&hourly=relative_humidity_2m,surface_pressure,cloud_cover,direct_radiation,diffuse_radiation&daily=temperature_2m_max,sunshine_duration,precipitation_sum,wind_speed_10m_max,shortwave_radiation_sum&timezone=auto&past_days={past}&temporal_resolution=hourly_6&forecast_days={fore}"
   
    response = requests.get(api_url)
  
    if response.status_code == 200:
        
        data = response.json()
        temp = data['daily']['temperature_2m_max']
        hum = mean_every_four(data['hourly']['relative_humidity_2m'])
        prec = data['daily']['precipitation_sum']
        pres = mean_every_four(data['hourly']['surface_pressure'])
        cloud = mean_every_four(data['hourly']['cloud_cover'])
        wind = data['daily']['wind_speed_10m_max']
        sun_dur = data['daily']['sunshine_duration']
        short_rad = data['daily']['shortwave_radiation_sum']
        dir_rad = mean_every_four(data['hourly']['direct_radiation'])
        diff_rad = mean_every_four(data['hourly']['diffuse_radiation'])
        data_in = [hum , pres , cloud , dir_rad , diff_rad , temp , sun_dur , prec , wind , short_rad ]
        dates = data['daily']['time']
        return data_in , dates
        print("Data fetched successfully!")
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")
class GRU_MODEL(nn.Module):
    def __init__(self , in_size = 10 , h_size = 512 , n_layers= 10  , b=True, d=0.1 , bd =False , o_size = 3 , b_f = True):
        super(GRU_MODEL , self).__init__()
        self.gru = nn.GRU(input_size = in_size, hidden_size = h_size, num_layers = n_layers, bias = b , batch_first = b_f, dropout = d, bidirectional = bd)
        self.linear_1 = nn.Linear(h_size , 256)
        self.linear_2 = nn.Linear(256 , o_size)

    def forward(self,x):
        self.gru_out , self.h_f = self.gru(x)
        self.out_1 = self.linear_1(self.gru_out[:,-1,:])
        self.out_f = self.linear_2(self.out_1)
        return self.out_f , self.h_f


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

@app.get("/")
def index():
    return {"message": "API is running!"}

origins = [
    "http://localhost:3000",  # frontend dev server
    "https://shannon-frontend.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


model_gru = GRU_MODEL().to(device)
model_gru.load_state_dict(torch.load("model_weights_gru2.pth", map_location=device))
model_gru.eval()  

with open("best_xgb_models_1.pkl", "rb") as f:
    loaded_xgb_models = pickle.load(f)


print("\n Loaded Models:")
for target, model in loaded_xgb_models.items():
    print(f"🔹 {target}: {model}")


def predict_xgb(loaded_models, X_input):
    predictions = np.column_stack([loaded_models[target].predict(X_input) for target in loaded_models])
    return predictions

from typing import Union

class InputData(BaseModel):
    Message: List[float]  
 

# Prediction endpoint
@app.post("/predict")
def predict(input_data: InputData):
    try:
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        message_data = input_data.Message
        lat, longi, timestamp = message_data
    
        in_d , dates = input_extract(lat , longi , 13 , 7)
        n_dates = dates[7:]
        l_date = (datetime.strptime(n_dates[-1], "%Y-%m-%d") + timedelta(days = 1)).strftime("%Y-%m-%d")
        n_dates.append(l_date)
        print('in_d' , in_d)
        input_tensor = torch.tensor(in_d, dtype=torch.float32).to(device)
        print('input_tensor' , input_tensor.shape)
        input_tensor = input_tensor.T
        print('input.T' , input_tensor.shape)
        input_tensor = min_max_norm(input_tensor)
        print('input_norm' , input_tensor.shape)
        input_tensor = input_tensor.unfold(dimension=0, size=7, step=1)
        print('input0' , input_tensor.shape)
        input_tensor = input_tensor.reshape(14,7,10).to(device) 
        print('input_f' , input_tensor.shape)
        model_gru.to(device)
    
        with torch.no_grad():
            gru_out , _ = model_gru(input_tensor)
            print('prediction' , gru_out.shape)
            gru_out = gru_out.detach().cpu().numpy()
            xgb_in = np.hstack([input_tensor[:, -1, :].detach().cpu().numpy(), gru_out])
            print('xgb_in' , xgb_in.shape)
            xgb_out = predict_xgb(loaded_xgb_models , xgb_in)
            print('xgb_out' , xgb_out.shape)
            split_arrays = np.split(xgb_out , 3, axis=1)
            solar_gen, wind_gen, hydro_gen = [arr.squeeze().tolist() for arr in split_arrays]
            print('solar_gen' , len(solar_gen))
            solar_gen = [min(x, 1.0) for x in solar_gen] 
            wind_gen = [min(x, 1.0) for x in wind_gen] 
            hydro_gen = [min(x, 1.0) for x in hydro_gen] 
            print('Done')
        return {"solar_gen":solar_gen , "wind_gen" : wind_gen , "hydro_gen" : hydro_gen , "dates" :n_dates }
    
    except Exception as e:
        return {"error": str(e)}

# Run the API using: uvicorn filename:app --reload
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080)