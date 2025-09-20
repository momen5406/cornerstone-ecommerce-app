import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    // Get token from request headers
    const token = req.headers.get("token");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(`${process.env.API_URL}/cart`, {
      method: "DELETE",
      headers: {
        token, // send token in headers
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to clear cart" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: err },
      { status: 500 }
    );
  }
}
