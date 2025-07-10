import { useSelector } from "react-redux";

import Div from "@/baseComponents/reusableComponents/Div";
import LogOut from "@/components/appPages/shared/LogOut";

const Dashboard = () => {
  const profile = useSelector((state) => state.profile);
  return (
    <>
      <Div className="bg-yellow flex--gr--1">
        <Div className="height-vh-full">Dashboard {profile?.user?.email}</Div>
        <LogOut
          type="flex"
          hAlign="center"
          vAlign="center"
          className="mouse-hand bg-red width-px-200 m-y-16 p-y-8 text-white"
        >
          Logout
        </LogOut>
      </Div>
    </>
  );
};

export default Dashboard;
