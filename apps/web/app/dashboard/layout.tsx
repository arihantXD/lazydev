import Navbar from "@/components/custom/Navbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar
        firstArg="Update Portfolio"
        firstRoute="/portfolio"
        thirdArg="Support"
        thirdRoute="/portfolio"
        secondArg="Logout"
        secondRoute="/logout"
      />
      {children}
    </div>
  );
};

export default layout;
