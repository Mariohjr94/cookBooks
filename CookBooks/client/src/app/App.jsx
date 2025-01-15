import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthWrapper from "../components/AuthWrapper";
import Navbar from "../components/NavBar";
import AuthForm from "../pages/AuthForm";
import Home from "../pages/Home";
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
      <Navbar 
       style={{
        position: 'sticky', // Makes the Navbar stick at the top
        top: 0, // Sticks the Navbar to the very top of the viewport
        zIndex: 1000, // Ensures it stays above other elements
        backgroundColor: '#FFFFFF', // Background color to match your theme
        padding: '10px 20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add shadow for better visibility
      }}/>
      <Routes>
        {/* Public route: Login */}
        <Route path="/login" element={<AuthForm />} />

        {/* Protected routes: Wrap with AuthWrapper */}
        <Route element={<AuthWrapper />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
