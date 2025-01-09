const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const upload = multer();
const authenticateToken = require("../middleware/authenticateToken");

// Get all recipes (protected)
router.get("/", authenticateToken, async (req, res, next) => {
  try {
    const { rows: recipes } = await db.query("SELECT * FROM recipe");

    // Convert binary image data to Base64 for rendering on the frontend
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.image) {
        recipe.image = `data:image/jpeg;base64,${Buffer.from(recipe.image).toString("base64")}`;
      }
      return recipe;
    });

    res.json(updatedRecipes);
  } catch (error) {
    next(error);
  }
});

// Get a recipe by ID (protected)
router.get("/:id", authenticateToken, async (req, res, next) => {
  try {
    const {
      rows: [recipe],
    } = await db.query("SELECT * FROM recipe WHERE id = $1", [req.params.id]);

    if (!recipe) {
      return res.status(404).send("Recipe not found.");
    }

    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

// Search recipes by title (protected)
router.get("/search", authenticateToken, async (req, res) => {
  const searchTerm = req.query.query; // Retrieve the query parameter
  try {
    const result = await db.query(
      "SELECT * FROM recipe WHERE title ILIKE $1",
      [`%${searchTerm}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
});

// Upload a new recipe (protected)
router.post("/", authenticateToken, upload.single("file"), async (req, res, next) => {
  try {
    const { title, category_id } = req.body;

    // Validate required fields
    if (!title || !req.file || !category_id) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const fileType = req.file.mimetype.startsWith("image/") ? "image" : "pdf";

    // Insert the file into the database (as a buffer)
    const { rows: [recipe] } = await db.query(
      "INSERT INTO recipe (title, image, file_type, category_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, req.file.buffer, fileType, category_id]
    );

    res.status(201).send(recipe);
  } catch (error) {
    next(error);
  }
});

// Update recipe metadata (protected)
router.put("/:id", authenticateToken, async (req, res, next) => {
  try {
    const { title, category_id } = req.body;

    const query = `
      UPDATE recipe
      SET title = $1, category_id = $2
      WHERE id = $3
      RETURNING *`;

    const values = [title, category_id, req.params.id];

    const { rows: [recipe] } = await db.query(query, values);

    if (!recipe) {
      return res.status(404).send("Recipe not found.");
    }

    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

// Delete a recipe by ID (protected)
router.delete("/:id", authenticateToken, async (req, res, next) => {
  try {
    const {
      rows: [recipe],
    } = await db.query("DELETE FROM recipe WHERE id = $1 RETURNING *", [req.params.id]);

    if (!recipe) {
      return res.status(404).send("Recipe not found.");
    }

    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
