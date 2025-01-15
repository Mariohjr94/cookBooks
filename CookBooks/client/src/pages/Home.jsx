import React, { useEffect, useState } from "react";
import MasonryLayout from "../components/MasonryLayout";
import axiosInstance from "../app/axiosInstancs";
import AddRecipeModal from "../components/AddRecipeModal";
import RecipeDetailModal from "../components/RecipeDetailModal";
import FloatingAddButton from "../components/FloatingAddButton";
import { useSelector } from "react-redux";
import { TextField, Box } from "@mui/material";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [searchQuery, setSearchQuery] = useState("");
  const categories = useSelector((state) => state.categories.categories);
  
// Fetch images and PDFs
  const fetchRecipes = async () => {
    try {
      const response = await axiosInstance.get("api/recipes");
      console.log(response.data);
      setRecipes(response.data);
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

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 bg-gray-100">
         {/* Search Bar */}
        <Box sx={{ 
          mb: 4,
          display: "flex",
          justifyContent: "center", 
          padding: {
            xs: "1rem",  // Small padding on extra-small devices
            sm: "2rem", // Medium padding on small devices
            md: "3rem", // Larger padding on medium devices and above
          },
        }}>
          <TextField
            label="Search Recipes"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
                width: "70%", 
                minWidth: "300px", 
                bgcolor: "#FAF9F6",
                borderRadius: 1,
            }}
          />
        </Box>
        <MasonryLayout 
          onRecipeClick={handleRecipeClick} 
          recipes={filteredRecipes}/>
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
      </main>
    </div>
  );
};

export default Home;
