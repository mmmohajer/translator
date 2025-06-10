import { useDispatch } from "react-redux";

import Div from "@/baseComponents/Div";
import Button from "@/baseComponents/Button";

import { addNewAlertItem } from "@/utils/alert";

const DisplayAlert = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Div>
        <Div className="m-b-16">
          <Button
            btnText="Alert of type success"
            className="width-px-350"
            onClick={() => {
              addNewAlertItem(
                dispatch,
                "success",
                "This is a sample success message"
              );
            }}
          />
        </Div>

        <Div className="m-b-16">
          <Button
            btnText="Alert of type error"
            className="width-px-350"
            onClick={() => {
              addNewAlertItem(
                dispatch,
                "error",
                "This is a sample error message"
              );
            }}
          />
        </Div>
      </Div>
    </>
  );
};

export default DisplayAlert;
