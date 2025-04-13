import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { btnType } from "@/types/btnTypes";
import { ButtonHTMLAttributes, ReactNode } from "react";

const ToolTip = ({
  icon,
  text,
  type,
  onSubmit,
  onClick,
  btnLoading,
}: {
  icon: ReactNode;
  text: string;
  type?: string;
  onSubmit?: ButtonHTMLAttributes<HTMLButtonElement>["onSubmit"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onSubmit"];
  btnLoading?: boolean;
}) => {
  const validType =
    type === btnType.Button || type === btnType.Submit ? type : "button";

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={btnLoading ? true : false}
              onSubmit={onSubmit}
              size={"sm"}
              type={validType}
              onClick={onClick}
              className=""
              variant="outline"
            >
              {!btnLoading && icon}
              {btnLoading && <span className="text-xs">Saving...</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>{text}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ToolTip;
