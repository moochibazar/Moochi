document.addEventListener("DOMContentLoaded", () => {


const pageContent =
document.getElementById("pageContent");



function showCustomersPage(){

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



document.getElementById("saveCustomer").onclick =
saveCustomer;


loadCustomers();

}




async function saveCustomer(){

let name =
document.getElementById("customerName").value;


let price =
document.getElementById("mochiPrice").value;



if(!name || !price){

alert("اطلاعات کامل نیست");

return;

}



let result =
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


let box =
document.getElementById("customersList");


let result =
await Sheet.getCustomers();



if(!result.success)
return;



box.innerHTML="";



result.data.slice(1).forEach((customer,index)=>{


let row=index+2;


box.innerHTML += `

<div class="card">

<h3>${customer[1]}</h3>

<p>
قیمت موچی:
${customer[3]}
</p>


<button onclick="editCustomer(${row},'${customer[1]}','${customer[3]}')">
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


let newName =
prompt("نام جدید",name);


let newPrice =
prompt("قیمت جدید",price);



if(!newName || !newPrice)
return;



let result =
await Sheet.updateCustomer(
row,
newName,
newPrice
);



if(result.success){

alert("ویرایش شد");

loadCustomers();

}

};




window.removeCustomer =
async function(row){


if(!confirm("حذف شود؟"))
return;


let result =
await Sheet.deleteCustomer(row);



if(result.success){

alert("حذف شد");

loadCustomers();

}

};







// -------- سفارش جدید --------



async function showOrdersPage(){


let customers =
await Sheet.getCustomers();



let options = "";



customers.data
.slice(1)
.forEach(customer=>{


options += `

<option value="${customer[1]}|${customer[3]}">

${customer[1]}

</option>

`;

});




pageContent.innerHTML = `


<h2>🍡 سفارش جدید</h2>


<div class="card">


<select id="orderCustomer">

<option>
انتخاب مشتری
</option>

${options}

</select>



<input id="orderQuantity"
type="number"
placeholder="تعداد موچی">



<div id="orderTotal">
مبلغ کل: 0
</div>



<button id="saveOrder">
ثبت سفارش
</button>



</div>


`;



document.getElementById("orderQuantity")
.oninput = calculateTotal;



document.getElementById("saveOrder")
.onclick = saveOrder;



}



function calculateTotal(){


let customer =
document.getElementById("orderCustomer").value;


let quantity =
document.getElementById("orderQuantity").value;



if(!customer)
return;



let price =
customer.split("|")[1];



let total =
Number(quantity) * Number(price);



document.getElementById("orderTotal")
.innerHTML =
"مبلغ کل: " + total;


}




async function saveOrder(){


let customer =
document.getElementById("orderCustomer").value;


let quantity =
document.getElementById("orderQuantity").value;



if(!customer || !quantity){

alert("اطلاعات کامل نیست");

return;

}



let data =
customer.split("|");


let name =
data[0];


let price =
data[1];



let result =
await Sheet.addOrder(
name,
quantity,
price
);



if(result.success){

alert("سفارش ثبت شد ✅");

}

}

// -------- پرداخت جدید --------

async function showPaymentsPage() {

    const customers = await Sheet.getCustomers();

    let options = "";

    customers.data
    .slice(1)
    .forEach(customer => {

        options += `
            <option value="${customer[1]}">
                ${customer[1]}
            </option>
        `;

    });

    pageContent.innerHTML = `

        <h2>💰 پرداخت جدید</h2>

        <div class="card">

            <select id="paymentCustomer">

                <option value="">
                    انتخاب مشتری
                </option>

                ${options}

            </select>

            <input
                id="paymentAmount"
                type="number"
                placeholder="مبلغ پرداخت">

            <input
                id="paymentDescription"
                placeholder="توضیحات (اختیاری)">

            <button id="savePayment">
                ثبت پرداخت
            </button>

        </div>

    `;

    document
        .getElementById("savePayment")
        .onclick = savePayment;

}



async function savePayment() {

    const customer =
        document.getElementById("paymentCustomer").value;

    const amount =
        document.getElementById("paymentAmount").value;

    const description =
        document.getElementById("paymentDescription").value;

    if (!customer || !amount) {

        alert("اطلاعات را کامل کنید");

        return;

    }

    const result =
        await Sheet.addPayment(
            customer,
            amount,
            description
        );

    if (result.success) {

        alert("پرداخت ثبت شد ✅");

        showPaymentsPage();

    }

}


// منوها


document.getElementById("menuCustomers")
.onclick =
showCustomersPage;



document.getElementById("menuOrders")
.onclick =
showOrdersPage;

document.getElementById("menuPayments")
.onclick =
showPaymentsPage;
  

});
