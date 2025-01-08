import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../features/auth/authSlice";

const AuthWrapper = () => {
  // Fetch current user information
  const { data: user, isLoading } = useMeQuery();

  // If still loading, display a loading message
  if (isLoading) return <p>Loading...</p>;

  // If no user is authenticated, redirect to the login page
  if (!user) return <Navigate to="/login" />;

  // If the user is authenticated, render child routes
  return <Outlet />;
};

export default AuthWrapper;
