import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthWrapper from "../components/AuthWrapper";
import Navbar from "../components/NavBar";
import AuthForm from "../pages/AuthForm";
import Home from "../pages/Home";
import RecipesDetails from "../pages/RecipeDetails";
import RecipeForm from "../pages/RecipeForm";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../features/categories/categorySlice";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public route: Login */}
        <Route path="/login" element={<AuthForm />} />

        {/* Protected routes: Wrap with AuthWrapper */}
        <Route element={<AuthWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/recipes/:id" element={<RecipesDetails />} />
          <Route path="/add-recipe" element={<RecipeForm/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
