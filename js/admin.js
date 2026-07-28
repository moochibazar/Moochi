document.addEventListener("DOMContentLoaded", () => {


    const pageContent =
    document.getElementById("pageContent");



    function showCustomersPage(){


        pageContent.innerHTML = `

        <h2>👥 مشتری‌ها</h2>


        <div class="card">

            <input id="customerName"
            placeholder="نام مشتری">


            <input id="mochiPrice"
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




    async function saveCustomer(){


        const name =
        document.getElementById("customerName").value;


        const price =
        document.getElementById("mochiPrice").value;



        if(!name || !price){

            alert("اطلاعات را کامل کنید");

            return;

        }



        const result =
        await Sheet.addCustomer(
            name,
            price
        );



        if(result.success){

            alert("ثبت شد ✅");

            loadCustomers();

        }



    }





    async function loadCustomers(){


        const box =
        document.getElementById("customersList");


        const result =
        await Sheet.getCustomers();



        if(!result.success){

            box.innerHTML="خطا";

            return;

        }



        box.innerHTML="";



        result.data
        .slice(1)
        .forEach((customer,index)=>{


            const row =
            index + 2;



            box.innerHTML += `


            <div class="card">


            <h3>
            ${customer[1]}
            </h3>


            <p>
            قیمت موچی:
            ${customer[3]}
            </p>


            <button onclick="editCustomer(${row}, '${customer[1]}', '${customer[3]}')">
            ✏️ ویرایش
            </button>



            <button onclick="removeCustomer(${row})">
            🗑 حذف
            </button>


            </div>


            `;


        });


    }







    window.editCustomer =
    async function(row,name,price){


        const newName =
        prompt(
        "نام جدید:",
        name
        );


        const newPrice =
        prompt(
        "قیمت جدید:",
        price
        );



        if(!newName || !newPrice)
        return;



        const result =
        await Sheet.updateCustomer(
            row,
            newName,
            newPrice
        );



        if(result.success){

            alert("ویرایش شد ✅");

            loadCustomers();

        }


    };







    window.removeCustomer =
    async function(row){


        if(!confirm("حذف شود؟"))
        return;



        const result =
        await Sheet.deleteCustomer(row);



        if(result.success){

            alert("حذف شد");

            loadCustomers();

        }


    };





    const menu =
    document.getElementById("menuCustomers");



    if(menu){

        menu.onclick =
        showCustomersPage;

    }



});
