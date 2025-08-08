import { useSelector } from "react-redux";

import Div from "@/baseComponents/reusableComponents/Div";
import SectionContainer from "@/components/wrappers/SectionContainer";

import ProjectPicker from "./subs/ProjectPicker";

const Dashboard = () => {
  const profile = useSelector((state) => state.profile);
  return (
    <>
      <SectionContainer hasTopSpace>
        <ProjectPicker />
      </SectionContainer>
    </>
  );
};

export default Dashboard;
