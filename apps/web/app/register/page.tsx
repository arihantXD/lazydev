"use client";

import FailedToast from "@/components/custom/FailedToast";
import Logo from "@/components/custom/Logo";
import RegisterForm from "@/components/custom/RegisterForm";
import SuccessToast from "@/components/custom/SuccessToast";
import { useCustomContext } from "@/context/MyContext";
import axoisInstance from "@/util/axiosInstance";
import { signUpSchema } from "@repo/schema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const page = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const { userLoading, user } = useCustomContext();
  const router = useRouter();

  useEffect(() => {
    if (user && !userLoading) router.push("/portfolio");
  }, [user, userLoading]);

  const saveBio = async (user: z.infer<typeof signUpSchema>) => {
    try {
      setBtnLoading(true);
      const { data } = await axoisInstance.post(`/user/register`, user);
      setBtnLoading(false);
      SuccessToast(data.message);
      router.push("/login");
    } catch (error: any) {
      setBtnLoading(false);
      console.log(error);
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
          <RegisterForm saveBio={saveBio} btnLoading={btnLoading} />
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
