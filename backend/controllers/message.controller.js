import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import StatusVideo from "../models/statusvideo.model.js";
import cloudinary from "../config/cloudinary.js";
import { getReceiverSocketId } from "../config/socket.io.js";
import {io }from "../config/socket.io.js"

export const getAllUsers = async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
  
      res.status(200).json(filteredUsers);
    } catch (error) {
      console.error("Error in getAllUsers ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

export const getMessagesBetweenTwoUsersByIds = async(req,res)=>{
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
    
        const messages = await Message.find({
          $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId },
          ],
        });
    
        res.status(200).json(messages);
      } catch (error) {
        console.log("Error in getMessagesBetweenTwo controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const sendMessageBetweenTwo = async (req, res) => {

    console.log(req)

    try {
      
      console.log("helo")

      const { text,image} = req.body;
     
      const { id: receiverId } = req.params;
      const senderId = req.user._id;

      if(!text && !image)
      {
        return res.status(400).json({ message: "Message is required" });
      }

      let imageUrl;
      if (image) {
        
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });
  
      await newMessage.save();
  
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessageBetweenTwo controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };





//   export const uploadStatus = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { image, video } = req.body;

//     if (!image && !video) {
//       return res.status(200).json({ message: "An image or video URL is required" });
//     }

//     // pick whichever one is provided
//     const fileToUpload = image || video;
//     const uploadResponse = await cloudinary.uploader.upload(fileToUpload, {
//       resource_type: video ? "video" : "image",
//     });

//     const url = uploadResponse.secure_url;
//     const type = uploadResponse.resource_type; // "image" or "video"

//     // save in StatusVideo collection
//     const newStatus = await StatusVideo.create({
//       user: userId,
//       mediaUrl: url,
//       mediaType: type,
//     });

//     // (optional) push to user.statusVideos array
//     await User.findByIdAndUpdate(userId, {
//       $push: { statusVideos: newStatus._id },
//     });

//     return res.status(201).json(newStatus);
//   } catch (err) {
//     console.error("Error in uploadStatus:", err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };



// controllers/statusController.js
export const uploadStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ message: "An image URL is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(image);
    const url = uploadResponse.secure_url;

    // create with videoUrl (per your schema)
    const newStatus = await StatusVideo.create({
      user: userId,
      videoUrl: url,
    });

    // (optional) push to user.statusVideos
    await User.findByIdAndUpdate(userId, {
      $push: { statusVideos: newStatus._id },
    });

    return res.status(201).json({newStatus:newStatus, message: "Status uploaded successfully"});
  } catch (err) {
    console.error("Error in uploadStatus:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};




// 2️⃣ Get all active statuses from your friends
export const getFriendStatuses = async (req, res) => {
  try {
    const userId = req.user._id;

    // fetch your friends list
    const user = await User.findById(userId).select("friends");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // find StatusVideos whose `user` is in your friends array
    // (the TTL index will have already removed any older-than-24h docs)
    const statuses = await StatusVideo.find({
      user: { $in: user.friends },
    })
      .sort({ createdAt: -1 })  // newest first
      .populate("user", "name profilePic");  // optionally include friend’s name & avatar

    return res.json(statuses);
  } catch (err) {
    console.error("Error in getFriendStatuses:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const getMyStatus = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all status videos posted by the current user
    const statuses = await StatusVideo.find({ user: userId })
      .sort({ createdAt: -1 }) // newest first
      .populate("user", "name profilePic"); // include user name and profilePic

    return res.json(statuses);
  } catch (err) {
    console.error("Error in getMyStatus:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


