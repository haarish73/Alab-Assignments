const express = require("express");
const cors = require("cors");
require("dotenv").config();
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const path = require("path");

require("./config/db");

const app = express();


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);



// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});