import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex mt-16">
      <div className=" lg:w-64 min-h-screen bg-gray-100 dark:bg-gray-800">
        <Sidebar />
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
