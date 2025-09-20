"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ResetCodeForm from "@/components/ui/ResetCodeForm";

// ✅ Schema for email validation
const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

interface forgetPasswordResponse {
  message: string;
  statusMsg: "success" | "fail";
}

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    setIsLoading(true);

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const data: forgetPasswordResponse = await response.json();

    if (data.statusMsg === "success") {
      toast.success(data.message);
      setOpenDialog(true); // ✅ open the reset code dialog
    } else {
      toast.error(data.message);
    }

    setIsLoading(false);
  }

  return (
    <div className="mx-5">
      <div className="max-w-md mx-auto my-16">
        <div className="bg-white border rounded-xl shadow p-8 space-y-6 transition hover:shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
              Forgot Password
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">
              Enter your email address and we&apos;ll send you a password reset
              link.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 flex flex-col"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* ✅ Reset Code Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Reset Code</DialogTitle>
            <DialogDescription>
              Please check your email for the reset code and enter it below to
              continue.
            </DialogDescription>
          </DialogHeader>

          <ResetCodeForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ForgotPassword;
