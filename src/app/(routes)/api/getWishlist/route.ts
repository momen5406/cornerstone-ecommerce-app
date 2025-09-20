import { authOptions } from "@/auth";
import { getUserToken } from "@/helpers/getUserToken";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch(`${process.env.API_URL}/wishlist`, {
    headers: {
      token: session.user.token,
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
