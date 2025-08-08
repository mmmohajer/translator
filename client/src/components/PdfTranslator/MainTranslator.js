import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import cx from "classnames";

import SectionContainer from "../wrappers/SectionContainer";
import Div from "@/baseComponents/reusableComponents/Div";
import DragDropFileUploader from "@/baseComponents/formComponents/DragDropFileUploader";
import Button from "@/baseComponents/reusableComponents/Button";
import DivConvertTextToHtml from "@/baseComponents/reusableComponents/DivConvertTextToHtml";
import Pagination from "@/baseComponents/reusableComponents/Pagination";
import ProgressBar from "@/baseComponents/reusableComponents/ProgressBar";
import FileProcessLoading from "@/baseComponents/reusableComponents/FileProcessLoading";
import Icon from "@/baseComponents/reusableComponents/Icon";

import useWebSocket from "@/hooks/useWebSocket";
import { WEBSOCKET_PDF_TRANSLATOR_API_ROUTE } from "@/constants/apiRoutes";

import {
  isFileReadyToSend,
  sendFileOverSocket,
  handleWebSocketMessage,
  getStatusTitleMap,
} from "./utils";

const PdfTranslator = () => {
  const dispatch = useDispatch();

  const [isFileReady, setIsFileReady] = useState(false);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("waiting_for_file");
  const [translatdHtml, setTranslatdHtml] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPageToProcess, setCurrentPageToProcess] = useState(1);
  const [textDirection, setTextDirection] = useState("ltr");

  // ------------------------------------------------
  // WebSocket connection
  // ------------------------------------------------
  const [sendReq, setSendReq] = useState(false);
  const { socketRef, send: sendMessage } = useWebSocket({
    sendReq,
    setSendReq,
    url: WEBSOCKET_PDF_TRANSLATOR_API_ROUTE,
    onMessage: (event) => {
      handleWebSocketMessage(
        event,
        setTranslatdHtml,
        setStatus,
        setTotalPages,
        setCurrentPageToProcess
      );
    },
  });
  useEffect(() => {
    setSendReq(true);
  }, []);
  // ------------------------------------------------
  // WebSocket connection established
  // ------------------------------------------------

  useEffect(() => {
    isFileReadyToSend(dispatch, file, setIsFileReady);
  }, [file, dispatch]);

  return (
    <>
      <FileProcessLoading
        isLoading={["file_sent", "received", "uploaded"].includes(status)}
        title={getStatusTitleMap(status)}
      />
      <SectionContainer hasTopSpace>
        <Div
          type="flex"
          direction="vertical"
          hAlign="center"
          className="width-per-100 max-width-px-800 m-l-auto m-r-auto"
        >
          {status === "waiting_for_file" ? (
            <>
              <Div className="width-per-100">
                <DragDropFileUploader
                  file={file}
                  setFile={setFile}
                  acceptableFileType=".pdf"
                  acceptableFileString=".pdf"
                  inputId={"passbook-input"}
                  iconType={"upload"}
                />
              </Div>
              <Div className="">
                <Button
                  className={"width-px-300 m-t-32"}
                  btnText={"Upload File"}
                  onClick={() =>
                    sendFileOverSocket(
                      dispatch,
                      file,
                      socketRef,
                      sendMessage,
                      setStatus
                    )
                  }
                  disabled={!isFileReady}
                />
              </Div>
            </>
          ) : null}
          {status !== "waiting_for_file" ? (
            <>
              {totalPages && status !== "completed" ? (
                <ProgressBar
                  current_page_to_process={currentPageToProcess}
                  total_pages={totalPages}
                />
              ) : null}
              <Div className="m-t-32">
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  numberOfTotalPages={totalPages}
                />
              </Div>
              {translatdHtml?.[currentPage] ? (
                <Div
                  className={cx(
                    "width-prer-100 max-width-px-800 m-l-auto m-r-auto br-all-solid-2 br-rad-px-10 m-t-32 of-hidden",
                    textDirection === "ltr"
                      ? "blog-detail-page-ltr"
                      : "blog-detail-page-rtl"
                  )}
                >
                  <Div className="bg-silver p-all-16 width-per-100">
                    <Div
                      type="flex"
                      hAlign="center"
                      vAlign="center"
                      className={cx(
                        "width-px-20 height-px-20 global-transition-one mouse-hand",
                        textDirection === "rtl" ? "global-rotate-180" : ""
                      )}
                      onClick={() => {
                        setTextDirection(
                          textDirection === "ltr" ? "rtl" : "ltr"
                        );
                      }}
                    >
                      <Icon type="arrow-right" />
                    </Div>
                  </Div>
                  <DivConvertTextToHtml
                    className="p-all-16"
                    text={translatdHtml?.[currentPage]}
                  />
                </Div>
              ) : null}
            </>
          ) : null}
        </Div>
      </SectionContainer>
    </>
  );
};

export default PdfTranslator;
