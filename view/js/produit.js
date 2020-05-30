let sessionStore = JSON.parse(sessionStorage.getItem('FFQFDQFQJYKOIUY9IEOPAZAR339209RHGBVfqkl'));
console.log(sessionStore);
let createProductsObj = () => {
    fetch(`http://localhost:3000/api/cameras/${sessionStore[0]._id}`, {
            method: 'GET',
            mode: 'cors'
        })
        .then(function (response) {
            return response.json()
        }).then(function (product) {
            console.log('parsed json', product);
            displayProduct(product)
        })
        .catch(function (ex) {
            console.log('parsing failed', ex)
        })
}
createProductsObj();

function displayProduct(product) {
    displayImage(product);
    addAltImage(product);
    displayProductName(product);
    displayDescription(product);
    addSelect(product);
    setQuantity(product);
    displayPrice(product);  
}


function displayImage(product) {
    const img = document.getElementsByClassName('img-thumbnail'); // récupérer les éléments images avec classe img-thumbnail
    img[0].setAttribute('src', product.imageUrl)//ajouter le chemin image
}
function addAltImage(product) {
    const img = document.getElementsByClassName('img-thumbnail'); // récupérer les éléments images avec classe img-thumbnail
    img[0].setAttribute('Alt', product.name)
}
function displayProductName(product) {
    const h5 = document.querySelectorAll('h5');
    h5[0].textContent = product.name;
}

function displayDescription(product) {
   const textDescription = document.getElementsByClassName('description');
    textDescription[0].textContent = product.description
    
}


function addSelect(product) {
    const parentSelect = document.getElementsByClassName('parentSelect'); //récupérer l'élement parent select des options
    const select = document.createElement("select");
    select.setAttribute("id", "select");
    select.setAttribute("required", "");
    parentSelect[0].append(select);
    // select.add(new Option('Choisissez une lentille'));
    for (const element of product.lenses){
        select.add(new Option(element, element))
    }
}

function displayPrice(product) {
    //initialiser l'affichage du prix
    const priceElement = document.getElementsByClassName('priceElement');
    const spanEuroElement = document.getElementsByClassName('spanEuroElement');
    spanEuroElement[0].textContent = ' EUR';
    priceElement[0].textContent = product.price;    
}



function setQuantity(product) {
    console.log(product);
    let productToSet = [];

    
    productToSet.push(product);
    console.log(productToSet);
   
    productToSet[0].quantity = 1; // ajouter un propriété qty comme quantité initialisé par une valeur 1
    console.log(productToSet[0].quantity);
    const QUANTITY = document.getElementsByClassName('qty'); //cibler l'élément span avec un classe qty 
    QUANTITY[0].textContent = productToSet[0].quantity; // mettre la valeur 1 en tant que texte 

    const PLUS = document.getElementsByClassName('plus'); //cibler l'élémént span +
    console.log(sessionStore[0]._id);
    PLUS[0].setAttribute("data-id", productToSet[0]._id); //ajouter l'attribut data-id sur l'élément

    PLUS[0].addEventListener('click', incrementQuantity) // ajouter l'évènement click et éxecuter la fonction pour augmenter la quantité

    const MINUS = document.getElementsByClassName('minus'); //cibler l'élémént span -
    MINUS[0].setAttribute('data-id', productToSet[0]._id) //ajouter l'attribut data-id sur l'élément  
    MINUS[0].addEventListener('click', decrementQuantity); //ajouter l'évènement click et éxecuter la fonction pour diminuer la quantité

    console.log(PLUS[0], QUANTITY[0], MINUS[0]);
   
    function incrementQuantity(ev, increment = 1) {
        ev.preventDefault(); //prévenir le comportement par défaut
        console.log(productToSet);
        console.log(productToSet[0].quantity);
        productToSet[0].quantity += increment; //ajouter la valeur initiale de propriété qty par 1
        console.log(productToSet[0].quantity);
        const newQty = productToSet[0].quantity; // conserver cette valeur dans newQty
        const newTextContent = document.getElementsByClassName('qty'); //cibler l'élément span avec un classe qty 
        newTextContent[0].textContent = newQty; //mettre à jour le texte avec newQty
        console.log(newQty);
        console.log(productToSet[0]);
        uptdatePrice()
    }

    function decrementQuantity(ev, decrement = 1) {
        ev.preventDefault();
        productToSet[0].quantity -= decrement;
        const newQty = productToSet[0].quantity;
        const newTextContent = document.getElementsByClassName('qty');
        newTextContent[0].textContent = newQty;
        console.log(newQty);
        console.log(productToSet[0]);
        uptdatePrice()
    }
    function uptdatePrice(){
        console.log(productToSet[0].quantity);
        let total = productToSet[0].quantity * productToSet[0].price;
        console.log(total);
        let price = document.getElementsByClassName('priceElement');          
        price[0].textContent = total;
        if(total < 0){
            reloadAndReinitialise();
        }
    }
}

function reloadAndReinitialise() {
    sessionStorage.removeItem('FFQFDQFQJYKOIUY9IEOPAZAR339209RHGBVfqkl');
    window.location.reload();
}

const LOCALSTORE = { // créer un constante objet
    KEY: 'SQGKLMKJIPOJjklfmqsjfoehgqdfqmlljodkjioj',
    contents: [],
    init() {
        //vérifier s'il exite un produit le contenu de session storage
        let _contents = localStorage.getItem(this.KEY);
        if (_contents) { // s'il y en a, on le transforme en array objet pour la récupération
            this.contents = JSON.parse(_contents);
        } else {
            //s'ij n'y en n'a pas, on y rajoute un array vide par défaut
            this.contents = [];
            this.sync();
        }
    },
    async sync() { // on met la sessionstorage à jour de manière asynchrone 
        let _cart = JSON.stringify(this.contents);
        await localStorage.setItem(this.KEY, _cart);
    },
    sendProductToLocastorage(){
        let button = document.querySelector('button');
        console.log(button);
        button.addEventListener('click', this.sendProduct);
        this.init();
    },
    sendProduct(ev){
        ev.preventDefault();
        let e = document.getElementById("select");
        let value = e.options[e.selectedIndex].value;
        let text = e.options[e.selectedIndex].text;
        console.log(text);
        sessionStore[0].lenses = text;
        LOCALSTORE.contents.push(sessionStore[0]);
        console.log(LOCALSTORE.contents[0]);
        LOCALSTORE.sync();
        sessionStorage.removeItem('FFQFDQFQJYKOIUY9IEOPAZAR339209RHGBVfqkl');
        window.location.reload();
    }
}

LOCALSTORE.sendProductToLocastorage();

