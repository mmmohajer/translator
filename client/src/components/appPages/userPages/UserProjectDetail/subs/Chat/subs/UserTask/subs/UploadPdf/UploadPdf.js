import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Div from "@/baseComponents/reusableComponents/Div";
import DragDropFileUploader from "@/baseComponents/formComponents/DragDropFileUploader";
import Button from "@/baseComponents/reusableComponents/Button";

import useApiCalls from "@/hooks/useApiCalls";
import { PDF_PROJECT_DETAIL_API_ROUTE } from "@/constants/apiRoutes";

import { isFileReadyToSend } from "./utils";

const UploadPdf = ({ uuid, setFileKey }) => {
  const dispatch = useDispatch();

  const [isFileReady, setIsFileReady] = useState(false);
  const [file, setFile] = useState(null);
  const [bodyData, setBodyData] = useState({});

  useEffect(() => {
    isFileReadyToSend(dispatch, file, setIsFileReady);
  }, [file, dispatch]);

  // -------------------------------------------------
  // Upload PDF to Project Begin
  // -------------------------------------------------
  const [sendReq, setSendReq] = useState(false);
  const { data, status } = useApiCalls({
    method: "POST",
    url: `${PDF_PROJECT_DETAIL_API_ROUTE}${uuid}/`,
    bodyData,
    sendReq,
    setSendReq,
    showLoading: true,
    showErrerMessage: true,
  });
  useEffect(() => {
    if (bodyData && bodyData.has && bodyData.has("pdf_file")) {
      setSendReq(true);
    }
  }, [bodyData]);
  useEffect(() => {
    if (data?.file_key) {
      setFileKey(data.file_key);
    }
  }, [data]);
  // -------------------------------------------------
  // Upload PDF to Project End
  // -------------------------------------------------

  return (
    <>
      <Div className="width-per-100 bg-green br-all-solid-1 br-rad-px-10 p-all-16 height-px-300">
        <Div>
          <DragDropFileUploader
            file={file}
            setFile={setFile}
            acceptableFileType=".pdf"
            acceptableFileString=".pdf"
            inputId={"chat-upload-input"}
            iconType={"upload"}
          />
        </Div>
        <Div className="m-t-16">
          <Button
            className={"width-px-200"}
            btnText={"Upload File"}
            onClick={() => {
              let singleFile = file;
              if (file && file.length && file[0] instanceof File) {
                singleFile = file[0];
              }
              const formData = new FormData();
              formData.append("pdf_file", singleFile);
              setBodyData(formData);
            }}
            disabled={!isFileReady}
          />
        </Div>
      </Div>
    </>
  );
};

export default UploadPdf;
