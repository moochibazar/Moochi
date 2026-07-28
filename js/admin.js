document.addEventListener("DOMContentLoaded", () => {


const pageContent = document.getElementById("pageContent");



// ---------------- مشتری‌ها ----------------


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



document.getElementById("saveCustomer")
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

alert("مشتری ثبت شد ✅");

loadCustomers();

}



}





async function loadCustomers(){


const box =
document.getElementById("customersList");


const result =
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

alert("ویرایش شد ✅");

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





// ---------------- سفارش جدید ----------------



function showOrdersPage(){


pageContent.innerHTML = `


<h2>🍡 سفارش جدید</h2>


<div class="card">


<input id="orderCustomer"
placeholder="کد مشتری">


<input id="orderQuantity"
type="number"
placeholder="تعداد موچی">


<input id="orderPrice"
type="number"
placeholder="قیمت هر موچی">


<button id="saveOrder">
ثبت سفارش
</button>


</div>


`;



document.getElementById("saveOrder")
.onclick = saveOrder;


}




async function saveOrder(){


let customerId =
document.getElementById("orderCustomer").value;


let quantity =
document.getElementById("orderQuantity").value;


let price =
document.getElementById("orderPrice").value;



if(!customerId || !quantity || !price){

alert("اطلاعات سفارش کامل نیست");

return;

}



let result =
await Sheet.addOrder(
customerId,
quantity,
price
);



if(result.success){

alert("سفارش ثبت شد ✅");

}


}




// منوها


const menuCustomers =
document.getElementById("menuCustomers");


if(menuCustomers){

menuCustomers.onclick =
showCustomersPage;

}



const menuOrders =
document.getElementById("menuOrders");


if(menuOrders){

menuOrders.onclick =
showOrdersPage;

}



});
