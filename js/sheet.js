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

,

// ---------- پرداخت‌ها ----------

getPayments() {

    return api(
        "read",
        "Payments"
    );

},

getSettings(){

    return api(
        "read",
        "Settings"
    );

},

addPayment(customerName, amount, description) {

    return api(
        "write",
        "Payments",
        [

            crypto.randomUUID(),

            customerName,

            Number(amount),

            new Date().toLocaleString("fa-IR"),

            description || ""

        ]
    );

}

,

// ---------- دستمزد ----------

getWages(){

    return api(
        "read",
        "Wages"
    );

},


addWage(type, amount, date, description){

    return api(
        "write",
        "Wages",
        [

            crypto.randomUUID(),

            type,

            Number(amount),

            date,

            description || ""

        ]
    );

}
    
};
