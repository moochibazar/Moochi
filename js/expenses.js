document.addEventListener("DOMContentLoaded", loadExpenses);

async function loadExpenses(){

    const box =
    document.getElementById("expensesTable");

    box.innerHTML = `
    
    <table border="1" style="width:100%;text-align:center;border-collapse:collapse;">
    
        <tr>
            <th>تاریخ</th>
            <th>هزینه‌ها</th>
            <th>دستمزد یک</th>
            <th>دستمزد دو</th>
        </tr>
    
    </table>
    
    `;

}
