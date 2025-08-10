import { addNewAlertItem } from "@/utils/alert";

export const validateData = (dispatch, projectName, projectType) => {
  if (!projectName) {
    addNewAlertItem(dispatch, "error", "Project name is required.");
    return false;
  }
  if (!projectType) {
    addNewAlertItem(dispatch, "error", "Project type is required.");
    return false;
  }
  return true;
};
