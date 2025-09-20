import React, { useContext } from "react";
import { Button } from "./button";
import { Loader2, Trash } from "lucide-react";
import { Address } from "@/types/Address.type";
import { AddressContext } from "@/context/AddressContext";

const AddressCard = ({
  address,
  showDelete = true,
  isSelected = false,
  onSelect,
}: {
  address: Address;
  showDelete?: boolean;
  isSelected?: boolean;
  onSelect?: (address: Address) => void;
}) => {
  const { removeAddresses, isLoadingId } = useContext(AddressContext);

  return (
    <div
      onClick={() => onSelect?.(address)}
      role="button"
      tabIndex={0}
      className={`border rounded-xl p-5 flex flex-col relative shadow-sm transition cursor-pointer
        ${
          isSelected ? "border-accent ring-2 ring-accent/40" : "hover:shadow-md"
        }
      `}
    >
      {/* Delete button */}
      {showDelete &&
        (isLoadingId === address._id ? (
          <Loader2 className="absolute top-5 right-5 text-red-500 animate-spin" />
        ) : (
          <Button
            variant="ghost"
            className="cursor-pointer absolute top-3 right-3 text-red-500 hover:bg-red-100 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation(); // prevent selecting when deleting
              removeAddresses(address._id);
            }}
          >
            <Trash size={20} />
          </Button>
        ))}

      {/* Header */}
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
        {address.name}
      </h3>

      {/* Details */}
      <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-300">
        <p>
          <span className="font-medium">Details:</span> {address.details}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {address.phone}
        </p>
        <p>
          <span className="font-medium">City:</span> {address.city}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
