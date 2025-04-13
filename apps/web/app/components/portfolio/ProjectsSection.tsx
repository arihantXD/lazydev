import dateFormatter from "@/util/dateFormatter";
import { experienceSchema, Type } from "@repo/schema";
import Link from "next/link";
import { z } from "zod";

const ProjectSection = ({
  data,
}: {
  data: z.infer<typeof experienceSchema>[];
}) => {
  const expData = data.filter((exp) => exp.type === Type.Personal);

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="text-3xl font-medium py-2 font-sec">
        Personal Projects
      </div>
      <p className="pb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, amet!
      </p>
      <div className="flex flex-col">
        {expData.map(
          (experience, index) =>
            experience.type === Type.Personal && (
              <div
                key={index}
                className={` ${index + 1 !== expData.length ? "border-b-2 py-8" : "pt-8"}  text-start`}
              >
                <div className="flex flex-col items-start font-semibold ">
                  <div className="text-2xl">{experience.companyName}</div>
                  <div className="py-3">
                    {dateFormatter(experience.from)} -{" "}
                    {dateFormatter(experience.to)}
                  </div>
                </div>
                <div className="py-1">
                  <div className="font-semibold">About</div>
                  <div className="pt-2 text-dark-gray text-start">
                    - {experience.about}
                  </div>
                </div>
                <div className="pt-4">
                  <div className=" font-semibold">Tasks</div>
                  {experience.tasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className="pt-2 text-dark-gray text-start"
                    >
                      - {task.value}
                    </div>
                  ))}
                </div>

                {(experience.gitHubLink || experience.liveLink) && (
                  <div className="pt-4">
                    <div className=" font-semibold pb-2">Links</div>
                    <div className="flex flex-col gap-1">
                      {experience.gitHubLink && (
                        <Link href={experience.gitHubLink}>- GitHub Link</Link>
                      )}
                      {experience.liveLink && (
                        <Link href={experience.liveLink}>- Live Link</Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ProjectSection;
