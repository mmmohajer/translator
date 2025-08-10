const waitAfterResponse = (func) => {
  setTimeout(() => {
    func();
  }, 1000);
};

const handleProjectType = (sendData, projectType, uuid) => {
  if (projectType === "process_pdf") {
    sendData({
      task: "find_pdf_file",
    });
    return "translation";
  }
};

export const handleWebSocketMessage = (
  event,
  uuid,
  sendData,
  setShowLoader,
  setSocketConnected,
  setChatMessages,
  setUserTask
) => {
  const data = JSON.parse(event?.data);
  console.log("WebSocket message received:", data);

  if (data?.remove_loader) {
    waitAfterResponse(() => setShowLoader(false));
  }
  if (data?.connection) {
    waitAfterResponse(() => {
      setSocketConnected(true);
      setShowLoader(true);
      sendData({
        task: "find_project_details",
        uuid,
      });
    });
  }
  if (data?.disconnection) {
    waitAfterResponse(() => setSocketConnected(false));
  }

  if (data?.bot_message) {
    waitAfterResponse(() =>
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", message: data.bot_message },
      ])
    );
  }

  if (data?.user_message) {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", message: data.user_message },
    ]);
  }

  if (data?.project_type) {
    waitAfterResponse(() => {
      setShowLoader(true);
      handleProjectType(sendData, data.project_type, uuid);
    });
  }

  if (data?.user_task) {
    waitAfterResponse(() => setUserTask(data.user_task));
  }

  if (data?.disconnection) {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "bot",
        message: "The connection has been lost. Please try reconnecting.",
      },
    ]);
  }
};
