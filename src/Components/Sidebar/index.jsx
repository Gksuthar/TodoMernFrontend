import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineTask } from "react-icons/md";
import { IoIosLogOut, IoIosArrowDown, IoIosArrowUp, IoIosClose } from "react-icons/io";
import { Collapse } from "react-collapse";
import { useContext } from "react";
import { Context } from "../../App";
import { RiMenu3Line } from "react-icons/ri";

const Sidebar = () => {
  const [subMenu, setSubMenu] = useState(null);
  const context = useContext(Context);
  const { isSideBarOpen, toggleSidebar } = context;

  const isOpenSubMenu = (indx) => {
    if (subMenu === indx) {
      setSubMenu(null);
    } else {
      setSubMenu(indx);
    }
  };

  return (
    <>
      {/* Overlay for small devices */}
      {isSideBarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
  className={`z-[1000] fixed top-0 left-0 bg-[#f1f1f1] 
    ${isSideBarOpen ? "w-full sm:w-[250px]" : "w-0 opacity-0"} 
    h-full border-r border-[rgba(0,0,0,0.2)] px-2 py-2 
    transition-all duration-300 ease-in-out overflow-hidden shadow-lg`}
  style={{
    height: '100vh',
    zIndex: 1000,
  }}
>

        <div className="px-2 py-2 w-full flex justify-between items-center">
          <Link to="/">
            <img
              src="https://todo-app-monorepo.fly.dev/assets/Banner.png"
              className="w-[200px] px-4"
              alt="Logo"
            />
          </Link>
          <Link className="block sm:hidden !min-w-[40px] !h-[40px] !p-0" >
  <RiMenu3Line onClick={context.expendSidebar} className="text-[24px]" />

          </Link>

        </div>

        <ul className="mt-4">
          <li>
            <Link to="/">
              <Button className="w-full !text-black hover:!bg-[#fff] capitalize !justify-start !flex !gap-5 text-[14px] !mb-2 text-[rgba(0,0,0,0.8)] !font-[500] items-center">
                <RxDashboard className="text-[18px]" />
                <span>Dashboard</span>
              </Button>
            </Link>
          </li>

          <li>
            <Button
              className="w-full !text-black hover:!bg-[#fff] capitalize !justify-start flex gap-5 text-[14px] !mb-2 text-[rgba(0,0,0,0.8)] !font-[500] items-center"
              onClick={() => isOpenSubMenu(1)}
            >
              <MdOutlineTask className="text-[18px]" />
              <span>Todos</span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
                {subMenu === 1 ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </Button>

            <Collapse isOpened={subMenu === 1}>
              <ul className="w-full">
                <li className="w-full mb-2">
                  <Link to="/todos">
                    <Button className="!text-[rgba(0,0,0,0.8)] hover:!bg-white !pl-10 !capitalize !justify-start !w-full">
                      All Todos
                    </Button>
                  </Link>
                </li>
                <li className="w-full mb-2">
                  <Link to="/AddTodo">
                    <Button className="!text-[rgba(0,0,0,0.8)] hover:!bg-white !pl-10 !capitalize !justify-start !w-full">
                      Create Todo
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          {context.isLogin && (
            <li>
              <Button
                onClick={context.logout}
                className="w-full !text-black hover:!bg-[#fff] capitalize !justify-start flex gap-5 text-[14px] !mb-2 text-[rgba(0,0,0,0.8)] !font-[500] items-center"
              >
                <IoIosLogOut className="text-[18px]" />
                <span>Logout</span>
              </Button>
            </li>
          )}

          {!context.isLogin && (
            <li>
              <Link to="/Login">
                <Button className="w-full !text-black hover:!bg-[#fff] capitalize !justify-start flex gap-5 text-[14px] !mb-2 text-[rgba(0,0,0,0.8)] !font-[500] items-center">
                  <IoIosLogOut className="text-[18px]" />
                  <span>Login</span>
                </Button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;