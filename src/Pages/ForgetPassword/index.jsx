import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Context } from "../../App";
import axios from "axios";

const ForgetPassword = () => {
  const context = useContext(Context);
  const url = context.AppUrl;
  const [ForgetPassword1, setForgetPassword1] = useState(false);
  const [ForgetPassword2, setForgetPassword2] = useState(false);
  const [formField, setFormField] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange=(e)=>{
    const {name,value} = e.target;
    setFormField((prev) => ({
        ...prev,
        [name]: value,
      }));


  }

  const email = localStorage.getItem("userEmail");
  const history = useNavigate();
  const newPasswordSetup = async (e) => {
    e.preventDefault();
    try {
        const {password,confirmpassword} = formField;
        console.log("password"+password)
      if (password == "" || !password) {
        context.openAlertBox("error", "Enter password");
        return;
      }
      if (confirmpassword == "" || !confirmpassword) {
        context.openAlertBox("error", "Enter  confirm password");
        return;
      }

      const response = await axios.post(`${url}/api/user/resetpassword`, {
        password: password,
        confirmpassword: confirmpassword,
        email: email,
      });
      if (response.status === 200) {

        context.openAlertBox("success", response.data.message);
        localStorage.removeItem('forgetPassword')
        history("/");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        context.openAlertBox(
          "error",
          error.response.data.message || "An error occurred"
        );
      } else if (error.request) {
        context.openAlertBox("error", "No response received");
      } else {
        context.openAlertBox("error", error.message || "An error occurred");
      }
    }
  };
  return (
    <div className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10 mt-5">
          <h3 className="text-center !text-[18px] !font-[500] py-2 mb-4">
            Forget Password{" "}
          </h3>
          <form action="" onSubmit={newPasswordSetup} className="w-full">
            <div className="form-group w-full mb-5 relative">
              <TextField
                id="standard-basic"
                type="password"
                name="password"
                value={formField.password}
                onChange={handleChange}
                label="password"
                variant="outlined"
                className="w-full"
              />
              <Button
                onClick={() => setForgetPassword1(!ForgetPassword1)}
                className="!absolute top-[10px] !text-black right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] opacity-75 "
              >
                {ForgetPassword1 === true ? (
                  <FaEye className="text-[20px]" />
                ) : (
                  <FaEyeSlash className="text-[20px]" />
                )}
              </Button>
            </div>
            <div className="form-group w-full mb-5 relative">
              <TextField
                id="standard-basic"
                type={`${ForgetPassword2 === false ? "text" : "password"}`}
                name="confirmpassword"
                value={formField.confirmpassword}
                label="confirm-password"
                onChange={handleChange}
                variant="outlined"
                className="w-full"
              />
              <Button
                onClick={() => setForgetPassword2(!ForgetPassword2)}
                className="!absolute top-[10px] !text-black right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] opacity-75 "
              >
                {ForgetPassword2 === true ? (
                  <FaEye className="text-[20px]" />
                ) : (
                  <FaEyeSlash className="text-[20px]" />
                )}
              </Button>
            </div>

            <Button
              type="submit"
              className=" btn-org flex gap-3 w-full !bg-[#f1f1f1] !btn-lg !text-black mt-2"
            >
              Change password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
