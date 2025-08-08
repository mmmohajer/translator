import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

import { WITH_DOCKER } from "config";
import { addNewAlertItem } from "@/utils/alert";
import { setLoading, setLoaded } from "@/reducer/subs/isLoading";
import { getLocalStorage } from "@/utils/storage";
import { JWT_PRE_WORD } from "@/constants/vars";

const useApiCalls = ({
  method,
  url,
  bodyData,
  headers,
  sendReq,
  setSendReq,
  handleError,
  useDefaultHeaders = true,
  showLoading = true,
  showErrerMessage = true,
  isBinary = false, // new option: set true for binary responses
}) => {
  const dispatch = useDispatch();

  const [data, setData] = useState();
  const [status, setStatus] = useState();

  const handleReq = async () => {
    try {
      let curUrl;
      let res;
      const accessToken = getLocalStorage("access_token");
      if (useDefaultHeaders && accessToken) {
        if (!headers) {
          headers = { Authorization: `${JWT_PRE_WORD} ${accessToken}` };
        } else {
          headers["Authorization"] = `${JWT_PRE_WORD} ${accessToken}`;
        }
      }
      if (!WITH_DOCKER) {
        curUrl = `http://localhost:8000${url}`;
      } else {
        curUrl = `${url}`;
      }

      // Set responseType to 'blob' for binary, otherwise default
      const axiosConfig = { headers: headers || {} };
      if (isBinary) axiosConfig.responseType = "blob";

      if (method === "GET") {
        if (showLoading) {
          dispatch(setLoading());
        }
        res = await axios.get(curUrl, axiosConfig);
        if (showLoading) {
          dispatch(setLoaded());
        }
        if (isBinary && res?.data) {
          setData(res.data);
        } else if (res?.data) {
          setData(res.data);
        }
        if (res?.status) {
          setStatus(res.status);
        }
      }

      if (method === "POST") {
        if (showLoading) {
          dispatch(setLoading());
        }
        res = await axios.post(curUrl, bodyData || {}, axiosConfig);
        if (showLoading) {
          dispatch(setLoaded());
        }
        if (isBinary && res?.data) {
          setData(res.data);
        } else if (res?.data) {
          setData(res.data);
        }
        if (res?.status) {
          setStatus(res.status);
        }
      }

      if (method === "PUT") {
        if (showLoading) {
          dispatch(setLoading());
        }
        res = await axios.put(curUrl, bodyData || {}, {
          headers: headers || {},
        });
        if (showLoading) {
          dispatch(setLoaded());
        }
        if (res?.data) {
          setData(res.data);
        }
        if (res?.status) {
          setStatus(res.status);
        }
      }

      if (method === "DELETE") {
        if (showLoading) {
          dispatch(setLoading());
        }
        res = await axios.delete(curUrl, { headers: headers || {} });
        if (showLoading) {
          dispatch(setLoaded());
        }
        if (res?.data) {
          setData(res.data);
        }
        if (res?.status) {
          setStatus(res.status);
        }
      }
    } catch (err) {
      if (showLoading) {
        dispatch(setLoaded());
      }
      if (handleError) {
        handleError();
      }
      if (err?.response?.data?.message) {
        if (showErrerMessage) {
          addNewAlertItem(dispatch, "error", `❌ ${err.response.data.message}`);
        }
      } else {
        if (showErrerMessage) {
          addNewAlertItem(
            dispatch,
            "error",
            "❌ Something went wrong; please try again!"
          );
        }
      }
    }
  };

  useEffect(() => {
    if (sendReq) {
      handleReq();
      setTimeout(() => {
        setSendReq(false);
      }, 10);
    }
  }, [sendReq]);

  return { data, status };
};

export default useApiCalls;
