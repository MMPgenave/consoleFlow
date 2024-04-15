import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { question } = await request.json();
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a knowlagable assistant that provides quality information.",
          },
          {
            role: "user",
            content: `Tell me ${question}`,
          },
        ],
      }),
    });
    const responseData = await response.json();
    const reply = responseData;
    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: `fuck :${error.message}` });
  }
}
