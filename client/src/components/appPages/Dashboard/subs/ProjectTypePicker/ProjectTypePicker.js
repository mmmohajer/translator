import Div from "@/baseComponents/reusableComponents/Div";

import Picker from "../Picker";
import { PROJECT_TYPES } from "./constants";

const ProjectTypePicker = ({
  selectedProject,
  setSelectedProject,
  setSelectedService,
}) => {
  return (
    <>
      <Div type="flex" className="flex--wrap">
        {PROJECT_TYPES.map((projectType) => (
          <Div key={projectType?.value}>
            <Picker
              isActive={selectedProject === projectType?.value}
              onClick={() => {
                setSelectedService("");
                setSelectedProject(projectType?.value);
              }}
            >
              {projectType?.title}
            </Picker>
          </Div>
        ))}
      </Div>
    </>
  );
};

export default ProjectTypePicker;
