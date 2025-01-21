# CookBooks Application

## Overview
CookBooks is a personal recipe management application built with the MERN stack (MongoDB, Express.js, React, Node.js). The app is designed to allow users to:

- Upload recipes images or PDFs.
- Categorize recipes for better organization.
- Search recipes by title or filter them by categories.
- View recipe details in a modal.
- Edit or delete recipes (restricted to the logged-in user).
- Keep uploads private, so each user can only view and manage their own recipes.

## Features

### Homepage
- **Search Bar**: A dynamic search bar allows users to filter recipes by their titles.
- **Category Buttons**: Horizontally scrollable and clickable category buttons allow users to filter recipes by categories. When there are more categories than visible space, users can scroll through them using the mouse wheel or drag functionality.
- **Masonry Layout**: Recipes are displayed in a Pinterest-like masonry layout. Each card shows the recipe image or PDF title.
- **Responsive Design**: The homepage is fully responsive and adjusts to different screen sizes.

### Recipe Management
- **Add Recipe**: Users can add new recipes with the following fields:
  - Title
  - Description
  - Category
  - Image or PDF upload
- **Edit Recipe**: Existing recipes can be edited. The edit modal pre-fills the form with the recipe's current details.
- **Delete Recipe**: Users can delete recipes they no longer need.

### Recipe Detail Modal
- **View Details**: Clicking on a recipe opens a modal displaying the full image or PDF title along with the description.
- **Edit and Delete Options**: From the detail modal, users can edit or delete the recipe.

### User Authentication
- **Login and Registration**: Users can register and log in to their accounts. Each user’s recipes are private and only visible to them.
- **Token-Based Authentication**: JWT is used to manage authentication and ensure secure access.
- **Logout**: Users can log out, which clears their session.

## Technologies Used

### Frontend
- **React.js**: The UI is built with React.
- **Material-UI**: Used for components like buttons, modals, and input fields.
- **CSS**: Custom styling for the masonry layout and responsive design.

### Backend
- **Node.js & Express.js**: Provides the REST API for the app.
- **PostgreSQL**: Manages the database for users, recipes, and categories.
- **Multer**: Handles file uploads (images and PDFs).
- **JWT**: Used for secure authentication.

### Deployment
- **Frontend**: Deployed on Netlify.
- **Backend**: Deployed on Heroku.

## Installation and Setup

### Prerequisites
- Node.js
- PostgreSQL
- NPM

### Backend Setup
1. Clone the repository.
2. Navigate to the `server` directory.
3. Install dependencies:
   ```bash
   npm install
