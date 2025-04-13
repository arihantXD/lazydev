import { toast } from "sonner";

const FailedToast = (event: string) =>
  toast.error(event, {
    style: {
      border: "1px solid #f72c5b",
    },
  });

export default FailedToast;
