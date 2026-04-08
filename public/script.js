let allProducts = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function fetchProducts() {
    try {
        const res = await fetch('http://localhost:5000/api/products');
        allProducts = await res.json();
        displayProducts(allProducts);
        generateCategoryButtons(allProducts); // توليد الأقسام تلقائياً
        updateCartUI();
    } catch (err) { console.error("خطأ في الجلب"); }
}

function generateCategoryButtons(products) {
    const filterContainer = document.querySelector('.filter-buttons');
    if (!filterContainer) return;
    const categories = ['الكل', ...new Set(products.map(p => p.category.trim()))];
    filterContainer.innerHTML = categories.map(cat => `
        <button onclick="filterByCategory('${cat}')" class="btn-filter">${cat}</button>
    `).join('');
}

function filterByCategory(category) {
    const filtered = (category === 'الكل') ? allProducts : allProducts.filter(p => p.category.trim() === category);
    displayProducts(filtered);
}

function displayProducts(products) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(p => {
        const imgSrc = p.image.startsWith('/uploads') ? `http://localhost:5000${p.image}` : p.image;
        return `
            <div class="product-card">
                <img src="${imgSrc}" onerror="this.src='https://via.placeholder.com/150'" style="width:100%; height:150px; object-fit:cover; border-radius:8px;">
                <h4>${p.name}</h4>
                <p>${p.price} ₪</p>
                <button onclick="addToCart('${p._id}')" class="btn-add">إضافة للسلة</button>
            </div>
        `;
    }).join('');
}

function addToCart(id) {
    const product = allProducts.find(p => p._id === id);
    cart.push({ ...product, quantity: 1 });
    updateCartUI();
}

function updateCartUI() {
    localStorage.setItem('cart', JSON.stringify(cart));
    const list = document.getElementById('cart-items');
    list.innerHTML = cart.map((item, index) => `<li>${item.name} - ${item.price} ₪ <button onclick="removeFromCart(${index})">❌</button></li>`).join('');
    document.getElementById('cart-total').innerText = `المجموع: ${cart.reduce((s, i) => s + i.price, 0)} ₪`;
}

async function confirmOrder() {
    if (cart.length === 0) return alert("السلة فارغة");
    const name = prompt("الرجاء إدخال اسمك لإتمام الطلب:");
    if (!name) return;

    const orderData = { customerName: name, items: cart, total: cart.reduce((s, i) => s + i.price, 0) };
    const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });
    if (res.ok) { alert("تم الطلب!"); cart = []; updateCartUI(); }
}

function removeFromCart(i) { cart.splice(i, 1); updateCartUI(); }
function clearCart() { cart = []; updateCartUI(); }
function searchProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    displayProducts(allProducts.filter(p => p.name.toLowerCase().includes(term)));
}

fetchProducts();