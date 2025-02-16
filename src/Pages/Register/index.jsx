import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Form, Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
import { Context } from '../../App';
const Register = () => {
    const context = useContext(Context)
    const [isShowPassword,setisShowPassword] = useState(false)
    const url = context.AppUrl
    const navigate = useNavigate()
    const [FormField,setFormField] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler=(e)=>{
        const {name,value} = e.target;
        setFormField({
            ...FormField,
            [e.target.name]:e.target.value

        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/user/register`, FormField);
            console.log('Registration successful', response);
            if (response.data.success===true || response.status===201) {
                context.openAlertBox("success","Verify Your Email")
                localStorage.setItem('userEmail',FormField.email)
                
                navigate('/verify')
            }
        } catch (error) {
            if (error.response) {
                console.error('Server error:', error.response.data);
                context.openAlertBox("error", error.response.data.message || "An error occurred on the server");
              } else if (error.request) {
                console.error('Network error:', error.request);
                context.openAlertBox("error", "Network error: Please check your internet connection");
              } else {
                console.error('Error:', error.message);
                context.openAlertBox("error", error.message || "An unexpected error occurred");
              }
        }
    }
    
    
    
  return (
    <div className={`section py-10 transition-all ${!context.isSideBarOpen ? 'w-[100%]' : 'w-[82%] ml-[18%]'}`}>
        <div className="container">
            <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10 mt-5">
                <h3 className='text-center !text-[18px] !font-[500] py-2 mb-4'>Sign Up to your account</h3>
                <form onSubmit={handleSubmit} className='w-full'>
                    <div className="form-group w-full mb-5">
                        <TextField onChange={onChangeHandler} value={FormField.name} id="standard-basic" type='text' name='name'  label="Full Name" variant="outlined" className='w-full' />
                    </div>
                    <div className="form-group w-full mb-5">
                    <TextField name="email" value={FormField.email} onChange={onChangeHandler} label="Email" variant="outlined" className='w-full' />
                    </div>
                    <div className="form-group w-full mb-5 relative">
                        <TextField onChange={onChangeHandler} value={FormField.password} id="standard-basic"  type={`${isShowPassword===false ? 'text' : 'password'}`} name='password' label="Password" variant="outlined" className='w-full' />
                        <Button onClick={()=>setisShowPassword(!isShowPassword)}  className='!absolute top-[10px] !text-black right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] opacity-75 '>
                            {
                                isShowPassword===true ?  <FaEye className='text-[20px]' />:<FaEyeSlash className='text-[20px]' />
                            }
                        </Button>
                    </div>
                <div className='flex items-center w-full mt-3 btn-lg'>
                <Button type='submit ' className='btn-org w-full'>Sign Up</Button>
                </div>
                <p className='text-center text-[14px] mb-1'>Do You have already Account? <Link to='/Login' className=' link text-[14px] font-[600 ]'>Login</Link> </p>

                </form>

            </div>
        </div>
    </div>
  )
}

export default Register
