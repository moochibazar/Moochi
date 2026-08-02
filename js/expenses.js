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

        // همه تاریخ‌ها
        const dates = new Set();

        // اطلاعات هر تاریخ
        const data = {};

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

                data[date] = {
                    expense:"",
                    wageOne:"",
                    wageTwo:""
                };

            }

            data[date].expense =
            Number(expense[2]).toLocaleString();

        });

        // ---------- دستمزدها ----------

        wages.data
        .slice(1)
        .forEach(wage=>{

            const date =
            String(wage[3])
            .split("T")[0]
            .replace(/-/g,"/");

            dates.add(date);

            if(!data[date]){

                data[date] = {
                    expense:"",
                    wageOne:"",
                    wageTwo:""
                };

            }

            if(wage[1] == "دستمزد یک"){

                data[date].wageOne =
                Number(wage[2]).toLocaleString();

            }

            if(wage[1] == "دستمزد دو"){

                data[date].wageTwo =
                Number(wage[2]).toLocaleString();

            }

        });

        // مرتب سازی تاریخ
        const sortedDates =
        [...dates].sort();

        let html = `

<style>

.expense-card{

background:#fff;

border-radius:18px;

padding:20px;

box-shadow:0 6px 18px rgba(0,0,0,.08);

overflow:auto;

margin-top:15px;

}

.expense-table{

width:100%;

border-collapse:collapse;

min-width:650px;

}

.expense-table th{

background:#7b5cff;

color:#fff;

padding:14px;

position:sticky;

top:0;

font-size:15px;

}

.expense-table td{

padding:12px;

border-bottom:1px solid #ececec;

text-align:center;

font-size:14px;

}

.expense-table tr:nth-child(even){

background:#fafafa;

}

.expense-table tr:hover{

background:#f2efff;

}

.back-btn{

margin-top:20px;

width:100%;

padding:14px;

border:none;

border-radius:14px;

background:#7b5cff;

color:#fff;

font-size:16px;

cursor:pointer;

}

.back-btn:hover{

opacity:.9;

}

</style>

<div class="expense-card">

<table class="expense-table">

<thead>

<tr>

<th>📅 تاریخ</th>

<th>💸 هزینه</th>

<th>💵 دستمزد یک</th>

<th>💰 دستمزد دو</th>

</tr>

</thead>

<tbody>

`;

        sortedDates.forEach(date=>{

            html += `

<tr>

<td>${date}</td>

<td>${data[date].expense || "-"}</td>

<td>${data[date].wageOne || "-"}</td>

<td>${data[date].wageTwo || "-"}</td>

</tr>

`;

        });

        html += `

</tbody>

</table>

</div>

<button class="back-btn"
onclick="location.href='admin.html'">

⬅️ بازگشت

</button>

`;

        box.innerHTML = html;

    }catch(error){

        console.error(error);

        box.innerHTML = `
        <div class="card">
        خطا در دریافت اطلاعات
        </div>
        `;

    }

}
