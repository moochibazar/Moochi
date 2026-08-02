document.addEventListener("DOMContentLoaded", loadExpenses);


async function loadExpenses(){

const box =
document.getElementById("expensesTable");


box.innerHTML = `

<div class="loading">

<div class="spinner"></div>

<p>
در حال بارگذاری...
</p>

</div>

`;


try{


const expenses =
await Sheet.getExpenses();


const wages =
await Sheet.getWages();



const data = {};

const dates = new Set();



// ---------- هزینه‌ها ----------


expenses.data
.slice(1)
.forEach(expense=>{


const date =
String(expense[1])
.split("T")[0]
.replace(/-/g,"/");


dates.add(date);



if(!data[date]){

data[date]={

expense:"",
wageOne:"",
wageTwo:""

};

}


data[date].expense =
Number(expense[2])
.toLocaleString();



});




// ---------- دستمزد ----------


wages.data
.slice(1)
.forEach(wage=>{


const date =
String(wage[3])
.split("T")[0]
.replace(/-/g,"/");


dates.add(date);



if(!data[date]){

data[date]={

expense:"",
wageOne:"",
wageTwo:""

};

}



if(wage[1]=="دستمزد یک"){


data[date].wageOne =
Number(wage[2])
.toLocaleString();


}



if(wage[1]=="دستمزد دو"){


data[date].wageTwo =
Number(wage[2])
.toLocaleString();


}



});



let html = `



<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:tahoma;
}

body{

background:
linear-gradient(
135deg,
#ffeaf5 0%,
#f7f0ff 35%,
#e9ffff 70%,
#fff4fb 100%);

background-attachment:fixed;

min-height:100vh;

overflow-x:hidden;

position:relative;

}


/* حباب‌های پس‌زمینه */

body::before{

content:"";

position:fixed;

top:-120px;
left:-120px;

width:260px;
height:260px;

border-radius:50%;

background:

radial-gradient(circle,
rgba(255,120,180,.45),
transparent 70%);

filter:blur(25px);

animation:float1 12s infinite alternate;

z-index:-2;

}

body::after{

content:"";

position:fixed;

right:-100px;
bottom:-100px;

width:250px;
height:250px;

border-radius:50%;

background:

radial-gradient(circle,
rgba(0,220,220,.35),
transparent 70%);

filter:blur(25px);

animation:float2 14s infinite alternate;

z-index:-2;

}

@keyframes float1{

0%{

transform:
translate(0,0);

}

100%{

transform:
translate(60px,40px);

}

}

@keyframes float2{

0%{

transform:
translate(0,0);

}

100%{

transform:
translate(-50px,-60px);

}

}



/* عنوان */

.expense-title{

font-size:30px;

font-weight:bold;

text-align:center;

margin:22px 0 30px;

color:#ff5ea8;

text-shadow:

0 2px 0 white,

0 8px 18px
rgba(255,105,180,.35);

}



/* کارت هر روز */

.expense-box{

position:relative;

margin-bottom:24px;

padding:18px;

border-radius:30px;

background:

rgba(255,255,255,.72);

backdrop-filter:blur(18px);

border:

2px solid
rgba(255,255,255,.9);

box-shadow:

0 20px 40px rgba(255,120,180,.16),

0 8px 20px rgba(0,200,200,.12),

inset 0 1px 0 rgba(255,255,255,.9);

transition:.25s;

overflow:hidden;

}



/* براق بودن کارت */

.expense-box::before{

content:"";

position:absolute;

top:-70px;

left:-30px;

width:160%;

height:120px;

background:

linear-gradient(

120deg,

transparent,

rgba(255,255,255,.65),

transparent

);

transform:rotate(-8deg);

}



/* لمس */

.expense-box:active{

transform:

scale(.98);

box-shadow:

0 10px 18px rgba(0,0,0,.12);

}



/* تاریخ */

.date-title{

display:inline-block;

padding:10px 24px;

border-radius:999px;

background:

linear-gradient(

135deg,

#ff72b4,

#8a67ff);

color:white;

font-size:17px;

font-weight:bold;

box-shadow:

0 10px 18px

rgba(123,92,255,.35);

margin:0 auto 20px;

display:flex;

justify-content:center;

width:max-content;

}



/* سه کارت */

.cards-row{

display:flex;

gap:12px;

align-items:stretch;

}

.small-card{

flex:1;

padding:14px 10px;

border-radius:24px;

background:white;

box-shadow:

0 12px 18px rgba(0,0,0,.08),

inset 0 2px 0 white;

transition:.25s;

position:relative;

overflow:hidden;

}
.small-card::before{

content:"";

position:absolute;

top:0;
left:0;

width:100%;
height:5px;

background:white;

opacity:.7;

}

.small-card:active{

transform:translateY(3px) scale(.98);

box-shadow:

0 5px 10px rgba(0,0,0,.08);

}

.small-card h4{

font-size:14px;

margin-bottom:12px;

font-weight:bold;

color:#555;

}

.amount{

font-size:22px;

font-weight:bold;

line-height:1.5;

word-break:break-word;

text-shadow:

0 1px 0 white;

}



/* هزینه */

.cost{

background:

linear-gradient(
180deg,
#ffe3ef,
#ffd2e5);

border:2px solid #ffc1dc;

color:#ff4b8f;

box-shadow:

0 12px 20px rgba(255,105,180,.18);

}



/* دستمزد یک */

.one{

background:

linear-gradient(
180deg,
#f0e8ff,
#e1d6ff);

border:2px solid #d5c6ff;

color:#7b4dff;

box-shadow:

0 12px 20px rgba(123,92,255,.18);

}



/* دستمزد دو */

.two{

background:

linear-gradient(
180deg,
#e8ffff,
#d5fbfb);

border:2px solid #bdf6f6;

color:#00aeb5;

box-shadow:

0 12px 20px rgba(0,180,180,.18);

}

.cost,
.one,
.two{

padding:14px;

border-radius:18px;

}



/* دکمه */

.back-btn{

width:100%;

margin-top:28px;

padding:16px;

border:none;

border-radius:999px;

font-size:18px;

font-weight:bold;

cursor:pointer;

color:white;

background:

linear-gradient(
135deg,
#ff6ab3,
#9b6dff,
#49dddd);

background-size:250%;

box-shadow:

0 16px 28px rgba(123,92,255,.28);

transition:.3s;

}

.back-btn:hover{

background-position:right;

}

.back-btn:active{

transform:scale(.98);

box-shadow:

0 8px 14px rgba(123,92,255,.2);

}



/* لودینگ */

.loading{

text-align:center;

padding:50px 20px;

}

.spinner{

width:52px;

height:52px;

margin:auto;

border-radius:50%;

border:6px solid #ffd8ea;

border-top-color:#7b5cff;

animation:spin 1s linear infinite;

}

@keyframes spin{

to{

transform:rotate(360deg);

}

}



/* موبایل */

@media(max-width:600px){

body{

padding:15px;

}

.expense-title{

font-size:26px;

}

.cards-row{

gap:8px;

}

.small-card{

padding:10px 6px;

border-radius:18px;

}

.small-card h4{

font-size:12px;

}

.amount{

font-size:17px;

}

.date-title{

font-size:15px;

padding:8px 18px;

}

.back-btn{

font-size:17px;

}

}

</style>





<h2 class="expense-title">

🌸 گردش هزینه‌ها 🌸

</h2>


`;

[...dates]
.sort()
.reverse()
.forEach(date=>{


html += `

<div class="expense-box">


<div class="date-title">

📅 ${date}

</div>



<div class="cards-row">



<div class="small-card">

<h4>
💸 هزینه
</h4>

<div class="amount cost">

${data[date].expense || "—"}

</div>

</div>




<div class="small-card">

<h4>
💜 دستمزد یک
</h4>

<div class="amount one">

${data[date].wageOne || "—"}

</div>

</div>





<div class="small-card">

<h4>
💙 دستمزد دو
</h4>

<div class="amount two">

${data[date].wageTwo || "—"}

</div>

</div>



</div>


</div>


`;

});





html += `


<button class="back-btn"

onclick="location.href='admin.html'">

⬅️ بازگشت

</button>


`;



box.innerHTML = html;



}catch(error){


console.error(error);


box.innerHTML = `

<div class="expense-box">

خطا در دریافت اطلاعات

</div>

`;


}


}
