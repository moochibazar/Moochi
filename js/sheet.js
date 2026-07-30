function getPersianDate(){

    return new Date()
    .toLocaleDateString("fa-IR")
    .replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

}

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

getPersianDate()

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

            getPersianDate(),

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
