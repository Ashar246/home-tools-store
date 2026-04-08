const express = require('express');
const router = express.Router();
// تأكدي أن موديل الطلبات موجود في مجلد models واسمه order.js
const Order = require('../models/order');

// --- جلب كل الطلبات (للأدمن) ---
// الرابط الكامل: GET /api/admin/orders
router.get('/admin/orders', async (req, res) => {
    try {
        console.log("📥 طلب جلب البيانات للأدمن...");
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        console.error("خطأ في جلب الطلبات:", err);
        res.status(500).json({ error: "فشل جلب البيانات من السيرفر" });
    }
});

// --- حفظ طلب جديد (للزبون) ---
// الرابط الكامل: POST /api/orders
router.post('/orders', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: "تم حفظ الطلب بنجاح" });
    } catch (err) {
        res.status(500).json({ error: "فشل حفظ الطلب" });
    }
});

module.exports = router;