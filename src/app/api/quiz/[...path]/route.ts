import environment from "@/config/environment";
import { NextRequest, NextResponse } from "next/server";

// Fungsi async untuk menangani request API
async function handleRequest(
  request: NextRequest, // request dari client (browser / frontend)
  method: string, // HTTP method: GET, POST, PUT, PATCH, dll
  path: string[], // potongan path URL (array)
) {
  try {
    // Ambil header Authorization dari request client
    const authHeader = request.headers.get("authorization");
    // console.log(authHeader);

    // Bangun base URL ke API backend
    // contoh: https://api.example.com/quiz/subtests
    const url = `${environment.API_URL}/quiz/${path.join("/")}`;

    // Ambil query parameter (?page=1&limit=10)
    const searchParams = request.nextUrl.searchParams.toString();

    // Gabungkan URL + query params jika ada
    const fullUrl = searchParams ? `${url}?${searchParams}` : url;

    // Header default untuk request ke backend
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Jika client mengirim Authorization,
    // teruskan ke backend
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    // Konfigurasi fetch ke backend
    const options: RequestInit = {
      method, // HTTP method (GET, POST, dll)
      headers, // headers yang sudah disusun
    };

    // Jika method butuh body
    if (["POST", "PUT", "PATCH"].includes(method)) {
      // Ambil body mentah dari request client
      const body = request.json();

      // Jika body tidak kosong, kirim ke backend
      if (body) {
        options.body = JSON.stringify(body);
      }
    }

    const response = await fetch(fullUrl, options);

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Quiz API error:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  // console.log(path);
  // console.log(request);
  return handleRequest(request, "GET", path);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return handleRequest(request, "POST", path);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return handleRequest(request, "PUT", path);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return handleRequest(request, "DELETE", path);
}
