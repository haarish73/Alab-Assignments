const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middleware/upload");

// CREATE (with image)
router.post("/", upload.single("image"), productController.createProduct);

// GET ALL
router.get("/", productController.getProducts);

// GET ONE
router.get("/:id", productController.getProductById);

// UPDATE
router.put("/:id", upload.single("image"), productController.updateProduct);

// DELETE
router.delete("/:id", productController.deleteProduct);

// status of the products
router.patch("/:id/status", productController.updateProductStatus);

module.exports = router;