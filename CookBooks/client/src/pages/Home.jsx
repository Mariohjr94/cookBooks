import React, { useEffect, useState } from "react";
import MasonryLayout from "../components/MasonryLayout";
import axiosInstance from "../app/axiosInstancs";
import AddRecipeModal from "../components/AddRecipeModal";
import FloatingAddButton from "../components/FloatingAddButton";
import { useSelector } from "react-redux";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
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

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white text-center p-4">
        <h1>CookBooks!</h1>
        <p>Explore your favorite recipes</p>
      </header>
      <main className="flex-1 p-4 bg-gray-100">
        <MasonryLayout recipes={recipes} />
        <AddRecipeModal open={isModalOpen} handleClose={handleCloseModal} categories={categories} fetchRecipes={fetchRecipes} />
        <FloatingAddButton onClick={handleOpenModal} />
      </main>
      <footer className="bg-blue-600 text-white text-center p-2 text-sm sm:text-base">
        &copy; 2025 CookBooks
      </footer>
    </div>
  );
};

export default Home;
