import React, { useState } from "react";
import Dashboardprofile from "./Dashboardprofile";
import CreateBlog from "./CreateBlog";
import Posts from "./Posts";
import Nav_bar from "../Header/Nav_bar";

function UserDashboard() {
  const [currentComponent, setCurrentComponent] = useState("profile");

  const renderComponent = () => {
    switch (currentComponent) {
      case "profile":
        return <Dashboardprofile />;
      case "create-blog":
        return <CreateBlog />;
      case "posts":
        return <Posts />;
      default:
        return <Dashboardprofile />;
    }
  };

  const menuItems = [
    { label: "Profile", key: "profile" },
    { label: "Create Blog", key: "create-blog" },
    { label: "Posts", key: "posts" },
  ];

  return (
    <div className="min-h-screen font-[Poppins] bg-[#F8F9FA]">
      <Nav_bar />

      <div className="flex flex-col lg:flex-row">
        <aside className="w-full lg:w-60 bg-[#34495E] text-white flex lg:flex-col flex-row justify-around lg:justify-start p-4 gap-3 shadow-md">
          {menuItems.map((item) => (
            <div
              key={item.key}
              onClick={() => setCurrentComponent(item.key)}
              className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 text-center lg:text-left ${
                currentComponent === item.key
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-semibold shadow-md"
                  : "hover:bg-[#2C3E50]"
              }`}
            >
              {item.label}
            </div>
          ))}
        </aside>

        <main className="flex-1 p-6 lg:p-10 flex justify-center items-start">
          <div className="w-full lg:w-4/5">{renderComponent()}</div>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;
