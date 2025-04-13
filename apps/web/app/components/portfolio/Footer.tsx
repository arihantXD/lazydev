import { linkSchema } from "@repo/schema";
import { z } from "zod";
import Work from "../icons/Work";

const Footer = ({
  email,
  phoneNumber,
  link,
  firstName,
  lastName,
}: {
  email: string;
  phoneNumber: string;
  link: z.infer<typeof linkSchema>[];
  firstName: string;
  lastName: string;
}) => {
  return (
    <div className="pt-36 pb-5 text-start">
      <div className="flex justify-between  items-center  ">
        <div className="">
          <div className="font-sec text-lg font-medium">
            {firstName} {lastName}
          </div>
          <div className="">
            <div>{email}</div>
            <div>{phoneNumber}</div>
          </div>
        </div>
        <div className=" hidden sm:block">
          <div className="underline">Dashboard</div>
          <div className="underline">Contact Dev</div>
          <div className="underline">LazyDev</div>
        </div>
        <div className="text-end">
          <div className="pt-2 flex gap-2 justify-end">
            <Work />
            <Work />
            <Work />
          </div>
          <div className="underline">Home</div>
          <div className="underline">Go to Top</div>
        </div>
      </div>
      <div className="text-center pt-4">
        This website is Powered By{" "}
        <span className="font-semibold"> LazyDev</span>
      </div>
    </div>
  );
};

export default Footer;
