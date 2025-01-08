import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import MasonryLayout from "../components/MasonryLayout";
import axios from "axios"; 
import axiosInstance from "../app/axiosInstancs";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  // Fetch images and PDFs
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get("/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error.response?.data || error);
      }
    };

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
      </main>
      <footer className="bg-blue-600 text-white text-center p-2 text-sm sm:text-base">
        &copy; 2025 CookBooks
      </footer>
    </div>
  );
};

export default Home;
