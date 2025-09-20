import { getUserToken } from "@/helpers/getUserToken";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ addressId: string }> }
) {
  const userToken = await getUserToken();

  const { addressId } = await context.params;

  const response = await fetch(
    `${process.env.API_URL}/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: userToken ?? "",
      },
    }
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
