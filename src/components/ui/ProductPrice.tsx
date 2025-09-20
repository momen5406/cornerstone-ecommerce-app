import React from "react";

const ProductPrice = ({
  displayedText,
  className,
}: {
  displayedText: string;
  className?: string;
}) => {
  return (
    <h4 className={`text-lg font-bold text-primary mb-4` + " " + className}>
      {displayedText}
    </h4>
  );
};

export default ProductPrice;
