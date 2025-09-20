"use client";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState, useCallback } from "react";
import OrderCard from "@/components/ui/OrderCard";
import { Order } from "@/types/Order.type";

interface DecodedToken {
  id: string;
  exp: number;
  iat: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const session = useSession();

  const userToken = session.data?.token;
  let decoded: DecodedToken | null = null;

  if (userToken) {
    decoded = jwtDecode<DecodedToken>(userToken);
  }

  // 3. Wrap getAllOrders with useCallback to avoid lint warnings
  const getAllOrders = useCallback(async () => {
    if (!decoded) return;
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`
    );
    const data: Order[] = await response.json();
    setOrders(data);
    
  }, [decoded]);

  useEffect(() => {
    if (session.status === "authenticated") {
      getAllOrders();
    }
  }, [session.status, getAllOrders]);

  return (
    <div className="container my-17">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h5 className="text-xl font-semibold">My Orders:</h5>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
