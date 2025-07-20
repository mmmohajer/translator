import { useEffect, useRef } from "react";

import { WITH_DOCKER, APP_DOMAIN } from "config";

const useWebSocket = ({
  sendReq,
  setSendReq,
  url,
  onOpen,
  onMessage,
  onError,
  onClose,
  initialMessage,
}) => {
  const socketRef = useRef(null);

  useEffect(() => {
    let curUrl;

    if (sendReq) {
      if (!url) return;
      if (!WITH_DOCKER) {
        curUrl = `ws://localhost:8000${url}`;
      } else {
        curUrl = `wss://${APP_DOMAIN}${url}`;
      }

      const socket = new WebSocket(curUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        if (initialMessage) socket.send(initialMessage);
        if (onOpen) onOpen(socket);
      };

      socket.onmessage = (event) => {
        if (onMessage) onMessage(event);
      };

      socket.onerror = (error) => {
        if (onError) onError(error);
      };

      socket.onclose = () => {
        if (onClose) onClose();
      };
      setTimeout(() => {
        setSendReq(false);
      }, 10);
    }
  }, [url, sendReq]);

  return socketRef;
};

export default useWebSocket;
