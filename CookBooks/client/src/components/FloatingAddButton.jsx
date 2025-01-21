import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const FloatingAddButton = ({ onClick }) => {
  return (
    <Fab 
      color="error" 
      aria-label="add" 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
      }}
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  );
};

export default FloatingAddButton;
