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

html{
scroll-behavior:smooth;
}

body{

min-height:100vh;

padding:18px;

background:
linear-gradient(
135deg,
#fff5fb 0%,
#ffe8f5 30%,
#eefcff 65%,
#f5f0ff 100%);

background-attachment:fixed;

overflow-x:hidden;

position:relative;

}


/* ===========================
   حباب‌های متحرک
=========================== */

body::before{

content:"";

position:fixed;

width:300px;
height:300px;

left:-120px;
top:-120px;

border-radius:50%;

background:
radial-gradient(circle,
rgba(255,150,200,.55),
transparent 70%);

filter:blur(28px);

animation:
bubble1 13s ease-in-out infinite alternate;

z-index:-5;

}

body::after{

content:"";

position:fixed;

width:260px;
height:260px;

right:-80px;
bottom:-80px;

border-radius:50%;

background:
radial-gradient(circle,
rgba(70,240,240,.45),
transparent 70%);

filter:blur(28px);

animation:
bubble2 15s ease-in-out infinite alternate;

z-index:-5;

}


@keyframes bubble1{

0%{

transform:
translate(0,0)
scale(1);

}

100%{

transform:
translate(80px,60px)
scale(1.2);

}

}

@keyframes bubble2{

0%{

transform:
translate(0,0)
scale(1);

}

100%{

transform:
translate(-70px,-70px)
scale(.9);

}

}



/* ===========================
عنوان
=========================== */

.expense-title{

font-size:30px;

font-weight:bold;

text-align:center;

margin:10px 0 25px;

color:#ff5ca8;

text-shadow:

0 2px white,

0 10px 20px
rgba(255,120,180,.35);

animation:
titlePop .7s;

}

@keyframes titlePop{

from{

opacity:0;

transform:
translateY(-25px);

}

to{

opacity:1;

transform:
translateY(0);

}

}



/* ===========================
کارت هر روز
=========================== */

.expense-box{

position:relative;

margin-bottom:18px;

padding:18px;

border-radius:28px;

background:

rgba(255,255,255,.70);

backdrop-filter:

blur(18px);

border:

2px solid rgba(255,255,255,.95);

box-shadow:

0 18px 40px rgba(255,120,180,.15),

0 8px 18px rgba(0,220,220,.10),

inset 0 1px 0 white;

overflow:hidden;

animation:
showCard .45s ease;

transition:.25s;

}


.expense-box:active{

transform:
scale(.985);

}


.expense-box{

opacity:0;

transform:
translateY(-100px)
scale(.9);

animation:

dropCard .7s
cubic-bezier(.2,1.2,.3,1)
forwards;

}

@keyframes dropCard{

0%{

opacity:0;

transform:
translateY(-100px)
scale(.9);

}

70%{

opacity:1;

transform:
translateY(15px)
scale(1.03);

}

100%{

opacity:1;

transform:
translateY(0)
scale(1);

}

}


/* نور روی کارت */

.expense-box::before{

content:"";

position:absolute;

top:-90px;

left:-50px;

width:170%;

height:120px;

background:

linear-gradient(

120deg,

transparent,

rgba(255,255,255,.65),

transparent

);

transform:
rotate(-8deg);

}



/* ===========================
تاریخ
=========================== */

.date-title{

width:max-content;

margin:auto;

padding:

9px 22px;

border-radius:999px;

background:

linear-gradient(
135deg,
#ff72b5,
#8b6cff);

color:white;

font-size:15px;

font-weight:bold;

box-shadow:

0 10px 18px
rgba(123,92,255,.25);

margin-bottom:16px;

}
/* ===========================
سه کارت
=========================== */

.cards-row{

display:flex;

gap:4px;

align-items:stretch;

justify-content:center;

}



/* کارت‌ها */

.small-card{

flex:1;

position:relative;

overflow:hidden;

padding:8px 5px;

border-radius:20px;

transition:.28s;

box-shadow:

0 10px 18px rgba(0,0,0,.08),

inset 0 2px 0 rgba(255,255,255,.9);

}



/* براق بودن کارت */

.small-card::before{

content:"";

position:absolute;

top:-120%;

left:-35%;

width:55%;

height:320%;

background:

rgba(255,255,255,.45);

transform:rotate(25deg);

transition:.7s;

}

.small-card:hover::before{

left:120%;

}



/* سه بعدی */

.small-card:hover{

transform:

translateY(-6px)

scale(1.02);

box-shadow:

0 18px 28px rgba(255,105,180,.18),

0 12px 22px rgba(0,210,210,.16);

}



.small-card:active{

transform:

translateY(2px)

scale(.98);

}



/* عنوان کارت */

.small-card h4{

font-size:12px;

font-weight:bold;

margin-bottom:8px;

color:#555;

}



/* مبلغ */

.amount{

font-size:14px;

font-weight:bold;

line-height:1.4;

word-break:break-word;

text-shadow:

0 1px 0 white;

}



/* هزینه */

.cost{

background:

linear-gradient(

180deg,

#ffe8f2,

#ffd7e8

);

border:

2px solid #ffc7df;

color:#ff4d8f;

}



/* دستمزد یک */

.one{

background:

linear-gradient(

180deg,

#f1e8ff,

#e3d7ff

);

border:

2px solid #d6c6ff;

color:#7a4dff;

}



/* دستمزد دو */

.two{

background:

linear-gradient(

180deg,

#e7ffff,

#d5fbfb

);

border:

2px solid #bdf5f5;

color:#00aeb5;

}



/* داخل کارت */

.cost,
.one,
.two{

padding:12px;

border-radius:15px;

box-shadow:

inset 0 2px 0 rgba(255,255,255,.9),

0 6px 12px rgba(0,0,0,.05);

}
/* ===========================
دکمه بازگشت
=========================== */

.back-btn{

width:100%;

margin-top:22px;

padding:15px;

border:none;

border-radius:22px;

cursor:pointer;

font-size:17px;

font-weight:bold;

color:white;

background:

linear-gradient(
135deg,
#ff6bb3,
#8a6cff,
#55e6e6);

background-size:250% 250%;

animation:
buttonGlow 6s linear infinite;

box-shadow:

0 12px 25px rgba(255,105,180,.28),

0 8px 18px rgba(0,220,220,.18);

transition:.25s;

}

.back-btn:hover{

transform:
translateY(-3px);

box-shadow:

0 18px 32px rgba(255,105,180,.35),

0 10px 22px rgba(0,220,220,.22);

}

.back-btn:active{

transform:
translateY(2px);

}

@keyframes buttonGlow{

0%{

background-position:0% 50%;

}

100%{

background-position:100% 50%;

}

}


/* ===========================
لودینگ
=========================== */

.loading{

display:flex;

flex-direction:column;

align-items:center;

justify-content:center;

padding:45px 0;

}

.spinner{

width:65px;

height:65px;

border-radius:50%;

border:6px solid #ffd6ea;

border-top:6px solid #6fe9ea;

animation:
spin .8s linear infinite;

box-shadow:

0 0 25px rgba(255,105,180,.18);

margin-bottom:16px;

}

@keyframes spin{

to{

transform:rotate(360deg);

}

}


/* ===========================
اسکرول
=========================== */

::-webkit-scrollbar{

width:8px;

}

::-webkit-scrollbar-track{

background:#ffeef8;

border-radius:20px;

}

::-webkit-scrollbar-thumb{

background:

linear-gradient(
#ff7ab8,
#79ecec);

border-radius:20px;

}


/* ===========================
موبایل
=========================== */

@media(max-width:600px){

body{

padding:12px;

}

.expense-title{

font-size:24px;

margin-bottom:18px;

}

.expense-box{

padding:14px;

border-radius:22px;

margin-bottom:14px;

}

.cards-row{

gap:3px;

}

.small-card{

padding:6px 4px;

border-radius:16px;

}

.small-card h4{

font-size:11px;

margin-bottom:6px;

}

.amount{

font-size:12px;

}

.date-title{

font-size:13px;

padding:8px 16px;

}

.back-btn{

font-size:15px;

padding:13px;

}

}


/* ===========================
حباب‌های کوچک
=========================== */

.expense-box::after{

content:"";

position:absolute;

right:14px;

top:14px;

width:16px;

height:16px;

border-radius:50%;

background:rgba(255,255,255,.75);

box-shadow:

-24px 18px 0 rgba(255,255,255,.45),

18px 32px 0 rgba(255,255,255,.25),

-10px 48px 0 rgba(255,255,255,.18);

}

.bubbles{

position:fixed;

top:0;
left:0;

width:100%;
height:100%;

pointer-events:none;

overflow:hidden;

z-index:-1;

}

.bubbles span{

position:absolute;

bottom:-120px;

border-radius:50%;

background:rgba(255,170,220,.35);

border:1px solid rgba(255,255,255,.8);

backdrop-filter:blur(3px);

animation:floatBubble linear infinite;

box-shadow:

inset 0 0 12px white,

0 0 15px rgba(255,120,180,.4);

}

@keyframes floatBubble{

0%{

transform:translateY(0) translateX(0);

opacity:0;

}

20%{

opacity:1;

}

100%{

transform:translateY(-120vh) translateX(40px);

opacity:0;

}

}

.bubbles span:nth-child(1){left:3%;width:22px;height:22px;animation-duration:8s;}
.bubbles span:nth-child(2){left:10%;width:55px;height:55px;animation-duration:12s;}
.bubbles span:nth-child(3){left:18%;width:30px;height:30px;animation-duration:9s;}
.bubbles span:nth-child(4){left:28%;width:45px;height:45px;animation-duration:15s;}
.bubbles span:nth-child(5){left:37%;width:20px;height:20px;animation-duration:7s;}
.bubbles span:nth-child(6){left:48%;width:65px;height:65px;animation-duration:16s;}
.bubbles span:nth-child(7){left:58%;width:25px;height:25px;animation-duration:8s;}
.bubbles span:nth-child(8){left:68%;width:40px;height:40px;animation-duration:11s;}
.bubbles span:nth-child(9){left:77%;width:30px;height:30px;animation-duration:9s;}
.bubbles span:nth-child(10){left:85%;width:60px;height:60px;animation-duration:14s;}
.bubbles span:nth-child(11){left:92%;width:22px;height:22px;animation-duration:10s;}
.bubbles span:nth-child(12){left:97%;width:45px;height:45px;animation-duration:13s;}


</style>

<div class="bubbles">

<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>

</div>



`;

[...dates]
.sort()
.reverse()
.forEach((date,index)=>{


html += `

<div class="expense-box"
style="animation-delay:${index*0.15}s">


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
