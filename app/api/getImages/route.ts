import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await fetch(
    `${process.env.GET_IMAGES_URL}` || "http://127.0.0.1:7071/api/getImages",
    {
      cache: "no-store",
    }
  );

  const blob = await response.blob();
  const textData = await blob.text();

  const data = JSON.parse(textData);

  return new NextResponse(JSON.stringify(data), {
    status: 200,
  });
}
