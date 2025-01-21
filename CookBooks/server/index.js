require("dotenv").config({ path: "./server/.env" });
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
  console.log("JWT_SECRET from .env:", process.env.JWT_SECRET);
});