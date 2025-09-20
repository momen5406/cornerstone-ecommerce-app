import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Get token from request headers
    const token = req.headers.get("token");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get the request body
    const { productId } = await req.json();

    const response = await fetch(`${process.env.API_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token, // send token in headers
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to add product to cart" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: err },
      { status: 500 }
    );
  }
}
