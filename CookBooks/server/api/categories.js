const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticateToken = require("../middleware/authenticateToken");

// Get all categories (protected)
router.get("/", authenticateToken, async (req, res, next) => {
  try {
    const { rows: categories } = await db.query("SELECT * FROM category");
    res.send(categories);
  } catch (error) {
    next(error);
  }
});

// Create a new category (protected)
router.post("/", authenticateToken, async (req, res, next) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).send("Category name is required.");
    }

    const {
      rows: [category],
    } = await db.query(
      "INSERT INTO category (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.status(201).send(category);
  } catch (error) {
    next(error);
  }
});

// Delete a category by ID (protected)
router.delete("/:id", authenticateToken, async (req, res, next) => {
  try {
    const {
      rows: [category],
    } = await db.query(
      "DELETE FROM category WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (!category) {
      return res.status(404).send("Category not found.");
    }

    res.send(category);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
