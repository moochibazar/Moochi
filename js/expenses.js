document.addEventListener("DOMContentLoaded", loadExpenses);

async function loadExpenses(){

    const box =
    document.getElementById("expensesTable");

    const expenses =
    await Sheet.getExpenses();

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

        html += `

        <tr>

            <td>${String(expense[1]).split("T")[0].replace(/-/g,"/")}</td>

            <td>${Number(expense[2]).toLocaleString()}</td>

            <td></td>

            <td></td>

        </tr>

        `;

    });

    html += "</table>";

    box.innerHTML = html;

}
