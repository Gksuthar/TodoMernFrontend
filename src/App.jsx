// src/App.js
import React, { createContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import ProductPage from "./Pages/productPage";
import AddTodoPage from "./Pages/addTodo";
import Products from "./Components/Products";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Verify from "./Pages/Varify";
import toast, { Toaster } from "react-hot-toast";
import ForgetPassword from './Pages/ForgetPassword/index'
import EditTodo from "./Components/EditTodo";

// Create Context for Global State
export const Context = createContext();

function App() {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const AppUrl = "https://todomernbackend-9bpz.onrender.com";
    const [searchContent,setSearchContent] = useState("")
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLogin(!!token);
  }, []);

  const expendSidebar = () => setSideBarOpen(!isSideBarOpen);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail");
    setIsLogin(false);
    toast.success("Logged out successfully");
    navigate('/Login');
  };

  const openAlertBox = (status, message) => {
    switch (status) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast(message);
        break;
    }
  };

  const value = {
    isSideBarOpen,
    expendSidebar,
    openAlertBox,
    AppUrl,
    isLogin,
    setIsLogin,
    logout,
    setSearchContent,
    searchContent
  };

  return (
    <Context.Provider value={value}>
      <Toaster position="top-center" reverseOrder={false} />
      <Sidebar />
      <Header />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/addTodo" element={<AddTodoPage />} />
        <Route path="/todos" element={<Products />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/newpassword" element={<ForgetPassword />} />
        <Route path="/edit-todo/:id" element={<EditTodo />} />
      </Routes>
    </Context.Provider>
  );
}

export default App;
