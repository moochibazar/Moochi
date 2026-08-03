document.addEventListener("DOMContentLoaded", () => {

    const pageContent = document.getElementById("pageContent");

    pageContent.innerHTML = `
        <h2>⚙️ پنل ادمین</h2>

        <div class="card" onclick="location.href='admin.html?page=orders'">
            <h3>🍡 ثبت سفارش</h3>
        </div>

        <div class="card" onclick="location.href='admin.html?page=payments'">
            <h3>💰 پرداخت جدید</h3>
        </div>
    `;

});
