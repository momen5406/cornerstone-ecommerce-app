import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <h1 className="text-3xl">
        Corner<span className="font-bold text-accent">Stone</span>
      </h1>
    </Link>
  );
};

export default Logo;
