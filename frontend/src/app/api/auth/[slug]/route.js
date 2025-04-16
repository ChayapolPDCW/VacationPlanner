import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const { slug } = await params;
  const backendUrl = "http://backend:5001";
  const targetUrl = backendUrl + "/api/auth/" + slug;

  try {
    // const response = await fetch("http://backend:5000/api/auth/login", {
    const response = await fetch(targetUrl, {
      method: "POST",
      credentials: "include",
      headers: request.headers,
      body: request.body,
      duplex: "half",
    });

    const data = await response.json();

    return NextResponse.json(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error(error.message);

    return NextResponse.json({
      status: 500,
      message: "Proxy fetch failed",
    });
  }
}
