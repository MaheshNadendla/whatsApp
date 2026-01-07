import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleTokenAndCreateUser = async (token) => {
  try {
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture, sub: googleId } =
      ticket.getPayload();

    // Check if user already exists
    let user = await User.findOne({
      $or: [{ googleId }, { email }],
    });

    // Create user if not exists
    if (!user) {
      user = new User({
        name,
        password:"hello",
        email,
        googleId,
        profilePic: picture,
        isVerified: true,
      });

      await user.save();
    }

    // JWT payload
    const jwtPayload = {
      id: user._id,
      googleId: user.googleId,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    };

    // Generate JWT
    const jwtToken = jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { user, jwtToken };
  } catch (error) {
    console.error("Google Auth Error:", error.message);
    throw new Error("Google token verification failed");
  }
};

export default verifyGoogleTokenAndCreateUser;
