import { skillSchema } from "@repo/schema";
import { z } from "zod";

const SkillSection = ({ data }: { data: z.infer<typeof skillSchema>[] }) => {
  return (
    <div className="">
      <div className="text-3xl py-2 font-medium font-sec">Skills</div>
      <p className="pb-8 px-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet placeat
        ratione corporis asperiores.
      </p>
      <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-10">
        {data.map((skill, index) => (
          <div
            key={index}
            className="border-1 relative border-[#D7C0AE] px-5 py-20 h-[240px] w-[240px] flex flex-col gap-1"
          >
            <div className="text-2xl font-medium font-sec leading-10">
              {skill.title}
            </div>
            <div className="font-light">
              {" "}
              <span className="font-medium">Skills - </span> {skill.skills}
            </div>
            <div className="absolute top-3 left-3 text-base font-medium">
              {index}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSection;
