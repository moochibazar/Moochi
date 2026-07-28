// وقتی صفحه باز شد
document.addEventListener("DOMContentLoaded", () => {

    const adminBtn = document.getElementById("adminBtn");
    const customerBtn = document.getElementById("customerBtn");

    // ورود مدیر
    if (adminBtn) {
        adminBtn.addEventListener("click", () => {
            window.location.href = "pages/admin.html";
        });
    }

    // ورود مشتری
    if (customerBtn) {
        customerBtn.addEventListener("click", () => {
            window.location.href = "customer.html";
        });
    }

});
