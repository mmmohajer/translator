import { useState, useEffect } from "react";

import Div from "@/baseComponents/reusableComponents/Div";
import Button from "@/baseComponents/reusableComponents/Button";
import FileProcessLoading from "@/baseComponents/reusableComponents/FileProcessLoading";

const DisplayFileProcessLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Simulate loading for 5 seconds

    return () => clearTimeout(timer);
  }, [isLoading]);
  return (
    <>
      <Button btnText={"Show Loading"} onClick={() => setIsLoading(true)} />
      <FileProcessLoading isLoading={isLoading} title="Processing File..." />
    </>
  );
};

export default DisplayFileProcessLoading;
