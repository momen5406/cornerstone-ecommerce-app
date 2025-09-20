"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Mail, MapPin, Heart, ShoppingCart, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const { data: session } = useSession();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editData, setEditData] = useState(user);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  function setUserData() {
    if (session?.user) {
      const updatedUser = {
        name: session.user.name || "",
        email: session.user.email || "",
        phone: "",
      };
      setUser(updatedUser);
      setEditData(updatedUser);
    }
  }

  useEffect(() => {
    setUserData();
  }, [session]);

  // ----------------- UPDATE PROFILE -----------------
  const handleUpdate = async () => {
    setIsLoading(true);
    setUser(editData);

    const payload = {
      name: editData.name,
      email: editData.email,
      phone: editData.phone,
    };

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
      {
        method: "PUT",
        headers: {
          token: session?.token + "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (data.message == "success") {
      toast.success("Updated data Successfully!");
    } else {
      toast.error(data.errors?.msg || "Failed to update profile");
    }
    setIsLoading(false);
    setUserData();
  };

  // ----------------- UPDATE PASSWORD -----------------
  const handlePasswordUpdate = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.error("All fields are required");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setIsPasswordLoading(true);

    const payload = {
      currentPassword: passwords.current,
      password: passwords.new,
      rePassword: passwords.confirm,
    };

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: {
          token: session?.token + "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (data.message === "success") {
      toast.success("Password updated successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
    } else {
      toast.error(data.errors?.msg || "Failed to update password");
    }

    setIsPasswordLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">My Account</h1>

      {/* Profile Card */}
      <Card className="shadow rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <User className="w-5 h-5" /> Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="shadow rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl">Quick Access</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/addresses">
            <Button variant="outline" className="w-full flex gap-2">
              <MapPin className="w-4 h-4" /> Addresses
            </Button>
          </Link>
          <Link href="/wishlist">
            <Button variant="outline" className="w-full flex gap-2">
              <Heart className="w-4 h-4" /> Wishlist
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="outline" className="w-full flex gap-2">
              <ShoppingCart className="w-4 h-4" /> Cart
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* Update User Data */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">Update Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your personal information below.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editData.phone}
                  onChange={(e) =>
                    setEditData({ ...editData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <Button className="w-full" onClick={handleUpdate}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogContent>
        </Dialog>

        {/* Update Password */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="w-full sm:w-auto">
              Update Password
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Enter your current password and choose a new one.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="current">Current Password</Label>
                <Input
                  id="current"
                  type="password"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords({ ...passwords, current: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new">New Password</Label>
                <Input
                  id="new"
                  type="password"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                />
              </div>
            </div>

            <Button className="w-full" onClick={handlePasswordUpdate}>
              {isPasswordLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save Password"
              )}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
