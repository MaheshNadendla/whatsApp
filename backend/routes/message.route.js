import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
// getAllUsers,=>bellow
import {   getMessagesBetweenTwoUsersByIds, sendMessageBetweenTwo, uploadStatus,getFriendStatuses, getMyStatus } from "../controllers/message.controller.js";
import { getMyFriends } from "../controllers/user.controller.js";

const router = express.Router();


router.get("/users",protectRoute,getMyFriends)
router.get("/:id",protectRoute,getMessagesBetweenTwoUsersByIds)

router.post("/send/:id",protectRoute,sendMessageBetweenTwo)

router.post("/status", protectRoute, uploadStatus);
router.get("/status/friends", protectRoute, getFriendStatuses);
router.get("/status/my", protectRoute, getMyStatus);



export default router;