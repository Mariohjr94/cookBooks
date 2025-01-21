import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Avatar,
} from "@mui/material";
import axiosInstance from "../app/axiosInstancs";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../features/auth/authSlice";
import { useUpdateProfileMutation } from "../features/auth/authSlice"; //


const EditProfileModal = ({ open, handleClose, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [avatar, setAvatar] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const [updateProfile] = useUpdateProfileMutation();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
        setAvatar(URL.createObjectURL(selectedFile)); // Preview the image
      }
  };


const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    if (file) {
      formData.append("avatar", file);
    }

    try {
      // Use RTK Query mutation to update the profile
      const updatedUser = await updateProfile(formData).unwrap();
      console.log("Profile updated successfully:", updatedUser);

      // Update Redux store with the updated user
      dispatch(updateUserProfile(updatedUser));

      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };


  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Profile
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Avatar Preview */}
          <Avatar
            src={avatar || user.avatar}
            alt="Avatar"
            sx={{ width: 100, height: 100 }}
          />
          {/* Drag-and-Drop Box */}
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              p: 2,
              width: "100%",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => document.getElementById("avatarInput").click()}
          >
            {file ? (
              <Typography>{file.name}</Typography>
            ) : (
              <Typography>
                {user?.avatar
                  ? "Replace Avatar"
                  : "Click or Drag an Avatar Here"}
              </Typography>
            )}
            <input
              id="avatarInput"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
            />
          </Box>

          {/* Name Field */}
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Username Field */}
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Save Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;
