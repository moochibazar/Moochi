window.printCustomerReport = async function(name){

    const orders = await Sheet.getOrders();
    const payments = await Sheet.getPayments();

    const customerOrders = orders.data
        .slice(1)
        .filter(order => order[1] == name);

    const customerPayments = payments.data
        .slice(1)
        .filter(payment => payment[1] == name);

    let totalSales = 0;
    let totalQty = 0;
    let totalPayments = 0;

    let ordersHtml = "";

    customerOrders.forEach(order=>{

        totalQty += Number(order[2]) || 0;
        totalSales += Number(order[4]) || 0;

        ordersHtml += `
        <tr>
            <td>${order[5]}</td>
            <td>${order[2]}</td>
            <td>${Number(order[4]).toLocaleString()}</td>
        </tr>
        `;
    });

    let paymentsHtml = "";

    customerPayments.forEach(payment=>{

        totalPayments += Number(payment[2]) || 0;

        paymentsHtml += `
        <tr>
            <td>${payment[3]}</td>
            <td>${Number(payment[2]).toLocaleString()}</td>
            <td>${payment[4] || "-"}</td>
        </tr>
        `;
    });

    const debt = totalSales - totalPayments;

    const w = window.open("", "_blank");

    w.document.write(`
<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>

<meta charset="UTF-8">

<title>گزارش مشتری</title>

<style>

body{

font-family:Tahoma,sans-serif;
direction:rtl;
padding:30px;
background:#f5f5f5;

}

.container{

background:white;
padding:25px;
border-radius:12px;

}

h1,h2{

text-align:center;

}

table{

width:100%;
border-collapse:collapse;
margin-top:15px;
margin-bottom:20px;

}

th,td{

border:1px solid #ccc;
padding:8px;
text-align:center;

}

th{

background:#ffb347;

}

.summary{

background:#fafafa;
padding:15px;
border-radius:10px;
font-size:16px;
line-height:2;

}

button{

padding:10px 25px;
font-size:16px;
cursor:pointer;

}

</style>

</head>

<body>

<div class="container">

<h1>🍡 گزارش حساب مشتری</h1>

<h2>${name}</h2>

<h3>سفارش‌ها</h3>

<table>

<tr>

<th>تاریخ</th>
<th>تعداد</th>
<th>مبلغ</th>

</tr>

${ordersHtml}

</table>

<h3>پرداخت‌ها</h3>

<table>

<tr>

<th>تاریخ</th>
<th>مبلغ</th>
<th>توضیحات</th>

</tr>

${paymentsHtml}

</table>

<div class="summary">

<p>جمع تعداد سفارش: ${totalQty}</p>

<p>جمع فروش: ${totalSales.toLocaleString()} تومان</p>

<p>جمع پرداخت: ${totalPayments.toLocaleString()} تومان</p>

<p><b>مانده حساب: ${debt.toLocaleString()} تومان</b></p>

</div>

<br>

<center>

<button onclick="window.print()">

🖨 چاپ / ذخیره PDF

</button>

</center>

</div>

</body>

</html>
`);

    w.document.close();

};
