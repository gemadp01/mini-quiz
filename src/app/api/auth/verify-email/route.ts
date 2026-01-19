import environment from "@/config/environment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log(request);

  try {
    const body = await request.json();

    console.log(body);

    const response = await fetch(`${environment.VERIFY_EMAIL_URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(response);

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Verify email error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
