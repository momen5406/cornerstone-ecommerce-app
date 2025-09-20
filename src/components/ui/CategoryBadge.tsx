import Link from "next/link";
import React from "react";

const CategoryBadge = ({
  displayedText,
  link,
}: {
  displayedText: string;
  link?: string;
}) => {
  return (
    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full mb-2 w-fit block">
      {link ? (
        <Link href={link} className="hover:underline">
          {displayedText}
        </Link>
      ) : (
        displayedText
      )}
    </span>
  );
};

export default CategoryBadge;
