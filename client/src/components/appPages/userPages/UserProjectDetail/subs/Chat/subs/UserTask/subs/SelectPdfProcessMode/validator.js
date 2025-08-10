import { addNewAlertItem } from "@/utils/alert";

export const validateData = (dispatch, selectedOption) => {
  if (!["all", "specific"].includes(selectedOption)) {
    addNewAlertItem(
      dispatch,
      "error",
      "Invalid selection. Please choose a valid PDF process mode."
    );
    return false;
  }
  return true;
};
