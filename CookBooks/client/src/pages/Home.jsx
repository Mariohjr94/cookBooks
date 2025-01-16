import React, { useEffect, useState } from "react";
import MasonryLayout from "../components/MasonryLayout";
import axiosInstance from "../app/axiosInstancs";
import AddRecipeModal from "../components/AddRecipeModal";
import RecipeDetailModal from "../components/RecipeDetailModal";
import CategoryButtons from "../components/CategoryButtons"; 
import FloatingAddButton from "../components/FloatingAddButton";
import { useSelector } from "react-redux";
import { TextField, Box, Button, Avatar, Tab, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import EditProfileModal from "../components/EditProfileModal";
import AvatarSection from "../components/AvatarSection";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeCount, setRecipeCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [searchQuery, setSearchQuery] = useState("");
  const categories = useSelector((state) => state.categories.categories);

  const user = useSelector((state) => state.auth.user);
  console.log(user);
  
// Fetch images and PDFs
  const fetchRecipes = async () => {
    try {
      const response = await axiosInstance.get("api/recipes");
      console.log(response.data);
      setRecipes(response.data);
      setRecipeCount(response.data.length)
    } catch (error) {
      console.error("Error fetching recipes:", error.response?.data || error);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Filter recipes based on search query
  useEffect(() => {
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [searchQuery, recipes]);

    // Open the recipe detail modal
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  // Close the recipe detail modal
  const handleCloseRecipeModal = () => {
    setSelectedRecipe(null);
  };

  const handleEdit = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
};

    // Delete a recipe
  const handleDeleteRecipe = (id) => {
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
  };

  // Filter recipes when a category is clicked
  const handleCategoryClick = (categoryId) => {
    if (categoryId === null) {
      setFilteredRecipes(recipes); // Show all recipes if "All" is selected
    } else {
      const filtered = recipes.filter(recipe => recipe.category_id === categoryId);
      setFilteredRecipes(filtered);
    }
    setSelectedCategory(categoryId);
  };

  return (
    <Box>
      {/* Avatar */}
      <AvatarSection 
        user={user}
        recipeCount={recipeCount}
        />
         {/* Search Bar */}
        <Box sx={{ 
          mb: 2,
          display: "flex",
          justifyContent: "center", 
          padding: {
            xs: "1rem",  
            sm: "2rem", 
            md: "3rem", 
          },
        }}>
          <TextField
            label="Search Recipes"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
                width: {
                  xs: "90%", // Width for extra-small screens
                  sm: "80%", // Width for small screens
                  md: "60%", // Width for medium screens
                  lg: "50%", // Width for large screens
                },
                bgcolor: "white", // Background color for better visibility
                borderRadius: 1, // Slightly rounded corners
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)", // Subtle shadow for better aesthetics
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                  },
                  "&.Mui-focused fieldset": {
                  },
                },
              }}
          />
        </Box>
        <Box
          sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}>
          <CategoryButtons
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}/>
        </Box>
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: {
            xs: "1rem",
            sm: "2rem",
          },
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <MasonryLayout
          onRecipeClick={handleRecipeClick}
          recipes={filteredRecipes}
        />
      </Box>
        <AddRecipeModal 
          open={isModalOpen} 
          handleClose={() => {
            setIsModalOpen(false);
            setSelectedRecipe(null);
          }}
          categories={categories} 
          recipe={selectedRecipe}
          fetchRecipes={fetchRecipes}
        />
        <RecipeDetailModal
          open={Boolean(selectedRecipe)}
          recipe={selectedRecipe}
          onClose={handleCloseRecipeModal}
          onDelete={handleDeleteRecipe} 
          onEdit={handleEdit}
        />
        <FloatingAddButton onClick={handleOpenModal} />
    </Box>
  );
};

export default Home;
