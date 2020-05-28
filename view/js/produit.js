let sessionStore = JSON.parse(sessionStorage.getItem('FFQFDQFQJYKOIUY9IEOPAZAR339209RHGBVfqkl'));
console.log(sessionStore);
let createProductsObj = () => {
    fetch('http://localhost:3000/api/cameras', {
            method: 'GET',
            mode: 'cors'
        })
        .then(function (response) {
            return response.json()
        }).then(function (products) {
            console.log('parsed json', products);
            displayProduct(products)
        })
        .catch(function (ex) {
            console.log('parsing failed', ex)
        })
}
createProductsObj();

function displayProduct(products) {

    const storedProducts = []; //pour conserver les produits après vérification de son authenticité

    products.filter(product => { //filtrer les produits qui correspond à un id dans session store
        sessionStore.forEach(store => {
            if (product._id == store._id) {
                storedProducts.push(product)
            };
        });
    });

    const numberStored = storedProducts.length;

    //cloner un bloc d'html// dans le cas où on vut ajouter plusieur produit dans la page
    let noded = document.getElementsByClassName('produit-desc-lense');
    for (let i = 1; i < numberStored; i++) { //itération en fonction du nombre de produit dans sessionstore
        const clone = noded[0].cloneNode(true);
        noded[0].after(clone);
    }

    displayImage(storedProducts);
    addAltImage(storedProducts);
    displayProductName(storedProducts);
    displayDescription(storedProducts);
    displayLenseChoice(storedProducts);
    setQuantity();
    displayPrice(storedProducts);
}


function displayImage(storedProducts) {
    //source image des produits sélectionnés
    let src = ''; // stocker les différents src de chaque produit objet
    let arraySrc = []; // assembler tous ses src dans un tableau

    for (const obj of storedProducts) { // parcourir chaque élement objet dans tableau
        src = obj.imageUrl; //assigner l'image url de chaque objet à src
        arraySrc.push(src); // ajouter dans arraySrc après chaque assignation      
    }

    const img = document.getElementsByClassName('img-thumbnail'); // récupérer les éléments images avec classe img-thumbnail

    let i = 0; //initier pour parcourir chaque image dans collection    
    for (const element of arraySrc) {
        // ajouter le src dans image
        img[i++].setAttribute('src', element)
    }

}

function displayProductName(storedProducts) {
    // nom des produits sélectionnés
    let name = '';
    let arrayName = [];

    for (const obj of storedProducts) {
        name = obj.name;
        arrayName.push(name);
    }

    const h5 = document.querySelectorAll('h5');

    for (let i = 0; i < h5.length; i++) {
        h5[i].textContent = arrayName[i]
    }
}

function displayDescription(storedProducts) {
    // description des produits sélectionnés
    let description = '';
    let arrayDescription = [];

    for (const obj of storedProducts) {
        description = obj.description;
        arrayDescription.push(description);
    }

    const textDescription = document.getElementsByClassName('description');

    for (let i = 0; i < textDescription.length; i++) {
        textDescription[i].textContent = arrayDescription[i]
    }
}

function addAltImage(storedProducts) {
    //alt  image des produits sélectionnés
    let alt = '';
    let arrayAlt = [];

    for (const obj of storedProducts) {
        alt = obj.name;
        arrayAlt.push(alt);
    }

    const img = document.getElementsByClassName('img-thumbnail'); // récupérer les éléments images avec classe img-thumbnail

    for (let i = 0; i < img.length; i++) { //parcourir l'image et ajouter l'attribut alt pour chaque
        img[i].setAttribute('Alt', arrayAlt[i]);
    }
}

function displayLenseChoice(storedProducts) {
    // les lentilles des produits sélectionnés

    let lense = '';
    let arrayLenses = [];

    for (const obj of storedProducts) {
        lense = obj.lenses;
        arrayLenses.push(lense);
    }
    addSelect(arrayLenses);

}

function addSelect(arrayLenses) {
    //récupérer l'élement parent select des options
    const parentSelect = document.getElementsByClassName('parentSelect');
    const select = document.createElement("select");
    select.setAttribute("id", "select");
    parentSelect[0].append(select);
    select.add(new Option('Choisissez une lentille'));
    for (i = 0; i < arrayLenses[0].length; i++) {
        select.add(new Option(arrayLenses[0][i], arrayLenses[0][i]))
    }
    console.log(parentSelect[0]);
}

function displayPrice(storedProducts) {
    //initialiser l'affichage du prix
    let price = '';
    let arrayPrice = [];

    for (const obj of storedProducts) {
        price = obj.price;
        arrayPrice.push(price);
    }
    const priceElement = document.getElementsByClassName('priceElement');
    const spanEuroElement = document.getElementsByClassName('spanEuroElement');
    spanEuroElement[0].textContent = ' EUR';
    console.log(spanEuroElement[0]);
    for (let i = 0; i < priceElement.length; i++) {
        priceElement[i].textContent = arrayPrice[i]
    }    
}

function incrementQuantity(ev, qty = 1) {
    ev.preventDefault(); //prévenir le comportement par défaut
    sessionStore[0].qty += qty; //ajouter la valeur initiale de propriété qty par 1
    const newQty = sessionStore[0].qty; // conserver cette valeur dans newQty
    const newTextContent = document.getElementsByClassName('qty'); //cibler l'élément span avec un classe qty 
    newTextContent[0].textContent = newQty; //mettre à jour le texte avec newQty
    console.log(newQty);
    console.log(sessionStore);
    uptdatePrice(sessionStore)
}

function decrementQuantity(ev, qty = 1) {
    ev.preventDefault();
    sessionStore[0].qty -= qty;
    const newQty = sessionStore[0].qty;
    const newTextContent = document.getElementsByClassName('qty');
    newTextContent[0].textContent = newQty;
    console.log(newQty);
    console.log(sessionStore);
    uptdatePrice(sessionStore)
}



function setQuantity() {


    sessionStore[0].qty = 1; // ajouter un propriété qty comme quantité initialisé par une valeur 1

    const qty = document.getElementsByClassName('qty'); //cibler l'élément span avec un classe qty 
    qty[0].textContent = sessionStore[0].qty; // mettre la valeur 1 en tant que texte 

    const plus = document.getElementsByClassName('plus'); //cibler l'élémént span +
    console.log(sessionStore[0]._id);
    plus[0].setAttribute("data-id", sessionStore[0]._id); //ajouter l'attribut data-id sur l'élément

    plus[0].addEventListener('click', incrementQuantity) // ajouter l'évènement click et éxecuter la fonction pour augmenter la quantité

    const minus = document.getElementsByClassName('minus'); //cibler l'élémént span -
    minus[0].setAttribute('data-id', sessionStore[0]._id) //ajouter l'attribut data-id sur l'élément  
    minus[0].addEventListener('click', decrementQuantity); //ajouter l'évènement click et éxecuter la fonction pour diminuer la quantité

    console.log(plus[0], qty[0], minus[0]);
    

}

function uptdatePrice(sessionStore){
    let total = sessionStore[0].qty * sessionStore[0].price;
    let price = document.getElementsByClassName('priceElement');           
    price[0].textContent = total;
}