const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProduct,
  filterCategory
} = require("../controllers/productController");


router.post("/products", addProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.get("/products/search", searchProduct);
router.get("/products/category", filterCategory);

module.exports = router;