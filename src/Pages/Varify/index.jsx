import { useContext, useState } from "react";
import { Context } from '../../App';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate()
  const context = useContext(Context);
  const [otp, setOtp] = useState(""); 
  const [error, setError] = useState("");
  const url = context.AppUrl;

  const handleVerify = async () => {
    try {
      if (otp.length !== 6) {
        setError("Please enter a valid 6-digit OTP.");
      } else {
        var ot = parseInt(otp)
        const email = localStorage.getItem('userEmail');

        const response = await axios.post(`${url}/api/user/verifyEmail`, { otp:ot, email });
        console.log('OTP Response:', response);

        if (response.status === 200) {
          const current = localStorage.getItem('forgetPassword')
          if (current!=='true') { 
            context.openAlertBox('success','Your Otp is Verified')
            navigate('/')
          }else{
            navigate('/newpassword')

          }
        } else {
          context.openAlertBox('error','Verification failed. Please try again.')
        }
      }
    } catch (error) {
          context.openAlertBox('error',error.message || error)
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[300px] bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-center text-xl font-semibold">Verify OTP</h2>
        <p className="text-gray-600 text-sm text-center mt-2"> OTP sent on Your Emaill address</p>
        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          className="w-full mt-4 p-2 border border-gray-300 rounded-md text-center text-xl tracking-widest"
          value={otp}
          onChange={(e) => setOtp(e.target.value)} // Ensure otp is treated as a string
        />
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        <button
          className="btn-org btn-lg w-full mt-4 bg-blue-500 text-white py-2 rounded-md transition-all duration-300"
          onClick={handleVerify}
        >
          Verify
        </button>
        {/* <p className="text-center text-sm text-gray-500 mt-2">
          Didn’t receive OTP? <span className="text-blue-500 cursor-pointer link">Resend</span>
        </p> */}
      </div>
    </div>
  );
};

export default Verify;
