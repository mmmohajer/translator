import cx from "classnames";
import Div from "@/baseComponents/reusableComponents/Div";

const Button = ({ btnText, btnType = 1, className, ...props }) => {
  return (
    <>
      <button
        className={cx(
          "p-y-8 p-x-16 br-rad-px-50 mouse-hand",
          btnType === 1
            ? "bg-theme-one br-all-solid-2 br-color-theme-five bg-theme-five-on-hover text-theme-five text-white-on-hover br-color-five-on-hover"
            : "br-all-solid-2",
          className
        )}
        {...props}
      >
        {btnText}
      </button>
    </>
  );
};

export default Button;
