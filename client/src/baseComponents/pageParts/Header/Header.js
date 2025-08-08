import cx from "classnames";

import Div from "@/baseComponents/reusableComponents/Div";
import Heading from "@/baseComponents/reusableComponents/Heading";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <>
      <Div
        type="flex"
        hAlign="center"
        vAlign="center"
        className={cx("bg-silver", styles.container)}
      >
        <Heading className="text-center">Smart PDF Translator</Heading>
      </Div>
    </>
  );
};

export default Header;
