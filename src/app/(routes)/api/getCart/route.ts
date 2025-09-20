import { getUserToken } from "@/helpers/getUserToken";
import { NextResponse } from "next/server";

export async function GET() {
  const userToken = await getUserToken();

  const response = await fetch(`${process.env.API_URL}/cart`, {
    method: "GET",
    credentials: "include",
    headers: {
      token: userToken + "",
    },
  });
  const data = await response.json();

  return NextResponse.json(data);
}
