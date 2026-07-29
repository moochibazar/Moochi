document.addEventListener("DOMContentLoaded", () => {


const pageContent =
document.getElementById("pageContent");

function showLoading(){
    
pageContent.innerHTML = `

<div class="loading">

<div class="spinner"></div>

<p>
در حال دریافت اطلاعات...
</p>

</div>

`;

}


function addBackButton(){

return `

<button onclick="goBack()">

⬅️ بازگشت

</button>

`;

}


window.goBack = function(){

location.reload();

};
    
function formatMoney(number){

    return Number(number)
    .toLocaleString("en-US")
    + " تومان";

}

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

showLoading();

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

    showLoading();
    
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

// -------- گزارش‌ها --------

async function showReportsPage(){

showLoading();

const orders =
await Sheet.getOrders();


const payments =
await Sheet.getPayments();



let totalSales = 0;

orders.data
.slice(1)
.forEach(order=>{

    totalSales += Number(order[4]) || 0;

});



let totalPayments = 0;

payments.data
.slice(1)
.forEach(payment=>{

    totalPayments += Number(payment[2]) || 0;

});



pageContent.innerHTML = `


<h2>📄 گزارش‌ها</h2>


<div class="card"
onclick="showSalesReport()">

<h3>💰 فروش یک ماه گذشته</h3>

<p>
${formatMoney(totalSales)}
</p>

</div>



<div class="card"
onclick="showPaymentsReport()">

<h3>💳 پرداخت یک ماه گذشته</h3>

<p>
${formatMoney(totalPayments)}
</p>

</div>



<div class="card"
onclick="showDebtReport()">

<h3>⚠️ بدهی مشتری‌ها</h3>

<p>
${formatMoney(totalSales-totalPayments)}
</p>

</div>


<div class="card"
onclick="showPersonTurnover()">

<h3>🔄 گردش اشخاص</h3>

<p>
سفارش‌ها و پرداخت‌های مشتری
</p>

</div>


`;

}

// فروش هر مشتری

window.showSalesReport =
async function(){


const orders =
await Sheet.getOrders();


let customers = {};



orders.data
.slice(1)
.forEach(order=>{


let name = order[1];

let amount =
Number(order[4]) || 0;



if(!customers[name]){

    customers[name] = 0;

}


customers[name] += amount;


});



let html = `

<h2>💰 فروش هر مشتری</h2>

`;



Object.keys(customers)
.forEach(name=>{


html += `

<div class="card">

<h3>${name}</h3>

<p>
فروش:
${formatMoney(customers[name])}
</p>

</div>

`;

});


pageContent.innerHTML = html;


};





// پرداخت هر مشتری

window.showPaymentsReport =
async function(){


const payments =
await Sheet.getPayments();


let customers = {};



payments.data
.slice(1)
.forEach(payment=>{


let name = payment[1];

let amount =
Number(payment[2]) || 0;



if(!customers[name]){

    customers[name] = 0;

}


customers[name] += amount;


});



let html = `

<h2>💳 پرداخت هر مشتری</h2>

`;



Object.keys(customers)
.forEach(name=>{


html += `

<div class="card">

<h3>${name}</h3>

<p>
پرداخت:
${formatMoney(customers[name])}
</p>

</div>

`;

});


pageContent.innerHTML = html;


};

// بدهی هر مشتری

window.showDebtReport =
async function(){


const customers =
await Sheet.getCustomers();


const orders =
await Sheet.getOrders();


const payments =
await Sheet.getPayments();



let html = `

<h2>⚠️ بدهی مشتری‌ها</h2>

`;



customers.data
.slice(1)
.forEach(customer=>{


let name = customer[1];


let sales = 0;

let paid = 0;



orders.data
.slice(1)
.forEach(order=>{

    if(order[1] == name){

        sales += Number(order[4]) || 0;

    }

});



payments.data
.slice(1)
.forEach(payment=>{

    if(payment[1] == name){

        paid += Number(payment[2]) || 0;

    }

});



let debt =
sales - paid;



html += `

<div class="card">

<h3>${name}</h3>

<p>
فروش:
${formatMoney(sales)}
</p>

<p>
پرداخت:
${formatMoney(paid)}
</p>

<p>
بدهی:
${formatMoney(debt)}
</p>


</div>

`;



});



pageContent.innerHTML = html;


};


// -------- گردش اشخاص --------

window.showPersonTurnover =
async function(){


showLoading();



pageContent.innerHTML = `

<h2>🔄 گردش اشخاص</h2>


<div class="card"
onclick="showPersonOrders()">

<h3>🍡 سفارش‌ها</h3>

<p>
مشاهده گردش سفارش مشتری‌ها
</p>

</div>



<div class="card"
onclick="showPersonPayments()">

<h3>💳 پرداخت‌ها</h3>

<p>
مشاهده گردش پرداخت مشتری‌ها
</p>

</div>


`;



};

// انتخاب مشتری برای سفارش‌ها

window.showPersonOrders =
async function(){

showLoading();


const customers =
await Sheet.getCustomers();



let html = `

<h2>🍡 گردش سفارش‌ها</h2>

`;



customers.data
.slice(1)
.forEach(customer=>{


html += `

<div class="card"
onclick="loadCustomerOrders('${customer[1]}')">

<h3>
${customer[1]}
</h3>

</div>

`;

});



pageContent.innerHTML = html;


};





// نمایش سفارش‌های یک مشتری

window.loadCustomerOrders =
async function(name, limit = 10){


showLoading();



const orders =
await Sheet.getOrders();



let html = `

<h2>🍡 سفارش‌های ${name}</h2>

`;

html += `

<div class="card">

<label>تعداد سفارش‌های آخر</label>

<div style="display:flex;gap:10px;align-items:center;">

<button id="minusCount">-</button>

<input
id="orderLimit"
type="number"
value="10"
min="1"
style="width:70px;text-align:center;">

<button id="plusCount">+</button>

<button id="reloadOrders">
نمایش
</button>

</div>

</div>

`;




const customerOrders =
orders.data
.slice(1)
.filter(order => order[1] == name)
.slice(-limit);

let total = 0;
let totalQty = 0;

customerOrders.forEach(order=>{

    total += Number(order[4]) || 0;

    totalQty += Number(order[2]) || 0;

    html += `

<div class="card">

<p>📅 تاریخ: ${order[5]}</p>

<p>تعداد: ${order[2]}</p>

<p>قیمت واحد: ${formatMoney(order[3])}</p>

<p>مبلغ: ${formatMoney(order[4])}</p>

</div>

`;

});





html += `

<div class="card">

<p>
جمع تعداد:
${totalQty} عدد
</p>

<p>
جمع مبلغ:
${formatMoney(total)}
</p>

</div>

`;

html += `

<div class="card">

<button onclick="makeCustomerPDF('${name}')">

📄 گرفتن PDF حساب

</button>

</div>

`;

pageContent.innerHTML = html;

document.getElementById("plusCount").onclick = () => {

    let input = document.getElementById("orderLimit");

    input.value = Number(input.value) + 1;

};

document.getElementById("minusCount").onclick = () => {

    let input = document.getElementById("orderLimit");

    if(Number(input.value) > 1){

        input.value = Number(input.value) - 1;

    }

};

document.getElementById("reloadOrders").onclick = () => {

    const count =
Number(document.getElementById("orderLimit").value);

loadCustomerOrders(name, count);

};
};

// انتخاب مشتری برای پرداخت‌ها

window.showPersonPayments =
async function(){

showLoading();

const customers =
await Sheet.getCustomers();

let html = `

<h2>💳 گردش پرداخت‌ها</h2>

`;

customers.data
.slice(1)
.forEach(customer=>{

html += `

<div class="card"
onclick="loadCustomerPayments('${customer[1]}')">

<h3>
${customer[1]}
</h3>

</div>

`;

});

pageContent.innerHTML = html;

};




// نمایش پرداخت‌های یک مشتری

window.loadCustomerPayments =
async function(name, limit = 10){

showLoading();

const payments =
await Sheet.getPayments();

let html = `

<h2>💳 پرداخت‌های ${name}</h2>

`;

html += `

<div class="card">

<label>تعداد پرداخت‌های آخر</label>

<div style="display:flex;gap:10px;align-items:center;">

<button id="minusCount">-</button>

<input
id="paymentLimit"
type="number"
value="10"
min="1"
style="width:70px;text-align:center;">

<button id="plusCount">+</button>

<button id="reloadPayments">
نمایش
</button>

</div>

</div>

`;

const customerPayments =
payments.data
.slice(1)
.filter(payment => payment[1] == name)
.slice(-limit);

let total = 0;

customerPayments.forEach(payment=>{

total += Number(payment[2]) || 0;

html += `

<div class="card">

<p>
📅 تاریخ:
${payment[3]}
</p>

<p>
مبلغ:
${formatMoney(payment[2])}
</p>

<p>
توضیحات:
${payment[4] || "-"}
</p>

</div>

`;

});

html += `

<div class="card">

<h3>

جمع پرداخت‌ها:
${formatMoney(total)}

</h3>

</div>

`;

html += `

<div class="card">

<button onclick="makePaymentPDF('${name}')">

📄 گرفتن PDF پرداخت‌ها

</button>

</div>

`;
    
pageContent.innerHTML = html;

document.getElementById("plusCount").onclick = () => {

let input =
document.getElementById("paymentLimit");

input.value =
Number(input.value)+1;

};

document.getElementById("minusCount").onclick = () => {

let input =
document.getElementById("paymentLimit");

if(Number(input.value)>1){

input.value =
Number(input.value)-1;

}

};

document.getElementById("reloadPayments").onclick = () => {

const count =
Number(document.getElementById("paymentLimit").value);

loadCustomerPayments(name,count);

};

};

    
// منوها


document.getElementById("menuCustomers")
.onclick =
showCustomersPage;

document.getElementById("menuReports")
.onclick =
showReportsPage;

document.getElementById("menuOrders")
.onclick =
showOrdersPage;

document.getElementById("menuPayments")
.onclick =
showPaymentsPage;
  

});
