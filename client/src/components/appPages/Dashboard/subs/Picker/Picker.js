import cx from "classnames";

import Div from "@/baseComponents/reusableComponents/Div";

const Picker = ({ isActive = false, children, ...props }) => {
  return (
    <>
      <Div
        className={cx(
          "br-all-solid-1 width-px-300 br-rad-px-10 p-all-16 text-center mouse-hand m-r-16 m-b-16",
          isActive ? "bg-cyan" : ""
        )}
        {...props}
      >
        {children}
      </Div>
    </>
  );
};

export default Picker;
