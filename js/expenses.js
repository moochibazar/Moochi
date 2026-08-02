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


body{

background:
linear-gradient(
135deg,
#fff0f7,
#f0e8ff
);

}



.expense-title{

text-align:center;

font-size:26px;

color:#7b5cff;

margin:20px;

}



.expense-box{


background:
rgba(255,255,255,.65);

backdrop-filter:
blur(15px);

border-radius:28px;

padding:18px;

margin-bottom:20px;

box-shadow:
0 12px 30px
rgba(123,92,255,.18);

border:
1px solid white;


}



.date-title{


text-align:center;

font-size:20px;

font-weight:bold;

color:#6d4cff;

margin-bottom:15px;


}



.cards-row{


display:flex;

gap:10px;

justify-content:center;


}



.small-card{


flex:1;

background:white;

border-radius:20px;

padding:12px 5px;

text-align:center;


box-shadow:

0 8px 15px
rgba(0,0,0,.12);


transform:
translateY(0);

transition:.3s;


}



.small-card:active{


transform:
translateY(3px);


}




.small-card h4{


margin:0 0 10px;

font-size:13px;


}



.amount{


font-size:18px;

font-weight:bold;


}



.cost{

color:#ff4f81;

}


.one{

color:#8b5cf6;

}


.two{

color:#2196f3;

}



.back-btn{


width:100%;

padding:15px;

border:none;

border-radius:20px;

background:
linear-gradient(
135deg,
#7b5cff,
#ff6fb5
);


color:white;

font-size:18px;


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
