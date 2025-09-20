"use state";
import { FaStar } from "react-icons/fa6";
import React from "react";

const Ratings = ({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <FaStar
      key={i}
      className={rating >= i + 1 ? "text-yellow-500" : "text-neutral-400"}
    />
  ));

  return (
    <div className={"flex items-centers gap-1" + " " + className}>
      <span className="flex items-center">{stars}</span>
      <span className="text-base">{rating}</span>
    </div>
  );
};

export default Ratings;
