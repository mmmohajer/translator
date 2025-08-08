import Div from "@/baseComponents/reusableComponents/Div";

const ProjectPicker = () => {
  return (
    <>
      <Div type="flex" className="flex--wrap" hAlign="center">
        <Div className="br-all-solid-1 width-px-300 br-rad-px-10 p-all-16 text-center mouse-hand m-all-16 ">
          Audio Processor
        </Div>

        <Div className="br-all-solid-1 width-px-300 br-rad-px-10 p-all-16 text-center mouse-hand m-all-16">
          Text Processor
        </Div>

        <Div className="br-all-solid-1 width-px-300 br-rad-px-10 p-all-16 text-center mouse-hand m-all-16">
          Translator
        </Div>
      </Div>
    </>
  );
};

export default ProjectPicker;
