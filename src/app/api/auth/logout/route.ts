import environment from "@/config/environment";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookiesStore = await cookies();

    await fetch(`${environment.API_URL}/auth/logout`);

    cookiesStore.delete("token");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error("Login error:", err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
