const WAGE_ONE = 5000;
const WAGE_TWO = 10000;

let wageFromDate = "";
let wageToDate = "";
function normalizeDate(date){

    return String(date)
    .trim()
    .replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/\/(\d)\//g,"/0$1/")
    .replace(/\/(\d)$/,"/0$1");

}

// محاسبه دستمزد

async function calculateWages(){

    try{

        const orders =
        await Sheet.getOrders();

        let totalMochi = 0;

        orders.data
        .slice(1)
        .forEach(order=>{

            const orderDate =
normalizeDate(order[5]);

console.log("تاریخ سفارش:", order[5], "تبدیل شده:", orderDate);
console.log("از:", wageFromDate, "تا:", wageToDate);
            if(
                wageFromDate &&
                wageToDate &&
                orderDate >= wageFromDate &&
                orderDate <= wageToDate
            ){

                totalMochi +=
                Number(order[2]) || 0;

            }

        });

        return{

            totalMochi,

            wageOne:
            totalMochi * WAGE_ONE,

            wageTwo:
            totalMochi * WAGE_TWO

        };

    }catch(error){

        console.error(error);

        return{

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


        const wageDate =
String(wage[3])
.trim()
.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));


if(
    wage[1] == type &&
    wageDate >= wageFromDate &&
    wageDate <= wageToDate
){

    totalPaid += Number(wage[2]) || 0;

}


    });


    return totalPaid;

}

async function getWagePaymentsList(type){

    const wages =
    await Sheet.getWages();


    let html = "";


    wages.data
    .slice(1)
    .forEach(wage=>{


        const wageDate =
        String(wage[3])
        .trim()
        .replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));


        if(
            wage[1] == type &&
            wageDate >= wageFromDate &&
            wageDate <= wageToDate
        ){

            html += `

            <div class="card">

            <p>
            📅 تاریخ:
            ${wage[3]}
            </p>

            <p>
            💰 مبلغ:
            ${Number(wage[2]).toLocaleString()}
            تومان
            </p>

            <p>
            📝 توضیحات:
            ${wage[4] || "-"}
            </p>

            </div>

            `;

        }


    });


    return html;

}

window.saveWageFilter = function(){

    wageFromDate =
    document.getElementById("wageFromDate").value;

    wageToDate =
    document.getElementById("wageToDate").value;

    if(!wageFromDate || !wageToDate){

        alert("بازه تاریخ را انتخاب کنید");

        return;

    }

    alert("بازه ذخیره شد");

};


// صفحه اصلی دستمزد

window.showWagePage = function(){


const pageContent =
document.getElementById("pageContent");


pageContent.innerHTML = `


<h2>💵 دستمزد</h2>



<div class="card">
<div class="card">

<label>از تاریخ</label>

<input
id="wageFromDate"
type="text"
placeholder="1405/05/01"
value="${wageFromDate}">

<label style="margin-top:15px;">تا تاریخ</label>

<input
id="wageToDate"
type="text"
placeholder="1405/05/31"
value="${wageToDate}">

<br><br>

<button onclick="saveWageFilter()">

🔍 نمایش

</button>

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

window.saveWageFilter = function(){

    wageFromDate =
normalizeDate(
document.getElementById("wageFromDate").value
);

wageToDate =
normalizeDate(
document.getElementById("wageToDate").value
);

    if(!wageFromDate || !wageToDate){

        alert("بازه تاریخ را انتخاب کنید");

        return;

    }

    alert("بازه ذخیره شد");

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

    const paymentsList =
    await getWagePaymentsList("دستمزد یک");



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

    <h3>
    لیست پرداخت‌ها
    </h3>
 
    ${paymentsList}



    </div>



    <div class="card"
    onclick="showWagePage()">

    ⬅️ بازگشت

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

    const paymentsList =
    await getWagePaymentsList("دستمزد دو");



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

    <h3>
    لیست پرداخت‌ها
    </h3>

${paymentsList}



    </div>



    <div class="card"
    onclick="showWagePage()">

    ⬅️ بازگشت

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
