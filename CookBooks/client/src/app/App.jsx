import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthWrapper from "./components/AuthWrapper";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RecipesDetails from "./pages/RecipesDetails";
import RecipeForm from "./pages/RecipeForm";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public route: Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes: Wrap with AuthWrapper */}
        <Route element={<AuthWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/recipes/:id" element={<RecipesDetails />} />
          <Route path="/add-recipe" element={<RecipeForm/>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
