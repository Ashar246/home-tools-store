// عند تحميل الصفحة
window.onload = () => {
    loadOrders();
    loadInventory();
};

// 1. جلب وعرض المخزون مع زر الحذف
async function loadInventory() {
    try {
        const res = await fetch('http://localhost:5000/api/products');
        const products = await res.json();
        const display = document.getElementById('inventory-display');

        display.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>الصورة</th>
                        <th>الاسم</th>
                        <th>السعر</th>
                        <th>التحكم</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map(p => {
                        const imgSrc = p.image.startsWith('/uploads') ? `http://localhost:5000${p.image}` : p.image;
                        return `
                            <tr>
                                <td><img src="${imgSrc}" width="50" style="border-radius:5px;"></td>
                                <td>${p.name}</td>
                                <td>${p.price} ₪</td>
                                <td>
                                    <button class="btn-del" onclick="deleteProduct('${p._id}')">
                                        <i class="fas fa-trash"></i> حذف
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
    } catch (err) { console.error("خطأ في تحميل المخزون"); }
}

// 2. دالة الحذف
async function deleteProduct(id) {
    if (!confirm("هل أنتِ متأكدة من حذف هذا المنتج؟")) return;

    try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            alert("✅ تم الحذف بنجاح");
            loadInventory(); // تحديث الجدول فقط بدل الصفحة كاملة
        }
    } catch (err) { alert("❌ فشل الحذف"); }
}

// 3. جلب الطلبات
async function loadOrders() {
    const res = await fetch('http://localhost:5000/api/admin/orders');
    const orders = await res.json();
    const tbody = document.getElementById('orders-tbody');
    tbody.innerHTML = orders.map(o => `
        <tr>
            <td>${o.customerName || 'زبون'}</td>
            <td>${new Date(o.createdAt).toLocaleString('ar-EG')}</td>
            <td>${o.items.map(i => i.name).join(', ')}</td>
            <td style="color:green; font-weight:bold;">${o.total} ₪</td>
        </tr>
    `).join('');
}

// 4. إضافة منتج
async function addNewProduct() {
    const formData = new FormData();
    formData.append('name', document.getElementById('p-name').value);
    formData.append('price', document.getElementById('p-price').value);
    formData.append('category', document.getElementById('p-new-category').value);
    formData.append('image', document.getElementById('p-image-file').files[0]);

    const res = await fetch('http://localhost:5000/api/products', { method: 'POST', body: formData });
    if (res.ok) {
        alert("✅ تمت الإضافة!");
        loadInventory();
        document.getElementById('p-name').value = '';
    }
}

function switchTab(tab) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.admin-nav button').forEach(b => b.classList.remove('active'));
    document.getElementById(tab + '-section').classList.add('active');
    document.getElementById('tab-' + tab).classList.add('active');
    if(tab === 'orders') loadOrders();
}