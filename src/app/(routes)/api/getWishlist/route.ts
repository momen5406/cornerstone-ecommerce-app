import { getUserToken } from "@/helpers/getUserToken";
import { NextResponse } from "next/server";

export async function GET() {
  const userToken = await getUserToken();

  if (!userToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch(`${process.env.API_URL}/wishlist`, {
    headers: {
      token: userToken,
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
