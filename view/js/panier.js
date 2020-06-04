'use strict'

function displayResume() {
    const LOCALSTORAGE = JSON.parse(localStorage.getItem('LOCALSTORE'));
    console.log(LOCALSTORAGE);


    let toClone = document.getElementsByClassName('resume-area'); //récupérer l'élement html
    for (let i = 0; i < LOCALSTORAGE.length; i++) {
        let clone = toClone[0].cloneNode(true); //cloner l'élément et ses nodes      
        toClone[0].after(clone); //cloner l'élement clone après l'original
        const BORDER = document.getElementsByClassName("add-border");
        BORDER[0].classList.add('border');
        const BORDERBOTTOM = document.getElementsByClassName("add-border-bottom");
        BORDERBOTTOM[0].classList.add('border-bottom');
        BORDERBOTTOM[1].classList.add('border-bottom');
    }

    const NAME = document.querySelectorAll('h3')
    console.log(NAME);
    let i = 0;
    for (const element of LOCALSTORAGE) {
        NAME[i++].textContent = element.name;
    }

    const IMG = document.getElementsByClassName('image-to-resume');
    console.log(IMG);
    let j = 0;
    let k = 0;
    for (const element of LOCALSTORAGE) {
        IMG[j++].setAttribute("src", element.imageUrl);
        IMG[k++].setAttribute("alt", element.name)
    }

    const DESCRIPTION = document.getElementsByClassName('description');
    let l = 0;
    for (const element of LOCALSTORAGE) {
        DESCRIPTION[l++].textContent = element.description
    }

    const PRICE = document.getElementsByClassName('price');
    let m = 0;
    for (const element of LOCALSTORAGE) {
        PRICE[m++].textContent = 'EUR  ' + element.price;
    }

    const TOTALPRICE = document.getElementsByClassName('total-price');
    let n = 0;
    for (const element of LOCALSTORAGE) {
        TOTALPRICE[n++].textContent = 'Sous-total des articles :';
    }

    const TOTALPRICEVALUE = document.getElementsByClassName('total-price-value');
    let o = 0;
    for (const element of LOCALSTORAGE) {
        let total = (element.price * element.quantity);
        TOTALPRICEVALUE[o++].textContent = 'EUR  ' + total;
    }

    const EXPEDITION = document.getElementsByClassName('expedition-price');
    let p = 0;
    for (const element of LOCALSTORAGE) {
        EXPEDITION[p++].textContent = "Frais d'envoi :";
    }

    const EXPEDITIONVALUE = document.getElementsByClassName('expedition-price-value');
    let q = 0;
    for (const element of LOCALSTORAGE) {
        EXPEDITIONVALUE[q++].textContent = "EUR 0,00";
    }

    const QUANTITY = document.getElementsByClassName('product-quantity');
    let r = 0;
    for (const element of LOCALSTORAGE) {
        QUANTITY[r++].textContent = "Nombre d'articles :";
    }

    const QUANTITYVALUE = document.getElementsByClassName('product-quantity-value');
    let s = 0;
    for (const element of LOCALSTORAGE) {
        QUANTITYVALUE[s++].textContent = element.quantity;
    }

    const LENSE = document.getElementsByClassName('lenses');
    let t = 0;
    for (const element of LOCALSTORAGE) {
        LENSE[t++].textContent = "Catégorie lentille :";
    }

    const LENSEVALUE = document.getElementsByClassName('lenses-value');
    let u = 0;
    for (const element of LOCALSTORAGE) {
        LENSEVALUE[u++].textContent = element.lenses;
    }

    const H5 = document.querySelectorAll('h5');
    H5[0].textContent = 'Total';

    const SOUSTOTAL = document.getElementById('sous-total');
    SOUSTOTAL.textContent = 'Sous-total';

    const LIVRAISON = document.getElementById('livraison');
    LIVRAISON.textContent = 'Livraison';

    const TVA = document.getElementById('tva');
    TVA.textContent = 'Total (TVA incluse)';

    const ARRAY = [];
    let produce;
    LOCALSTORAGE.map(item => {
        produce = item.price * item.quantity;
        ARRAY.push(produce);
    })
    console.log(ARRAY);

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const TOTALBOOK = ARRAY.reduce(reducer);
    console.log(TOTALBOOK);
    localStorage.setItem('finalPrice', JSON.stringify(TOTALBOOK));//store final price
    const TOTAL = document.getElementById('total');
    TOTAL.textContent = TOTALBOOK + ' €';
    const FINALEXPEDITION = document.getElementById('final-expetition');
    FINALEXPEDITION.textContent = "gratuit";
    const TOTALWITHTVA = document.getElementById('total-with-tva');
    TOTALWITHTVA.textContent = TOTALBOOK + ' €';
    const borderBottom = document.getElementById("add-border-bottom");
    borderBottom.classList.add('border-bottom');
    const BOOKING = document.getElementsByClassName('bg-warning');
    BOOKING[0].classList.remove('d-none');
    BOOKING[0].addEventListener('click', showForm);

    function showForm(ev) {
        ev.preventDefault();
        const FORM = document.getElementById('contactform-form');
        FORM.classList.remove("d-none");
    }

    ///faire post fetch
    document.getElementById('contactform-form').addEventListener('submit', postBooking);

    function postBooking(e) {
        e.preventDefault();

        let firstName = document.getElementById('firstName').value;
        console.log(firstName);
        let lastName = document.getElementById('lastName').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let email = document.getElementById('email').value;

        let contact = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        };
        
        let products = [];
        LOCALSTORAGE.forEach(element => {
            products.push(element._id);
        });
        console.log(products);

        fetch('http://localhost:3000/api/cameras/order', {
                method: 'post',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    contact,
                    products
                })
            })
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data, data.orderId);
                sendOrder(data);
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }
    function sendOrder (data){
        
    localStorage.setItem('orderId', JSON.stringify(data.orderId));
    // setTimeout(url);
    setTimeout(function(url) {
        url = './remerciement.html';
        window.location.href = url;
      }, 3000);
         
    }
    // let url = '';
    
};

displayResume();