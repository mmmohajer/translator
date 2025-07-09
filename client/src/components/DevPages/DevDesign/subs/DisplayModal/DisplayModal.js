import { useDispatch } from "react-redux";

import Button from "@/baseComponents/reusableComps/Button";

import { setModal } from "@/reducer/subs/modal";

const DisplayModal = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Button
        btnText="Modal of type prompt-message"
        className="width-px-350"
        onClick={() => {
          dispatch(
            setModal({
              type: "prompt-message",
              props: {
                message: "This is a sample message",
              },
            })
          );
        }}
      />
    </>
  );
};

export default DisplayModal;
