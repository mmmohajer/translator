import { useState, useEffect } from "react";

import Div from "@/baseComponents/reusableComponents/Div";

import useApiCalls from "@/hooks/useApiCalls";
import { USER_PROJECT_API_ROUTE } from "@/constants/apiRoutes";

const HandleUUID = ({ uuid, setProjectInfo }) => {
  // ------------------------------------------------
  // Fetch User Project Detail API Call Begin
  // ------------------------------------------------
  const [sendReq, setSendReq] = useState(false);
  const { data, status } = useApiCalls({
    method: "GET",
    url: `${USER_PROJECT_API_ROUTE}${uuid}/`,
    sendReq,
    setSendReq,
    showLoading: true,
    showErrerMessage: true,
  });
  useEffect(() => {
    if (uuid) {
      setSendReq(true);
    }
  }, [uuid]);
  useEffect(() => {
    if (data?.id) {
      setProjectInfo(data);
    }
  }, [data, setProjectInfo]);
  // ------------------------------------------------
  // Fetch User Project Detail API Call End
  // ------------------------------------------------
  return (
    <>
      <Div>HandleUUID</Div>
    </>
  );
};

export default HandleUUID;
