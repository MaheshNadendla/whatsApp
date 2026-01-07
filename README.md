# MERN Stack Project Setup

# Step 1: Navigate to 'Code' folder (present in 'Batch No 6' directory)

cd Code

# Step 2: Create .env file inside the 'server' folder

cd server
touch .env
echo ".env file created in server folder"
echo "Now open 'envSetUp.txt' from the Code folder and copy its content into the .env file"
read -p "Press Enter after adding the environment variables..."

# Step 3: Install backend dependencies
npm install
echo "Backend dependencies installed"

# Step 4: Move to frontend folder
cd ../frontend

# Step 5: Install frontend dependencies
npm install
echo "Frontend dependencies installed"

# Step 6: Instructions to run the project
echo "To start the servers, open two terminals:"
echo "Terminal 1: cd Code/server && npm start"
echo "Terminal 2: cd Code/frontend && npm start"


# step 7: Wait for frontend to start
sleep 5

# step 8: Open User A (normal browser)
echo "Opening Chrome for User A (normal)..."
google-chrome "http://localhost:3000" &

# step 9: Wait a bit
sleep 2

# step 10: Open User B (incognito browser)
echo "Opening Chrome for User B (incognito)..."
google-chrome --incognito "http://localhost:3000" &

echo "Both instances running. Use different accounts to simulate chat."



# if any error occurs in project please visit bellow git hub link

https://github.com/MaheshNadendla/MiniProject

# you clone the above link to get project

# reference

https://github.com/MaheshNadendla/chatApp


# copyright claim all rights belongs to "https://github.com/MaheshNadendla/MiniProject"


# about projet

##########################################################################################################################################################################


# ChatApp - Real-Time Messaging App (MERN Stack)

ChatApp is a real-time chat application built using the MERN stack, enhanced with secure authentication, image sharing, images status support, and email verification.

##  Tech Stack
- **Frontend:** React, React Router DOM, React Icons, React Hot Toast
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Realtime:** Socket.IO (server & client)
- **Authentication:** JWT, bcryptjs, cookie-parser
- **File Uploads:** Cloudinary (images, status images)
- **Email Services:** Nodemailer
- **Dev Tools:** Dotenv, Nodemon, Postman, VS Code

##  Authentication
- By Google

##  Core Features
- Real-time messaging with Socket.IO
- Send & receive image messages
- Status images uploads (auto expire after 24 hours)
- Friend request system
- User lastSeen, online status
- Toast notifications on all key actions

##  Database Schemas (Mongoose)
### User
- name, email, password, profilePic
- isVerified, veficationOtp, lastSeen, friends
- statusVideos (array)

### FriendRequest
- sender, recipient, status ('pending', 'accepted')

### Message
- senderId, receiverId, text, image

### StatusVideo
- videoUrl, createdAt (TTL auto-deletion after 24 hrs)

##  API Testing
- All routes tested in Postman (auth, chat, status)
- JWT and cookies validated
- Media uploads verified via Cloudinary

##  Development
- VS Code for development
- Nodemon for backend hot reload
- .env for managing secrets (Mongo URI, JWT, Email, Cloudinary)




