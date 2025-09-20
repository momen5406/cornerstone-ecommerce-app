"use client";
import React, { useRef, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ResetCodeForm = () => {
  const input = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submit = async () => {
    const resetCode = input.current?.value?.trim();

    if (!resetCode) {
      toast.error("Please enter your reset code");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resetCode }),
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "Success") {
        toast.success("Reset code verified successfully!");
        router.push("/resetPassword");
      } else {
        toast.error(data.message || "Invalid reset code");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input placeholder="Enter Reset Code" ref={input} disabled={isLoading} />
      <Button
        onClick={submit}
        type="button"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            Verifying...
          </>
        ) : (
          "Verify Code"
        )}
      </Button>
    </div>
  );
};

export default ResetCodeForm;
