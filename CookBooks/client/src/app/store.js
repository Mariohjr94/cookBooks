// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from "../features/categories/categorySlice";
import authReducer from '../features/auth/authSlice';  
import {api} from "./api"



const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,  // API slice
    auth: authReducer,  // Authentication slice
    categories: categoryReducer,    // Categories slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),  // Add RTK Query middleware
});

export default store;