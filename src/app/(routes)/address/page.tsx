"use client";
import AddAddressesDialog from "@/components/features/AddAddressesDialog";
import AddressCard from "@/components/ui/AddressCard";
import { AddressContext } from "@/context/AddressContext";
import { MapPin } from "lucide-react";
import React, { useContext } from "react";

const Addresses = () => {
  const { addresses } = useContext(AddressContext);

  return (
    <div className="container my-17">
      <div className="flex items-center justify-between mb-5">
        <h5 className="text-xl font-semibold">My Addresses</h5>
        <AddAddressesDialog />
      </div>

      {!addresses || addresses.length === 0 ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
          <div className="bg-accent/10 text-accent p-4 rounded-full mb-4">
            <MapPin size={32} />
          </div>
          <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
            No addresses found
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm">
            You haven’t added any addresses yet. Add one now to make checkout
            faster and easier.
          </p>
          <AddAddressesDialog />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address) => (
            <AddressCard address={address} key={address._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
