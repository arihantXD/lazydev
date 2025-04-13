import dateFormatter from "@/util/dateFormatter";
import { educationSchema } from "@repo/schema";
import { z } from "zod";

const EducationSection = ({
  data,
}: {
  data: z.infer<typeof educationSchema>[];
}) => {
  return (
    <div className="max-w-[800px] mx-auto py-2">
      <div className="text-3xl pb-2 font-medium font-sec">Education</div>
      <p className="pb-6 px-2">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque,
        corporis
      </p>
      <div className="flex flex-col ">
        {data.map((education, index) => (
          <div key={index} className="flex flex-col sm:text-start py-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className=" text-2xl sm:w-[70%] font-semibold">
                {education.school}
              </div>
              <div className="px-2">
                Studied at{" "}
                <span className="underline font-semibold">
                  {education.school}
                </span>{" "}
                from{" "}
                <span className="font-semibold">
                  {dateFormatter(education.from)} -{" "}
                  {dateFormatter(education.to)}
                </span>{" "}
                and completed my{" "}
                <span className="font-semibold">{education.course}</span> with
                score of{" "}
                <span className="font-semibold">{education.score}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
