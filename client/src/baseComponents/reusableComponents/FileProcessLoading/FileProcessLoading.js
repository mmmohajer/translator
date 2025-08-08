import cx from "classnames";

import Div from "@/baseComponents/reusableComponents/Div";

import styles from "./FileProcessLoading.module.scss";

const FileProcessLoading = ({ isLoading, title }) => {
  return (
    <>
      {isLoading ? (
        <Div
          type="flex"
          hAlign="center"
          vAlign="center"
          direction="vertical"
          className={cx(
            "pos-fix pos-fix--lt width-per-100 height-vh-full loadingZIndex",
            styles.fullHeight
          )}
        >
          <Div className={cx("f-b f-s-px-14 p-all-8", styles.titleContainer)}>
            {title}
          </Div>
          <Div className="width-px-100 height-px-100">
            <Div className={cx(styles.loading)}></Div>
          </Div>
        </Div>
      ) : null}
    </>
  );
};

export default FileProcessLoading;
