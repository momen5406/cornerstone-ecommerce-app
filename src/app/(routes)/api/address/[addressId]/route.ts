import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ addressId: string }> }
) {
  try {
    const token = req.headers.get("token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Await params because App Router wraps it in a Promise
    const { addressId } = await context.params;

    const response = await fetch(
      `${process.env.API_URL}/addresses/${addressId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to delete address" },
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
