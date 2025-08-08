import Div from "@/baseComponents/reusableComponents/Div";

const ProgressBar = ({ current_page_to_process, total_pages }) => {
  return (
    <>
      <Div className="m-b-8 f-s-px-14 f-b">
        Page {current_page_to_process} of {total_pages} is being processed
      </Div>
      <Div className="width-per-100 bg-white br-all-solid-1 br-rad-px-10 height-px-20 of-hidden">
        <Div
          className="bg-blue height-px-20 global-transition-one"
          style={{
            width: `${(current_page_to_process / total_pages) * 100}%`,
          }}
        />
      </Div>
    </>
  );
};

export default ProgressBar;
