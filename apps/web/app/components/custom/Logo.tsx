"use client";

import { useCustomContext } from "@/context/MyContext";
import Link from "next/link";

const Logo = () => {
  const { user } = useCustomContext();

  return (
    <Link href={user ? "/portfolio" : "/"}>
      <span className="text-2xl font-semibold font-sec">
        Lazy<span className="text-primary">'Dev</span>
      </span>
    </Link>
  );
};

export default Logo;
