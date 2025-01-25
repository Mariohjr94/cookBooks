import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import axiosInstance from "../app/axiosInstancs";

const AddRecipeModal = ({ open, handleClose, categories, fetchRecipes, recipe }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // Populate form fields when editing
useEffect(() => {
  if (recipe) {
    // Populate fields for editing
    setTitle(recipe.title || "");
    setDescription(recipe.description || "");
    setCategory(recipe.category_id || "");
    setFile(null); // Reset file input
  } else if (open) {
    // Clear fields when the modal is opened for a new recipe
    setTitle("");
    setDescription("");
    setCategory("");
    setFile(null);
  }
}, [recipe, open]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category_id", category);

    if (file) {
      formData.append("file", file);
    }

    try {
      if (recipe) {
        // Update an existing recipe
        await axiosInstance.put(`/api/recipes/${recipe.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Recipe updated successfully");
      } else {
        // Add a new recipe
        await axiosInstance.post("/api/recipes", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Recipe created successfully");
      }
      fetchRecipes(); // Refresh the recipe list
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error submitting recipe:", error.response?.data || error.message);
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
          maxWidth: "600px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {recipe ? "Edit Recipe" : "Add Recipe"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>
              Select a category
            </MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              p: 2,
              textAlign: "center",
              cursor: "pointer",
              mb: 2,
            }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            {file ? (
              <Typography>{file.name}</Typography>
            ) : (
              <Typography>
                {recipe ? "Replace Image/File" : "Click or Drag a file here"}
              </Typography>
            )}
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {recipe ? "Update Recipe" : "Add Recipe"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddRecipeModal;
