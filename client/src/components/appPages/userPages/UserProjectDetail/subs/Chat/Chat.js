import { useEffect, useState, useRef } from "react";
import cx from "classnames";

import Div from "@/baseComponents/reusableComponents/Div";
import Button from "@/baseComponents/reusableComponents/Button";
import ChatLoader from "@/baseComponents/reusableComponents/ChatLoader";
import Accordion from "@/baseComponents/reusableComponents/Accordion";

import useWebSocket from "@/hooks/useWebSocket";
import { WEBSOCKET_CHAT_BOT_API_ROUTE } from "@/constants/apiRoutes";
import { getLocalStorage } from "@/utils/storage";

import UserTask from "./subs/UserTask";
import { handleWebSocketMessage } from "./utils";

const Chat = ({ uuid }) => {
  const messagesContainerRef = useRef();

  const [token, setToken] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [userTask, setUserTask] = useState("");

  const [fileKey, setFileKey] = useState("");
  const [pdfProcessMode, setPdfProcessMode] = useState("");

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
    if (userTask?.length) {
      setTimeout(() => {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }, 300);
    }
  }, [messagesContainerRef, chatMessages, userTask]);
  // ------------------------------------------------
  // WebSocket setup Begin
  // ------------------------------------------------
  const [sendReq, setSendReq] = useState(false);
  const { socketRef, send: sendData } = useWebSocket({
    sendReq,
    setSendReq,
    url: `${WEBSOCKET_CHAT_BOT_API_ROUTE}?token=${token}`,
    onMessage: (event) => {
      handleWebSocketMessage(
        event,
        uuid,
        sendData,
        setShowLoader,
        setSocketConnected,
        setChatMessages,
        setUserTask
      );
    },
  });
  useEffect(() => {
    const token = getLocalStorage("access_token");
    if (token) {
      setToken(token);
    }
  }, []);
  useEffect(() => {
    if (token) {
      setSendReq(true);
    }
  }, [token]);
  // ------------------------------------------------
  // WebSocket setup End
  // ------------------------------------------------
  useEffect(() => {
    if (fileKey) {
      sendData({
        task: "send_pdf_link",
      });
      setShowLoader(true);
    }
  }, [fileKey]);

  useEffect(() => {
    if (pdfProcessMode) {
      sendData({
        task: "find_pdf_pages_to_process",
        pdf_process_mode: pdfProcessMode,
      });
      setShowLoader(true);
    }
  }, [pdfProcessMode]);

  return (
    <>
      <Div
        type="flex"
        direction="vertical"
        className="width-per-100 height-vh-full p-all-32 of-hidden"
      >
        <Div
          type="flex"
          direction="vertical"
          distributedBetween
          className="width-per-100 flex--grow--1 bg-white br-all-solid-2 br-rad-px-10 global-box-shadow-type-one bg-white of-hidden"
        >
          <Div
            ref={(el) => (messagesContainerRef.current = el)}
            className="bg-white flex--grow--1 of-y-auto p-all-16"
          >
            {chatMessages?.map((message, idx) => (
              <Div key={idx}>
                {message?.type === "bot" ? (
                  <Div type="flex" hAlign="start" className="width-per-100">
                    <Div className="bg-silver p-all-16 global-box-shadow-type-one max-width-per-90 m-b-16 br-rad-px-10 f-s-px-14">
                      {message.message}
                    </Div>
                  </Div>
                ) : (
                  <Div type="flex" hAlign="start" className="width-per-100">
                    <Div className="bg-yellow global-box-shadow-type-one p-all-16 max-width-per-90 m-b-16 br-rad-px-10 f-s-px-14">
                      {message.message}
                    </Div>
                  </Div>
                )}
              </Div>
            ))}
            {showLoader ? <ChatLoader /> : null}
          </Div>

          <Accordion isActive={userTask?.length} className="flex--shrink--0">
            <UserTask
              userTask={userTask}
              uuid={uuid}
              setFileKey={setFileKey}
              setPdfProcessMode={setPdfProcessMode}
            />
          </Accordion>

          {/* <Div
            type="flex"
            vAlign="center"
            className={cx(
              "height-px-100 br-top-solid-2 width-per-100 p-all-16",
              isUserTurn ? "bg-white" : "bg-olive"
            )}
          >
            <Div className="flex--grow--1 m-r-16"></Div>
            <Div type="flex" vAlign="end" className="height-px-80">
              <Button
                btnText="Send"
                className="width-px-150"
                disabled={!isUserTurn}
              />
            </Div>
          </Div> */}
        </Div>
      </Div>
    </>
  );
};

export default Chat;
