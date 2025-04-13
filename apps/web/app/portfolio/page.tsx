"use client";

import Navbar from "@/components/custom/Navbar";
import AboutMeSection from "@/components/sections/AboutMeSection";
import EducationSection from "@/components/sections/EducationSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import LinkSection from "@/components/sections/LinkSection";
import ProjectSection from "@/components/sections/ProjectSection";
import SkillsSection from "@/components/sections/SkillsSection";
import StatsSection from "@/components/sections/StatsSection";
import { useCustomContext } from "@/context/MyContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const { currentPage, setCurrentPage, user, userLoading } = useCustomContext();
  const router = useRouter();

  useEffect(() => {
    setCurrentPage(0);
    if (!userLoading && !user) {
      router.push("/");
    }
  }, [userLoading, user, router]);

  if (userLoading && !user)
    return (
      <div className="font-semibold text-xl h-[100vh] flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div>
      <Navbar
        firstArg="Dashboard"
        firstRoute="/dashboard"
        thirdArg="Support"
        thirdRoute="/portfolio"
        secondArg="Logout"
        secondRoute="/logout"
      />
      <div className="max-w-[700px] mx-auto w-full min-h-[calc(100vh-80px)] py-10 flex flex-col gap-2 justify-center">
        {currentPage === 0 && <AboutMeSection />}
        {currentPage === 1 && <EducationSection />}
        {currentPage === 2 && <SkillsSection />}
        {currentPage === 3 && <ExperienceSection />}
        {currentPage === 4 && <ProjectSection />}
        {currentPage === 5 && <StatsSection />}
        {currentPage === 6 && <LinkSection />}
      </div>
    </div>
  );
};

export default page;
