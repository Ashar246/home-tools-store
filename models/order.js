const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: { type: String, required: true },   // اسم المنتج محفوظ وقت الطلب
      price: { type: Number, required: true },  // السعر محفوظ وقت الطلب
      quantity: { type: Number, required: true, default: 1 }
    }
  ]
}, { timestamps: true }); // ← هذا يضيف createdAt و updatedAt تلقائيًا

module.exports = mongoose.model('Order', orderSchema);
