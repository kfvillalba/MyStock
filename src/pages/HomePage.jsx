import React from "react";
import SideNavbar from "../components/SideNavbar";

const HomePage = () => {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/5">
        <SideNavbar />
      </div>
      <div className="w-4/5"></div>
    </div>
  );
};

export default HomePage;
