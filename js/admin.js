document.addEventListener("DOMContentLoaded", () => {

    const pageContent = document.getElementById("pageContent");

    function showCustomersPage() {

        pageContent.innerHTML = `
            <h2>👥 مشتری‌ها</h2>

            <div class="card">

                <input id="customerName" placeholder="نام مشتری">

                <input id="mochiPrice" type="number" placeholder="قیمت هر موچی">

                <button id="saveCustomer">
                    ذخیره مشتری
                </button>

            </div>

            <div id="customersList"></div>
        `;

        document
            .getElementById("saveCustomer")
            .onclick = saveCustomer;

        loadCustomers();

    }

    async function saveCustomer() {

        const customerName =
            document.getElementById("customerName").value;

        const mochiPrice =
            document.getElementById("mochiPrice").value;

        if (!customerName || !mochiPrice) {

            alert("همه اطلاعات را وارد کنید");

            return;

        }

        const result = await Sheet.addCustomer({

            customerName,

            mochiPrice

        });

        if (result.success) {

            alert("مشتری ثبت شد ✅");

            loadCustomers();

        } else {

            alert(result.message);

        }

    }

    async function loadCustomers() {

        const result = await Sheet.getCustomers();

        if (!result.success) return;

        const box =
            document.getElementById("customersList");

        box.innerHTML = "";

        result.customers.forEach(customer => {

            box.innerHTML += `

                <div class="card">

                    <h3>${customer.customerName}</h3>

                    <p>کد:
                    ${customer.customerCode}</p>

                    <p>
                    قیمت هر موچی:
                    ${customer.mochiPrice}
                    </p>

                </div>

            `;

        });

    }

    document
        .getElementById("menuCustomers")
        .onclick = showCustomersPage;

});
