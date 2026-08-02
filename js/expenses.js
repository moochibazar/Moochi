document.addEventListener("DOMContentLoaded", loadExpenses);


async function loadExpenses(){


const box =
document.getElementById("expensesTable");



box.innerHTML = `

<div style="
text-align:center;
padding:40px;
font-size:20px;
color:#00a896;
">

🍡 در حال آماده‌سازی گردش هزینه‌ها...

</div>

`;



try{


const expenses =
await Sheet.getExpenses();



const wages =
await Sheet.getWages();



let data = {};

let dates = new Set();



// هزینه‌ها

expenses.data
.slice(1)
.forEach(expense=>{


let date =
String(expense[1])
.split("T")[0]
.replace(/-/g,"/");



dates.add(date);



if(!data[date]){

data[date]={

expense:"",
one:"",
two:""

};

}



data[date].expense =
Number(expense[2])
.toLocaleString();



});





// دستمزدها

wages.data
.slice(1)
.forEach(wage=>{


let date =
String(wage[3])
.split("T")[0]
.replace(/-/g,"/");



dates.add(date);



if(!data[date]){

data[date]={

expense:"",
one:"",
two:""

};

}



if(wage[1]=="دستمزد یک"){

data[date].one =
Number(wage[2])
.toLocaleString();

}



if(wage[1]=="دستمزد دو"){

data[date].two =
Number(wage[2])
.toLocaleString();

}


});





let html = `


<style>


body{

background:

linear-gradient(
135deg,
#ffe4f1,
#d9fff8
);

}



.exp-title{


text-align:center;

font-size:28px;

font-weight:bold;

color:#ff5caa;

margin:20px;


text-shadow:
0 3px 8px
rgba(255,92,170,.3);


}



.exp-card{


background:

rgba(255,255,255,.75);


backdrop-filter:

blur(15px);


border-radius:30px;


padding:18px;


margin:20px 5px;


box-shadow:

0 15px 35px
rgba(0,168,150,.18);


border:

2px solid
rgba(255,255,255,.8);


}



.date{


background:

linear-gradient(
135deg,
#ff9fca,
#7ee8db
);


color:white;


padding:10px;


border-radius:20px;


text-align:center;


font-size:20px;


font-weight:bold;


margin-bottom:18px;


box-shadow:

0 8px 15px
rgba(0,0,0,.12);


}



.row{


display:flex;


gap:10px;


}



.box{


flex:1;


height:90px;


border-radius:22px;


display:flex;


flex-direction:column;


justify-content:center;


align-items:center;


font-size:14px;


font-weight:bold;


box-shadow:


0 8px 18px
rgba(0,0,0,.12);


transition:.3s;


}



.box:active{


transform:

scale(.96);


}



.box span{


font-size:18px;


margin-top:8px;


}



.cost{


background:

linear-gradient(
135deg,
#ffd1e3,
#fff0f6
);


color:#ff4f87;


}



.one{


background:

linear-gradient(
135deg,
#bffff1,
#eafffa
);


color:#009f8b;


}



.two{


background:

linear-gradient(
135deg,
#d7f6ff,
#ffffff
);


color:#008ac0;


}


</style>



<h2 class="exp-title">

🍡 گردش شیرین هزینه‌ها 🍡

</h2>


`;

  [...dates]
.sort()
.reverse()
.forEach(date=>{


html += `

<div class="exp-card">


<div class="date">

📅 ${date}

</div>



<div class="row">


<div class="box cost">

💸 هزینه

<span>

${data[date].expense || "—"}

</span>

</div>




<div class="box one">

💜 دستمزد یک

<span>

${data[date].one || "—"}

</span>

</div>




<div class="box two">

💙 دستمزد دو

<span>

${data[date].two || "—"}

</span>

</div>


</div>



</div>


`;

});




html += `


<button

onclick="location.href='admin.html'"

style="


width:100%;

padding:16px;

border:none;

border-radius:25px;


background:

linear-gradient(
135deg,
#ff7eb3,
#00c9b7
);


color:white;


font-size:19px;


font-weight:bold;


box-shadow:

0 10px 25px
rgba(0,0,0,.15);


margin-bottom:20px;


">


⬅️ بازگشت


</button>


`;



box.innerHTML = html;



}

catch(error){


console.error(error);



box.innerHTML = `


<div class="exp-card">

❌ خطا در دریافت اطلاعات

</div>


`;


}


}
