"use client";

import AboutMeSection from "@/components/portfolio/AboutMeSection";
import EducationSection from "@/components/portfolio/EducationSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import Footer from "@/components/portfolio/Footer";
import HeroSection from "@/components/portfolio/HeroSection";
import Navbar from "@/components/portfolio/Navbar";
import ProjectSection from "@/components/portfolio/ProjectsSection";
import Seperator from "@/components/portfolio/Seperator";
import SkillSection from "@/components/portfolio/SkillSection";
import StatsSection from "@/components/portfolio/StatsSection";
import backendUrl from "@/util/backendUrl";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { userId } = useParams();
  const [portfolio, setPortfolio] = useState<any>();
  const [loading, setLoading] = useState(true);

  const fetchPortfolio = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/user/id/${userId}`);
      setPortfolio(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setPortfolio(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  if (!loading && !portfolio)
    return (
      <div className="font-semibold text-xl min-h-[100vh] w-full text-[#594545] flex items-center justify-center">
        This user does not exist, create portfolio and try again
      </div>
    );

  if (loading)
    return (
      <div className="font-semibold text-xl min-h-[100vh] w-full text-[#594545] flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="p-2 text-[#594545] text-sm text-center">
      <div className="max-w-[1000px] mx-auto">
        <Navbar />
        {portfolio.firstName && portfolio.lastName && portfolio.place && (
          <HeroSection
            firstName={portfolio.firstName}
            lastName={portfolio.lastName}
            occupation={portfolio.occupation}
            place={portfolio.place}
          />
        )}
        {portfolio && portfolio.aboutMe && (
          <>
            <Seperator />
            <AboutMeSection data={portfolio.aboutMe} />
          </>
        )}
        {portfolio && portfolio.skill && (
          <>
            <Seperator />
            <SkillSection data={portfolio.skill} />
          </>
        )}
        {portfolio && portfolio.education && (
          <>
            <Seperator />
            <EducationSection data={portfolio.education} />
          </>
        )}
        {portfolio && portfolio.workExperience && (
          <>
            <Seperator />
            <ExperienceSection data={portfolio.workExperience} />
          </>
        )}
        {portfolio && portfolio.workExperience && (
          <>
            <Seperator />
            <ProjectSection data={portfolio.workExperience} />
          </>
        )}
        {portfolio && portfolio.stats && (
          <>
            <Seperator />
            <StatsSection data={portfolio.stats} />
          </>
        )}
        {portfolio &&
          portfolio.email &&
          portfolio.phoneNumber &&
          portfolio.link && (
            <Footer
              email={portfolio.email}
              phoneNumber={portfolio.phoneNumber}
              link={portfolio.link}
              firstName={portfolio.firstName}
              lastName={portfolio.lastName}
            />
          )}
      </div>
    </div>
  );
};

export default page;
