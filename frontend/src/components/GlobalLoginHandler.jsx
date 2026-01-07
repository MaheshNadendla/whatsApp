// src/components/GlobalLoginHandler.jsx

import React, { useRef, useEffect, useCallback, useContext } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useGoogleLoginBtn } from "../Context/GoogleLoginProvider.jsx";
// You will need to import your slices/services here to handle the success callback
import { authenticateWithGoogle } from "../services/authService.jsx";
import { setSignupData, setToken } from "../slices/authSlice.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ContextDef } from "./HomePage/contextDef.jsx";

export default function GlobalLoginHandler({ onLoginSuccess }) {
  const googleButtonRef = useRef(null);
  const { setTriggerLogin } = useGoogleLoginBtn();

  const{setAuthUser}=useContext(ContextDef)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // The function that handles the successful Google response
  const handleLoginSuccess = async (response) => {
    const token = response.credential;
    try {
      const res = await authenticateWithGoogle(token);

      console.log("final response : ",res)

      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      dispatch(setToken(res.data.token));
      dispatch(setSignupData(res.data.user));

      // Use a custom success prop if needed, or just navigate
      if (onLoginSuccess) onLoginSuccess(); 
      
      toast.success("Logged in successfully!");

      console.log(res.data.user)

      setAuthUser(res.data.user); // <= error here telling setAuthuser is not a function

      
      
      navigate("/home");

    } catch (error) {

      console.log("inside the global login handler")

      console.error("Login error:", error);
      toast.error("Google login failed!");
    }
  };
  
  // The function that programmatically clicks the hidden button
  const triggerGoogleLogin = useCallback(() => {
    const googleBtn = googleButtonRef.current?.querySelector('div[role="button"]');
    if (googleBtn) googleBtn.click();
    console.log("Programmatic Google Login Triggered!");
  }, []);

  // Set the trigger function in the Context only once
  useEffect(() => {
    setTriggerLogin(triggerGoogleLogin);
  }, [setTriggerLogin, triggerGoogleLogin]);


  return (
    // The hidden GoogleLogin component
    <div ref={googleButtonRef} style={{ position: "absolute", left: "-9999px", visibility: "hidden" }}>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log("Login Failed")} />
    </div>
  );
}