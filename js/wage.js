const WAGE_ONE = 5000;
const WAGE_TWO = 10000;

let wageOrderLimit = 5;

// گرفتن تعداد کل موچی‌ها و محاسبه دستمزد

async function calculateWages(){

    try {

        const orders = await Sheet.getOrders();

        let totalMochi = 0;


        const lastOrders =
orders.data
.slice(1)
.slice(-wageOrderLimit);


lastOrders.forEach(order => {

    totalMochi += Number(order[2]) || 0;

});


        return {

            totalMochi: totalMochi,

            wageOne: totalMochi * WAGE_ONE,

            wageTwo: totalMochi * WAGE_TWO

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

<div style="display:flex;gap:10px;align-items:center;justify-content:center;">

<button onclick="decreaseWageOrders()">
-
</button>


<h3 id="wageOrderCount">
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



`;

};






// نمایش دستمزد یک

window.showWageOne = async function(){


const pageContent =
document.getElementById("pageContent");


const data =
await calculateWages();



pageContent.innerHTML = `


<h2>💵 دستمزد یک</h2>



<div class="card">


<h3>
تعداد کل موچی فروخته شده
</h3>


<p>
${data.totalMochi} عدد
</p>


<h3>
مبلغ دستمزد
</h3>


<p>
${data.wageOne.toLocaleString()} تومان
</p>



</div>


`;

};






// نمایش دستمزد دو

window.showWageTwo = async function(){


const pageContent =
document.getElementById("pageContent");


const data =
await calculateWages();



pageContent.innerHTML = `


<h2>💵 دستمزد دو</h2>



<div class="card">


<h3>
تعداد کل موچی فروخته شده
</h3>


<p>
${data.totalMochi} عدد
</p>


<h3>
مبلغ دستمزد
</h3>


<p>
${data.wageTwo.toLocaleString()} تومان
</p>



</div>


`;

};

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
