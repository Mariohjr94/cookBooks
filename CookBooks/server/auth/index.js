const router = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const upload = multer();
const authenticateToken = require("../middleware/authenticateToken")

// Register a new  account
router.post("/register", upload.single("avatar"), async (req, res) => {
  const { username, password, name } = req.body;
  const avatar = req.file;

  if (!username || !password || !name) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const result = await db.query(
      "INSERT INTO admin (username, password, name, avatar) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, hashedPassword, name, avatar ? avatar.buffer : null]
    );

    // Generate JWT token
    const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return token and user info
    res.status(201).json({
      token,
      user: {
        id: result.rows[0].id,
        username: result.rows[0].username,
        name: result.rows[0].name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register user." });
  }
});

// Login to an existing admin account
router.post("/login", async (req, res, next) => {
  try {
    const {
      rows: [admin],
    } = await db.query(
      "SELECT * FROM admin WHERE username = $1",
      [req.body.username]
    );

    if (!admin) {
      return res.status(401).send("Invalid login credentials.");
    }

    // Compare the provided password with the stored hashed password
    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    if (!validPassword) {
      return res.status(401).send("Invalid login credentials.");
    }

    console.log("JWT_SECRET is:", process.env.JWT_SECRET);

    // Create a token with the instructor id
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET);

    res.send({ token });
  } catch (error) {
    next(error);
  }
});

// Get the currently logged in admin
router.get("/me", authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.id; // Extract the user's ID from the token

    // Fetch the user data from the database
    const {
      rows: [user],
    } = await db.query("SELECT id, username, name, avatar FROM admin WHERE id = $1", [userId]);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // If the user has an avatar, convert it to a Base64 string
    if (user.avatar) {
      user.avatar = `data:image/jpeg;base64,${Buffer.from(user.avatar).toString("base64")}`;
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    next(error);
  }
});

// Update user profile
router.put("/me", authenticateToken, upload.single("avatar"), async (req, res) => {
  const { name, username } = req.body;
  const user_id = req.user.id;

  if (!name || !username) {
    return res.status(400).json({ error: "Name and username are required." });
  }

  try {
    const avatarBuffer = req.file ? req.file.buffer : null;

    const query = `
      UPDATE admin
      SET name = $1, username = $2, avatar = COALESCE($3, avatar)
      WHERE id = $4
      RETURNING id, name, username, avatar;
    `;

    const values = [name, username, avatarBuffer, user_id];

    const { rows: [updatedUser] } = await db.query(query, values);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // Convert avatar buffer to Base64
    if (updatedUser.avatar) {
      updatedUser.avatar = `data:image/jpeg;base64,${updatedUser.avatar.toString("base64")}`;
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

module.exports = router;
