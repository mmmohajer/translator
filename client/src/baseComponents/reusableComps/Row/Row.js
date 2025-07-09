import cx from "classnames";

import Div from "@/baseComponents/reusableComps/Div";

const Row = ({ className, children, ...props }) => {
  return (
    <>
      <Div className={cx("row", className)} {...props}>
        {children}
      </Div>
    </>
  );
};

export default Row;
