"use client";
import { Address, NewAddress } from "@/types/Address.type";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AddressContext = createContext<{
  addresses: Address[] | null;
  setAddresses: React.Dispatch<React.SetStateAction<Address[] | null>>;
  removeAddresses: (addressId: string) => Promise<void>;
  isLoading: boolean;
  isLoadingId: string | null;
  addAddress: (values: NewAddress) => Promise<void>;
}>({
  addresses: null,
  setAddresses: () => {},
  removeAddresses: async () => {},
  isLoading: false,
  isLoadingId: null,
  addAddress: async () => {},
});

const AddressContextProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState<Address[] | null>([]);
  const [isLoadingId, setIsLoadingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const session = useSession();

  async function getUserAddresses() {
    if (!session.data) return;

    setIsLoading(true);
    const response = await fetch("/api/getAddresses", {
      headers: {
        token: session.data.token,
      },
    });

    const { data } = await response.json();
    setAddresses(data as Address[]);
    setIsLoading(false);
  }

  useEffect(() => {
    if (session.status == "authenticated") {
      getUserAddresses();
    }
  }, [session.status]);

  async function addAddress(values: NewAddress) {
    if (!session.data) return;
    setIsLoading(true);
    const response = await fetch("/api/addAddress", {
      method: "POST",
      headers: {
        token: session.data.token,
      },
      body: JSON.stringify(values),
    });


    const { data } = await response.json();
    setAddresses(data as Address[]); // update with new list
    setIsLoading(false);
    toast.success("New address added successfully.");
  }

  async function removeAddresses(addressId: string) {
    if (!session.data) return;
    setIsLoadingId(addressId);
    const response = await fetch(`/api/address/${addressId}`, {
      method: "DELETE",
      headers: {
        token: session.data.token,
      },
    });

    const { data } = await response.json();
    setAddresses(data as Address[]); // update with new list
    setIsLoadingId(null);
    toast.success("Address removed successfully.");
  }

  return (
    <AddressContext.Provider
      value={{
        addresses,
        setAddresses,
        removeAddresses,
        isLoading,
        isLoadingId,
        addAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default AddressContextProvider;
