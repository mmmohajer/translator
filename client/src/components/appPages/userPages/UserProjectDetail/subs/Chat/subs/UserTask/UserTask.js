import Div from "@/baseComponents/reusableComponents/Div";

import UploadPdf from "./subs/UploadPdf";
import SelectPdfProcessMode from "./subs/SelectPdfProcessMode";
import SelectPagesToProcess from "./subs/SelectPagesToProcess";

const UserTask = ({ userTask, ...props }) => {
  return (
    <>
      {userTask === "upload_pdf" ? (
        <UploadPdf uuid={props.uuid} setFileKey={props.setFileKey} />
      ) : null}
      {userTask === "select_pdf_process_mode" ? (
        <SelectPdfProcessMode
          uuid={props.uuid}
          setPdfProcessMode={props.setPdfProcessMode}
        />
      ) : null}
      {userTask === "select_pages_to_process" ? (
        <SelectPagesToProcess uuid={props.uuid} />
      ) : null}
    </>
  );
};

export default UserTask;
