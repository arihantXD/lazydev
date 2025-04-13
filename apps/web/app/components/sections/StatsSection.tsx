import Logo from "../custom/Logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useEffect, useState } from "react";
import { z } from "zod";
import { statSchema } from "@repo/schema";
import StatsForm from "../custom/StatsForm";
import CustomButton from "../custom/CustomButton";
import LeftArrow from "../icons/LeftArrow";
import RightArrow from "../icons/RightArrow";
import { useCustomContext } from "@/context/MyContext";
import { useRouter } from "next/navigation";
import axoisInstance from "@/util/axiosInstance";
import SuccessToast from "../custom/SuccessToast";
import FailedToast from "../custom/FailedToast";

const StatsSection = () => {
  const { setCurrentPage } = useCustomContext();
  const [loading, setLoading] = useState(true);
  const [statsList, setStatsList] = useState<z.infer<typeof statSchema>[]>([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const { user } = useCustomContext();
  const router = useRouter();

  if (!user) router.push("/login");

  const addSkill = () => {
    setStatsList((prev) => [
      ...prev,
      {
        about: "",
        index: 0,
        title: "",
        userId: user?.id as number,
      },
    ]);
    SuccessToast("Let's see what you fill in there");
  };

  const saveStats = async (data: z.infer<typeof statSchema>) => {
    try {
      setBtnLoading(true);
      const response = await axoisInstance.post(`/portfolio/stats`, data);
      const updatedList = statsList;
      updatedList[data.index] = response.data.data;
      setStatsList(updatedList);
      setBtnLoading(false);
      SuccessToast("Literally!!! you are saving this ?");
    } catch (error: any) {
      setBtnLoading(false);
      FailedToast(
        error?.response?.data?.message || "Internal server error try again."
      );
    }
  };

  const deleteStats = async (stats: z.infer<typeof statSchema>) => {
    try {
      if (stats.id || stats.id === 0) {
        await axoisInstance.delete(`/portfolio/stats/${stats.id}`);
        SuccessToast("Deleting might be your next achivement haan");
      }
      setStatsList((prev) => prev.filter((value) => value !== stats));
    } catch (error: any) {
      FailedToast(
        error?.response?.data?.message || "Internal server error try again."
      );
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await axoisInstance.get(`/portfolio/stats/${user?.id}`);
      if (data.length == 0) data.push({ userId: user?.id });
      setStatsList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading)
    return <div className="font-semibold text-xl text-center">Loading...</div>;

  return (
    <div className="shadow-sm rounded-2xl px-4 py-8">
      <Logo />
      <div className="py-8">
        <span className="text-lg text-center font-semibold">
          Fill your Awards / Achivements
        </span>
        <span className="text-sm text-light-gray block pt-1">
          Tell us about any awards that you have recieved, even if it's a small
          one it matters
        </span>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {statsList &&
          statsList.map((item, index) => (
            <div key={index}>
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger>
                  {item.title && item.title}
                  {!item.title && `Skill - ${index + 1}`}
                </AccordionTrigger>
                <AccordionContent>
                  <StatsForm
                    data={item}
                    addStats={addSkill}
                    saveStats={saveStats}
                    deleteStats={deleteStats}
                    statsList={statsList}
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

export default StatsSection;
