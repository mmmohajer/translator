import { useState } from "react";
import { useDispatch } from "react-redux";

import Div from "@/baseComponents/reusableComponents/Div";
import RadioButton from "@/baseComponents/formComponents/RadioButton";
import TextBox from "@/baseComponents/formComponents/TextBox";
import Button from "@/baseComponents/reusableComponents/Button";

import { addNewAlertItem } from "@/utils/alert";

import { LIST_OF_OPTIONS } from "./constants";

const PdfManager = () => {
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState(null);
  const [pages, setPages] = useState("");
  const [confirmedPages, setConfirmedPages] = useState([]);
  const [projectName, setProjectName] = useState("");

  return (
    <>
      <Div className="width-per-100">
        <Div>
          <RadioButton
            listOfOptions={LIST_OF_OPTIONS}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            // label="How would you like to process your PDF?"
          />
        </Div>

        {selectedOption === "specific_pages" && confirmedPages.length === 0 ? (
          <Div className="m-t-16">
            <Div className="width-per-100 max-width-px-500">
              <TextBox
                type="text"
                label="Specify Pages (e.g., 1,3,5-7)"
                isRequired
                val={pages}
                onChange={(e) => setPages(e.target.value)}
                placeHolder="e.g., 1,3,5-7"
              />
            </Div>

            <Div className="m-t-16">
              <Button
                btnText="Confirm Pages"
                className="width-px-300"
                onClick={() => {
                  const pagePattern = /^(\d+(-\d+)?)(,(\d+(-\d+)?))*$/;
                  if (pagePattern.test(pages)) {
                    const pageList = [];
                    pages.split(",").forEach((part) => {
                      if (part.includes("-")) {
                        const [start, end] = part.split("-").map(Number);
                        for (let i = start; i <= end; i++) {
                          pageList.push(i);
                        }
                      } else {
                        pageList.push(Number(part));
                      }
                    });
                    setConfirmedPages(pageList);
                  } else {
                    addNewAlertItem(
                      dispatch,
                      "error",
                      "Invalid page format. Please use formats like 1, 3, 5-7."
                    );
                  }
                }}
              />
            </Div>
          </Div>
        ) : null}

        {selectedOption === "specific_pages" && confirmedPages.length > 0 ? (
          <Div className="m-t-16">
            <Div className="m-b-8">Confirmed Pages:</Div>
            <Div type="flex" className="flex--wrap">
              {confirmedPages?.map((page, idx) => (
                <Div
                  type="flex"
                  hAlign="center"
                  vAlign="center"
                  key={idx}
                  className="width-px-30 height-px-30 f-s-px-14 f-b br-rad-per-50 bg-cyan m-r-8 m-b-8"
                >
                  {page}
                </Div>
              ))}
            </Div>
            <Div className="m-t-16">
              <Button
                btnText="Edit Pages"
                btnType={2}
                iconType="edit"
                iconScale={1.5}
                className=""
                onClick={() => setConfirmedPages([])}
              />
            </Div>
          </Div>
        ) : null}

        {selectedOption === "all_pages" ||
        (selectedOption === "specific_pages" && confirmedPages.length > 0) ? (
          <>
            <Div className="width-per-100 max-width-px-500 m-t-32">
              <TextBox
                isRequired
                label="Pick a name for this project"
                val={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeHolder="Project Name"
              />
            </Div>

            <Div type="flex" className="width-per-100 m-y-32">
              <Button
                btnText="Create Project"
                className="width-px-300"
                onClick={() => {
                  // Handle project creation logic
                }}
              />
            </Div>
          </>
        ) : null}
      </Div>
    </>
  );
};

export default PdfManager;
