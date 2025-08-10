import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Div from "@/baseComponents/reusableComponents/Div";
import TextBox from "@/baseComponents/formComponents/TextBox";
import AreaText from "@/baseComponents/formComponents/AreaText";
import Button from "@/baseComponents/reusableComponents/Button";

import useApiCalls from "@/hooks/useApiCalls";
import { USER_PROJECT_API_ROUTE } from "@/constants/apiRoutes";
import { PAGE_ROUTES } from "@/constants/pageRoutes";
import { addNewAlertItem } from "@/utils/alert";

import { validateData } from "./validator";

const ProjectCreator = ({ selectedService }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  // ------------------------------------------------
  // Create Project API Call Begin
  // ------------------------------------------------
  const [createProject, setCreateProject] = useState(false);
  const { status, data } = useApiCalls({
    sendReq: createProject,
    setSendReq: setCreateProject,
    method: "POST",
    url: USER_PROJECT_API_ROUTE,
    bodyData: {
      project_name: projectName,
      project_description: projectDescription,
      project_type: selectedService,
    },
  });
  useEffect(() => {
    if (data?.uuid) {
      addNewAlertItem(dispatch, "success", "Project created successfully.");
      router.push(`${PAGE_ROUTES.USER_PROJECT}/${data.uuid}`);
    }
  }, [data]);
  // -------------------------------------------------
  // Create Project API Call End
  // -------------------------------------------------
  return (
    <>
      <Div className="width-per-100 max-width-px-800">
        <TextBox
          isRequired
          label="Pick a name for this project"
          val={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeHolder="Project Name"
        />
      </Div>

      <Div className="width-per-100 max-width-px-800 m-t-16">
        <AreaText
          label="Describe your project (optional)"
          val={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeHolder="Project Description"
        />
      </Div>

      <Div type="flex" className="width-per-100 m-y-32">
        <Button
          btnText="Create Project"
          className="width-px-300"
          onClick={() => {
            if (validateData(dispatch, projectName, selectedService)) {
              setCreateProject(true);
            }
          }}
        />
      </Div>
    </>
  );
};

export default ProjectCreator;
