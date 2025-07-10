import { useState } from "react";
import { useSelector } from "react-redux";
import cx from "classnames";

import Div from "@/baseComponents/reusableComponents/Div";
import Icon from "@/baseComponents/reusableComponents/Icon";
import Label from "@/baseComponents/formComponents/Label";

import { COLORS } from "@/constants/vars";

const Select = ({ options, val, setVal, placeHolder, label }) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <>
      <Label label={label} />
      <Div
        className={cx(
          "p-all-temp-1 f-s-px-14 br-rad-px-10 br-all-solid-2 m-r-temp-5 br-black width-per-100 bg-white text-theme-five br-black"
        )}
      >
        <Div
          onClick={() => setShowOptions(!showOptions)}
          type="flex"
          distributedBetween
          vAlign="center"
          className={cx(
            "width-per-100 p-x-temp-3 height-px-35 mouse-hand",
            showOptions ? "br-bottom-solid-1" : ""
          )}
        >
          <Div>
            {val
              ? options.find((opt) => opt.value === val)?.shownText || val
              : placeHolder}
          </Div>
          <Div
            className={cx(
              "global-transition-one",
              showOptions ? "global-rotate-180" : ""
            )}
          >
            <Icon type="angle-up" color={COLORS["theme-two"]} />
          </Div>
        </Div>

        <Div
          type="flex"
          direction="vertical"
          className={cx(
            "width-per-100 global-transition-one of-y-auto scroll-type-one"
          )}
          style={{ maxHeight: showOptions ? "300px" : "0px" }}
        >
          {options?.map((item, idx) => (
            <Div
              className={cx(
                "p-all-temp-3 bg-theme-two-on-hover text-white-on-hover mouse-hand"
              )}
              key={idx}
              onClick={() => {
                setVal(item?.value);
                setShowOptions(false);
              }}
            >
              {item?.shownText}
            </Div>
          ))}
        </Div>
      </Div>
    </>
  );
};

export default Select;
