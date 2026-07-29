window.makeCustomerPDF = async function(name){



const orders =
await Sheet.getOrders();


const payments =
await Sheet.getPayments();


const customerOrders =
orders.data
.slice(1)
.filter(order=>order[1] == name);


const customerPayments =
payments.data
.slice(1)
.filter(payment=>payment[1] == name);



const { jsPDF } =
window.jspdf;


const doc =
new jsPDF();


let y = 20;


doc.setFontSize(18);

doc.text(
"Customer Account Report",
20,
y
);


y += 15;


doc.setFontSize(14);

doc.text(
"Customer: " + name,
20,
y
);


y += 15;


doc.setFontSize(12);


let totalSales = 0;
let totalQty = 0;


doc.text(
"Orders",
20,
y
);


y += 10;


customerOrders.forEach(order=>{


totalSales += Number(order[4]) || 0;

totalQty += Number(order[2]) || 0;


doc.text(
`${order[5]} | Qty: ${order[2]} | Amount: ${order[4]}`,
20,
y
);


y += 8;


if(y > 280){

doc.addPage();

y = 20;

}


});



y += 10;


doc.text(
"Total Orders: " + totalQty,
20,
y
);


y += 8;


doc.text(
"Sales: " + totalSales,
20,
y
);


y += 15;


let totalPayment = 0;


doc.text(
"Payments",
20,
y
);


y += 10;



customerPayments.forEach(payment=>{


totalPayment += Number(payment[2]) || 0;


doc.text(
`${payment[3]} | ${payment[2]} | ${payment[4] || ""}`,
20,
y
);


y += 8;


if(y > 280){

doc.addPage();

y = 20;

}


});



y += 10;


doc.text(
"Total Payments: " + totalPayment,
20,
y
);


y += 10;


doc.text(
"Debt: " + (totalSales-totalPayment),
20,
y
);



doc.save(
name + "-account.pdf"
);



alert("PDF ساخته شد ✅");


};





window.makePaymentPDF = async function(name){


const payments =
await Sheet.getPayments();


const customerPayments =
payments.data
.slice(1)
.filter(payment=>payment[1] == name);



const { jsPDF } =
window.jspdf;


const doc =
new jsPDF();


let y = 20;


doc.text(
"Payments Report",
20,
y
);


y += 15;


doc.text(
"Customer: " + name,
20,
y
);


y += 15;


let total = 0;


customerPayments.forEach(payment=>{


total += Number(payment[2]) || 0;


doc.text(
`${payment[3]} | ${payment[2]} | ${payment[4] || ""}`,
20,
y
);


y += 8;


});


y += 10;


doc.text(
"Total: " + total,
20,
y
);



doc.save(
name + "-payments.pdf"
);

alert("PDF ساخته شد ✅");
  
};
