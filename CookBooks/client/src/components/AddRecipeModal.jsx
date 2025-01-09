import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Select,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  InputLabel
} from '@mui/material';
import axiosInstance from '../app/axiosInstancs'; 

const AddRecipeModal = ({ open, handleClose, categories }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData();
 formData.append("title", title);
  formData.append("description", description);
  formData.append("file", file); // Use the file from state
  formData.append("category_id", selectedCategory);

  try {
    const response = await axiosInstance.post("/api/recipes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Recipe uploaded successfully:", response.data);
    handleClose(); // Close the modal or perform additional actions
  } catch (error) {
    console.error("Error uploading recipe:", error.response?.data || error.message);
  }
};

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: 400,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Add Recipe
          </Typography>
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
          <TextField
            label="Category"
            name="category_id"
            select // Important to make it a dropdown
            fullWidth
            required
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            variant="outlined" // Ensures consistent styling
            sx={{ mb: 2 }}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <Box
            sx={{
              border: '2px dashed #ccc',
              borderRadius: '8px',
              p: 2,
              textAlign: 'center',
              cursor: 'pointer',
              mb: 2,
            }}
            onClick={() => document.getElementById('fileInput').click()}
          >
            {file ? (
              <Typography>{file.name}</Typography>
            ) : (
              <Typography>Click or Drag a file here</Typography>
            )}
            <input
              id="fileInput"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Recipe
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddRecipeModal;
