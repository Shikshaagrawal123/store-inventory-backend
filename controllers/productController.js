const Product = require("../models/Product");


// Add Product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get All Products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};


// Get Product By ID
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};


// Update Product
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
};


// Delete Product
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product Deleted" });
};


// Search by Name
exports.searchProduct = async (req, res) => {
  const name = req.query.name;

  const products = await Product.find({
    productName: { $regex: name, $options: "i" }
  });

  res.json(products);
};


// Filter by Category
exports.filterCategory = async (req, res) => {
  const cat = req.query.cat;

  const products = await Product.find({
    category: cat
  });

  res.json(products);
};