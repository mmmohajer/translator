import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Div from "@/baseComponents/reusableComponents/Div";
import TextBox from "@/baseComponents/formComponents/TextBox";
import Button from "@/baseComponents/reusableComponents/Button";

import useApiCalls from "@/hooks/useApiCalls";
import { PDF_PROJECT_DETAIL_API_ROUTE } from "@/constants/apiRoutes";

import { validateData } from "./validator";
import { parsePages } from "./utils";

const SelectPagesToProcess = ({ uuid }) => {
  const dispatch = useDispatch();

  const [selectedPages, setSelectedPages] = useState("");
  const [selectedPagesAsList, setSelectedPagesAsList] = useState([]);

  // -------------------------------------------------
  // Select PDF Pages to Process API Call Begin
  // -------------------------------------------------
  const [sendReq, setSendReq] = useState(false);
  const { data, status } = useApiCalls({
    method: "PUT",
    url: `${PDF_PROJECT_DETAIL_API_ROUTE}${uuid}/`,
    bodyData: { pdf_pages_to_process: selectedPagesAsList },
    sendReq,
    setSendReq,
    showLoading: true,
    showErrerMessage: true,
  });
  useEffect(() => {
    console.log(data);
    if (data?.pdf_pages_to_process) {
      if (Array.isArray(data?.pdf_pages_to_process)) {
        console.log("Selected pages to process:", data.pdf_pages_to_process);
      }
    }
  }, [data]);
  useEffect(() => {
    if (selectedPagesAsList.length > 0) {
      setSendReq(true);
    }
  }, [selectedPagesAsList]);
  // -------------------------------------------------
  // Select PDF Pages to Process API Call End
  // -------------------------------------------------

  return (
    <>
      <Div className="width-per-100 bg-green text-white br-all-solid-1 br-rad-px-10 p-all-16 height-px-200 of-hidden">
        <Div>
          <TextBox
            label="Enter the page numbers you want to process (e.g. 1-2,3-5,8,10-12):"
            val={selectedPages}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9,\-]/g, "");
              setSelectedPages(value);
            }}
            placeHolder="1-2,3-5,8,10-12"
          />
        </Div>
        <Div className="m-t-16">
          <Button
            className={"width-px-250"}
            btnText={"Submit"}
            disabled={!selectedPages}
            onClick={() => {
              if (validateData(dispatch, selectedPages)) {
                const pages = parsePages(selectedPages);
                setSelectedPagesAsList(pages);
              }
            }}
          />
        </Div>
      </Div>
    </>
  );
};

export default SelectPagesToProcess;
