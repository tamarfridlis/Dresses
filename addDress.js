// sessionStorage.clear();
const body = document.querySelector("body")
const formAddSimla = document.getElementById("addSimla")
const welcome = document.getElementById("welcome")
const describe = document.getElementById("describe")
const amountDress = document.getElementById("amount")
const ishurAmount = document.getElementById("ishur")
const reshimatMidot = document.getElementById("reshimatMidot")
const price = document.getElementById("price")
const colors = document.getElementById("colors")
const place = document.getElementById("place")
const phone = document.getElementById("phone")
const email = document.getElementById("email")
const submit = document.getElementById("submit")

const userName = localStorage['currentUser'];
const userJson = localStorage.getItem(userName);
const thisUser = JSON.parse(userJson);

const inputImage = document.getElementById('imageUpload');
const previewImage = document.getElementById('previewImage');

let midotSmalot = [];

welcome.innerHTML += thisUser?.name;

ishurAmount.onclick = (event) => {
    for (let i = 0; i < amountDress.value; i++) {
        createLi();

    }
    ishurAmount.disabled = true;
};

const createLi = () => {
    console.log("אני בתוך האישור כמות")
    const sizeDress = document.createElement('input');
    sizeDress.type = 'text';
    sizeDress.required = 'required';
    sizeDress.placeholder = 'מידה';
    const li = document.createElement('li');
    // const ishurSize= document.createElement('button')
    // ishurSize.classList.add('buttunIshurSize')
    // ishurSize.type='submit';
    // ishurSize.innerHTML='אישור'
    // li.classList.add('midaLi')
    li.appendChild(sizeDress)
    console.log(sizeDress.value)
    reshimatMidot.appendChild(li)
    // reshimatMidot.appendChild(ishurSize);
    console.log(midotSmalot);
    // let placeMida=0;
    // ishurSize.onsubmit=(event)=>{
    //     event.preventDefault();
    //     midotSmalot[placeMida++]=li.value;
    // }
    li.onchange=()=>{
        midotSmalot.push(sizeDress.value)
        console.log(midotSmalot)
    }
}


inputImage.addEventListener('change', (event) => {
    previewImage.classList.add('decoratePicture')
    const file = event.target.files[0];
    const reader = new FileReader();//קורא את התמונה

    reader.addEventListener('load', (event) => {
        previewImage.src = event.target.result;
    });

    if (file) {
        reader.readAsDataURL(file);
    }
});

addSimla.onsubmit = (event) => {
    event.preventDefault();
    console.log("-אני בתוך הsubmit");


    const newDress = {
        description: describe.value,
        amountDreses: amountDress.value,
        sizeDress: midotSmalot,
        price: price.value,
        colors: colors.value,
        place: place.value,
        phone: phone.value,
        email: email.value,
        inputImage: previewImage.src,
    }

    // const dress = JSON.parse(sessionStorage.getItem('simla'));
    let dresses = sessionStorage.getItem('simla') ? JSON.parse(sessionStorage.getItem('simla')) : [];
    dresses.push(newDress)
    sessionStorage.setItem('simla', JSON.stringify(dresses));

    location.href = "./main.html"
}
