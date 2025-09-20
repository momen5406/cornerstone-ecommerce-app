import { NextRequest, NextResponse } from "next/server";

// DELETE product from cart
export async function DELETE(
  req: NextRequest,
  context: { params: { productId: string } }
) {
  try {
    const token = req.headers.get("token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = context.params;

    const response = await fetch(`${process.env.API_URL}/cart/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: err },
      { status: 500 }
    );
  }
}

// UPDATE product count in cart
export async function PUT(
  req: NextRequest,
  context: { params: { productId: string } }
) {
  try {
    const token = req.headers.get("token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = context.params;
    const { count } = await req.json();

    const response = await fetch(`${process.env.API_URL}/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ count }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: err },
      { status: 500 }
    );
  }
}
