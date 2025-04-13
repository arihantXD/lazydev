import Link from "next/link";
import Navbar from "./components/custom/Navbar";
import CustomButton from "./components/custom/CustomButton";
import { Flame, Link2, SearchCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-[1000px] mx-auto">
      <Navbar
        firstArg="Sign Up"
        firstRoute="/register"
        secondArg="Login"
        secondRoute="/login"
        thirdArg="Support"
        thirdRoute="/"
      />
      <div className="text-center pt-20 sm:pt-32 px-4">
        <div>
          <div className="text-3xl sm:text-5xl font-semibold py-2  sm:py-3">
            Don't be a Lazy Developer
          </div>
          <div className="text-light-gray sm:text-xl max-w-[900px] mx-auto">
            Create your online portfolio with LazyDevs just in 5 minutes and
            increase you chances of getting hired by 100 %
          </div>
        </div>
        <div className="py-6 flex gap-4 sm:py-8 justify-center">
          <Link href={"/register"}>
            <CustomButton bg="bg-primary text-white px-4 hover:bg-secondary hover:text-white">
              <div>Show Perview</div>
            </CustomButton>
          </Link>
          <Link href={"/register"}>
            <CustomButton bg="bg-primary1 text-white px-4 hover:bg-secondary1 hover:text-white">
              Get Started
            </CustomButton>
          </Link>
        </div>
        <div className="pt-16">
          <div className="text-xl sm:text-2xl font-semibold text-primary">
            Beautiful portfolio in minutes
          </div>
          <p className="pb-8 text-light-gray max-w-[700px] mx-auto pt-2">
            Creating a portfolio now super easy just fill up forms the forms
            with your details and get a shareable live portfolio link
          </p>
          <div className="border-1 rounded">
            <img
              className="hidden sm:block rounded"
              src="/DesktopView.png"
              alt="preview of website"
            />
            <img
              className="sm:hidden block rounded"
              src="/MobileView.png"
              alt="preview of website"
            />
          </div>
        </div>
        <div className="pt-14 sm:pt-16">
          <div className="text-xl sm:text-2xl font-semibold text-primary">
            Our features
          </div>
          <p className="pb-8 text-light-gray max-w-[700px] mx-auto pt-2">
            With our " Trust Me Bro " sources we found that, an online portfolio
            makes better impression on recruiter as compared to no portfolio
          </p>
          <div className=" pt-4 flex flex-col [&>div]:max-w-[250px] [&>div]:sm:max-w-full sm:flex-row gap-12 items-center justify-between max-w-[900px] ">
            <div className="flex flex-col items-center gap-2">
              <Flame className="text-secondary1" />
              <div>Seo friendly portfolio created with top end technology</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <SearchCheck className="text-secondary1" />
              <div>
                We highlight your every required detail to the recruiter
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Link2 className="text-secondary1" />
              <div>Get an instant sharable link to share with the world</div>
            </div>
          </div>
        </div>
        <div className="pt-10 pb-2 sm:pt-20">
          All rights reserved @LazyDev 2025
        </div>
      </div>
    </div>
  );
}
