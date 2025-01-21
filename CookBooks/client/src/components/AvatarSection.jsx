import React from "react";
import { useState } from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import EditProfileModal from "./EditProfileModal";

const AvatarSection = ({ user, recipeCount }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

     // Open the modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
        }}
        >
        {/* Avatar */}
        <Avatar
            alt={user?.name}
            src={user.avatar}
            sx={{
            width: "100px",
            height: "100px",
            mb: 2,
            mt: "2rem",
            }}
        />

        {/* User Info */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            {user?.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
            @{user?.username}
        </Typography>

        {/* Followers/Following */}
        <Box sx={{ display: "flex", gap: "1rem", mb: 2 }}>
            <Typography variant="body2">
            {recipeCount} {recipeCount === 1 ? "Recipe" : "Recipes"} Uploaded
            </Typography>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: "1rem" }}>
           <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleOpenModal}
            >
            Edit Profile
        </Button>
        </Box>
        {/* Edit Profile Modal */}
        <EditProfileModal
            open={isModalOpen}
            handleClose={handleCloseModal}
            user={user} // Pass user data to the modal
        />
        </Box>
    );
};

export default AvatarSection;
