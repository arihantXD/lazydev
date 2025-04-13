const AboutMeSection = ({ data }: { data: string }) => {
  return (
    <div className="">
      <div className="text-3xl py-2 font-medium font-sec">About Me</div>
      <p className="px-2">{data}</p>
    </div>
  );
};

export default AboutMeSection;
