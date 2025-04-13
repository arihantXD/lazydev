"use client";
import CustomButton from "@/components/custom/CustomButton";
import FailedBadge from "@/components/custom/FailedBadge";
import SuccessBadge from "@/components/custom/SuccessBadge";
import RightArrow from "@/components/icons/RightArrow";
import Save from "@/components/icons/Save";
import { useCustomContext } from "@/context/MyContext";
import backendUrl from "@/util/backendUrl";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { user, userLoading } = useCustomContext();
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<any>();
  const [filledValues, setFilledValues] = useState<number>(0);

  const fetchPortfolio = async () => {
    if (user) {
      try {
        const { data } = await axios.get(`${backendUrl}/user/id/${user?.id}`);
        setPortfolio(data.data);
      } catch (error) {
        console.log(error);
        setPortfolio(null);
      }
    }
  };

  useEffect(() => {
    if (portfolio) {
      setFilledValues(0);
      if (portfolio.aboutMe) setFilledValues((prev) => prev + 1);
      if (portfolio.education && portfolio.education.length > 0)
        setFilledValues((prev) => prev + 1);
      if (portfolio.skill && portfolio.skill.length > 0)
        setFilledValues((prev) => prev + 1);
      if (portfolio.workExperience && portfolio.workExperience.length > 0)
        setFilledValues((prev) => prev + 1);
      if (portfolio.stats && portfolio.stats.length > 0)
        setFilledValues((prev) => prev + 1);
      if (portfolio.link && portfolio.link.length > 0)
        setFilledValues((prev) => prev + 1);
    }
  }, [portfolio]);

  useEffect(() => {
    fetchPortfolio();

    if (!userLoading && !user) {
      router.push("/login");
    }
  }, [userLoading, user, router]);

  if ((userLoading && !user) || (!user && !portfolio) || (user && !portfolio))
    return (
      <div className="font-semibold text-xl h-[calc(100vh-70px)] flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="w-full min-h-[calc(100vh-80px)]  flex justify-center px-4">
      <div className="px-6 max-w-[800px] shadow py-6 rounded-xl mt-16 h-fit">
        {!portfolio ? (
          <div className="flex flex-col gap-4 py-5">
            <div className="text-lg sm:text-xl font-medium pb-4">
              <span className="font-semibold underline text-primary1">
                No data found,
              </span>{" "}
              you need to update your profile to create the Live Portfolio.
            </div>
            <CustomButton
              onClick={() => router.push("/portfolio")}
              w="w-[180px] bg-primary text-white px-4 hover:bg-secondary hover:text-white"
            >
              <div className="flex items-center gap-5">
                <div>Update portfolio</div>
                <RightArrow />
              </div>
            </CustomButton>
          </div>
        ) : (
          <div className="py-4">
            {filledValues && filledValues === 6 ? (
              <div>
                <div className="font-semibold text-lg sm:text-xl">
                  Your Portfolio is live
                </div>
                <div className="py-1 text-light-gray">
                  It's great that you have filled all the sections, but if you
                  fill the sections with at least 2 rows it makes your portfolio
                  look more structured and polished to recruiters
                </div>
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <SuccessBadge title="About Me" />
                  <SuccessBadge title="Education" />
                  <SuccessBadge title="Skills" />
                  <SuccessBadge title="Experience" />
                  <SuccessBadge title="Achivements" />
                  <SuccessBadge title="Socials" />
                </div>
                <div className="pt-12">
                  <div className="font-semibold text-lg sm:text-xl">
                    Here is your Porfolio Like
                  </div>
                  <div className="py-1 text-light-gray">
                    You can now copy the link share it with your friends or
                    recruiter
                  </div>
                  <div className="pt-2 flex gap-6">
                    <CustomButton bg="bg-primary text-white px-4 hover:bg-secondary hover:text-white">
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/user/${user?.id}`}
                      >
                        <div className="flex items-center gap-2">
                          Go Live
                          <ArrowUpRight />
                        </div>
                      </Link>
                    </CustomButton>
                    <CustomButton bg="bg-primary1 text-white px-4 hover:bg-secondary1 hover:text-white">
                      <div className="flex items-center gap-2">
                        Copy Link
                        <Save />
                      </div>
                    </CustomButton>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="font-semibold text-lg sm:text-xl">
                  Your Portfolio is live
                </div>
                <div className="py-1 text-light-gray">
                  Please fill all the sections with at least two rows it will
                  make your portfolio look more structured and polished to
                  recruiters
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  {portfolio?.aboutMe && portfolio.aboutMe !== "" ? (
                    <SuccessBadge title="About Me" />
                  ) : (
                    <FailedBadge title="About Me" />
                  )}
                  {portfolio.education && portfolio.education.length !== 0 ? (
                    <SuccessBadge title="Education" />
                  ) : (
                    <FailedBadge title="Education" />
                  )}
                  {portfolio.skill && portfolio.skill.length !== 0 ? (
                    <SuccessBadge title="Skills" />
                  ) : (
                    <FailedBadge title="Skills" />
                  )}
                  {portfolio.workExperience &&
                  portfolio.workExperience.length !== 0 ? (
                    <SuccessBadge title="Experience" />
                  ) : (
                    <FailedBadge title="Experience" />
                  )}
                  {portfolio.stats && portfolio.stats.length !== 0 ? (
                    <SuccessBadge title="Achivements" />
                  ) : (
                    <FailedBadge title="Achivements" />
                  )}
                  {portfolio.link && portfolio.link.length !== 0 ? (
                    <SuccessBadge title="Socials" />
                  ) : (
                    <FailedBadge title="Socials" />
                  )}
                </div>
                <div className="pt-12">
                  <div className="font-semibold text-lg sm:text-xl">
                    Here is your Porfolio Website
                  </div>
                  <div className="py-1 text-light-gray">
                    You can now copy the link share it with your friends or
                    recruiter
                  </div>
                  <div className="pt-2 flex gap-6">
                    <CustomButton bg="bg-primary text-white px-4 hover:bg-secondary hover:text-white">
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/user/${user?.id}`}
                      >
                        <div className="flex items-center gap-2">
                          Go Live
                          <ArrowUpRight />
                        </div>
                      </Link>
                    </CustomButton>
                    <CustomButton bg="bg-primary1 text-white px-4 hover:bg-secondary1 hover:text-white">
                      <div className="flex items-center gap-2">
                        Copy Link
                        <Save />
                      </div>
                    </CustomButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
