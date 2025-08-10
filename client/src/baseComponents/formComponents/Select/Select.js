import Div from "@/baseComponents/reusableComponents/Div";

import Type1 from "./subs/Type1";

const Select = ({ selectType = 1, ...props }) => {
  return (
    <>
      {selectType === 1 ? <Type1 {...props} /> : null}
      {/* You can add more select types here if needed */}
    </>
  );
};

export default Select;
