import Logo from "../custom/Logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useEffect, useState } from "react";
import { z } from "zod";
import { LinkEnum, linkSchema } from "@repo/schema";
import CustomButton from "../custom/CustomButton";
import LeftArrow from "../icons/LeftArrow";
import LinkForm from "../custom/LinkForm";
import { useCustomContext } from "@/context/MyContext";
import { useRouter } from "next/navigation";
import axoisInstance from "@/util/axiosInstance";
import SuccessToast from "../custom/SuccessToast";
import FailedToast from "../custom/FailedToast";
import Link from "next/link";
import RightArrow from "../icons/RightArrow";

const LinkSection = () => {
  const { setCurrentPage } = useCustomContext();
  const [loading, setLoading] = useState(true);
  const [linkList, setLinkList] = useState<z.infer<typeof linkSchema>[]>([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const { user } = useCustomContext();
  const router = useRouter();

  if (!user) router.push("/login");

  const addLink = () => {
    setLinkList((prev) => [
      ...prev,
      {
        title: LinkEnum.GitHub,
        index: 0,
        url: "",
        userId: user?.id as number,
      },
    ]);
    SuccessToast("Lets Go!!! Social Butterfly");
  };

  const saveLink = async (link: z.infer<typeof linkSchema>) => {
    try {
      setBtnLoading(true);
      const { data } = await axoisInstance.post(`/portfolio/link`, link);
      setLinkList((prev) => [...prev.slice(0, -1), data.data]);
      setBtnLoading(false);
      SuccessToast("Added your socials");
    } catch (error: any) {
      setBtnLoading(false);
      FailedToast(
        error?.response?.data?.message || "Internal server error try again."
      );
    }
  };

  const deleteLink = async (stats: z.infer<typeof linkSchema>) => {
    try {
      if (stats.id) {
        await axoisInstance.delete(`/portfolio/link/${stats.id}`);
        SuccessToast("Social network reduced");
      }
      setLinkList((prev) => prev.filter((value) => value !== stats));
    } catch (error: any) {
      FailedToast(
        error?.response?.data?.message || "Internal server error try again."
      );
    }
  };

  const fetchLinks = async () => {
    try {
      const { data } = await axoisInstance.get(`/portfolio/link/${user?.id}`);
      if (data.length == 0) data.push({ userId: user?.id });
      setLinkList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  if (loading)
    return <div className="font-semibold text-xl text-center">Loading...</div>;

  return (
    <div className="shadow-sm rounded-2xl px-4 py-8">
      <Logo />
      <div className="py-8">
        <span className="text-lg text-center font-semibold">
          Your digital footprint
        </span>
        <span className="text-sm text-light-gray block pt-1">
          You should fill all 3 rows here as social links makes it easier for
          recruiters to reach you
        </span>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {linkList &&
          linkList.map((item, index) => (
            <div key={index}>
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger>
                  {item.title && item.title.toUpperCase()}
                  {!item.title && `Link - ${index + 1}`}
                </AccordionTrigger>
                <AccordionContent>
                  <LinkForm
                    data={item}
                    addLink={addLink}
                    saveLink={saveLink}
                    deleteLink={deleteLink}
                    linkList={linkList}
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
        >
          <Link href={"/dashboard"}>
            <div className="flex items-center gap-2">
              Go to dashboard
              <RightArrow />
            </div>
          </Link>
        </CustomButton>
      </div>
    </div>
  );
};

export default LinkSection;
