document.addEventListener("DOMContentLoaded", () => {

    const pageContent = document.getElementById("pageContent");

    const pages = {

        customers: `
            <h2>👥 مشتری‌ها</h2>

            <br>

            <button id="addCustomer">
                + افزودن مشتری
            </button>

            <div id="customersList"></div>
        `,

        orders: `
            <h2>🍡 سفارش جدید</h2>

            <br>

            <button id="addOrder">
                + ثبت سفارش
            </button>
        `,

        payments: `
            <h2>💰 پرداخت جدید</h2>

            <br>

            <button id="addPayment">
                + ثبت پرداخت
            </button>
        `,

        reports: `
            <h2>📄 گزارش‌ها</h2>

            <p>به زودی...</p>
        `,

        settings: `
            <h2>⚙️ تنظیمات</h2>

            <p>به زودی...</p>
        `

    };

    function openPage(name){

        pageContent.innerHTML = pages[name];

    }

    document.getElementById("menuCustomers").onclick = ()=>openPage("customers");

    document.getElementById("menuOrders").onclick = ()=>openPage("orders");

    document.getElementById("menuPayments").onclick = ()=>openPage("payments");

    document.getElementById("menuReports").onclick = ()=>openPage("reports");

    document.getElementById("menuSettings").onclick = ()=>openPage("settings");

});
