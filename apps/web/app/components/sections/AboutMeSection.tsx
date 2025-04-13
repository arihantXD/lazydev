"use client";

import { useEffect, useState } from "react";
import Logo from "../custom/Logo";
import { userSchema } from "@repo/schema";
import { z } from "zod";
import AboutMeForm from "../custom/AboutMeForm";
import { useCustomContext } from "@/context/MyContext";
import { useRouter } from "next/navigation";
import axoisInstance from "@/util/axiosInstance";
import SuccessToast from "../custom/SuccessToast";
import FailedToast from "../custom/FailedToast";

const AboutMeSection = () => {
  const [bio, setBio] = useState<z.infer<typeof userSchema> | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const { user, userLoading } = useCustomContext();
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login");
    }
  }, [userLoading, user, router]);

  const fetchBio = async () => {
    try {
      if (user) {
        const { data } = await axoisInstance.get(
          `/portfolio/about-me/${user?.id}`
        );
        setBio(data);
        setLoading(false);
        if (data) SuccessToast("Loaded all your saved work");
      }
    } catch (error: any) {
      FailedToast(
        error?.response?.data?.message || "Internal server error try again"
      );
    }
  };

  useEffect(() => {
    fetchBio();
  }, [user]);

  const saveBio = async (bio: z.infer<typeof userSchema>) => {
    try {
      setBtnLoading(true);
      await axoisInstance.post(`/portfolio/about-me`, bio);
      setBtnLoading(false);
      SuccessToast("Saved your bio successfully");
    } catch (error: any) {
      setBtnLoading(false);
      FailedToast(
        error?.response?.data?.message || "Internal server error try again"
      );
    }
  };

  if (loading || userLoading)
    return <div className="font-semibold text-xl text-center">Loading...</div>;

  if (!user) return null;

  return (
    <div className="shadow-sm rounded-2xl px-4 py-8">
      <Logo />
      <div className="py-8">
        <span className="text-lg text-center font-semibold">
          Tell us about yourself
        </span>
        <span className="text-sm text-light-gray block pt-1">
          Let's start with filling up your basic information for the recruiters
        </span>
      </div>
      <AboutMeForm data={bio} saveBio={saveBio} btnLoading={btnLoading} />
    </div>
  );
};

export default AboutMeSection;
