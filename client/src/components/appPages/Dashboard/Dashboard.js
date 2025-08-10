import { useState, useEffect } from "react";

import SectionContainer from "@/components/wrappers/SectionContainer";

import ProjectTypePicker from "./subs/ProjectTypePicker";
import Services from "./subs/Services";
import ProjectCreator from "./subs/ProjectCreator";

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    if (["translator", "process_audio"].includes(selectedProject)) {
      setSelectedService(selectedProject);
    }
  }, [selectedProject]);

  return (
    <>
      <SectionContainer hasTopSpace>
        <ProjectTypePicker
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          setSelectedService={setSelectedService}
        />
      </SectionContainer>

      <SectionContainer hasTopSpace>
        <Services
          selectedProject={selectedProject}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      </SectionContainer>

      {selectedProject?.length && selectedService?.length ? (
        <SectionContainer hasTopSpace>
          <ProjectCreator selectedService={selectedService} />
        </SectionContainer>
      ) : null}
    </>
  );
};

export default Dashboard;
