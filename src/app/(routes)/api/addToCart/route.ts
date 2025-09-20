import { getUserToken } from "@/helpers/getUserToken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userToken = await getUserToken();

  const { productId } = await req.json();

  const response = await fetch(`${process.env.API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: userToken + "",
    },
    body: JSON.stringify({ productId: productId }),
  });
  const data = await response.json();

  return NextResponse.json(data);
}
