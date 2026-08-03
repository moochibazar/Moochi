window.showAdminMenu = function () {

    const pageContent = document.getElementById("pageContent");

    pageContent.innerHTML = `

    <h2>⚙️ ادمین</h2>

    <div class="card" onclick="showOrdersPage()">

        <h3>🍡 ثبت سفارش</h3>

        <p>ثبت سفارش جدید</p>

    </div>

    <div class="card" onclick="showPaymentsPage()">

        <h3>💰 پرداخت جدید</h3>

        <p>ثبت پرداخت مشتری</p>

    </div>

    `;

};
