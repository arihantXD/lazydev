"use client";

import Logo from "@/components/custom/Logo";
import LoginForm from "@/components/custom/LoginForm";
import { loginSchema } from "@repo/schema";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useCustomContext } from "@/context/MyContext";
import axoisInstance from "@/util/axiosInstance";
import SuccessToast from "@/components/custom/SuccessToast";
import FailedToast from "@/components/custom/FailedToast";

const page = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const { setUser, userLoading, user } = useCustomContext();
  const router = useRouter();

  useEffect(() => {
    console.log(user, userLoading);

    if (user && !userLoading) router.push("/portfolio");
  }, [user, userLoading]);

  const saveBio = async (user: z.infer<typeof loginSchema>) => {
    try {
      setBtnLoading(true);
      const { data } = await axoisInstance.post(`/user/login`, user);
      setBtnLoading(false);
      setUser(data.data);
      SuccessToast(data.message);
      router.push("/portfolio");
    } catch (error: any) {
      setBtnLoading(false);
      FailedToast(
        error?.response?.data?.message || "Internal server error try again."
      );
    }
  };

  if (!userLoading && !user) {
    return (
      <div className="w-full sm:h-[100vh] flex justify-center py-20 items-center ">
        <div className="w-[600px] shadow-sm rounded-2xl px-4 py-8">
          <div className="flex flex-col gap-2 items-center text-sm">
            <Logo />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Provident, rerum?
            </p>
          </div>
          <LoginForm saveBio={saveBio} btnLoading={btnLoading} />
        </div>
      </div>
    );
  }

  return (
    <div className="font-semibold text-xl h-[100vh] flex justify-center items-center">
      Loading...
    </div>
  );
};

export default page;
