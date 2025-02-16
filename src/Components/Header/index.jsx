import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiMenu3Line } from "react-icons/ri";
import "../../index.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

import { Context } from "../../App";
import { useContext } from "react";
const Header = () => {
  const [profileMenuAnchor, setProfileMenuAnchor] = React.useState(null);
  const isProfileMenuOpen = Boolean(profileMenuAnchor);
  
    const context = useContext(Context)
  
    const { isSideBarOpen } = useContext(Context);


  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };


  return (
    <header className={`w-full h-auto  py-2 ${isSideBarOpen===true ? 'pl-80' : 'pl-5'}  bg-[#fff] shadow-md flex items-center justify-between`}>
      <div>
        <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-md">
          <RiMenu3Line onClick={context.expendSidebar} className="text-[22px] text-gray-800" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        

        <div
          className="w-[40px] h-[40px] rounded-full overflow-hidden cursor-pointer border-2 border-gray-300"
          onClick={handleProfileMenuOpen}
        >
          <img
            src="https://st3.depositphotos.com/1006753/13799/i/450/depositphotos_137996152-stock-photo-natural-face-portrait-of-a.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <Menu
          anchorEl={profileMenuAnchor}
          id="profile-menu"
          open={isProfileMenuOpen}
          onClose={handleProfileMenuClose}
          onClick={handleProfileMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem className="flex gap-2" onClick={handleProfileMenuClose}><FaRegCircleUser/><span>Profile</span></MenuItem>
          <MenuItem className="flex gap-2" onClick={handleProfileMenuClose}><IoSettingsOutline/><span>setting</span></MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
