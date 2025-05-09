# Hack it out'25 | Technex'25 | Frontend code

## Shannon - Renewable Energy Forecasting Platform

A Next.js based web application for predicting and visualizing renewable energy generation using AI models and interactive data visualization.

## Features

- Interactive MapboxGL integration for location selection and Reverse geocoding for city name lookup.
- Real-time data visualization using Recharts
- Modern UI with Ant Design and Framer Motion animations
- Authentication with Google and github using next-auth
- Fully responsive design
- Real-time data updates and predictions on Dashboard

## Tech Stack

- **Framework**: Next.js 15.2.0
- **UI Library**: React 19
- **Styling**: 
  - TailwindCSS
  - Ant Design
  - Framer Motion
- **Maps**: MapboxGL
- **Charts**: Recharts
- **Authentication**: Next-auth
- **API Integration**: Axios
- **AI Integration**: Groq SDK

### Prerequisites

Before running the project, make sure you have:

- Node.js >= 16.0.0
- npm package manager
- A Firebase project with Google Authentication enabled
- Mapbox API key
- Groq API key

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_API_URL=your_backend_url
```
### Installation and local setup

#### 1. Clone the Repository
```bash
git clone https://github.com/sksmagr23/shannon_frontend.git
cd shannon_frontend/shannon
```

#### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

#### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your environment variables:
```bash
cp .env .env.local
# Now edit .env with your actual API keys and credentials
```

#### 4. Start Development Server
```bash
npm run dev
# or
yarn dev
```

#### 5. Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```