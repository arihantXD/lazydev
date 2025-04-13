import { toast } from "sonner";

const SuccessToast = (event: string) =>
  toast.success(event, {
    style: {
      border: "1px solid #ffb22c",
    },
  });

export default SuccessToast;
