(function displayResume() {
    const localStore = JSON.parse(localStorage.getItem('LOCALSTORE'));
    cloneNodeAndChild(localStore);
    displayProductsResume(localStore);
    summarizeAllBook(localStore);
    postDataProcess(localStore);
})();

function cloneNodeAndChild(localStore) {
    //récupérer l'élement html
    const toClone = document.getElementsByClassName('resume-area'); 
    for (const element of localStore) {
         //cloner l'élément et ses nodes
        let clone = toClone[0].cloneNode(true); 
        //cloner l'élement clone après l'original     
        toClone[0].after(clone); 
        const border = document.getElementsByClassName("add-border");
        border[0].classList.add('border');
        const borderBottom = document.getElementsByClassName("add-border-bottom");
        borderBottom[0].classList.add('border-bottom');
        borderBottom[1].classList.add('border-bottom');
    }
}

function displayProductsResume(localStore) {
    for (const element of localStore) {
        const h3 = document.querySelectorAll('h3');
        h3[localStore.indexOf(element)].textContent = element.name;
    }
    for (const element of localStore) {
        const description = document.getElementsByClassName('description');
        description[localStore.indexOf(element)].textContent = element.description;
    }
    for (const element of localStore) {
        const lenseValue = document.getElementsByClassName('lenses-value');
        lenseValue[localStore.indexOf(element)].textContent = element.lenses;
    }
    for (const element of localStore) {
        const quantityValue = document.getElementsByClassName('product-quantity-value');
        quantityValue[localStore.indexOf(element)].textContent = element.quantity;
    }
    for (const element of localStore) {
        const price = document.getElementsByClassName('price');
        price[localStore.indexOf(element)].textContent = 'EUR  ' + ((element.price) * 0.001).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    for (const element of localStore) {
        const totalPrice = document.getElementsByClassName('total-price-value');
        let total = ((element.price * element.quantity) * 0.001).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        totalPrice[localStore.indexOf(element)].textContent = 'EUR  ' + total;
    }
    for (const element of localStore) {
        const image = document.getElementsByClassName('image-to-resume');
        image[localStore.indexOf(element)].setAttribute("src", element.imageUrl);
        image[localStore.indexOf(element)].setAttribute("alt", element.name);
    }
    showText(document.getElementsByClassName('total-price'), "Sous-total des articles :", localStore);
    showText(document.getElementsByClassName('expedition-price'), "Frais d'envoi :", localStore);
    showText(document.getElementsByClassName('expedition-price-value'), "EUR 0,00", localStore);
    showText(document.getElementsByClassName('product-quantity'), "Nombre d'articles :", localStore);
    showText(document.getElementsByClassName('lenses'), "Catégorie lentille :", localStore);
}
function showText(htmlElement, outputText, localStore){
    for (const element of localStore) {
        htmlElement[localStore.indexOf(element)].textContent = outputText;
    }
}
function summarizeText(htmlElement, outputText){
    htmlElement.textContent = outputText;
}

function summarizeAllBook(localStore) {
    summarizeText(document.querySelectorAll('h5')[0], 'Total');
    summarizeText(document.getElementById('sous-total'), 'Sous-total');
    summarizeText(document.getElementById('livraison'), 'Livraison');
    summarizeText(document.getElementById('tva'), 'Total (TVA incluse)');
    summarizeText(document.getElementById('final-expetition'), 'gratuit');
    const array = [];
    //initialiser un variable produce
    let produce;
    localStore.map(item => {
        //appliquer la multiplication dans chaque élément de tableau
        //l'assigner dans produce
        produce = (item.price * item.quantity);
        //conserver à chaque fois le résultat dans array
        array.push(produce);
    })
    //définir la fonction reducer
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    //appliquer la méthode reduce sur array 
    // en ajoutant la fonction reducer comme paramètre
    const totalBook = ((array.reduce(reducer)) * 0.001).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    //envoyer ce prix final dans localstorage
    localStorage.setItem('finalPrice', JSON.stringify(totalBook));
    document.getElementById('total').textContent = totalBook + ' €';
    document.getElementById('total-with-tva').textContent = totalBook + ' €';
    const lineBottom = document.getElementById("add-border-bottom");
    lineBottom.classList.add('border-bottom');
    const booking = document.getElementsByClassName('bg-warning');
    booking[0].classList.remove('d-none');
    booking[0].addEventListener('click', showForm);
}

function showForm(ev) {
    ev.preventDefault();
    const form = document.getElementById('contactform-form');
    // supprimer la classe d-none pour afficher le formulaire
    form.classList.remove("d-none");
}

function postDataProcess(localStore) {
    // faire post fetch
    document.getElementById('contactform-form').addEventListener('submit', postBooking);
    function postBooking(e) {
        e.preventDefault();
        let firstName = document.getElementById('firstName').value;
        // console.log(firstName);
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
                return data
            })
            .then(function sendOrder(data){
                localStorage.setItem('orderId', JSON.stringify(data.orderId));
                setTimeout(function (url) {
                    url = './remerciement.html';
                    window.location.href = url;
                }, 1000);
                localStorage.removeItem('LOCALSTORE');
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }
}

