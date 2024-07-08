const dom={
nameInp: document.getElementById("name"),
celInp: document.getElementById("cel"),
mailInp: document.getElementById("mail"),
form: document.getElementById("login-form"),
passToMin: document.getElementById("toMain"),
}


const user=(name,cel,mail)=>{
    return{
        name:name,
        cel:cel,
        mail:mail,
    }
}

const guest=(name)=>{
    return{
        name:name,
    }
}

dom.form.onsubmit=(event)=>{
    event.preventDefault();
    const userName=dom.nameInp.value;
    const userCel=dom.celInp.value;
    const userMail=dom.mailInp.value;

    const currentUser=user(userName,userCel,userMail);

    localStorage[dom.nameInp]=JSON.stringify(currentUser);
    localStorage['currentUser']=dom.nameInp;

    location.href="./welcome.html"
}

dom.passToMin.onclick=(event)=>{
    const currentUser=guest("אורח")
    localStorage["אורח"]=JSON.stringify(currentUser);
    localStorage['currentUser']="אורח";
}
