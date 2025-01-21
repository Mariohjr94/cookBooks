const db = require(".");
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
        password TEXT NOT NULL,
        name TEXT NOT NULL, 
        avatar BYTEA
      );
    `);

    // Create category table
    await db.query(`
      CREATE TABLE category (
        id SERIAL PRIMARY KEY,
        "name" TEXT UNIQUE NOT NULL
      );
    `);

    // Create recipe table
    await db.query(`
      CREATE TABLE recipe (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        image BYTEA, -- Store image as binary data
        description TEXT, -- Description column added
        category_id INTEGER REFERENCES category(id) ON DELETE SET NULL,
        user_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    //seeding info  -----------------------

     // Insert some default categories 
    const categories = ['Breakfast', 'Soup', 'Side Dish', 'Rubs', 'Seafood', 'Sauces', 'Sandwich and Wraps', 'Salads', 'Dessert', 'Chicken', 'Beef', 'Appetizer', 'Cakes', 'Cookies', 'Pastries', 'Breads', 'Pies', 'Brownies and Bars', 'Quick Breads', 'Savory Bread', 'Specialty Baking', 'Breakfast Baking', 'Traditional and Seasonal Baking', 'International Baking' ];
    for (const name of categories) {
      await db.query('INSERT INTO category (name) VALUES ($1);', [name]);
    }

    // Insert an admin user (with hashed password)
    const hashedPassword = await bcrypt.hash('12345', 10);
    const defaultAvatar = null; 
    await db.query('INSERT INTO admin (username, password, name, avatar) VALUES ($1, $2, $3, $4);', [
      'sampleUser',
      hashedPassword,
      "Admin User", 
      defaultAvatar
    ]);

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
