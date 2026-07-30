const WAGE_ONE = 5000;
const WAGE_TWO = 10000;

let wageOrderLimit = 5;


// محاسبه دستمزد

async function calculateWages(){

    try {

        const orders =
        await Sheet.getOrders();


        let totalMochi = 0;


        const lastOrders =
        orders.data
        .slice(1)
        .slice(-wageOrderLimit);



        lastOrders.forEach(order=>{

            totalMochi += Number(order[2]) || 0;

        });



        return {

            totalMochi,

            wageOne:
            totalMochi * WAGE_ONE,

            wageTwo:
            totalMochi * WAGE_TWO

        };


    } catch(error){

        console.error(error);

        return {

            totalMochi:0,

            wageOne:0,

            wageTwo:0

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
    data.wageOne - paid;



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
    data.wageTwo - paid;



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

window.saveWageHtml = function(type,total,allSalary,paid,remain){

const html = `

<!DOCTYPE html>

<html lang="fa" dir="rtl">

<head>

<meta charset="UTF-8">

<title>${type}</title>

<style>

body{

font-family:tahoma;

direction:rtl;

background:#f5f5f5;

padding:40px;

}

.container{

max-width:700px;

margin:auto;

background:white;

padding:30px;

border-radius:15px;

box-shadow:0 0 15px rgba(0,0,0,.1);

}

h1{

text-align:center;

}

table{

width:100%;

border-collapse:collapse;

margin-top:30px;

}

td{

border:1px solid #ddd;

padding:12px;

}

tr:nth-child(even){

background:#fafafa;

}

</style>

</head>

<body>

<div class="container">

<h1>${type}</h1>

<table>

<tr>

<td>تعداد موچی</td>

<td>${total} عدد</td>

</tr>

<tr>

<td>کل دستمزد</td>

<td>${Number(allSalary).toLocaleString()} تومان</td>

</tr>

<tr>

<td>پرداخت شده</td>

<td>${Number(paid).toLocaleString()} تومان</td>

</tr>

<tr>

<td><b>مانده</b></td>

<td><b>${Number(remain).toLocaleString()} تومان</b></td>

</tr>

<tr>

<td>تاریخ گزارش</td>

<td>${new Date().toLocaleDateString("fa-IR")}</td>

</tr>

</table>

</div>

</body>

</html>

`;

const blob = new Blob([html],{
type:"text/html;charset=utf-8"
});

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download=type+".html";

a.click();

URL.revokeObjectURL(a.href);

};
