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

export const sendFileOverSocket = (
  dispatch,
  file,
  socketRef,
  sendMessage,
  setStatus
) => {
  let fileToSend = file;
  if (file instanceof FileList) {
    fileToSend = file.length > 0 ? file[0] : null;
  } else if (Array.isArray(file)) {
    fileToSend = file[0];
  } else if (file && file.file) {
    fileToSend = file.file;
  }
  if (!(fileToSend instanceof Blob)) {
    addNewAlertItem(dispatch, "error", "Selected item is not a file.");
    return;
  }
  if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
    const reader = new FileReader();
    reader.onload = (e) => {
      sendMessage(e.target.result);
      setStatus("file_sent");
    };
    reader.readAsArrayBuffer(fileToSend);
  } else {
    console.error("WebSocket is not connected.");
    addNewAlertItem(
      dispatch,
      "error",
      "WebSocket is not connected, please reload the page."
    );
  }
};

export const handleWebSocketMessage = (
  event,
  setTranslatdHtml,
  setStatus,
  setTotalPages,
  setCurrentPageToProcess,
  setTotalCost
) => {
  const data = JSON.parse(event?.data);
  if (data?.file_status) {
    setStatus(data.file_status);
  }
  if (data?.number_of_pdf_total_pages) {
    setTotalPages(data.number_of_pdf_total_pages);
  }
  if (data?.cost) {
    setTotalCost((prev) => prev + data.cost);
  }
  if (data?.page) {
    setCurrentPageToProcess(data.page);
  }
  if (data?.page && data?.translated_html) {
    setTranslatdHtml((prev) => ({
      ...prev,
      [data.page]: (prev[data.page] || "") + data.translated_html,
    }));
  }
};

export const getStatusTitleMap = (status) => {
  const statusTitleMap = {
    waiting_for_file: "Waiting for file",
    file_sent: "File sent",
    received: "File received",
    uploaded: "File uploaded",
    processing: "Processing file",
    completed: "File processing completed",
    error: "Error occurred",
  };
  return statusTitleMap[status] || "Unknown status";
};
