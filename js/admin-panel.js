const pageContent =
document.getElementById("pageContent");


function showLoading(){

pageContent.innerHTML = `

<div class="loading">

<div class="spinner"></div>

<p>
در حال دریافت اطلاعات...
</p>

</div>

`;

}
