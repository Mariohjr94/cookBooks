import React from "react";
import { useRef, useState, useEffect } from "react";
import { Button, Box } from "@mui/material";

const CategoryButtons = ({ categories, selectedCategory, onCategoryClick }) => {

  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

    // Handle horizontal scroll on mouse wheel
    useEffect(() => {
    const container = containerRef.current;

  if (container) {
    // Add the event listener with passive: false
    const handleWheel = (event) => {
      if (containerRef.current) {
        event.preventDefault();
        containerRef.current.scrollLeft += event.deltaY; // Scroll horizontally
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup the event listener on component unmount
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }
}, []);

  // Handle mouse down event
  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  // Handle mouse move event
  const handleMouseMove = (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust the multiplier for sensitivity
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle mouse up event
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Box
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stop dragging when the mouse leaves the container
      sx={{
        display: "flex",
        overflowX: "auto", // Make it scrollable horizontally
        padding: "1rem",
        gap: "0.5rem", // Space between buttons
        whiteSpace: "nowrap", // Prevent line breaks
        scrollbarWidth: "none", // Hide scrollbar for Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for Chrome/Safari
        },
        "&:hover": {
          cursor: "pointer", // Add a pointer cursor for clarity
        },
      }}
    >
      {/* "All" Button */}
      <Button
        variant={selectedCategory === null ? "contained" : "outlined"}
        color={selectedCategory === null ? "primary" : "inherit"}
        onClick={() => onCategoryClick(null)}
        sx={{
          flexShrink: 0, // Prevent buttons from shrinking
          padding: "0.5rem 1rem",
          fontWeight: "bold",
          border: "none",
        }}
      >
        All
      </Button>

      {/* Dynamic Category Buttons */}
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "contained" : "outlined"}
          color={selectedCategory === category.id ? "primary" : "inherit"}
          onClick={() => onCategoryClick(category.id)}
          sx={{
            flexShrink: 0, // Prevent buttons from shrinking
            padding: "0.5rem 1rem",
            fontWeight: "600",
            border:"none",
          }}
        >
          {category.name}
        </Button>
      ))}
    </Box>
  );
};

export default CategoryButtons;
