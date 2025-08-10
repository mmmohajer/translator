import { addNewAlertItem } from "@/utils/alert";

export const isFileReadyToSend = (dispatch, file, setIsFileReady) => {
  if (!file) {
    setIsFileReady(false);
    return;
  }
  let fileToCheck = file;
  if (file instanceof FileList) {
    fileToCheck = file.length > 0 ? file[0] : null;
  } else if (Array.isArray(file)) {
    fileToCheck = file[0];
  } else if (file && file.file) {
    fileToCheck = file.file;
  }
  if (
    fileToCheck &&
    fileToCheck.type === "application/pdf" &&
    fileToCheck.size < 50 * 1024 * 1024 // 50MB limit example
  ) {
    setIsFileReady(true);
  } else {
    setIsFileReady(false);
    if (fileToCheck) {
      addNewAlertItem(
        dispatch,
        "error",
        "File must be a PDF and less than 50MB."
      );
    }
  }
};
