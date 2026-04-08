const mongoose = require('mongoose');

// 1. الاتصال بقاعدة البيانات
mongoose.connect('mongodb://localhost:27017/homeStore')
  .then(() => console.log("✅ متصل بقاعدة البيانات لعمل Seed"))
  .catch(err => console.error("❌ خطأ بالاتصال:", err));

// 2. تعريف الموديل مباشرة (لضمان عدم حدوث أخطاء في المسارات)
const Product = mongoose.model('Product', {
    name: String,
    price: Number,
    category: String,
    image: String,
    desc: String
});

// 3. المنتجات مع تعديل الأقسام للعربية (لتطابق صفحة الأدمن)

const products = [
    { name: "طنجرة ضغط", price: 350, desc: "ستانلس 7.5 لتر", category: "الطناجر ", image: "images/1.jpg" },
    { name: "طنجرة تيفال", price: 300, desc: "طناجر غير لاصقة، مقاس 24 سم", category: "الطناجر '", image: "images/2.jpg"},
    { name: "طنجرة ألمنيوم", price: 200, desc: "طناجر ألمنيوم خفيفة الوزن، مقاس 26 سم", category: "الطناجر ",image: "images/3.jpg" },
    { name: "مقلاة تيفال صغيرة", price: 100, desc: "قطر 20 سم", category: "القلايات", image: "images/4.jpg" },
    { name: "مقلاة تيفال كبيرة", price: 180, desc: "مقاس 28 سم غير لاصقة", category: "القلايات", image: "images/5.jpg" },
    { name: "طقم فناجين بورسلان", price: 100, desc: "تصميم أنيق", category: "الفناجين", image: "images/6.jpg" },
    {  name: "طقم فناجين زجاجي", price: 90, desc: "طقم 6 فناجين زجاجية شفافة", category: "الفناجين", image: "images/7.jpg" },
    { name: "دلة قهوة عربية", price: 150, desc: "دلة تقليدية لتحضير القهوة العربية", category: "دلات القهوة", image: "images/8.jpg" },
    { name: "دلة قهوة عربية كبيرة ستانلس", price: 220, desc: "ستانلس ستيل، سعة 2 لتر لتحضير القهوة العربية", category: "دلات القهوة", image: "images/9.jpg" },
    { name: "خلاط كهربائي", price: 250, desc: "قوة 500 واط مع شفرات ستانلس", category: "الاجهزة الكهربائية", image: "images/10.jpg" },
    { name: "غلاية ماء", price: 120, desc: "تسخين سريع، سعة 1.7 لتر", category: "الاجهزة الكهربائية", image: "images/11.jpg" },
    { name: "طقم ملاعق ستانلس", price: 80, desc: "طقم 12 ملعقة ستانلس ستيل", category: "الملاعق", image: "images/12.jpg" },
    { name: "طقم ملاعق خشب", price: 60, desc: "طقم 12 ملعقة خشبية طبيعية", category: "الملاعق", image: "images/13.jpg" },
    { name: "طقم شوك ستانلس", price: 80, desc: "طقم 12 شوكة ستانلس ستيل", category: "الشوك",image: "images/14.jpg" },
    { name: "طقم شوك خشب", price: 70, desc: "طقم 12 شوكة خشبية طبيعية", category: "الشوك", image: "images/15.jpg" },
    { name: "طقم سكاكين المطبخ", price: 150, desc: "طقم 6 سكاكين متعددة الاستخدامات", category: "السكاكين",image: "images/16.jpg" },
    { name: "طقم سكاكين كبيرة", price: 200, desc: "طقم 5 سكاكين كبيرة للطبخ", category: "السكاكين", image: "images/17.jpg" },
    { name: "سكاكين تقشير", price: 60, desc: "طقم 3 سكاكين صغيرة لتقشير الخضار والفواكه", category: "السكاكين", image: "images/18.jpg" },
    { name: "طقم صحون بورسلان", price: 220, desc: "طقم 12 قطعة بورسلان فاخر", category: "الصحون", image: "images/19.jpg" },
    { name: "طقم صحون أبيض", price: 180, desc: "طقم 12 قطعة باللون الأبيض الكلاسيكي", category: "الصحون", image: "images/20.jpg" },
    { name: "طقم صحون مزخرف", price: 250, desc: "طقم 12 قطعة مزخرف بنقوش أنيقة", category: "الصحون", image: "images/21.jpg" },
    { name: "طقم صحون زجاجي", price: 200, desc: "طقم 12 قطعة زجاجية شفافة", category: "الصحون", image: "images/22.jpg" },
    {name: "جاط زجاجي",price: 90,desc: "جاط زجاجي شفاف متعدد الاستخدامات",category: "الجاطات",image: "images/23.jpg"},
    {name: "جاط صغير",price: 50,desc: "جاط صغير مناسب للتقديم",category: "الجاطات",image: "images/24.jpg"},
    {name: "جاط متوسط",price: 70,desc: "جاط متوسط الحجم للاستعمال اليومي",category: "الجاطات",image: "images/25.jpg"},
    {name: "جاط كبير",price: 100,desc: "جاط كبير للتقديم والعزائم",category: "الجاطات",image: "images/26.jpg"},
    {name: "طاولة خشب",price: 500,desc: "طاولة خشبية متينة بمقاس 120×80 سم",category: "الطاولات",image: "images/27.jpg"},
    {name: "طاولة بلاستيك",price: 250,desc: "طاولة بلاستيكية خفيفة الوزن وسهلة النقل",category: "الطاولات",image: "images/28.jpg"},
    {name: "كرسي بلاستيك قوي",price: 70,desc: "كرسي بلاستيك متين يتحمل الأوزان الثقيلة",category: "الكراسي",image: "images/29.jpg"},
    {name: "كرسي بلاستيك أبيض",price: 60,desc: "كرسي بلاستيك باللون الأبيض الكلاسيكي",category: "الكراسي",image: "images/30.jpg"},
    {name: "كرسي بلاستيك ملون",price: 65,desc: "كرسي بلاستيك بألوان متعددة زاهية",category: "الكراسي",image: "images/31.jpg"},
    {name: "مغارف خشب",price: 70,desc: "طقم 6 مغارف خشبية طبيعية",category: "المغارف",image: "images/32.jpg"},
    {name: "مغارف ستانلس",price: 100,desc: "طقم 6 مغارف ستانلس ستيل متينة",category: "المغارف",image: "images/33.jpg"},
    {name: "مغارف بلاستيك",price: 60,desc: "طقم 6 مغارف بلاستيكية متعددة الألوان",category: "المغارف",image: "images/34.jpg"},
    {name: "قفص جلي بلاستيك", price: 40, desc: "قفص بلاستيك لتجفيف الصحون والأكواب", category: "اقفاص الجلي", image: "images/35.jpg" },
    { name: "قفص جلي معدن", price: 70, desc: "قفص معدني متين لتجفيف الصحون والأكواب", category: "اقفاص الجلي", image: "images/36.jpg" },
    { name: "سلة خضرا بلاستيك", price: 30, desc: "سلة بلاستيك لحفظ وتخزين الخضار", category: "اقفاص الخضراوات", image: "images/37.jpg" },
    { name: "سلة خضرا معدن", price: 60, desc: "سلة معدنية متينة لحفظ وتخزين الخضار", category: "اقفاص الخضراوات", image: "images/38.jpg" },
    { name: "طقم فخاري صغير", price: 100, desc: "طقم 6 قطع فخارية صغيرة للتقديم", category: "الفخاريات", image: "images/39.jpg" },
    { name: "طقم فخاري متوسط", price: 150, desc: "طقم 6 قطع فخارية متوسطة الحجم", category: "الفخاريات",  image: "images/40.jpg" },
    { name: "طقم فخاري كبير", price: 200, desc: "طقم 6 قطع فخارية كبيرة للعزائم", category: "الفخاريات", image: "images/41.jpg" },
    { name: "ابريق شاي صغير", price: 80, desc: "إبريق شاي صغير سعة 0.5 لتر", category: "اباريق الشاي", image: "images/45.jpg" },
    { name: "ابريق شاي متوسط", price: 120, desc: "إبريق شاي متوسط سعة 1 لتر", category: "اباريق الشاي", image: "images/43.jpg" },
    { name: "ابريق شاي كبير", price: 160, desc: "إبريق شاي كبير سعة 1.5 لتر", category: "اباريق الشاي", image: "images/44.jpg" }
  // 🔽 كمل باقي المنتجات بنفس الشكل
];

// 4. دالة التنفيذ
async function seedDB() {
  try {
    // تنبيه: هذا السطر سيمسح كل المنتجات الحالية ليضع الجديدة
    await Product.deleteMany({});
    console.log("🗑️ تم مسح المنتجات القديمة الموقتة");

    await Product.insertMany(products);
    console.log("✅ تمت إضافة المنتجات باللغة العربية بنجاح!");
  } catch (err) {
    console.error("❌ حدث خطأ أثناء الإضافة:", err);
  } finally {
    mongoose.connection.close();
    console.log("🔌 تم إغلاق الاتصال.");
  }
}
function generateCategoryButtons(products) {
    const filterContainer = document.querySelector('.filter-buttons');
    if (!filterContainer) return;

    // استخراج الأقسام مع حذف المسافات الزائدة لضمان عدم التكرار
    const categories = ['الكل', ...new Set(products.map(p => p.category.trim()))];

    filterContainer.innerHTML = categories.map(cat => `
        <button onclick="filterByCategory('${cat}')" class="btn-filter">${cat}</button>
    `).join('');
}

function filterByCategory(category) {
    if (category === 'الكل') {
        displayProducts(allProducts);
    } else {
        // الفلترة مع حذف المسافات الزائدة أيضاً للمقارنة الصحيحة
        const filtered = allProducts.filter(p => p.category.trim() === category);
        displayProducts(filtered);
    }
}
seedDB();