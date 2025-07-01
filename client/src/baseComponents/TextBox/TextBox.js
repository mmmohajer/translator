import { useState, useEffect } from "react";
import cx from "classnames";
import { useSelector } from "react-redux";

import Div from "@/baseComponents/Div";
import Label from "@/baseComponents/Label";
import Icon from "@/baseComponents/Icon";

const TextBox = ({
  label,
  val,
  setVal,
  placeHolder,
  isRequired = false,
  forceLightMode = false,
  isNotEditable = false,
  ...props
}) => {
  const [curType, setCurType] = useState("");

  useEffect(() => {
    if (props.type) {
      setCurType(props.type);
    } else {
      setCurType("text");
    }
  }, [props?.type]);

  return (
    <>
      <Label label={label} isRequired={isRequired} />
      <Div className="pos-rel">
        <input
          {...props}
          value={val}
          type={curType}
          onChange={(e) => {
            if (!isNotEditable) {
              setVal(e.target.value);
            }
          }}
          placeholder={placeHolder}
          className={cx(
            "p-all-temp-3 br-rad-px-10 br-all-solid-2 m-r-temp-5 br-black width-per-100 bg-white text-theme-five"
          )}
          style={{ outline: "none" }}
        />
        {props?.type === "password" ? (
          <Div
            type="flex"
            hAlign="center"
            vAlign="center"
            className="pos-abs width-px-20 height-px-20 mouse-hand"
            style={{
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10000000,
            }}
            onClick={() => {
              if (curType === "password") {
                setCurType("text");
              }
              if (curType === "text") {
                setCurType("password");
              }
            }}
          >
            <Icon
              type={curType === "password" ? "eye" : "eye-slash"}
              scale={1}
            />
          </Div>
        ) : (
          ""
        )}
      </Div>
    </>
  );
};

export default TextBox;
