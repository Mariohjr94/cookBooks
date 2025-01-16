const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const upload = multer();
const authenticateToken = require("../middleware/authenticateToken");

// Get all recipes (protected)
router.get("/", authenticateToken, async (req, res, next) => {
  try {
    const user_id = req.user.id; 
   const { rows: recipes } = await db.query("SELECT * FROM recipe WHERE user_id = $1", [user_id]);

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

// Get a specific recipe by ID for the authenticated user
router.get("/:id", authenticateToken, async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const {
      rows: [recipe],
    } = await db.query("SELECT * FROM recipe WHERE id = $1 AND user_id = $2", [req.params.id, user_id]);

    if (!recipe) {
      return res.status(404).send("Recipe not found or not authorized.");
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
    const user_id = req.user.id;
    const result = await db.query(
      "SELECT * FROM recipe WHERE title ILIKE $1 AND user_id = $2",
      [`%${searchTerm}%`, user_id]
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
    const { title, category_id, description } = req.body;
    const user_id = req.user.id;

    // Validate required fields
    if (!title || !req.file || !category_id || !user_id) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    // Insert the file into the database (as a buffer)
    const { rows: [recipe] } = await db.query(
      "INSERT INTO recipe (title, image, description, category_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, req.file.buffer, description, category_id, user_id]
    );

    res.status(201).send(recipe);
  } catch (error) {
    next(error);
  }
});


// Update an existing recipe
router.put("/:id", authenticateToken, upload.single("file"), async (req, res, next) => {
  try {
    const { title, category_id, description } = req.body;
    const user_id = req.user.id;

    // Validate required fields
    if (!title || !category_id) {
      return res.status(400).send({ error: "Title and category are required." });
    }

    const query = `
      UPDATE recipe
      SET title = $1, category_id = $2, 
          image = COALESCE($3, image), 
          description = $4
      WHERE id = $5 AND user_id = $6 

      RETURNING *`;

    const values = [
      title,
      category_id,
      req.file ? req.file.buffer : null,
      description,
      req.params.id,
      user_id,
    ];

    const { rows: [recipe] } = await db.query(query, values);

    if (!recipe) {
      return res.status(404).send({ error: "Recipe not found." });
    }

    res.status(200).send(recipe);
  } catch (error) {
    next(error);
  }
});



// Delete a recipe by ID (protected)
router.delete("/:id", authenticateToken, async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const {
      rows: [recipe],
    } = await db.query("DELETE FROM recipe WHERE id = $1 AND user_id = $2 RETURNING *",
      [req.params.id, user_id]
    );

    if (!recipe) {
      return res.status(404).send("Recipe not found.");
    }

    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
