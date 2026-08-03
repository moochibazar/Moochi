document.addEventListener("DOMContentLoaded", () => {

    const pageContent = document.getElementById("pageContent");

    pageContent.innerHTML = `

        <h2>⚙️ پنل ادمین</h2>

        <div class="card">
            <button onclick="location.href='admin.html#orders'">
                🍡 ثبت سفارش
            </button>
        </div>

        <div class="card">
            <button onclick="location.href='admin.html#payments'">
                💰 پرداخت جدید
            </button>
        </div>

    `;

});
