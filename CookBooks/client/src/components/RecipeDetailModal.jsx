import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import axiosInstance from "../app/axiosInstancs";

const RecipeDetailModal = ({ open, recipe, onClose, onDelete, onEdit }) => {
  if (!recipe) return null;

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/recipes/${recipe.id}`);
      onDelete(recipe.id); // Notify parent to update the recipes list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error deleting recipe:", error.response?.data || error.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 0,
          p: 4,
          width: "90%",
          maxWidth: "600px",
        }}
      >
        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        )}
        <Typography
          variant="h5"
          sx={{ mt: 2, textAlign: "center", fontWeight: "bold" }}
        >
          {recipe.title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {recipe.description || "No description available."}
        </Typography>
      <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ flex: 1, mr: 1 }}
          >
            Delete
          </Button>
           <Button
            variant="contained"
            color="secondary"
            onClick={() => onEdit(recipe)} // Trigger the onEdit callback
            sx={{ flex: 1, mx: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
            sx={{ flex: 1, ml: 1 }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RecipeDetailModal;
