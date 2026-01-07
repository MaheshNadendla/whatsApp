import { useContext, useState } from "react";

import { FaCamera, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import "./ProfilePage.css"; // <-- import the CSS here
import { ContextDef } from "../components/HomePage/contextDef";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useContext(ContextDef)
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h1 className="profile-title">Profile</h1>
            <p className="profile-subtitle">Your profile information</p>
          </div>

          <div className="profile-avatar-section">
            <div className="profile-avatar-wrapper">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="profile-avatar"
              />
              <label
                htmlFor="avatar-upload"
                className={`avatar-upload-btn ${isUpdatingProfile ? "uploading" : ""}`}
              >
                <FaCamera className="camera-icon" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="avatar-helper-text">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="profile-info">
            <div className="info-group">
              <div className="info-label">
                <FaUser className="info-icon" />
                Full Name
              </div>
              <p className="info-data">{authUser?.name}</p>
            </div>

            <div className="info-group">
              <div className="info-label">
                <MdEmail className="info-icon" />
                Email Address
              </div>
              <p className="info-data">{authUser?.email}</p>
            </div>
          </div>

          <div className="account-info">
            <h2 className="account-title">Account Information</h2>
            <div className="account-details">
              <div className="account-row">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="account-row no-border">
                <span>Account Status</span>
                <span className="active-status">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;

