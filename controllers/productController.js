const Product = require("../models/Product");


// Add Product
exports.addProduct = async (req, res, next) => {
  try {

    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);

  } catch (error) {
    res.status(400);
    next(error);
  }
};


// Get All Products
exports.getProducts = async (req, res, next) => {
  try {

    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {
    res.status(500);
    next(error);
  }
};


// Get Product By ID
exports.getProductById = async (req, res, next) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json(product);

  } catch (error) {
    next(error);
  }
};


// Update Product
exports.updateProduct = async (req, res, next) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json(product);

  } catch (error) {
    next(error);
  }
};


// Delete Product
exports.deleteProduct = async (req, res, next) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};


// Search Product by Name
exports.searchProduct = async (req, res, next) => {
  try {

    const name = req.query.name;

    const products = await Product.find({
      productName: { $regex: name, $options: "i" }
    });

    res.status(200).json(products);

  } catch (error) {
    next(error);
  }
};


// Filter by Category
exports.filterCategory = async (req, res, next) => {
  try {

    const cat = req.query.cat;

    const products = await Product.find({ category: cat });

    res.status(200).json(products);

  } catch (error) {
    next(error);
  }
};