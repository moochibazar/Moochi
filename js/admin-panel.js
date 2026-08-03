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

async function showOrderPage(){

showLoading();


const customers =
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

<h2>
🍡 ثبت سفارش
</h2>


<div class="card">


<select id="orderCustomer">

<option value="">
انتخاب مشتری
</option>

${options}

</select>



<input
id="orderQuantity"
type="number"
placeholder="تعداد موچی">



<p id="orderTotal">
مبلغ کل: 0
</p>



<button id="saveOrder">
ثبت سفارش
</button>


</div>

`;



document
.getElementById("orderQuantity")
.oninput = calculateOrderTotal;


document
.getElementById("saveOrder")
.onclick = saveOrder;


}



function calculateOrderTotal(){

const customer =
document.getElementById("orderCustomer").value;


const quantity =
document.getElementById("orderQuantity").value;



if(!customer)
return;



const price =
customer.split("|")[1];


const total =
Number(quantity) * Number(price);



document.getElementById("orderTotal")
.innerHTML =
"مبلغ کل: " + total;


}




async function saveOrder(){

const customer =
document.getElementById("orderCustomer").value;


const quantity =
document.getElementById("orderQuantity").value;



if(!customer || !quantity){

alert("اطلاعات کامل نیست");

return;

}



const data =
customer.split("|");



const result =
await Sheet.addOrder(

data[0],

quantity,

data[1]

);



if(result.success){

alert("سفارش ثبت شد ✅");

document.getElementById("orderQuantity").value="";

}

}
