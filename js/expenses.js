document.addEventListener("DOMContentLoaded", loadExpenses);

async function loadExpenses(){

    const box =
    document.getElementById("expensesTable");

    const expenses =
    await Sheet.getExpenses();

    const wages =
    await Sheet.getWages();

    const wageMap = {};

    wages.data
.slice(1)
.forEach(wage=>{

    const date =
    String(wage[3]).split("T")[0];

    if(!wageMap[date]){

        wageMap[date] = {
            one:"",
            two:""
        };

    }

    if(wage[1] == "دستمزد یک"){

        wageMap[date].one =
        Number(wage[2]).toLocaleString();

    }

    if(wage[1] == "دستمزد دو"){

        wageMap[date].two =
        Number(wage[2]).toLocaleString();

    }

});

    let html = `

    <table border="1" style="width:100%;text-align:center;border-collapse:collapse;">

        <tr>
            <th>تاریخ</th>
            <th>هزینه‌ها</th>
            <th>دستمزد یک</th>
            <th>دستمزد دو</th>
        </tr>

    `;

    expenses.data
    .slice(1)
    .forEach(expense=>{

        const date =
String(expense[1]).split("T")[0];

const wage =
wageMap[date] || {
    one:"",
    two:""
};

html += `

<tr>

    <td>${date.replace(/-/g,"/")}</td>

    <td>${Number(expense[2]).toLocaleString()}</td>

    <td>${wage.one}</td>

    <td>${wage.two}</td>

</tr>

`;

    });

    html += "</table>";

    box.innerHTML = html;

}
