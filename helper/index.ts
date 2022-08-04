import { useSnackbar } from "notistack";

function UseHelper() {
  const { enqueueSnackbar } = useSnackbar();
  function HandleSuccessPopup(message: string) {
    return enqueueSnackbar(message, {
      variant: "success",
    });
  }
  function HandleErrorPopup(message: string) {
    return enqueueSnackbar(message, {
      variant: "error",
    });
  }

  return { HandleSuccessPopup, HandleErrorPopup };
}

export default UseHelper;
