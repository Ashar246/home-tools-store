const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();

// الإعدادات
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// إعداد رفع الصور
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// الاتصال بالقاعدة
mongoose.connect('mongodb://127.0.0.1:27017/homeStore')
    .then(() => console.log("✅ متصل بـ MongoDB"))
    .catch(err => console.error("❌ خطأ اتصال:", err));

// الموديلات
const Product = mongoose.model('Product', {
    name: String,
    price: Number,
    category: String,
    image: String
});

const Order = mongoose.model('Order', {
    customerName: String,
    items: Array,
    total: Number,
    createdAt: { type: Date, default: Date.now }
});

// الروابط
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            price: Number(req.body.price),
            category: req.body.category,
            image: req.file ? `/uploads/${req.file.filename}` : ""
        });
        await newProduct.save();
        res.status(201).json({ message: "تمت إضافة المنتج بنجاح!" });
    } catch (err) { res.status(500).json({ message: "خطأ في الحفظ" }); }
});

app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: "تم تسجيل الطلب" });
    } catch (err) { res.status(500).send(err); }
});

app.get('/api/admin/orders', async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
});

// رابط حذف منتج معين بواسطة الـ ID
app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "تم حذف المنتج بنجاح" });
    } catch (err) {
        res.status(500).json({ message: "فشل الحذف" });
    }
});

app.listen(5000, () => console.log(`🚀 السيرفر يعمل على http://localhost:5000`));