import { useContext, useState } from "react";
import { MdVerified } from "react-icons/md";
import "./OtpVerificationPage.css";
import { ContextDef } from "../components/HomePage/contextDef";

import { useNavigate } from "react-router-dom";


import {  FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { FaHouseUser } from "react-icons/fa6";

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");



  const {authUser,sendVerifyOtpFun,verifyEmail} = useContext(ContextDef)

  const navigate = useNavigate(); // Used to navigate after successful login/signup

  // User details (could be fetched from backend)


  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const move = await login(loginUser);
  //     if(move) navigate('/home')
  //   } catch (error) {
  //     setErrorMessage(error.response?.data?.message || 'Something went wrong');
  //   }
  // };


  // Simulate sending OTP (in a real app, you'd call an API)
  const handleSendOtp = async() => {
    // In a real scenario, an OTP is generated and sent to the user's email
    try {
      const move = await sendVerifyOtpFun();
      setOtpSent(move);
      console.log(move)
    } catch (error) {
      console.log(error.response?.data?.message || 'Something went wrong');
    }

  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Handle OTP verification
  const handleOtpVerification = async() => {
    try {
      const move = await verifyEmail(otp);
      if(move) navigate('/home')
      else setOtpSent(move);
      console.log(move)
    } catch (error) {
      console.log(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="otp-verification-page">
      <div className="otp-verification-container">
        <div className="verification-card">
          <div className="verification-header">
            <h1 className="verification-title">OTP Verification</h1>
            <p className="verification-subtitle">Please verify your identity by entering the OTP sent to your email</p>
          </div>

          <div className="user-details-section">
                
              <img src={authUser.profilePic || 'defaultImg.png' } alt="User Avatar" className="user-avatar-img" />
              
              <div className="Input-Value-Box2"><FaUser/>Full Name</div>
              <div className="Input-Value-Box">{authUser.name}</div>

              <div className="Input-Value-Box2"><MdEmail/>Email Address</div>
              <div className="Input-Value-Box">{authUser.email}</div>

              <div className="Input-Value-Box2"><FaHouseUser/>User Status</div>
              <div className="Input-Value-Box">{authUser.status}</div>

              <div className="Input-Value-Box2"><MdVerified/>is Verified</div>
              <div className="Input-Value-Box">{authUser.isVerified ? "verified" : "Not Verified"}</div>

              
              {otpSent ?
                (<p>To verify your identity, please check your email for the OTP.</p>) :
                (<p>click the bellow button to send OTP!</p>)
              }  
          </div>

          {!otpSent ? (
            <div className="otp-send-section">
              <button className="send-otp-btn" onClick={handleSendOtp}>
                Send OTP
              </button>
            </div>
          ) : (
            <div className="otp-input-section">
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter OTP"
                className="otp-input"
              />
              <button className="verify-btn" onClick={handleOtpVerification}>
                {isVerified ? (
                  <MdVerified className="verified-icon" />
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>
          )}

          {isVerified && (
            <p className="verification-success">Verification Successful!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
