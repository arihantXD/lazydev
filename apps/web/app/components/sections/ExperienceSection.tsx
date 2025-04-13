"use client";

import RightArrow from "../icons/RightArrow";
import Logo from "../custom/Logo";
import CustomButton from "../custom/CustomButton";
import LeftArrow from "../icons/LeftArrow";
import { useEffect, useState } from "react";
import { experienceSchema, Type } from "@repo/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { z } from "zod";
import ExperienceForm from "../custom/ExperienceForm";
import { useCustomContext } from "@/context/MyContext";
import { useRouter } from "next/navigation";
import axoisInstance from "@/util/axiosInstance";
import SuccessToast from "../custom/SuccessToast";
import FailedToast from "../custom/FailedToast";

const ExperienceSection = () => {
  const { setCurrentPage } = useCustomContext();
  const [loading, setLoading] = useState(true);
  const [expList, setExpList] = useState<z.infer<typeof experienceSchema>[]>(
    []
  );
  const [btnLoading, setBtnLoading] = useState(false);
  const { user } = useCustomContext();
  const router = useRouter();

  if (!user) router.push("/login");

  const addExperience = () => {
    setExpList((prev) => [
      ...prev,
      {
        companyName: "",
        index: 0,
        type: Type.Professional,
        from: "",
        to: "",
        userId: user?.id as number,
        role: "",
        tasks: [{ value: "" }],
      },
    ]);
    SuccessToast("In route of becoming PRO");
  };

  const saveExperience = async (exp: z.infer<typeof experienceSchema>) => {
    try {
      setBtnLoading(true);
      await axoisInstance.post(`/portfolio/experience`, exp);
      const updatedList = expList;
      updatedList[exp.index] = exp;
      setExpList(updatedList);
      setBtnLoading(false);
      SuccessToast("Experience detail saved successfully");
    } catch (error: any) {
      setBtnLoading(false);
      FailedToast(
        error?.response?.data?.message || "Internal server error try again."
      );
    }
  };

  const deleteExperience = async (exp: z.infer<typeof experienceSchema>) => {
    try {
      if (exp.id) {
        await axoisInstance.delete(`/portfolio/experience/${exp.id}`);
        SuccessToast("Huuh, you not gettting younger buddy");
      }
      setExpList((prev) => prev.filter((value) => value !== exp));
    } catch (error: any) {
      FailedToast(
        error?.response?.data?.message || "Internal server error try again."
      );
    }
  };

  const fetchExperience = async () => {
    try {
      const { data } = await axoisInstance.get(
        `/portfolio/experience/${user?.id}?type=professional`
      );
      if (data.length == 0)
        data.push({ userId: user?.id, type: Type.Professional });
      setExpList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  if (loading)
    return <div className="font-semibold text-xl text-center">Loading...</div>;

  return (
    <div className="shadow-sm rounded-2xl px-4 py-8">
      <Logo />
      <div className="py-8">
        <span className="text-lg text-center font-semibold">
          Have you worked somewhere
        </span>
        <span className="text-sm text-light-gray block pt-1">
          You can put here your professional experiences or any freelance work
          that you have done. (Skip if none)
        </span>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {expList &&
          expList.map((item, index) => (
            <div key={index}>
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger>
                  {item.companyName && item.companyName}
                  {!item.companyName && `Experience - ${index + 1}`}
                </AccordionTrigger>
                <AccordionContent>
                  <ExperienceForm
                    expList={expList}
                    addExperience={addExperience}
                    saveExperience={saveExperience}
                    deleteExperience={deleteExperience}
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

export default ExperienceSection;
