import Link from "next/link";
import React from "react";

const BrandName = ({
  displayedText,
  link,
}: {
  displayedText: string;
  link?: string;
}) => {
  return (
    <span className="text-sm text-muted-foreground italic mb-2">
      {link ? (
        <Link className="hover:underline" href={link}>
          {displayedText}
        </Link>
      ) : (
        displayedText
      )}
    </span>
  );
};

export default BrandName;
