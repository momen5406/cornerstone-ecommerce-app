"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Order } from "@/types/Order.type";

type Props = {
  order: Order;
};

const OrderCard: React.FC<Props> = ({ order }) => {
  return (
    <Card className="rounded-lg shadow border border-gray-200 bg-white">
      {/* Header */}
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-lg font-semibold">Order #{order.id}</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.isDelivered
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {order.isDelivered ? "Delivered" : "Processing"}
          </span>
        </CardTitle>
        <p className="text-sm text-gray-500">
          Placed on {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* User Info */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Customer</h4>
          <p className="text-sm">{order.user.name}</p>
          <p className="text-sm">{order.user.email}</p>
          <p className="text-sm">{order.user.phone}</p>
        </div>

        <Separator />

        {/* Cart Items */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Items</h4>
          <div className="space-y-3">
            {order.cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 rounded-lg border p-2"
              >
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  width={64}
                  height={64}
                  priority
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-2">
                    {item.product.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.count} × {item.price} EGP
                  </p>
                </div>
                <p className="text-sm font-semibold">
                  {item.count * item.price} EGP
                </p>
              </div>
            ))}
          </div>
        </div>

        {
          order.shippingAddress && <>
          <Separator />
          
          {/* Shipping */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Shipping</h4>
            <p className="text-sm">{order.shippingAddress.details}</p>
            <p className="text-sm">{order.shippingAddress.city}</p>
            <p className="text-sm">{order.shippingAddress.phone}</p>
          </div>
        </>
        }

        <Separator />

        {/* Payment + Total */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">
              Payment: {order.paymentMethodType}
            </p>
            <p className="text-sm text-gray-500">
              {order.isPaid ? "Paid" : "Unpaid"}
            </p>
          </div>
          <p className="text-lg font-bold text-gray-800">
            {order.totalOrderPrice} EGP
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
