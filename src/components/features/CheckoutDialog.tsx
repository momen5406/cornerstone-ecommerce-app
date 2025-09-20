"use client";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { AddressContext } from "@/context/AddressContext";
import AddressCard from "../ui/AddressCard";
import { Address } from "@/types/Address.type";
import { DialogClose } from "@radix-ui/react-dialog";
import checkoutSchema from "@/schema/checkout.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CheckoutDialog = ({
  disabled,
  cartId,
}: {
  disabled: boolean;
  cartId: string;
}) => {
  const { addresses } = useContext(AddressContext);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCashLoading, setIsCashLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  

  const createVisaOrder = async () => {
    setIsLoading(true);
    const payload = {
      shippingAddress: {
        details: selectedAddress?.details,
        phone: selectedAddress?.phone,
        city: selectedAddress?.city,
      },
    };

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`,
      {
        method: "POST",
        headers: {
          token: session.data?.token + "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    setIsLoading(false);

    if (data.status == "success") {
      location.href = data.session.url;
    }
  };

  const createCashOrder = async () => {
    setIsCashLoading(true);
    const payload = {
      shippingAddress: {
        details: selectedAddress?.details,
        phone: selectedAddress?.phone,
        city: selectedAddress?.city,
      },
    };

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        method: "POST",
        headers: {
          token: session.data?.token + "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    setIsCashLoading(false);

    if (data.status == "success") {
      toast.success("Successfully Ordered");
      router.push("/allorders");
    } else {
      toast.error(data.msg);
    }
  };

  const schema = checkoutSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    const payload = {
      shippingAddress: {
        details: values.details,
        phone: values.phone,
        city: values.city,
      },
    };
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="mt-6 w-full h-12 text-lg font-semibold"
          disabled={disabled}
        >
          Checkout
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            {addresses
              ? "Choose a Delivery Address"
              : "Enter your Delivery Address"}
          </DialogTitle>
          <DialogDescription>
            {addresses
              ? "Select one of your saved addresses or add a new one to continue."
              : ""}
          </DialogDescription>
        </DialogHeader>

        {addresses?.length != 0 ? (
          <div className="flex flex-col w-full gap-2">
            {addresses?.map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                showDelete={false}
                isSelected={selectedAddress?._id === address._id}
                onSelect={(address) => setSelectedAddress(address)}
              />
            ))}
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Details</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Building 5, Apt 21, New Cairo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+20 12 345 6789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Cairo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Footer */}
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button onClick={createCashOrder} type="submit">
                  {isCashLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Cash"
                  )}
                </Button>
                <Button onClick={createVisaOrder} type="submit">
                  {isLoading ? <Loader2 className="animate-spin" /> : "Visa"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}

        {addresses?.length !=0 && (
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={createCashOrder} type="submit">
              {isCashLoading ? <Loader2 className="animate-spin" /> : "Cash"}
            </Button>
            <Button onClick={createVisaOrder} type="submit">
              {isLoading ? <Loader2 className="animate-spin" /> : "Visa"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
