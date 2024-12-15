import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from "axios";



const VerificationPage = () => {
    const location = useLocation();
    const { email } = location.state || {}; // Using fallback if state is undefined
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handle OTP input change and focus on next input
    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/[^0-9]/.test(value)) return; // Prevent non-numeric input

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Focus next input if the current input is filled
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input${index + 2}`).focus();
        }
    };
    console.log(otp);
    // Handle form submission (Verify OTP)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = otp.join("");
        console.log("Verifying OTP for email:", email);
        console.log("OTP:", verificationCode);
        // Handle OTP verification logic here
        try {
            const response = await axios.post("http://localhost:8080/auth/verify", {
                email,
                verificationCode
              });
          
              // Check if response status is OK (200) or based on data received
              if (response.status === 200) {
                  navigate('/login');  // Redirect to a dashboard or appropriate page
              } else {
                  setError("Verification failed");
              }   

          } catch (err) {
            setError("Verify with real email");
            console.error("Login Error:", err);
          }

        
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
        <form onSubmit={handleSubmit} className="w-[400px] h-[400px] bg-white flex flex-col items-center justify-center p-8 gap-6 relative shadow-xl rounded-lg">
            <span className="text-2xl font-bold text-gray-800">Enter OTP</span>
            <p className="text-sm text-center text-black leading-5">We have sent a verification code to your gmail</p>

            <div className="w-full flex gap-3 items-center justify-center">
                {otp.map((value, index) => (
                    <input
                        key={index}
                        required
                        maxLength="1"
                        type="text"
                        className="bg-gray-200 w-12 h-12 text-center border-none rounded-lg caret-indigo-400 text-gray-800 font-semibold focus:ring-2 focus:ring-indigo-300 focus:bg-indigo-100"
                        id={`otp-input${index + 1}`}
                        value={value}
                        onChange={(e) => handleOtpChange(e, index)}
                    />
                ))}
            </div>

            <button type="submit" className="w-full h-12 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-400 transition duration-200">
                Verify
            </button>

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

            <p className="text-sm text-black flex flex-col items-center justify-center gap-1">
                Didn't receive the code?
                <button type="button" className="text-indigo-500 font-semibold hover:underline text-lg">
                    Resend Code
                </button>
            </p>
        </form>
    </div>
    );
}

export default VerificationPage;
