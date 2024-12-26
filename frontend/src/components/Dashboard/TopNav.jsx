import React from "react";

import { Link } from "react-router-dom";
import profileImg from "../../assets/images/profile-02.png";


const TopNav = () => {
  return (
    <div
      className="fixed top-0 left-[260px] z-[999] bg-[#181b3a] w-[calc(100%-260px)] h-[70px] flex items-center px-[30px]"
    >
      <div className="flex items-center justify-between w-full">
        {/* Search Box */}
        <div className="flex items-center justify-between bg-[#0b0c28] rounded-[5px] cursor-pointer h-[40px] px-[10px]">
          <input
            type="text"
            placeholder="search or type"
            className="bg-transparent border-none outline-none text-[#808191]"
          />
          <span>
            <i className="ri-search-line text-[#808191]"></i>
          </span>
        </div>

        {/* Top Nav Right */}
        <div className="flex items-center gap-[2rem] justify-end">
          {/* Notification */}
          <span className="relative">
            <i className="ri-notification-3-line text-[#808191] text-[1.2rem] cursor-pointer"></i>
            <span className="absolute top-[25%] right-[-10%] w-[13px] h-[13px] flex items-center justify-center bg-[#01d293] rounded-full text-white text-[0.8rem]">
              1
            </span>
          </span>

          {/* Profile */}
          <div className="profile">
            <Link to="/admin/settings">
              <img
                src={profileImg}
                alt="Profile"
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
