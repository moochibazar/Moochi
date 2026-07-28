document.addEventListener("DOMContentLoaded", () => {

    const pageContent = document.getElementById("pageContent");


    function showCustomersPage() {

        pageContent.innerHTML = `

            <h2>👥 مشتری‌ها</h2>

            <div class="card">

                <input 
                id="customerName" 
                placeholder="نام مشتری">

                <input 
                id="mochiPrice" 
                type="number" 
                placeholder="قیمت هر موچی">

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
        document.getElementById("customerName").value.trim();


        const mochiPrice =
        document.getElementById("mochiPrice").value;



        if(!customerName || !mochiPrice){

            alert("نام و قیمت را وارد کنید");

            return;

        }



        const result = await Sheet.addCustomer(
            customerName,
            mochiPrice
        );



        if(result.success){

            alert("مشتری ثبت شد ✅");

            document.getElementById("customerName").value = "";

            document.getElementById("mochiPrice").value = "";


            loadCustomers();

        }
        else{

            alert(result.message || "خطا در ثبت");

        }


    }





    async function loadCustomers(){


        const box =
        document.getElementById("customersList");


        const result =
        await Sheet.getCustomers();



        if(!result.success){

            box.innerHTML =
            "خطا در دریافت اطلاعات";

            return;

        }



        box.innerHTML = "";



        const rows = result.data;



        rows.slice(1).forEach(customer => {



            box.innerHTML += `


            <div class="card">


                <h3>
                ${customer[1]}
                </h3>


                <p>
                کد مشتری:
                ${customer[2]}
                </p>


                <p>
                قیمت موچی:
                ${customer[3]}
                </p>


            </div>


            `;


        });


    }





    const menu =
    document.getElementById("menuCustomers");


    if(menu){

        menu.onclick = showCustomersPage;

    }



});
