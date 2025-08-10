import { useState } from "react";

import Div from "@/baseComponents/reusableComponents/Div";

import HandleUUID from "./subs/HandleUUID";
import Chat from "./subs/Chat";

const UserProjectDetail = ({ uuid }) => {
  const [projectInfo, setProjectInfo] = useState({});
  return (
    <>
      {/* <HandleUUID uuid={uuid} setProjectInfo={setProjectInfo} /> */}
      <Chat uuid={uuid} />
    </>
  );
};

export default UserProjectDetail;
