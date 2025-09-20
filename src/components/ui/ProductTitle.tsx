import Link from "next/link";
import React from "react";

const ProductTitle = ({
  displayedText,
  link,
  className,
}: {
  displayedText: string;
  link?: string;
  className?: string;
}) => {
  return (
    <h3
      className={`text-base font-semibold mb-1 line-clamp-2` + " " + className}
    >
      {link ? (
        <Link href={link} className="hover:underline hover:text-accent">
          {displayedText}
        </Link>
      ) : (
        displayedText
      )}
    </h3>
  );
};

export default ProductTitle;
