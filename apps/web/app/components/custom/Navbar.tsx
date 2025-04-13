"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "./Logo";
import { ReactNode, useEffect } from "react";
import axoisInstance from "@/util/axiosInstance";
import backendUrl from "@/util/backendUrl";
import SuccessToast from "./SuccessToast";
import { useRouter } from "next/navigation";
import FailedToast from "./FailedToast";
import { useCustomContext } from "@/context/MyContext";

const Navbar = ({
  firstArg,
  firstRoute,
  secondArg,
  secondRoute,
  thirdArg,
  thirdRoute,
}: {
  firstArg: string | ReactNode;
  firstRoute: string;
  secondArg: string | ReactNode;
  secondRoute: string;
  thirdArg: string | ReactNode;
  thirdRoute: string;
}) => {
  const router = useRouter();
  const { setUser } = useCustomContext();

  const handleLogout = async () => {
    try {
      await axoisInstance.post(`${backendUrl}/user/logout`);
      router.push("/");
      SuccessToast("Logged out successfully");
      setUser(null);
    } catch (error) {
      console.log(error);
      FailedToast("Internal server error, try again");
    }
  };

  return (
    <div className="max-w-[1000px] p-4 mx-auto flex items-center justify-between [&_Button]:text-black [&_Button]:hover:text-primary transition">
      <Logo />
      <div className="">
        <Link href={firstRoute}>
          <Button size={"sm"} variant={"link"}>
            {firstArg}
          </Button>
        </Link>
        {secondArg == "Logout" ? (
          <Button onClick={handleLogout} size={"sm"} variant={"link"}>
            {secondArg}
          </Button>
        ) : (
          <Link href={secondRoute}>
            <Button size={"sm"} variant={"link"}>
              {secondArg}
            </Button>
          </Link>
        )}
        <Link href={thirdRoute}>
          <Button size={"sm"} variant={"link"}>
            {thirdArg}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
