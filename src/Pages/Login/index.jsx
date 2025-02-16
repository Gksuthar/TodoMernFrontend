import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Context } from "../../App";
import axios from "axios";
import { useEffect } from "react";
const Login = () => {
  const context = useContext(Context);
  // const navigate
  const url = context.AppUrl;
  const navigate = useNavigate();
  const [isShowPassword, setisShowPassword] = useState(false);
  useEffect(() => {
    if (context.isLogin) {
      navigate('/')
    }
  }, [])
  

  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });
  const onChangeHandle = (e) => {
    setFormField({
      ...formField,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formField.email + "and" + formField.password);
      if (formField.email==='') {
        context.openAlertBox("error", "Please Enter email");
      }
      if (formField.password==='') {
        context.openAlertBox("error", "Please Enter Password");
      }
      const response = await axios.post(`${url}/api/user/Login`, {
        email: formField.email,
        password: formField.password,
      },);
    //   alert(response.data.message)
      if (response.status === 200) {
        context.openAlertBox("success", "Login successfully");
        context.setIsLogin(true)
        localStorage.setItem('accessToken',response.data.data.accessToken)
        localStorage.setItem('refreshToken',response.data.data.refreshToken)
        navigate("/");
      } else {
        console.log("You are not logging");
      }
    } catch (error) {
        if (error.response) {  
            console.log("Error Message:", error.response.data.message);
            context.openAlertBox('error',error.response.data.message)
            return
          } else if (error.request) {  
            context.openAlertBox('error',error.request)
            // console.log("Error Message:", error.request);
          return
        } else {  
          context.openAlertBox('error',error.message)
          console.log("Error Message:", error.message);
            return
        }
    }
    
  };
  const history = useNavigate();
  const forgetPassword = async() => {
    if (!formField.email) {
      context.openAlertBox("error", "Please Enter Email");
      return;
    }else{
     try {
      localStorage.setItem('userEmail',formField.email)
      let currentSituation = localStorage.setItem('forgetPassword','true')
      // const for = localStorage.getItem('forgetPassword')
      const resposne = await axios.post(`${url}/api/user/forgetpassword`,{email:formField.email});
      if (resposne.status===200 ) { 
        context.openAlertBox("success", "Otp Send");
        history("/Verify");
      }
      
     } catch (error) {
      console.error("Error :"+error)
     }

    }
  };
  return (
    <div className={`section py-10 transition-all ${!context.isSideBarOpen ? 'w-[100%]' : 'w-[82%] ml-[18%]'} `}>
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10 mt-5">
          <h3 className="text-center !text-[18px] !font-[500] py-2 mb-4">
            Login to your account
          </h3>
          <form action="" onSubmit={handleSubmit} className="w-full">
            <div className="form-group w-full mb-5">
              <TextField
                id="standard-basic"
                type="email"
                value={formField.email}
                name="email"
                onChange={(e) => onChangeHandle(e)}
                label="Email id"
                variant="outlined"
                className="w-full"
              />
            </div>
            <div className="form-group w-full mb-5 relative">
              <TextField
                id="standard-basic"
                type={`${isShowPassword === false ? "text" : "password"}`}
                value={formField.password}
                onChange={(e) => onChangeHandle(e)}
                name="password"
                label="Password"
                variant="outlined"
                className="w-full"
              />
              <Button
                onClick={() => setisShowPassword(!isShowPassword)}
                className="!absolute top-[10px] !text-black right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] opacity-75 "
              >
                {isShowPassword === true ? (
                  <FaEye className="text-[20px]" />
                ) : (
                  <FaEyeSlash className="text-[20px]" />
                )}
              </Button>
            </div>
            <a
              className="link cursor-pointer text-[14px] mb-1 font-[600]"
              onClick={forgetPassword}
            >
              forget password
            </a>
            <div className="flex items-center w-full mt-3 btn-lg">
              <Button className="btn-org w-full" type="submit">
                Login
              </Button>
            </div>
            <p className="text-center mb-1">
              Not registred?{" "}
              <Link to="/Register" className=" link text-[14px] font-[600 ]">
                Sign up
              </Link>{" "}
            </p>

            {/* <p className="text-center text-[12px] font-[500] mb-2 mt-4">
              Or continue With Social Account{" "}
            </p>
            <Button className="flex gap-3 w-full !bg-[#f1f1f1] !btn-lg !text-black mt-2">
              <FcGoogle className="text-[20px]" />
              Login with Google
            </Button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
