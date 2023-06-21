import { Theme, ToastPosition, toast } from "react-toastify";

export const getErrorMessage = (error: any) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    "message" in error?.data
  )
    return error.data.message;
  return String(error);
};

export const createToast = ({
  error,
  type = "error",
  position = "top-center",
  theme = "dark",
}: {
  error: unknown;
  type: "error" | "default";
  position?: ToastPosition;
  theme?: Theme;
}) => {
  switch (type) {
    case "error":
      toast.error(getErrorMessage(error), {
        position,
        theme,
      });
      break;
    case "default":
      toast(getErrorMessage(error), {
        position,
        theme,
      });
      break;
    default:
      toast(getErrorMessage(error), {
        position,
        theme,
      });
  }
};
