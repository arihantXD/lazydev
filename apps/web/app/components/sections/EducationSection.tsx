"use client";

import RightArrow from "../icons/RightArrow";
import Logo from "../custom/Logo";
import CustomButton from "../custom/CustomButton";
import LeftArrow from "../icons/LeftArrow";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { z } from "zod";
import { educationSchema } from "@repo/schema";
import EducationForm from "../custom/EducationForm";
import { useCustomContext } from "@/context/MyContext";
import { useRouter } from "next/navigation";
import axoisInstance from "@/util/axiosInstance";
import SuccessToast from "../custom/SuccessToast";
import FailedToast from "../custom/FailedToast";

const EducationSection = () => {
  const { setCurrentPage } = useCustomContext();
  const [loading, setLoading] = useState(true);
  const [edList, setEdList] = useState<z.infer<typeof educationSchema>[]>([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const { user } = useCustomContext();
  const router = useRouter();

  if (!user) router.push("/login");

  const addEducation = () => {
    setEdList((prev) => [
      ...prev,
      {
        index: 0,
        school: "",
        course: "",
        score: "",
        from: "",
        to: "",
        userId: user?.id || 0,
      },
    ]);
    SuccessToast("Wow! Education XP++");
  };

  const saveEducation = async (data: z.infer<typeof educationSchema>) => {
    try {
      setBtnLoading(true);
      const response = await axoisInstance.post(`/portfolio/education`, data);
      const updatedList = edList;
      updatedList[data.index] = response.data;
      setEdList(updatedList);
      setBtnLoading(false);
      SuccessToast("Education detail saved successfully");
    } catch (error: any) {
      setBtnLoading(false);
      FailedToast(
        error?.response?.data?.message || "Internal server error try again."
      );
    }
  };

  const deleteEducation = async (
    education: z.infer<typeof educationSchema>
  ) => {
    try {
      if (education.id) {
        await axoisInstance.delete(`/portfolio/education/${education.id}`);
        SuccessToast("Ahhh!!! Became less educated");
      }
      setEdList((prev) => prev.filter((value) => value !== education));
    } catch (error: any) {
      FailedToast(
        error?.response?.data?.message || "Internal server error try again."
      );
    }
  };

  const fetchEducation = async () => {
    try {
      const { data } = await axoisInstance.get(
        `/portfolio/education/${user?.id}`
      );
      if (data.length == 0) data.push({ userId: user?.id });
      setEdList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  if (loading)
    return <div className="font-semibold text-xl text-center">Loading...</div>;

  return (
    <div className="shadow-sm rounded-2xl px-4 py-8">
      <Logo />
      <div className="py-8">
        <span className="text-lg text-center font-semibold">
          Educational Background
        </span>
        <span className="text-sm text-light-gray block pt-1">
          Okay now fill up your educations, start with the latest study and you
          can fill upto 3 rows
        </span>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {edList &&
          edList.map((item, index) => (
            <div key={index}>
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger>
                  {item?.school && item.school}
                  {!item?.school && `School - ${index + 1}`}
                </AccordionTrigger>
                <AccordionContent>
                  <EducationForm
                    edList={edList}
                    addEducation={addEducation}
                    saveEducation={saveEducation}
                    deleteEducation={deleteEducation}
                    btnLoading={btnLoading}
                    data={item}
                    index={index}
                  />
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
      </Accordion>
      <div className="w-full flex items-center justify-between mt-8">
        <CustomButton
          bg={`bg-primary`}
          hoverBg={`hover:bg-secondary`}
          color="text-white hover:text-white"
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <div className="flex items-center gap-2">
            <LeftArrow />
            Back
          </div>
        </CustomButton>
        <CustomButton
          bg={`bg-primary`}
          hoverBg={`hover:bg-secondary`}
          color="text-white hover:text-white"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <div className="flex items-center gap-2">
            Next
            <RightArrow />
          </div>
        </CustomButton>
      </div>
    </div>
  );
};

export default EducationSection;
