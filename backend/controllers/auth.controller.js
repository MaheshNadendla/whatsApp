import { generateToken } from '../config/jwtToken.js'
import User from '../models/user.model.js'
import bcrypt from "bcryptjs"
import cloudinary from "../config/cloudinary.js"
import transporter from '../config/nodeMailer.js'
import dotenv from 'dotenv'
import mailTemplate from '../utils/mailTemplate.js'
import verifyOtpTemp from '../utils/verifyOtpTemp.js'
import verifyGoogleTokenAndCreateUser  from "../services/authService.js";
dotenv.config()




// Controller function to handle Google login
export const googleAuth = async (req, res) => {
  const { token } = req.body; // Token sent by the frontend


  try {
    // Verify the token and create/get user from Supabase
    const { user, jwtToken } = await verifyGoogleTokenAndCreateUser(token);

    const { password, ...safeUser } = user;

    res.status(200).json({
      user: user,
      token: jwtToken,
    });



    

    // console.log("User authenticated:", user);
  } catch (error) {
    console.error("Error in Google login:", error.message);
    res.status(400).json({ message: error.message });
  }
};


export const userProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: "Authenticated",
      user: req.user,
    }); 
  } catch (error) {
    console.error("Auth check error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}



export const signup= async(req,res)=>{
    const {name,email,password} = req.body
    try {
       
        if(!name||!email||!password)
        return res.status(200).json({message:"All fields are required"});

        const user = await User.findOne({email})

        if(user) return res.status(200).json({message:"Email already exists"});
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,salt)

        const randomNumber = Math.floor(Math.random() * 100) + 1;

        const randomImage = `https://avatar.iran.liara.run/public/${randomNumber}`

        const newUser = new User({
            name,
            email,
            password:hashPass,
            profilePic:randomImage
        })


        const mailOptions = {
            from: process.env.NODE_MAIL_EMAIL, 
            to: email,
            subject: "Welcome to Our Platform!",
            html: mailTemplate(name,email) 
        };


        if(newUser)
        {
            generateToken(newUser._id,res)
            await newUser.save();
            await transporter.sendMail(mailOptions)

            res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                profilePic:newUser.profilePic,
                isVerified:newUser.isVerified,
            })

        }
        else{
            res.status(400).json({message:"Invalid user data"});
        }

        
    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const login= async(req,res)=>{
    const {email,password} = req.body
    try {
       
        if(!email||!password)
        return res.status(200).json({message:"All fields are required"});

        const user = await User.findOne({email})

        if(!user) return res.status(200).json({message:"Invalid credentials"});

        const isPassCorrect = await bcrypt.compare(password,user.password)

        if(!isPassCorrect){
            return res.status(200).json({message:"Invalid credentials"});
        }
        
        generateToken(user._id,res)
        
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profilePic:user.profilePic,
            isVerified:user.isVerified,
        })

    } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out sucessfully"})
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const updateProfile = async (req, res) => {
    try {
      const { profilePic } = req.body;
      const userId = req.user._id;
  
      if (!profilePic) {
        return res.status(400).json({ message: "Profile pic is required" });
      }
  
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("error in update profile", error);
      res.status(500).json({ message: "Internal server error" });
    }
}
export const checkAuth = (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.log("Error in checkAuth controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
}
export const sendVerificationOtp= async(req,res)=>{
    const userId = req.user._id;
    const email = req.user.email;
    try {
       
        if(!userId || !email)
        return res.status(200).json({message:"Unauthorized - No Token Provided"});

        const user = await User.findOne({email})

        if(!user) return res.status(200).json({message:"Invalid credentials"});

        if(user.isVerified){
            return res.status(200).json({message:"Your Account Already Verified"});
        }

        const otp = String(Math.floor(100000+(Math.random()*900000)))

        user.veficationOtp=otp;
        user.veficationOtpExpiresAt=Date.now()+2*60*1000;
        await user.save();

        const mailOptions = {
            from: process.env.NODE_MAIL_EMAIL, 
            to: email,
            subject: "Welcome to Our Platform!",
            html: verifyOtpTemp(user.name,email,otp) 
        };

        await transporter.sendMail(mailOptions);
        
        res.status(201).json({message:"verification Otp send to Your Email"})

    } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const verifyEmail= async(req,res)=>{
    const userId = req.user._id;
    const {otp} = req.body;
    try {
       
        if(!userId)
        {
            console.log(userId,otp)
            return res.status(200).json({message:"Unauthorized User"});
        }

        const user = await User.findById(userId)

        if(!user) return res.status(200).json({message:"Invalid credentials"});

        // if(user.isVerified){
        //     return res.status(200).json({message:"Your Account Already Verified"});
        // }

        if(user.veficationOtp === "" || user.veficationOtp !== otp){
            return res.status(200).json({message:"Invalid Otp"});
        }

        if(user.veficationOtpExpiresAt < Date.now()){

            console.log("user.veficationOtpExpiresAt : ",user.veficationOtpExpiresAt,"Date.now() : ",Date.now())
            return res.status(200).json({message:"Otp Expired"});
        }

        user.isVerified=true;
        user.veficationOtp="";
        user.veficationOtpExpiresAt=0;
        await user.save(); 
        res.status(201).json({message:"Your Email Verified Sucessfully"})

    } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}