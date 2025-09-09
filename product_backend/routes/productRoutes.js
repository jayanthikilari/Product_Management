const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST product
router.post("/", async (req, res) => {
  const { name, price, description, category } = req.body;
  const product = new Product({ name, price, description, category });
  const saved = await product.save();
  res.status(201).json(saved);
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, description } = req.body;
    await Product.findByIdAndUpdate(id, { name, price, category, description });
    res.json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating product" });
  }
});

module.exports = router;