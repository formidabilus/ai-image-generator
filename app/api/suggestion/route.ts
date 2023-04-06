import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Connect to Microsoft Azure Function endpoint
  const response = await fetch(
    "//http://127.0.0.1:7071/api/getChatGPTSuggestion",
    {
      cache: "no-store",
    }
  );

  const textData = await response.text();

  return new NextResponse(JSON.stringify(textData.trim()), {
    status: 200,
  });
}
