"use client";

import RightArrow from "../icons/RightArrow";
import Logo from "../custom/Logo";
import CustomButton from "../custom/CustomButton";
import LeftArrow from "../icons/LeftArrow";
import { useEffect, useState } from "react";
import { skillSchema } from "@repo/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { z } from "zod";
import SkillForm from "../custom/SkillForm";
import { useCustomContext } from "@/context/MyContext";
import { useRouter } from "next/navigation";
import axoisInstance from "@/util/axiosInstance";
import SuccessToast from "../custom/SuccessToast";
import FailedToast from "../custom/FailedToast";

const SkillsSection = () => {
  const { setCurrentPage } = useCustomContext();
  const [loading, setLoading] = useState(true);
  const [skillList, setSkillList] = useState<z.infer<typeof skillSchema>[]>([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const { user } = useCustomContext();
  const router = useRouter();

  if (!user) router.push("/login");

  const addSkill = () => {
    setSkillList((prev) => [
      ...prev,
      {
        index: 0,
        skills: "",
        title: "",
        userId: user?.id as number,
      },
    ]);
    SuccessToast("Skill points increased");
  };

  const saveSkill = async (skill: z.infer<typeof skillSchema>) => {
    try {
      setBtnLoading(true);
      await axoisInstance.post(`/portfolio/skills`, skill);
      const updatedList = skillList;
      updatedList[skill.index] = skill;
      setSkillList(updatedList);
      setBtnLoading(false);
      SuccessToast("Thats a great skill");
    } catch (error: any) {
      setBtnLoading(false);
      FailedToast(
        error?.response?.data?.message || "Internal server error try again."
      );
    }
  };

  const deleteSkill = async (skill: z.infer<typeof skillSchema>) => {
    try {
      if (skill.id) {
        await axoisInstance.delete(`/portfolio/skill/${skill.id}`);
        SuccessToast("Deleted, but what are you trying to do ?");
      }
      setSkillList((prev) => prev.filter((value) => value !== skill));
    } catch (error: any) {
      FailedToast(
        error?.response?.data?.message || "Internal server error try again."
      );
    }
  };

  const fetchSkill = async () => {
    try {
      const { data } = await axoisInstance.get(`/portfolio/skill/${user?.id}`);
      if (data.length == 0)
        data.push({
          userId: user?.id,
        });
      setSkillList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSkill();
  }, []);

  if (loading)
    return <div className="font-semibold text-xl text-center">Loading...</div>;

  return (
    <div className="shadow-sm rounded-2xl px-4 py-8">
      <Logo />
      <div className="py-8">
        <span className="text-lg text-center font-semibold">
          Let's get your Skills
        </span>
        <span className="text-sm text-light-gray block pt-1">
          You can put here your hard skills i.e. Coding, Guitarist etc. Or any
          soft skill and hobbies
        </span>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {skillList &&
          skillList.map((item, index) => (
            <div key={index}>
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger>
                  {item.title && item.title}
                  {!item.title && `Skill - ${index + 1}`}
                </AccordionTrigger>
                <AccordionContent>
                  <SkillForm
                    data={item}
                    addSkill={addSkill}
                    saveSkill={saveSkill}
                    deleteSkill={deleteSkill}
                    skillList={skillList}
                    btnLoading={btnLoading}
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

export default SkillsSection;
