const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// عرض كل المنتجات
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// إضافة منتج جديد
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
});

// حذف منتج
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "✅ تم الحذف" });
});

module.exports = router;
