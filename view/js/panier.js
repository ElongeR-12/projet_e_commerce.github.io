
function displayResume() {
    const localStore = JSON.parse(localStorage.getItem('LOCALSTORE'));
    
 
    let toClone = document.getElementsByClassName('resume-area'); //récupérer l'élement html
    for (const element of localStore) {
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
   
    for (const element of localStore) {
        NAME[localStore.indexOf(element)].textContent = element.name;
    }

    const IMG = document.getElementsByClassName('image-to-resume');
    console.log(IMG);
   
    for (const element of localStore) {
        IMG[localStore.indexOf(element)].setAttribute("src", element.imageUrl);
        IMG[localStore.indexOf(element)].setAttribute("alt", element.name)
    }

    const DESCRIPTION = document.getElementsByClassName('description');
 
    for (const element of localStore) {
        DESCRIPTION[localStore.indexOf(element)].textContent = element.description
    }

    const PRICE = document.getElementsByClassName('price');
  
    for (const element of localStore) {
        PRICE[localStore.indexOf(element)].textContent = 'EUR  ' + element.price;
    }

    const TOTALPRICE = document.getElementsByClassName('total-price');

    for (const element of localStore) {
        TOTALPRICE[localStore.indexOf(element)].textContent = 'Sous-total des articles :';
    }

    const TOTALPRICEVALUE = document.getElementsByClassName('total-price-value');
  
    for (const element of localStore) {
        let total = (element.price * element.quantity);
        TOTALPRICEVALUE[localStore.indexOf(element)].textContent = 'EUR  ' + total;
    }

    const EXPEDITION = document.getElementsByClassName('expedition-price');
   
    for (const element of localStore) {
        EXPEDITION[localStore.indexOf(element)].textContent = "Frais d'envoi :";
    }

    const EXPEDITIONVALUE = document.getElementsByClassName('expedition-price-value');
   
    for (const element of localStore) {
        EXPEDITIONVALUE[localStore.indexOf(element)].textContent = "EUR 0,00";

    }

    const QUANTITY = document.getElementsByClassName('product-quantity');
    for (const element of localStore) {
        QUANTITY[localStore.indexOf(element)].textContent = "Nombre d'articles :";
    }

    const QUANTITYVALUE = document.getElementsByClassName('product-quantity-value');
    for (const element of localStore) {
        QUANTITYVALUE[localStore.indexOf(element)].textContent = element.quantity;
    }

    const LENSE = document.getElementsByClassName('lenses');
    for (const element of localStore) {
        LENSE[localStore.indexOf(element)].textContent = "Catégorie lentille :";
    }

    const LENSEVALUE = document.getElementsByClassName('lenses-value');
    for (const element of localStore) {
        LENSEVALUE[localStore.indexOf(element)].textContent = element.lenses;
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
    localStore.map(item => {
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
        localStore.forEach(element => {
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
    setTimeout(function(url) {
        url = './remerciement.html';
        window.location.href = url;
      }, 3000);
    }
    
};

displayResume();