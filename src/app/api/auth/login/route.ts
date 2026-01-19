import environment from "@/config/environment";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cookiesStore = await cookies();

    // Forward request to backend API
    const response = await fetch(`${environment.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.success) {
      cookiesStore.set("token", data.data.access_token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: data.data.expires_in,
      });
    }

    // Return response from backend
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
