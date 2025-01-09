import React from "react";
import Masonry from "react-masonry-css";

const MasonryLayout = ({ recipes }) => {
  const breakpoints = {
    default: 4, // Default number of columns
    1100: 3, // 3 columns for screen width < 1100px
    768: 2,  // 2 columns for screen width < 768px
    500: 1,  // 1 column for screen width < 500px
  };

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="flex gap-4"
      columnClassName="masonry-column"
    >
      {recipes.map((recipe, index) => (
        <div key={index} className="break-inside-avoid p-2 bg-white shadow-lg rounded">
          {recipe.file_type === "image" ? (
            <img
              src={recipe.image }
              alt={recipe.title}
              className="w-full h-auto rounded"
            />
          ) : (
            <div className="flex flex-col recipes-center">
              <embed
                src={recipe.image}
                type="application/pdf"
                className="w-full h-48 rounded"
              />
              <a
                href={recipe.title}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2"
              >
                {recipe.title}
              </a>
            </div>
          )}
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
