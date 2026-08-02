document.addEventListener("DOMContentLoaded", loadExpenses);

async function loadExpenses(){

    const box =
    document.getElementById("expensesTable");

    box.innerHTML = `
    <div style="text-align:center;padding:30px;">
        <div class="spinner"></div>
        <p>در حال بارگذاری...</p>
    </div>
    `;

    try{

        const expenses =
        await Sheet.getExpenses();

        const wages =
        await Sheet.getWages();

        const dates = new Set();

        const data = {};

        // هزینه‌ها
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
            Number(expense[2]).toLocaleString();

        });

        // دستمزدها
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
                Number(wage[2]).toLocaleString();

            }

            if(wage[1]=="دستمزد دو"){

                data[date].wageTwo =
                Number(wage[2]).toLocaleString();

            }

        });

        const colors=[
            "#FFE5EC",
            "#E8F7FF",
            "#FFF7D6",
            "#E9FFE8",
            "#F3E8FF"
        ];

        let html=`

<h2 style="
text-align:center;
color:#7b5cff;
margin-bottom:20px;">
📋 گردش هزینه‌ها
</h2>

`;

        [...dates]
        .sort()
        .forEach((date,index)=>{

            const c =
            colors[index%colors.length];

            html+=`

<div style="
background:${c};
border-radius:22px;
padding:18px;
margin-bottom:18px;
box-shadow:0 6px 16px rgba(0,0,0,.08);
border:2px solid rgba(255,255,255,.7);
">

<div style="
text-align:center;
font-size:20px;
font-weight:bold;
margin-bottom:15px;
color:#6b4cff;">

📅 ${date}

</div>

<div style="
background:white;
border-radius:14px;
padding:12px;
margin-bottom:10px;">

💸 <b>هزینه</b>

<div style="
font-size:22px;
margin-top:6px;
color:#ff4f81;">

${data[date].expense || "—"}

</div>

</div>

<div style="
background:white;
border-radius:14px;
padding:12px;
margin-bottom:10px;">

💜 <b>دستمزد یک</b>

<div style="
font-size:22px;
margin-top:6px;
color:#7b5cff;">

${data[date].wageOne || "—"}

</div>

</div>

<div style="
background:white;
border-radius:14px;
padding:12px;">

💙 <b>دستمزد دو</b>

<div style="
font-size:22px;
margin-top:6px;
color:#2196F3;">

${data[date].wageTwo || "—"}

</div>

</div>

</div>

`;

        });

        html+=`

<button
onclick="location.href='admin.html'"
style="
width:100%;
padding:15px;
border:none;
border-radius:18px;
background:#7b5cff;
color:white;
font-size:18px;
margin-top:10px;">

⬅️ بازگشت

</button>

`;

        box.innerHTML=html;

    }catch(e){

        box.innerHTML=`
        <div class="card">
        خطا در دریافت اطلاعات
        </div>
        `;

    }

}
