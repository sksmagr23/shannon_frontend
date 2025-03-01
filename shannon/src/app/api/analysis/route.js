import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(request) {
  try {
    const { chartData, browserData } = await request.json();
    
    const prompt = `
      Analyze this data and provide:
      1. 4 key findings about the trends
      2. 4 actionable recommendations
      
      Format response as JSON with:
      {
        "keyFindings": ["string"],
        "recommendations": ["string"]
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      maxTokens: 1000,
    });

    return Response.json(JSON.parse(chatCompletion.choices[0]?.message?.content || "{}"));
  } catch (error) {
    console.error('Error:', error);
    return Response.json({
      keyFindings: [
        "Default finding 1",
        "Default finding 2",
        "Default finding 3",
        "Default finding 4"
      ],
      recommendations: [
        "Default recommendation 1",
        "Default recommendation 2",
        "Default recommendation 3",
        "Default recommendation 4"
      ]
    });
  }
}