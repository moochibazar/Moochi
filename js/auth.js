async function login() {

    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value;

    if(!username || !password){

        alert("نام کاربری و رمز را وارد کنید");

        return;

    }

    const result =
    await Sheet.getSettings();

    if(!result.success){

        alert("خطا در دریافت تنظیمات");

        return;

    }

    let settings = {};

    result.data
    .slice(1)
    .forEach(row=>{

        settings[row[0]] = row[1];

    });

    if(
        username === settings.username &&
        password === settings.password
    ){

        localStorage.setItem(
            "adminLogin",
            "true"
        );

        location.href =
        "admin.html";

    }else{

        alert("نام کاربری یا رمز عبور اشتباه است");

    }

}



document.addEventListener("DOMContentLoaded",()=>{

    const btn =
    document.getElementById("loginBtn");

    if(btn){

        btn.onclick = login;

    }

});
