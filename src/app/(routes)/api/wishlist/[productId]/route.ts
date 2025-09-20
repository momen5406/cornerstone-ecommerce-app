import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ productId: string }> } // <-- Must be Promise
) {
  try {
    const token = req.headers.get("token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Await because params is a Promise
    const { productId } = await context.params;

    const response = await fetch(
      `${process.env.API_URL}/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token, // pass token in headers
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to delete from wishlist" },
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
