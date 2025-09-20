import { getUserToken } from "@/helpers/getUserToken";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
  const userToken = await getUserToken();
  const { productId } = await context.params; // must `await` because it's a Promise

  const response = await fetch(`${process.env.API_URL}/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: userToken ?? "",
    },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
