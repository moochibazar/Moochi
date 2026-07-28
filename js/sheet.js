const Sheet = {


getCustomers(){

return api(
"read",
"Customers"
);

},



addCustomer(customerName, mochiPrice){

return api(
"write",
"Customers",
[

crypto.randomUUID(),

customerName,

"MC"+Date.now(),

Number(mochiPrice),

new Date().toLocaleString("fa-IR")

]
);

},



updateCustomer(rowNumber, customerName, mochiPrice){

return api(
"update",
"Customers",
{

row:rowNumber,

data:[

customerName,

Number(mochiPrice)

]

}
);

},



deleteCustomer(rowNumber){

return api(
"delete",
"Customers",
{

row:rowNumber

}
);

},




getOrders(){

return api(
"read",
"Orders"
);

},




addOrder(customerName, quantity, price){


let total =
Number(quantity) * Number(price);



return api(
"write",
"Orders",
[

crypto.randomUUID(),

customerName,

Number(quantity),

Number(price),

total,

new Date().toLocaleString("fa-IR")

]
);


}



};
