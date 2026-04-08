document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      document.getElementById("message").textContent = "✅ تسجيل الدخول ناجح!";
      // حفظ حالة الدخول
      localStorage.setItem("isAdmin", "true");
      // تحويل لصفحة المنجر
      window.location.href = "admin.html";
    } else {
      document.getElementById("message").textContent = "❌ اسم المستخدم أو كلمة المرور غير صحيحة.";
    }
  } catch (err) {
    document.getElementById("message").textContent = "⚠️ خطأ في الاتصال بالسيرفر.";
    console.error(err);
  }
});
