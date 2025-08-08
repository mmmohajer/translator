import Div from "@/baseComponents/reusableComponents/Div";
import ProgressBar from "@/baseComponents/reusableComponents/ProgressBar";

const DisplayProgressBar = () => {
  return <ProgressBar current_page_to_process={3} total_pages={5} />;
};

export default DisplayProgressBar;
