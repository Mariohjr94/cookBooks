const db = require("../db");
const bcrypt = require("bcryptjs");

async function seed() {
  console.log("Seeding the database.");
  try {

    await db.query("DROP TABLE IF EXISTS recipe, category, admin CASCADE;");

    // Create admin table
    await db.query(`
      CREATE TABLE admin (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
      `);
// create category table
      await db.query(`
        CREATE TABLE category (
  id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
      );
    `);

  // Create recipe table
    await db.query(`
      CREATE TABLE recipe (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        file_path TEXT NOT NULL,
        file_type TEXT NOT NULL, -- 'pdf' or 'image'
        category_id INTEGER REFERENCES category(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    //seeding info  -----------------------

     // Insert some default categories 
    const categories = ['Breakfast', 'Soup', 'Side Dish', 'Rubs', 'Seafood', 'Sauces', 'Sandwich and Wraps', 'Salads', 'Dessert', 'Chicken', 'Beef', 'Appetizer'];
    for (const name of categories) {
      await db.query('INSERT INTO category (name) VALUES ($1);', [name]);
    }

    // Insert an admin user (with hashed password)
    const hashedPassword = await bcrypt.hash('12345', 10);
    await db.query('INSERT INTO admin (username, password) VALUES ($1, $2);', [
      'test1',
      hashedPassword,
    ]);

    // Insert some default PDFs
    await db.query(
      'INSERT INTO recipe (title, file_path, file_type, category_id) VALUES ($1, $2, $3, $4);',
      ["Chocolate Cake Recipe", "uploads/chocolate-cake.pdf", "pdf", 1]
    );
    await db.query(
      'INSERT INTO recipe (title, file_path, file_type, category_id) VALUES ($1, $2, $3, $4);',
      ["Grilled Chicken Recipe", "uploads/grilled-chicken.pdf", "pdf", 2]
    );
    await db.query(
      'INSERT INTO recipe (title, file_path, file_type, category_id) VALUES ($1, $2, $3, $4);',
      ["Spring Rolls Image", "uploads/spring-rolls.jpg", "image", 3]
    );
    await db.query(
      'INSERT INTO recipe (title, file_path, file_type, category_id) VALUES ($1, $2, $3, $4);',
      ["Mojito Image", "uploads/mojito.jpg", "image", 4]
    );

// -----------------------------------

    console.log("Database is seeded.");
  } catch (err) {
    console.error(err);
  }
}

// Seed the database if we are running this file directly.
if (require.main === module) {
  seed();
}

module.exports = seed;
