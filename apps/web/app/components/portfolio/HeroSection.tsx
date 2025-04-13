import CustomButton from "../custom/CustomButton";
import Contact from "../icons/Contact";
import Work from "../icons/Work";

const HeroSection = ({
  firstName,
  lastName,
  occupation,
  place,
}: {
  firstName: string;
  occupation: string;
  lastName: string;
  place: string;
}) => {
  return (
    <div className="pt-16 sm:pt-32">
      <p className="text-3xl leading-10 font-semibold sm:text-5xl sm:text-center sm:leading-16">
        Hey! I am {firstName} {lastName},
        <span className="block">A {occupation}</span>
        <span> From {place}.</span>
      </p>
      <div className="pt-5 flex justify-center gap-5 sm:pt-10">
        <CustomButton bg="bg-[#594545] text-white">
          <Work />
          My Work
        </CustomButton>
        <CustomButton>
          <Contact /> Contact Me
        </CustomButton>
      </div>
    </div>
  );
};

export default HeroSection;
