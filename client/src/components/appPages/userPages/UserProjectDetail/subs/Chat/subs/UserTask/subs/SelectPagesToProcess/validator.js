import { addNewAlertItem } from "@/utils/alert";

export const validateData = (dispatch, selectedPages) => {
  const regex = /^(\d+(-\d+)?)(,(\d+(-\d+)?))*$/;
  // Remove trailing comma if present
  const cleaned = selectedPages.replace(/,+$/, "");
  if (!regex.test(cleaned)) {
    addNewAlertItem(
      dispatch,
      "error",
      "Invalid format. Use comma-separated numbers and ranges, e.g. 1,3,5-7."
    );
    return false;
  }
  return true;
};
