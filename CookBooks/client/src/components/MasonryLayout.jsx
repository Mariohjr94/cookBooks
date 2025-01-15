import React from "react";
import { Masonry } from "@mui/lab";
import { Box, Typography, Modal } from "@mui/material";

const MasonryLayout = ({ recipes, onRecipeClick }) => {

  return (
    <Masonry
      columns={{ xs: 2, sm: 3, md: 3, lg: 4 }} 
      spacing={2} 
    >

      {recipes.map((recipe, index) => (
          <Box
            key={index}
            sx={{
              borderRadius: 0,
              overflow: "hidden",
              boxShadow: 1,
              bgcolor: "background.paper",
              ":hover": { transform: "scale(1.02)", transition: "0.3s" },
            }}
            onClick={() => onRecipeClick(recipe)}
          >
            <Typography
              variant="subtitle1"
              component="p"
              sx={{ textAlign: "left", p: 1, 
              fontSize: {
                xs: "0.9rem", // Smaller font size for extra small devices
                sm: "1rem", // Slightly larger font size for small devices
                md: "1.25rem", // Default font size for medium devices and up
              }}}
            >
              {recipe.title}
            </Typography>
            {recipe.image ? (
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            ) : (
              <embed
                src={recipe.file_path}
                type="application/pdf"
                style={{
                  width: "100%",
                  height: 200,
                  display: "block",
                }}
              />
            )}
          </Box>
        ))}
      </Masonry>
    );
  };

export default MasonryLayout;
