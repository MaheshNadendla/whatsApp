// import React, { useState } from 'react'
// import "./SignUpLogin.css"

// function SignUpLogin() {


//     const [signUpUser, setSignUpUser] = useState({
//         name : "",
//         email: "",
//         password : "",
//     });

//     const [loginUser, setLoginUser] = useState({
//         name : "",
//         password : "",
//     });


//     console.log(signUpUser);
//     console.log(loginUser);
    



//   return (
//     <div className='SignUpLogin'>
//         <input type="checkbox" id="flip" />

//         <div className="cover">
//         <div className="front info-container">
//             <h1 id="info-title">Join Us!</h1>
//             <p id="info-message">
//             Sign up to create an account and explore our features.
//             </p>
//         </div>
//         <div className="back info-container">
//             <h1 id="info-title">Welcome Back!</h1>
//             <p id="info-message">
//             To stay connected, please login with your personal information.
//             </p>
//         </div>
//         </div>

//         <div className="wrapper">
//         <form action="#">
//             <h2>Sign Up</h2>
//             <div className="input-field">

//             <input type="text" onChange={(e)=>{
//                 setSignUpUser((p)=>{ 
//                     return{...p,name:e.target.value}
//                 })
//             }} required />

//             <label>Enter your name</label>
//             </div>
//             <div className="input-field">
//             <input type="text" onChange={(e)=>{
//                 setSignUpUser((p)=>{ 
//                     return{...p,email:e.target.value}
//                 })
//             }}  required />
//             <label>Enter your email</label>
//             </div>
//             <div className="input-field">
//             <input type="password" onChange={(e)=>{
//                 setSignUpUser((p)=>{ 
//                     return{...p,password:e.target.value}
//                 })
//             }} required />
//             <label>Enter your password</label>
//             </div>
//             <button type="submit">Register</button>
//             <div className="register">
//             <p>
//                 have an account?
//                 <label className="orange" htmlFor="flip">Login now</label>
//             </p>
//             </div>
//         </form>
//         </div>

//         <div className="wrapper">
//         <form action="#">
//             <h2>Login</h2>
//             <div className="input-field">
//             <input type="text" onChange={(e)=>{
//                 setLoginUser((p)=>{ 
//                     return{...p,name:e.target.value}
//                 })
//             }} required />
//             <label>Enter your name</label>
//             </div>
//             <div className="input-field">
//             <input type="password" onChange={(e)=>{
//                 setLoginUser((p)=>{ 
//                     return{...p,password:e.target.value}
//                 })
//             }} required />
//             <label>Enter your password</label>
//             </div>
//             <div className="forget">
//             <label htmlFor="remember">
//                 <input type="checkbox" id="remember" />
//                 <p>Remember me</p>
//             </label>
//             <a href="#">Forgot password?</a>
//             </div>
//             <button type="submit">Log In</button>
//             <div className="register">
//             <p>
//                 Don't have an account?
//                 <label className="orange" htmlFor="flip">Sigup now</label>
//             </p>
//             </div>
//         </form>
//         </div>
      
//     </div>
//   )
// }

// // export default SignUpLogin
// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// // import './SignUpLogin.css';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast'
// import { axiosInstance } from '../../lib/axios';
// import { ContextDef } from '../HomePage/contextDef';

// import BtnLoader from '../utils/BtnLoader';

// import { useGoogleLoginBtn } from "../../Context/GoogleLoginProvider.jsx";

// function SignUpLogin() {
//   const navigate = useNavigate();

//   const {login,signup,isLoggingIn,isSigningUp,authUser} = useContext(ContextDef)

//     const { triggerLogin } = useGoogleLoginBtn(); 

 
  
//   const [signUpUser, setSignUpUser] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });



//   const [loginUser, setLoginUser] = useState({
//     email: '',
//     password: '',
//   });

//    const [errorMessage, setErrorMessage] = useState('');

//   const handleSignUpSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const move = await signup(signUpUser);
//       if(move) navigate('/home')
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Something went wrong');
//     }
//   };

//   // Handle Login Submit
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const move = await login(loginUser);
//       if(move) navigate('/home')
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <>
//       <style>{`
//         /* --- Background and Global Setup --- */
//         .SignUpLogin {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           min-height: 100vh;
//           width: 100%;
//           padding: 20px;
//           background: linear-gradient(45deg, red, blue, red);
//           background-size: 400% 400%;
//           animation: gradientShift 6s ease infinite;
//           font-family: 'Poppins', sans-serif;
//         }

//         @keyframes gradientShift {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         /* --- Container --- */
//         .auth-container {
//           position: relative;
//           width: 100%;
//           max-width: 400px;
//           min-height: 500px;
//           perspective: 2700px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         /* --- Flip Toggle --- */
//         .auth-container #flip {
//           display: none;
//         }

//         /* --- Forms (Always Centered) --- */
//         .forms {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           width: 100%;
//           max-width: 400px;
//           min-height: 500px;
//           transition: transform 1s ease-in-out;
//           transform-style: preserve-3d;
//         }

//         #flip:checked ~ .forms {
//           transform: translate(-50%, -50%) rotateY(-180deg);
//         }

//         /* --- Common Wrapper --- */
//         .wrapper {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           padding: 30px;
//           text-align: center;
//           border: 1px solid rgba(255, 255, 255, 0.5);
//           background-color: rgba(255, 255, 255, 0.1);
//           backdrop-filter: blur(10px);
//           -webkit-backdrop-filter: blur(10px);
//           backface-visibility: hidden;
//           border-radius: 10px;
//         }

//         .wrapper.login-wrapper {
//           transform: rotateY(0deg);
//         }

//         .wrapper.signup-wrapper {
//           transform: rotateY(180deg);
//         }

//         /* --- Form Content --- */
//         .wrapper form {
//           display: flex;
//           flex-direction: column;
//           height: 100%;
//         }

//         .wrapper h2 {
//           font-size: 2rem;
//           margin-bottom: 20px;
//           color: #fff;
//         }

//         .input-field {
//           position: relative;
//           border-bottom: 2px solid #ccc;
//           margin: 15px 0;
//           background-color:transparent;;
//         }

//         .input-field label {
//           position: absolute;
//           top: 50%;
//           left: 0;
//           transform: translateY(-50%);
//           color: #fff;
//           font-size: 16px;
//           pointer-events: none;
//           transition: 0.2s ease;
//         }

//         .input-field input {
//           width: 100%;
//           height: 40px;
//           background: transparent;
//           border: none;
//           outline: none;
//           font-size: 16px;
//           color: #fff;
//         }

//         .input-field input:focus ~ label,
//         .input-field input:valid ~ label,
//         .input-field input:not(:placeholder-shown) ~ label
//          {
//           font-size: 0.8rem;
//           top: -5px;
//           transform: translateY(-100%);
//         }

//         .forget {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           margin: 25px 0 35px 0;
//           color: #fff;
//           font-size: 14px;
//         }

//         #remember {
//           accent-color: #fff;
//         }

//         .forget label {
//           display: flex;
//           align-items: center;
//           cursor: pointer;
//         }

//         .forget label p {
//           margin-left: 8px;
//         }

//         .wrapper a {
//           color: #efefef;
//           text-decoration: none;
//         }

//         .wrapper a:hover {
//           text-decoration: underline;
//         }

//         .wrapper button {
//           background: #fff;
//           color: #000;
//           font-weight: 600;
//           border: none;
//           padding: 12px 20px;
//           cursor: pointer;
//           border-radius: 5px;
//           font-size: 16px;
//           border: 2px solid transparent;
//           transition: 0.3s ease;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           min-height: 45px;
//         }

//         .wrapper button:hover {
//           color: #fff;
//           border-color: #fff;
//           background: rgba(255, 255, 255, 0.15);
//         }

//         .register {
//           text-align: center;
//           margin-top: auto;
//           padding-top: 15px;
//           color: #fff;
//           font-size: 14px;
//         }

//         .orange {
//           color: orange;
//           cursor: pointer;
//           font-weight: 600;
//         }

//         /* --- Error Message --- */
//         .error-message {
//           position: fixed;
//           bottom: 20px;
//           left: 50%;
//           transform: translateX(-50%);
//           background-color: #ff4d4d;
//           color: white;
//           padding: 10px 20px;
//           border-radius: 5px;
//           z-index: 1000;
//           font-size: 14px;
//         }

//         /* --- Loader --- */
//         .btn-loader {
//           border: 3px solid rgba(0, 0, 0, 0.2);
//           border-left-color: #555;
//           border-radius: 50%;
//           width: 20px;
//           height: 20px;
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
//       `}</style>

//       <div className="SignUpLogin">
//         <div className="auth-container">
//           <input type="checkbox" id="flip" />

//           <div className="forms">
//             {/* --- Login Form --- */}
//             <div className="wrapper login-wrapper">
//               <form onSubmit={handleLoginSubmit}>
//                 <h2>Login</h2>
//                 <div className="input-field">
//                   <input
//                     type="email"
//                     onChange={(e) =>
//                       setLoginUser({ ...loginUser, email: e.target.value })
//                     }
//                     required
//                   />
//                   <label>Enter your email</label>
//                 </div>
//                 <div className="input-field">
//                   <input
//                     type="password"
//                     onChange={(e) =>
//                       setLoginUser({ ...loginUser, password: e.target.value })
//                     }
//                     required
//                   />
//                   <label>Enter your password</label>
//                 </div>
//                 <div className="forget">
//                   <label htmlFor="remember">
//                     <input type="checkbox" id="remember" />
//                     <p>Remember me</p>
//                   </label>
//                   <a href="#">Forgot password?</a>
//                 </div>
//                 <button type="submit">
//                   {isLoggingIn ? <BtnLoader /> : "Log In"}
//                 </button>
//                 <div className="register">
//                   <p>
//                     Don't have an account?{' '}
//                     <label className="orange" htmlFor="flip">
//                       Sign Up now
//                     </label>
//                   </p>
//                 </div>
//               </form>
//             </div>

//             {/* --- Sign-Up Form --- */}
//             <div className="wrapper signup-wrapper">
//               <form onSubmit={handleSignUpSubmit}>
//                 <h2>Sign Up</h2>
//                 <div className="input-field">
//                   <input
//                     type="text"
//                     onChange={(e) =>
//                       setSignUpUser({ ...signUpUser, name: e.target.value })
//                     }
//                     required
//                   />
//                   <label>Enter your name</label>
//                 </div>
//                 <div className="input-field">
//                   <input
//                     type="email"
//                     onChange={(e) =>
//                       setSignUpUser({ ...signUpUser, email: e.target.value })
//                     }
//                     required
//                   />
//                   <label>Enter your email</label>
//                 </div>
//                 <div className="input-field">
//                   <input
//                     type="password"
//                     onChange={(e) =>
//                       setSignUpUser({ ...signUpUser, password: e.target.value })
//                     }
//                     required
//                   />
//                   <label>Enter your password</label>
//                 </div>
//                 <button type="submit">
//                   {isSigningUp ? <BtnLoader /> : "Register"}
//                 </button>
//                 <div className="register">
//                   <p>
//                     Have an account?{' '}
//                     <label className="orange" htmlFor="flip">
//                       Login now
//                     </label>
//                   </p>
//                 </div>

//                     <div
//                                   //  style={googleBtn}
//                                    onClick={triggerLogin} 
//                                    onMouseEnter={(e) => {
//                                       e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
//                                       e.currentTarget.style.backgroundColor = "#f8f9fa";
//                                    }}
//                                    onMouseLeave={(e) => {
//                                       e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)";
//                                       e.currentTarget.style.backgroundColor = "#fff";
//                                    }}
//                                 > continue with google
//                       </div>

//               </form>

              

//             </div>
//           </div>
//         </div>

//         {errorMessage && <div className="error-message">{errorMessage}</div>}
//       </div>
//     </>
//   );
// }

// export default SignUpLogin;










///op design



// import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useGoogleLoginBtn } from "../../Context/GoogleLoginProvider.jsx";
// import { ContextDef } from '../HomePage/contextDef';

// function SignUpLogin() {
//   const navigate = useNavigate();
//   const { authUser } = useContext(ContextDef);
//   const { triggerLogin } = useGoogleLoginBtn();

//   // Optional: If user is already logged in, redirect them
//   useEffect(() => {
//     if (authUser) {
//       navigate('/home');
//     }
//   }, [authUser, navigate]);

//   return (
//     <>
//       <style>{`
//         /* --- Global Reset & Fonts --- */
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

//         * {
//           box-sizing: border-box;
//           margin: 0;
//           padding: 0;
//         }

//         .landing-container {
//           position: relative;
//           width: 100%;
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           font-family: 'Inter', sans-serif;
//           background-color: #0f172a; /* Dark Navy Background */
//           overflow: hidden;
//         }

//         /* --- Animated Background Blobs --- */
//         .blob {
//           position: absolute;
//           filter: blur(80px);
//           z-index: 1;
//           opacity: 0.6;
//           animation: float 10s infinite ease-in-out alternate;
//         }

//         .blob-1 {
//           top: -10%;
//           left: -10%;
//           width: 500px;
//           height: 500px;
//           background: #7c3aed; /* Purple */
//           animation-delay: 0s;
//         }

//         .blob-2 {
//           bottom: -10%;
//           right: -10%;
//           width: 400px;
//           height: 400px;
//           background: #2563eb; /* Blue */
//           animation-delay: -2s;
//         }

//         .blob-3 {
//           top: 40%;
//           left: 40%;
//           width: 300px;
//           height: 300px;
//           background: #059669; /* Chat Green */
//           animation-delay: -5s;
//         }

//         @keyframes float {
//           0% { transform: translate(0, 0) scale(1); }
//           100% { transform: translate(30px, 50px) scale(1.1); }
//         }

//         /* --- Glass Card --- */
//         .glass-card {
//           position: relative;
//           z-index: 10;
//           width: 90%;
//           max-width: 420px;
//           padding: 40px;
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(20px);
//           -webkit-backdrop-filter: blur(20px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 24px;
//           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
//           text-align: center;
//           color: white;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 20px;
//         }

//         /* --- Typography --- */
//         .app-logo {
//           font-size: 3rem;
//           margin-bottom: 10px;
//           background: linear-gradient(135deg, #4ade80 0%, #3b82f6 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           font-weight: 800;
//         }

//         .tagline {
//           font-size: 1.1rem;
//           color: #94a3b8;
//           margin-bottom: 20px;
//           line-height: 1.5;
//         }

//         /* --- Google Button Styling --- */
//         .google-btn {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 12px;
//           width: 100%;
//           padding: 14px;
//           background: white;
//           border-radius: 12px;
//           border: none;
//           cursor: pointer;
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//           text-decoration: none;
//           position: relative;
//           overflow: hidden;
//         }

//         .google-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
//           background: #f8fafc;
//         }

//         .google-btn:active {
//           transform: translateY(0);
//         }

//         .google-btn span {
//           color: #1e293b;
//           font-weight: 600;
//           font-size: 16px;
//         }

//         /* Google Icon SVG wrapper */
//         .g-icon {
//           width: 24px;
//           height: 24px;
//         }

//         /* --- Decoration Lines --- */
//         .divider {
//           width: 100%;
//           height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
//           margin: 20px 0;
//         }

//         .footer-text {
//           font-size: 0.8rem;
//           color: #64748b;
//         }
//       `}</style>

//       <div className="landing-container">
//         {/* Animated Background Elements */}
//         <div className="blob blob-1"></div>
//         <div className="blob blob-2"></div>
//         <div className="blob blob-3"></div>

//         {/* Main Content Card */}
//         <div className="glass-card">
//           {/* You can replace this text with an <img /> logo if you have one */}
//           <h1 className="app-logo">ChatVerse</h1>
          
//           <p className="tagline">
//             Experience seamless messaging. <br />
//             Connect with your world, instantly.
//           </p>

//           <div className="divider"></div>

//           {/* Google Login Button */}
//           <button 
//             className="google-btn" 
//             onClick={triggerLogin}
//             aria-label="Continue with Google"
//           >
//             {/* Google 'G' Logo SVG */}
//             <svg className="g-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
//               <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
//               <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
//               <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
//             </svg>
//             <span>Continue with Google</span>
//           </button>

//           <div className="divider"></div>

//           <p className="footer-text">Secure • Fast • Reliable</p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SignUpLogin;





// // export default SignUpLogin
// import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useGoogleLoginBtn } from "../../Context/GoogleLoginProvider.jsx";
// import { ContextDef } from '../HomePage/contextDef';

// function SignUpLogin() {
//   const navigate = useNavigate();
//   const { authUser } = useContext(ContextDef);
//   const { triggerLogin } = useGoogleLoginBtn();

//   // Redirect if already logged in
//   useEffect(() => {
//     if (authUser) {
//       navigate('/home');
//     }
//   }, [authUser, navigate]);

//   return (
//     <>
//       <style>{`
//         /* --- WhatsApp Style Reset & Fonts --- */
//         @import url('https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@400;500;700&family=Segoe+UI:wght@400;600&display=swap');

//         * {
//           box-sizing: border-box;
//           margin: 0;
//           padding: 0;
//         }

//         body {
//           background-color: #d1d7db; /* WhatsApp background gray */
//           font-family: 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
//           -webkit-font-smoothing: antialiased;
//         }

//         .wa-container {
//           position: relative;
//           width: 100%;
//           min-height: 100vh;
//           display: flex;
//           flex-direction: column;
//         }

//         /* --- The Green Top Strip --- */
//         .green-strip {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 220px;
//           background-color: #00a884; /* Signature Green */
//           z-index: 0;
//         }

//         /* --- Main Content Wrapper --- */
//         .content-wrapper {
//           position: relative;
//           z-index: 10;
//           max-width: 1000px;
//           margin: 0 auto;
//           width: 100%;
//           padding: 28px 20px 0;
//           display: flex;
//           flex-direction: column;
//           height: 100vh;
//         }

//         /* --- Header (Logo + Text) --- */
//         .wa-header {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           color: white;
//           margin-bottom: 28px;
//           padding-left: 15px;
//         }

//         .wa-header svg {
//           height: 35px;
//           fill: white;
//         }

//         .wa-header span {
//           font-size: 14px;
//           font-weight: 600;
//           letter-spacing: 1px;
//           text-transform: uppercase;
//         }

//         /* --- The White Login Card --- */
//         .login-card {
//           background: white;
//           border-radius: 3px;
//           box-shadow: 0 17px 50px 0 rgba(11,20,26,.19), 0 12px 15px 0 rgba(11,20,26,.24);
//           display: flex;
//           flex-direction: row; /* Split layout like WA Web */
//           overflow: hidden;
//           height: 70vh; /* Adjust height as needed */
//           min-height: 550px;
//           max-height: 700px;
//           width: 100%;
//         }

//         /* --- Left Side (Instructions) --- */
//         .left-panel {
//           flex: 1.5;
//           padding: 56px;
//           color: #41525d;
//         }

//         .left-panel h1 {
//           font-size: 28px;
//           font-weight: 300;
//           margin-bottom: 40px;
//           color: #41525d;
//         }

//         .instructions {
//           list-style: none;
//         }

//         .instructions li {
//           font-size: 18px;
//           line-height: 28px;
//           margin-bottom: 20px;
//           font-weight: 500;
//         }

//         .highlight {
//           color: #00a884;
//           cursor: pointer;
//         }

//         /* --- Right Side (Action Area) --- */
//         .right-panel {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           border-left: 1px solid #e9edef;
//           padding: 40px;
//           position: relative;
//         }

//         /* --- Google Button --- */
//         .google-btn {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           background: #fff;
//           color: #3c4043;
//           border: 1px solid #dadce0;
//           padding: 12px 24px;
//           border-radius: 24px;
//           font-size: 16px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: background-color .3s;
//           box-shadow: 0 1px 3px rgba(0,0,0,0.08);
//         }

//         .google-btn:hover {
//           background-color: #f7fcfb;
//           border-color: #00a884;
//           color: #00a884;
//           box-shadow: 0 2px 6px rgba(0,0,0,0.12);
//         }

//         .google-icon {
//           width: 20px;
//           height: 20px;
//         }

//         .qr-placeholder {
//             margin-bottom: 30px;
//             text-align: center;
//             color: #8696a0;
//             font-size: 14px;
//         }
        
//         .qr-icon {
//             width: 120px;
//             opacity: 0.1;
//             margin-bottom: 20px;
//         }

//         /* --- Footer (From Meta) --- */
//         .footer {
//           position: absolute;
//           bottom: 20px;
//           width: 100%;
//           text-align: center;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 5px;
//         }

//         .from-text {
//           color: #8696a0;
//           font-size: 12px;
//         }

//         .meta-logo {
//           font-weight: 600;
//           color: #8696a0;
//           font-size: 13px;
//           letter-spacing: -0.5px;
//         }

//         /* --- Mobile Responsiveness --- */
//         @media (max-width: 900px) {
//            .login-card {
//              flex-direction: column;
//              height: auto;
//              max-height: none;
//            }
//            .right-panel {
//              border-left: none;
//              border-top: 1px solid #e9edef;
//              padding: 40px 20px;
//            }
//            .left-panel {
//              padding: 40px 20px;
//              text-align: center;
//            }
//            .green-strip {
//              height: 100px;
//            }
//            .wa-header {
//              margin-bottom: 15px;
//            }
//         }
//       `}</style>

//       <div className="wa-container">
//         <div className="green-strip"></div>

//         <div className="content-wrapper">
//           {/* Header */}
//           <div className="wa-header">
//             <svg viewBox="0 0 33 33" className="wa-logo">
//                <path d="M16.6 0C7.5 0 0 7.5 0 16.7c0 3 .8 5.9 2.3 8.4L.6 33l8.1-2.1c2.4 1.3 5.1 2 7.9 2 9.2 0 16.7-7.5 16.7-16.7S25.8 0 16.6 0zm0 27.6c-2.5 0-4.9-.7-7-1.9l-.5-.3-5.2 1.4 1.4-5.1-.3-.5C3.9 19 3.2 16.6 3.2 14.1c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4-6.1 13.5-13.4 13.5z" fill="#fff"/>
//             </svg>
//             <span>WHATSAPP WEB</span>
//           </div>

//           {/* Card */}
//           <div className="login-card">
//             {/* Left Side */}
//             <div className="left-panel">
//               <h1>Use WhatsApp on your computer</h1>
//               <ul className="instructions">
//                 <li>1. No phone needed. Just sign in and chat</li>
//                 <li>2.Experience <span className="highlight">real-time messaging</span> on a large screen</li>
//                 <li>3. Simple, reliable, and private</li>
//                 <li>4. Syncs seamlessly with your Google account</li>
//                 {/* <li>1. Open WhatsApp on your phone</li>
//                 <li>2. Tap <strong>Menu</strong> or <strong>Settings</strong> and select <strong>Linked Devices</strong></li>
//                 <li>3. This version requires Google Login</li>
//                 <li>4. Click the button to continue <span className="highlight">securely</span></li> */}
//               </ul>
//             </div>

//             {/* Right Side */}
//             <div className="right-panel">
              
//               <div className="qr-placeholder">
//                  {/* WhatsApp Logo as placeholder for QR */}
//                  <svg viewBox="0 0 33 33" className="qr-icon" fill="#000">
//                     <path d="M16.6 0C7.5 0 0 7.5 0 16.7c0 3 .8 5.9 2.3 8.4L.6 33l8.1-2.1c2.4 1.3 5.1 2 7.9 2 9.2 0 16.7-7.5 16.7-16.7S25.8 0 16.6 0z"/>
//                  </svg>
//                  <p>Log in to sync your chats</p>
//               </div>

//               <button className="google-btn" onClick={triggerLogin}>
//                 <svg className="google-icon" viewBox="0 0 24 24">
//                   <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
//                   <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
//                   <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
//                   <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
//                 </svg>
//                 Continue with Google
//               </button>

//               <div className="footer">
//                 <span className="from-text">from DEV</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SignUpLogin;



// export default SignUpLogin
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLoginBtn } from "../../Context/GoogleLoginProvider.jsx";
import { ContextDef } from '../HomePage/contextDef';

function SignUpLogin() {
  const navigate = useNavigate();
  const { authUser } = useContext(ContextDef);
  const { triggerLogin } = useGoogleLoginBtn();

  // REPLACE THIS WITH YOUR GITHUB PROFILE LINK
  const GITHUB_URL = "https://github.com/MaheshNadendla"; 

  useEffect(() => {
    if (authUser) {
      navigate('/home');
    }
  }, [authUser, navigate]);

  return (
    <>
      <style>{`
        /* --- WhatsApp Style Reset & Fonts --- */
        @import url('https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@400;500;700&family=Segoe+UI:wght@400;600&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background-color: #d1d7db;
          font-family: 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .wa-container {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* --- Green Background Strip --- */
        .green-strip {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 220px;
          background-color: #00a884;
          z-index: 0;
        }

        /* --- Content Wrapper --- */
        .content-wrapper {
          position: relative;
          z-index: 10;
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
          padding: 28px 20px 0;
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        /* --- Header --- */
        .wa-header {
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
          margin-bottom: 28px;
          padding-left: 15px;
        }

        .wa-header svg {
          height: 33px;
          fill: white;
        }

        .wa-header span {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* --- Main White Card --- */
        .login-card {
          background: white;
          border-radius: 3px;
          box-shadow: 0 17px 50px 0 rgba(11,20,26,.19), 0 12px 15px 0 rgba(11,20,26,.24);
          display: flex;
          flex-direction: row;
          overflow: hidden;
          height: 70vh;
          min-height: 550px;
          max-height: 700px;
          width: 100%;
        }

        /* --- LEFT SIDE: Features/Welcome --- */
        .left-panel {
          flex: 1.6;
          padding: 56px;
          color: #41525d;
        }

        .left-panel h1 {
          font-size: 28px;
          font-weight: 300;
          margin-bottom: 40px;
          color: #41525d;
        }

        .features-list {
          list-style: none;
        }

        .features-list li {
          font-size: 18px;
          line-height: 28px;
          margin-bottom: 24px;
          font-weight: 400;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        /* Mocking the little bullets/icons in the list */
        .features-list li::before {
           content: '';
           display: inline-block;
           min-width: 20px;
           height: 20px;
           margin-top: 4px;
           background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2300a884'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E");
           background-repeat: no-repeat;
           background-size: contain;
        }

        .highlight {
          color: #00a884;
          font-weight: 500;
        }

        .sub-link {
          color: #00a884;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          margin-top: 40px;
          display: inline-block;
        }
        
        .sub-link:hover {
          text-decoration: underline;
        }

        /* --- RIGHT SIDE: Login Action --- */
        .right-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-left: 1px solid #e9edef;
          padding: 40px;
          position: relative;
          background-color: white;
        }

        .google-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #fff;
          color: #3c4043;
          border: 1px solid #dadce0;
          padding: 14px 28px;
          border-radius: 28px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all .2s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          margin-bottom: 20px;
        }

        .google-btn:hover {
          background-color: #f8f9fa;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          border-color: #d2e3fc;
          transform: translateY(-1px);
        }

        .google-icon {
          width: 22px;
          height: 22px;
        }

        .login-note {
          color: #8696a0;
          font-size: 14px;
          text-align: center;
          max-width: 250px;
          line-height: 1.4;
        }

        /* --- Footer --- */
        .footer {
          position: absolute;
          bottom: 25px;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
        
        .from-text {
          color: #8696a0;
          font-size: 11px;
        }
        
        .meta-logo {
          font-weight: 700;
          color: #8696a0;
          font-size: 12px;
          letter-spacing: 1px;
          cursor: pointer; /* Makes it look clickable */
          transition: color 0.2s;
        }
        
        .meta-logo:hover {
          color: #00a884; /* Highlight color on hover */
        }

        /* --- Mobile --- */
        @media (max-width: 900px) {
           .login-card {
             flex-direction: column;
             height: auto;
           }
           .right-panel {
             border-left: none;
             border-top: 1px solid #e9edef;
             padding: 40px 20px;
           }
           .left-panel {
             padding: 30px;
             text-align: center;
           }
           .features-list li {
             justify-content: center;
           }
        }
      `}</style>

      <div className="wa-container">
        <div className="green-strip"></div>

        <div className="content-wrapper">
          {/* --- Header --- */}
          <div className="wa-header">
            <svg viewBox="0 0 33 33" className="wa-logo">
               <path d="M16.6 0C7.5 0 0 7.5 0 16.7c0 3 .8 5.9 2.3 8.4L.6 33l8.1-2.1c2.4 1.3 5.1 2 7.9 2 9.2 0 16.7-7.5 16.7-16.7S25.8 0 16.6 0zm0 27.6c-2.5 0-4.9-.7-7-1.9l-.5-.3-5.2 1.4 1.4-5.1-.3-.5C3.9 19 3.2 16.6 3.2 14.1c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4-6.1 13.5-13.4 13.5z" fill="#fff"/>
            </svg>
            <span>WHATSAPP WEB</span>
          </div>

          {/* --- Card --- */}
          <div className="login-card">
            
            {/* LEFT: App Highlights */}
            <div className="left-panel">
              <h1>Connect with your world</h1>
              <ul className="features-list">
                <li>
                  No phone needed. Just sign in and chat.
                </li>
                <li>
                  Experience <span className="highlight">real-time messaging</span> on a large screen.
                </li>
                <li>
                  Simple, reliable, and private.
                </li>
                <li>
                  Syncs seamlessly with your Google account.
                </li>
              </ul>
              <a href="#" className="sub-link">Need help to get started?</a>
            </div>

            {/* RIGHT: Login Action */}
            <div className="right-panel">
              
              <button className="google-btn" onClick={triggerLogin}>
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <p className="login-note">
                Securely log in to access your chats and groups.
              </p>

              <div className="footer">
                <span 
                  className="meta-logo" 
                  onClick={() => window.open(GITHUB_URL, "_blank")}
                >
                  DEV
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpLogin;
