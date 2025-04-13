import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "../ui/button";
import { btnType } from "@/types/btnTypes";

type CustomButtonProps = {
  bg?: string;
  hoverBg?: string;
  color?: string;
  w?: string;
  onSubmit?: ButtonHTMLAttributes<HTMLButtonElement>["onSubmit"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onSubmit"];
  children: ReactNode;
  btnLoading?: boolean;
  type?: string;
};

const CustomButton = ({
  bg,
  hoverBg,
  color,
  onSubmit,
  onClick,
  w,
  children,
  type,
  btnLoading,
}: CustomButtonProps) => {
  const validType =
    type === btnType.Button || type === btnType.Submit ? type : "button";
  return (
    <>
      <Button
        onClick={onClick}
        disabled={btnLoading ? true : false}
        onSubmit={onSubmit}
        className={`${bg} ${hoverBg} ${color} ${w} transition`}
        type={validType}
        variant="outline"
        size={"sm"}
      >
        {!btnLoading && children}
        {btnLoading && <span className="text-xs">Saving...</span>}
      </Button>
    </>
  );
};

export default CustomButton;
