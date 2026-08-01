const WAGE_ONE = 5000;
const WAGE_TWO = 10000;

let wageOrderLimit = 5;


// محاسبه دستمزد

async function calculateWages(){

    try{

        const orders = await Sheet.getOrders();

        const allOrders = orders.data.slice(1);

        // مجموع کل موچی از اولین سفارش تا آخرین سفارش
        let totalAllMochi = 0;

        allOrders.forEach(order=>{
            totalAllMochi += Number(order[2]) || 0;
        });

        // مجموع موچی ۳۰ سفارش آخر
        let totalLast30Mochi = 0;

        allOrders
            .slice(-30)
            .forEach(order=>{
                totalLast30Mochi += Number(order[2]) || 0;
            });

        return{

            totalMochi: totalLast30Mochi,

            wageOne: totalLast30Mochi * WAGE_ONE,

            wageTwo: totalLast30Mochi * WAGE_TWO,

            totalWageOne: totalAllMochi * WAGE_ONE,

            totalWageTwo: totalAllMochi * WAGE_TWO

        };

    }catch(error){

        console.error(error);

        return{

            totalMochi:0,

            wageOne:0,

            wageTwo:0,

            totalWageOne:0,

            totalWageTwo:0

        };

    }

}



// پرداخت‌های ثبت شده

async function calculatePaidWages(type){

    const wages =
    await Sheet.getWages();


    let totalPaid = 0;


    wages.data
    .slice(1)
    .forEach(wage=>{


        if(wage[1] == type){

            totalPaid += Number(wage[2]) || 0;

        }


    });


    return totalPaid;

}




// صفحه اصلی دستمزد

window.showWagePage = function(){


const pageContent =
document.getElementById("pageContent");


pageContent.innerHTML = `


<h2>💵 دستمزد</h2>



<div class="card">

<label>
تعداد سفارش‌های آخر:
</label>


<div style="display:flex;gap:10px;justify-content:center;align-items:center;">


<button onclick="decreaseWageOrders()">
-
</button>


<h3>
${wageOrderLimit}
</h3>


<button onclick="increaseWageOrders()">
+
</button>


</div>


</div>



<div class="card"
onclick="showWageOne()">

<h3>
دستمزد یک
</h3>

<p>
۵۰۰۰ تومان برای هر موچی
</p>

</div>




<div class="card"
onclick="showWageTwo()">

<h3>
دستمزد دو
</h3>

<p>
۱۰۰۰۰ تومان برای هر موچی
</p>

</div>



<div class="card"
onclick="showAddWagePage()">

<h3>
💰 ثبت پرداخت دستمزد
</h3>

<p>
ثبت مبلغ پرداخت شده
</p>

</div>


`;

};

// نمایش دستمزد یک

window.showWageOne = async function(){

    const pageContent =
    document.getElementById("pageContent");


    pageContent.innerHTML = `

    <div class="loading">

        <div class="spinner"></div>

        <p>
        در حال بارگذاری...
        </p>

    </div>

    `;



    const data =
    await calculateWages();


    const paid =
    await calculatePaidWages("دستمزد یک");


    const remain =
    data.totalWageOne - paid;



    pageContent.innerHTML = `


    <h2>💵 دستمزد یک</h2>



    <div class="card">


    <p>
    تعداد موچی:
    ${data.totalMochi} عدد
    </p>



    <p>
    کل دستمزد:
    ${data.wageOne.toLocaleString()} تومان
    </p>



    <p>
    پرداخت شده:
    ${paid.toLocaleString()} تومان
    </p>



    <p>
    <b>
    مانده:
    ${remain.toLocaleString()} تومان
    </b>
    </p>



    </div>



    <div class="card"
    onclick="showWagePage()">

    ⬅️ بازگشت

    </div>

    <div class="card">

<button onclick="saveWageHtml(
'دستمزد یک',
${data.totalMochi},
${data.wageOne},
${paid},
${remain}
)">

💾 ذخیره گزارش

</button>

</div>


    `;


};





// نمایش دستمزد دو

window.showWageTwo = async function(){

    const pageContent =
    document.getElementById("pageContent");


    pageContent.innerHTML = `

    <div class="loading">

        <div class="spinner"></div>

        <p>
        در حال بارگذاری...
        </p>

    </div>

    `;



    const data =
    await calculateWages();



    const paid =
    await calculatePaidWages("دستمزد دو");



    const remain =
    data.totalWageTwo - paid;



    pageContent.innerHTML = `


    <h2>💵 دستمزد دو</h2>



    <div class="card">


    <p>
    تعداد موچی:
    ${data.totalMochi} عدد
    </p>



    <p>
    کل دستمزد:
    ${data.wageTwo.toLocaleString()} تومان
    </p>



    <p>
    پرداخت شده:
    ${paid.toLocaleString()} تومان
    </p>



    <p>
    <b>
    مانده:
    ${remain.toLocaleString()} تومان
    </b>
    </p>



    </div>



    <div class="card"
    onclick="showWagePage()">

    ⬅️ بازگشت

    </div>

    <div class="card">

<button onclick="saveWageHtml(
'دستمزد دو',
${data.totalMochi},
${data.wageTwo},
${paid},
${remain}
)">

💾 ذخیره گزارش

</button>

</div>


    `;


};

        
// افزایش و کاهش تعداد سفارش‌ها

window.increaseWageOrders = function(){

    wageOrderLimit++;

    showWagePage();

};


window.decreaseWageOrders = function(){

    if(wageOrderLimit > 1){

        wageOrderLimit--;

    }

    showWagePage();

};


// صفحه ثبت پرداخت دستمزد

window.showAddWagePage = function(){

    const pageContent =
    document.getElementById("pageContent");


    pageContent.innerHTML = `

    <h2>💰 ثبت پرداخت دستمزد</h2>

    <div class="card">

        <select id="wageType">

            <option value="دستمزد یک">
                دستمزد یک
            </option>

            <option value="دستمزد دو">
                دستمزد دو
            </option>

        </select>


        <input
        id="wageAmount"
        type="number"
        placeholder="مبلغ پرداخت">


        <input
        id="wageDate"
        type="text"
        placeholder="تاریخ (مثال: 1405/05/10)">


        <input
        id="wageDescription"
        placeholder="توضیحات (اختیاری)">


        <button onclick="saveWagePayment()">
            ثبت پرداخت
        </button>


        <br><br>

        <button onclick="showWagePage()">
            ⬅️ بازگشت
        </button>

    </div>

    `;

};


// ذخیره پرداخت

window.saveWagePayment = async function(){

    const type =
    document.getElementById("wageType").value;

    const amount =
    document.getElementById("wageAmount").value;

    const date =
    document.getElementById("wageDate").value;

    const description =
    document.getElementById("wageDescription").value;


    if(!amount || !date){

        alert("مبلغ و تاریخ را وارد کنید");

        return;

    }


    const result =
    await Sheet.addWage(
        type,
        amount,
        date,
        description
    );


    if(result.success){

        alert("پرداخت دستمزد ثبت شد ✅");

        showWagePage();

    }else{

        alert("خطا در ثبت پرداخت");

    }

};

window.saveWageHtml = async function(type){

    const data = await calculateWages();

    const paid = await calculatePaidWages(type);

    const remain =
        (type=="دستمزد یک" ? data.wageOne : data.wageTwo)
        - paid;

    const wages =
    await Sheet.getWages();

    let rows="";

    wages.data
    .slice(1)
    .forEach(w=>{

        if(w[1]==type){

            rows += `
            <tr>
                <td>${String(w[3]).split(",")[0]}</td>
                <td>${Number(w[2]).toLocaleString()}</td>
                <td>${w[4]||"-"}</td>
            </tr>
            `;

        }

    });

    const total =
    type=="دستمزد یک"
    ? data.wageOne
    : data.wageTwo;

    const html=`

<!DOCTYPE html>

<html lang="fa" dir="rtl">

<head>

<meta charset="UTF-8">

<title>گزارش دستمزد</title>

<style>

body{

font-family:tahoma;

background:#faf8ff;

padding:40px;

color:#444;

}

.container{

max-width:850px;

margin:auto;

background:white;

border-radius:20px;

padding:30px;

box-shadow:0 5px 20px rgba(0,0,0,.1);

}

h1{

text-align:center;

color:#7b5cff;

margin-bottom:30px;

}

.cards{

display:grid;

grid-template-columns:repeat(3,1fr);

gap:15px;

margin-bottom:30px;

}

.card{

padding:18px;

border-radius:15px;

text-align:center;

font-size:18px;

}

.c1{background:#ffe8ef;}

.c2{background:#e8fff0;}

.c3{background:#fff8d9;}

.card h3{

margin:0 0 10px;

font-size:16px;

}

.card b{

font-size:24px;

}

table{

width:100%;

border-collapse:collapse;

margin-top:20px;

}

th{

background:#d9d7ff;

padding:12px;

}

td{

padding:10px;

border-bottom:1px solid #eee;

text-align:center;

}

.footer{

margin-top:30px;

text-align:center;

font-size:13px;

color:#888;

}

@media print{

body{

background:white;

padding:0;

}

.container{

box-shadow:none;

}

}

</style>

</head>

<body>

<div class="container">

<h1>${type}</h1>

<div class="cards">

<div class="card c1">

<h3>تعداد موچی</h3>

<b>${data.totalMochi}</b>

</div>

<div class="card c2">

<h3>کل دستمزد</h3>

<b>${total.toLocaleString()}</b>

</div>

<div class="card c3">

<h3>مانده</h3>

<b>${remain.toLocaleString()}</b>

</div>

</div>

<h2>پرداخت‌های ثبت شده</h2>

<table>

<tr>

<th>تاریخ پرداخت</th>

<th>مبلغ</th>

<th>توضیحات</th>

</tr>

${rows}

</table>

<div class="footer">

گزارش دستمزد تولید

</div>

</div>

</body>

</html>

`;

    const blob=new Blob([html],{type:"text/html;charset=utf-8"});

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download=type+".html";

    a.click();

    URL.revokeObjectURL(url);

};
