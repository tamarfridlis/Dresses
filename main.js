const dom = {
    allDresses: document.getElementById('allDresses'),
    chooseColor: document.getElementById('chooseColor'),
    chooseArea: document.getElementById('chooseArea'),
    sets: document.getElementById('sets'),
    chooseSize: document.getElementById('chooseSize'),
    container: document.getElementById('container')
};
const dressObject = sessionStorage.getItem('simla');
// const dressJson= localStorage.getItem(dressObject);


const currentDress = JSON.parse(dressObject);
console.log(currentDress,"currentDress");
// let statistic=[];
// let amontTaking=0
console.log(currentDress,"currentDress");

const drawDress = (dresses) => {
    console.log('dresses',dresses);
    dresses.forEach(dress => {

        console.log("בציור")
        const card = document.createElement('div')
        card.classList.add('outdiv')
        card.classList.add('card')
        console.log(card,"card");
        //תמונה
        const img = document.createElement('img')
        img.src = dress.inputImage;
        img.classList.add('card-img-top')
        img.classList.add('img')

        //תאור
        const description = document.createElement('span')
        description.innerHTML = dress.description
        // description.classList.add('describe')
        description.classList.add('card-text')
        //מחיר
        const price = document.createElement('span')
        price.innerHTML = dress?.price+" שקל";
        price.classList.add('price')
        //מידות
        console.log(dress.sizeDress + 'בודקת האם זה עובד')
        const sizes = document.createElement('p')
        sizes.innerHTML = "מידות: "+dress.sizeDress
        sizes.classList.add('sizes')
        
        //אזור מגורים
        const place=document.createElement('span')
        place.classList.add('place')
        place.innerHTML=dress.place

        //כפתור להשכרה
        const toTake = document.createElement('button')
        toTake.classList.add('toTake')
        // toTake.classList.add('btn btn-primary')
        toTake.innerHTML = 'לפרטים'


        //טלפון
        const cel= document.createElement('span')
        cel.innerHTML=dress.phone
        cel.classList.add('phone')
        
        toTake.onclick=()=>{
            cel.classList.add('phoneShow');
            // amontTaking++;
            // statistic.push(dress);
        }
        //ציור
        card.appendChild(img);
        card.appendChild(description);
        card.appendChild(price)
        card.appendChild(sizes)
        card.appendChild(place)
        card.appendChild(toTake)
        card.appendChild(cel)
        console.log(dom.container,"container");
        dom.allDresses.appendChild(dom.container);
        dom.container.appendChild(card)
    });
}

if (currentDress) {
    drawDress(currentDress);
}

$.ajax({
    url: "./js.json",

    success: (result) => {
        console.log("result", result);
        // drawDress(result);

        // result.forEach((dress) => {
        drawDress(result);
        // });
    },
    error: (error) => {
        console.error(error);
    }
}
);

//מיון לפי צבע
dom.chooseColor.onchange = (event) => {
    console.log("I am here");
    dom.container.innerHTML = ''
    const currentColor = dom.chooseColor.value;
    let re = []
    $.ajax({
        url: "./js.json",

        success: (result) => {
            console.log(result);
            re = result.map((element, index) => {
                // color.colors == currentColor
                // console.log("result", result);
                if (result[index].colors === currentColor) {

                    console.log("in");
                    drawDress([result[index]])
                    return element;
                }
            })
            console.log(re);
        },
        error: (error) => {
            console.error(error);
        }
    }
    );
    console.log(currentDress,"currentDress");
    currentDress.map((element, index) => {

        if (currentDress[index].colors === currentColor) {

            drawDress([currentDress[index]])
            return element;
        }

    }

    )

}
//מיון לפי איזור
chooseArea.onchange = (event) => {
    dom.container.innerHTML = '';
    const currentPlace = chooseArea.value;
    let ret = []
    $.ajax({
        url: "./js.json",
        success: (result) => {
            console.log(result);
            ret = result.map((element, index) => {
                if (result[index].place === currentPlace) {
                    drawDress([result[index]])
                    return element;

                }
            })
            currentDress.map((element, index) => {
                console.log("intoin");
                if (currentPlace === element.place) {
                    drawDress([currentDress[index]]);
                }
            })
        },
        error: (error) => {
            console.error(error);
        }
    }
    );
}

//מיון לפי סט
dom.sets.onchange = (event) => {
    dom.container.innerHTML = '';
    const isSets = dom.sets.value;
    let res = []
    $.ajax({
        url: "./js.json",
        success: (result) => {
            console.log(result);
            res = result.map((element, index) => {
                if (isSets === 'yesSetim') {
                    if (result[index].amount > 1) {
                        drawDress([result[index]])
                        return element;
                    }
                }
            })
            currentDress.map((element, index) => {
                console.log("intoin");
                if (isSets === 'yesSetim') {
                    if (result[index].amountDress > 1) {
                        drawDress([result[index]])
                        return element;
                    }
                }
            })
        },
        error: (error) => {
            console.error(error);
        }
    }
    );
}
console.log(dom.chooseSize);
//בחירת מידה
dom.chooseSize.onchange = (event) => {
    dom.container.innerHTML = '';
    const currentSize = dom.chooseSize.value;
    let rec = [];
    $.ajax({
        url: "./js.json",
        success: (result) => {
            rec = result.filter((dress) => dress.sizeDress.some((size) => size === currentSize));
            drawDress(rec);

            // The same filtering for the currentDress array
            const currentRec = currentDress.filter((dress) => dress.sizeDress.some((size) => size === currentSize));
            drawDress(currentRec);
        },
        error: (error) => {
            console.error(error);
        }
    });
};
 

