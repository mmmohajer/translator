import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Div from "@/baseComponents/reusableComponents/Div";
import RadioButton from "@/baseComponents/formComponents/RadioButton";
import Button from "@/baseComponents/reusableComponents/Button";

import useApiCalls from "@/hooks/useApiCalls";
import { PDF_PROJECT_DETAIL_API_ROUTE } from "@/constants/apiRoutes";

import { validateData } from "./validator";

const SelectPdfProcessMode = ({ uuid, setPdfProcessMode }) => {
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState("");

  // -------------------------------------------------
  // Select PDF Process Mode API Call Begin
  // -------------------------------------------------
  const [sendReq, setSendReq] = useState(false);
  const { data, status } = useApiCalls({
    method: "PUT",
    url: `${PDF_PROJECT_DETAIL_API_ROUTE}${uuid}/`,
    bodyData: { pdf_process_mode: selectedOption },
    sendReq,
    setSendReq,
    showLoading: true,
    showErrerMessage: true,
  });
  useEffect(() => {
    if (data?.pdf_process_mode) {
      if (["all", "specific"].includes(data.pdf_process_mode)) {
        setPdfProcessMode(data.pdf_process_mode);
      }
    }
  }, [data]);
  // -------------------------------------------------
  // Select PDF Process Mode API Call End
  // -------------------------------------------------

  return (
    <>
      <Div className="width-per-100 bg-green text-white br-all-solid-1 br-rad-px-10 p-all-16 height-px-200 of-hidden">
        <Div>
          <RadioButton
            listOfOptions={[
              { value: "all", label: "Process the entire PDF file." },
              {
                value: "specific",
                label: "Process only specific pages of the PDF file.",
              },
            ]}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
          />
        </Div>
        <Div className="m-t-16">
          <Button
            className={"width-px-250"}
            btnText={"Submit"}
            disabled={!selectedOption}
            onClick={() => {
              if (validateData(dispatch, selectedOption)) {
                setSendReq(true);
              }
            }}
          />
        </Div>
      </Div>
    </>
  );
};

export default SelectPdfProcessMode;
