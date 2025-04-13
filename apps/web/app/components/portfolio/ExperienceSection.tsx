import dateFormatter from "@/util/dateFormatter";
import { experienceSchema, Type } from "@repo/schema";
import { z } from "zod";

const ExperienceSection = ({
  data,
}: {
  data: z.infer<typeof experienceSchema>[];
}) => {
  const expData = data.filter((exp) => exp.type === Type.Professional);
  return (
    <div className="max-w-[800px] mx-auto ">
      <div className="text-3xl font-medium py-2 font-sec">Work Experience</div>
      <p className="pb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
        recusandae?
      </p>
      <div className="flex flex-col">
        {expData.map((experience, index) => (
          <div
            key={index}
            className={` ${index + 1 !== expData.length ? "border-b-2 py-8" : "pt-8"} text-start flex flex-col `}
          >
            <div className="text-2xl font-semibold">{experience.role}</div>
            <div className="flex justify-between font-semibold py-3">
              <div>{experience.companyName}</div>
              <div>
                {dateFormatter(experience.from)} -{" "}
                {dateFormatter(experience.to)}{" "}
              </div>
            </div>
            <div>
              <div className="pt-2">
                <div className="font-semibold">Tasks</div>
                {experience.tasks.map((task, taskIndex) => (
                  <div
                    key={taskIndex}
                    className="pt-2 text-dark-gray text-start"
                  >
                    - {task.value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
