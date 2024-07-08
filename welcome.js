const body=document.querySelector("body")
const welcome = document.getElementById("welcome");

const userName = localStorage['currentUser'];
const userJson= localStorage.getItem(userName);
const thisUser=JSON.parse(userJson);
welcome.innerHTML+=thisUser.name

setTimeout(moveToMain,2500);

function moveToMain() {
    location.href="./main.html";
}