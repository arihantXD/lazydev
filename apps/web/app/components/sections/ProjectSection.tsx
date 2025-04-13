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
import ProjectForm from "../custom/ProjectForm";
import { useCustomContext } from "@/context/MyContext";
import { useRouter } from "next/navigation";
import axoisInstance from "@/util/axiosInstance";
import SuccessToast from "../custom/SuccessToast";
import FailedToast from "../custom/FailedToast";

const ProjectSection = () => {
  const { setCurrentPage } = useCustomContext();
  const [loading, setLoading] = useState(true);
  const [projectList, setProjectList] = useState<
    z.infer<typeof experienceSchema>[]
  >([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const { user } = useCustomContext();
  const router = useRouter();

  if (!user) router.push("/login");

  const addProject = () => {
    setProjectList((prev) => [
      ...prev,
      {
        companyName: "",
        index: 0,
        type: Type.Personal,
        from: "",
        to: "",
        about: "",
        tasks: [{ value: "" }],
        userId: user?.id as number,
        gitHubLink: "",
        liveLink: "",
      },
    ]);
    SuccessToast("Let's see what you fill in there");
  };

  const saveProject = async (data: z.infer<typeof experienceSchema>) => {
    try {
      setBtnLoading(true);
      await axoisInstance.post(`/portfolio/experience?type=personal`, data);
      const updatedList = projectList;
      updatedList[data.index] = data;
      setProjectList(updatedList);
      setBtnLoading(false);
      SuccessToast("Nice project buddy!!!");
    } catch (error: any) {
      setBtnLoading(false);
      FailedToast(
        error?.response?.data?.message || "Internal server error try again."
      );
    }
  };

  const deleteProject = async (exp: z.infer<typeof experienceSchema>) => {
    try {
      if (exp.id) {
        await axoisInstance.delete(`/portfolio/experience/${exp.id}`);
        SuccessToast("I would have also deleted that project");
      }
      setProjectList((prev) => prev.filter((value) => value !== exp));
    } catch (error: any) {
      FailedToast(
        error?.response?.data?.message || "Internal server error try again."
      );
    }
  };

  const fetchProject = async () => {
    try {
      const { data } = await axoisInstance.get(
        `/portfolio/experience/${user?.id}?type=personal`
      );
      if (data.length == 0) data.push({ userId: user?.id });
      setProjectList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (loading)
    return <div className="font-semibold text-xl text-center">Loading...</div>;

  return (
    <div className="shadow-sm rounded-2xl px-4 py-8">
      <Logo />
      <div className="py-8">
        <span className="text-lg text-center font-semibold">
          Built any project
        </span>
        <span className="text-sm text-light-gray block pt-1">
          You can fill details of your personal experience, projects or
          volentory work that you have done
        </span>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {projectList &&
          projectList.map((item, index) => (
            <div key={index}>
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger>
                  {item.companyName && item.companyName}
                  {!item.companyName && `Project - ${index + 1}`}
                </AccordionTrigger>
                <AccordionContent>
                  <ProjectForm
                    projectList={projectList}
                    addProject={addProject}
                    saveProject={saveProject}
                    deleteProject={deleteProject}
                    data={item}
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

export default ProjectSection;
