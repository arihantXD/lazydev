import { statSchema } from "@repo/schema";
import { z } from "zod";

const StatsSection = ({ data }: { data: z.infer<typeof statSchema>[] }) => {
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="text-3xl font-medium py-2 font-sec">My Achivements</div>
      <p className="pb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, amet!
      </p>
      <div className="py-4 flex items-center flex-col sm:flex-row gap-8">
        {data.map((stats, index) => (
          <div key={index} className="">
            <div className="text-xl  font-semibold">{stats.title}</div>
            <div className="pt-y text-dark-gray">{stats.about}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
