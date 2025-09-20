import { getUserToken } from "@/helpers/getUserToken";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
  const userToken = await getUserToken();
  const { productId } = await context.params; // await because it's a Promise

  const response = await fetch(`${process.env.API_URL}/cart/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: userToken ?? "",
    },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
  const userToken = await getUserToken();
  const { productId } = await context.params;
  const { count } = await req.json();

  const response = await fetch(`${process.env.API_URL}/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: userToken ?? "",
    },
    body: JSON.stringify({ count }),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
