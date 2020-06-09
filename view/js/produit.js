let sessionStore = JSON.parse(sessionStorage.getItem('sessionData'));
console.log(sessionStore);
let createProductsObj = () => {
    fetch(`http://localhost:3000/api/cameras/${sessionStore[0]._id}`, {//await
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
    displayProductName(product);
    displayDescription(product);
    addSelect(product);
    setQuantity(product);
    displayPrice(product);  
}


function displayImage(product) {
    // récupérer les éléments images avec classe img-thumbnail
    const IMG = document.getElementsByClassName('img-thumbnail'); 
    //ajouter le chemin image
    IMG[0].setAttribute('src', product.imageUrl)
    IMG[0].setAttribute('Alt', product.name)
}
function displayProductName(product) {
    const H5 = document.querySelectorAll('h5');
    H5[0].textContent = product.name;
}

function displayDescription(product) {
   const DESCRIPTION = document.getElementsByClassName('description');
   DESCRIPTION[0].textContent = product.description
}


function addSelect(product) {
    //récupérer l'élement parent select des options
    const SELECTPARENT = document.getElementsByClassName('parentSelect'); 
    const SELECT = document.createElement("select");
    SELECT.setAttribute("id", "select");
    SELECT.setAttribute("required", "");
    SELECTPARENT[0].append(SELECT);

    for (const element of product.lenses){
        //ajouter les différents options et ses valeur sur select élément
        SELECT.add(new Option(element, element))
    }
}

function displayPrice(product) {
    //initialiser l'affichage du prix
    const PRICEELEMENT = document.getElementsByClassName('priceElement');
    const SPAN = document.getElementsByClassName('spanEuroElement');
    SPAN[0].textContent = ' EUR';
    //remplacer le nombre suivi par 3 ensemble de nombre et un point par sa valeur et un virgule
    PRICEELEMENT[0].textContent = ((product.price)*0.001).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');    
}

function setQuantity(product) {
    //déclarer un clé et valeur de localstorage
    const KEY = 'LOCALSTORE';
    let arrayOfItemValueLocalStore = [];
    //initialiser un variable pour la personalisation
    let productToSet = [];
    //ajouter le produit sélectionner dans la variable
    productToSet.push(product);
    //ajouter un propriété quantité initialisé par une valeur 1
    productToSet[0].quantity = 1; 
    //cibler l'élément span avec un classe qty 
    const QUANTITY = document.getElementsByClassName('qty'); 
    // mettre la valeur 1 en tant que texte 
    QUANTITY[0].textContent = productToSet[0].quantity; 
    //cibler l'élémént span +
    const PLUS = document.getElementsByClassName('plus'); 
    //ajouter l'attribut data-id sur l'élément
    PLUS[0].setAttribute("data-id", productToSet[0]._id); 
    // ajouter l'évènement click et éxecuter la fonction pour augmenter la quantité
    PLUS[0].addEventListener('click', incrementQuantity) 
    //cibler l'élémént span -
    const MINUS = document.getElementsByClassName('minus'); 
    //ajouter l'attribut data-id sur l'élément  
    MINUS[0].setAttribute('data-id', productToSet[0]._id);
    //ajouter l'évènement click et 
    // éxecuter la fonction pour diminuer la quantité
    MINUS[0].addEventListener('click', decrementQuantity); 
    console.log(PLUS[0], QUANTITY[0], MINUS[0]);
   
    function incrementQuantity(ev, increment = 1) {
        //prévenir le comportement par défaut
        ev.preventDefault(); 
        //ajouter la valeur initiale de propriété qty par 1
        productToSet[0].quantity += increment; 
        // conserver cette valeur dans newQty
        const newQty = productToSet[0].quantity; 
        //cibler l'élément span avec un classe qty 
        const newTextContent = document.getElementsByClassName('qty'); 
        //mettre à jour le texte avec newQty
        newTextContent[0].textContent = newQty; 
        uptdatePrice()
    }
    function decrementQuantity(ev, decrement = 1) {
        ev.preventDefault();
        //ajouter la valeur initiale de propriété qty par 1
        productToSet[0].quantity -= decrement;
        const newQty = productToSet[0].quantity;
        const newTextContent = document.getElementsByClassName('qty');
        newTextContent[0].textContent = newQty;
        uptdatePrice()
    }
    function uptdatePrice(){
        //calculer le prix unitaire multiplié par la quantité
        let total = ((productToSet[0].quantity * productToSet[0].price)*0.001).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        //cibler l'élement pour afficher le prix total
        let price = document.getElementsByClassName('priceElement');          
        price[0].textContent = total;
        if(total < 1){
            //réactualiser la page
            reloadAndReinitialise();
        }
    }
    (function sendProductToLocastorage(){
        let button = document.querySelector('button');
        //ajouter l'id du produit en question 
        //en attribut sur le boutton d'envoi au panier
        button.setAttribute('data-id', productToSet[0]._id);
        //ajouter un évenement click
        button.addEventListener('click', sendProduct);
        init();
    })(); 
    function sendProduct(ev){
        ev.preventDefault();
        //récupérer l'id quand on clique l'envoi
        let _id = ev.target.getAttribute('data-id');
        //cibler l'élement select
        let e = document.getElementById("select");
        //récupérer le texte de la valeur de select
        let lensesCategory = e.options[e.selectedIndex].text;
        //assigner la valeur au propriété lentille
        //du produit personnalisé
        productToSet[0].lenses = lensesCategory;
        //Executer la fonction pour ajouter 
        //le produit personnalisé dans panier
        addLocal(_id, lensesCategory);
        //réinitialiser la sessionstorage et 
        //vider le localstorage
        reloadAndReinitialise()
    }
    function find(_id){
        //chercher un produit dans localstorage par son id
        let match = arrayOfItemValueLocalStore.filter(item=>{
            if(item._id == _id)
                return true;
        });
        if(match && match[0])
            return match[0];
    }
  
    function addLocal(_id, lensesCategory){
        //ajouter le produit dans local storage
        //checker si celui-ci existe déjà dans le local storage
        if(find(_id)){
            increase(_id);
        }else{
            //ajouter un nouveau produit élément dans localstorage
            add(lensesCategory);
        }
    }
    function increase(_id){
        //récupérer la quantité actuel du produit personnalisé
        const newQty = productToSet[0].quantity; 
        //parcourir chaque élément déjà envoyé
        //dans localstorage ou panier
        arrayOfItemValueLocalStore = arrayOfItemValueLocalStore.map(item=>{
            if(item._id === _id)
                //ajouter la quantité par le nouveau quantité personnalisé
                item.quantity = item.quantity + newQty;
            return item;
        });
        //mettre à jour localstorage
        store();
    }
    function add(lensesCategory){
        let obj = {
            description: productToSet[0].description,
            imageUrl: productToSet[0].imageUrl,
            lenses: lensesCategory,
            name: productToSet[0].name,
            price: productToSet[0].price,
            quantity: productToSet[0].quantity,
            _id: productToSet[0]._id
        }
       
        arrayOfItemValueLocalStore.push(obj);
        
        store();
    }
    function init() {
        //vérifier s'il exite un produit le contenu de session storage
        let localStoreItemValue = localStorage.getItem(KEY);
        if (localStoreItemValue) { 
            // s'il y en a, on le transforme en array objet pour la récupération
                arrayOfItemValueLocalStore = JSON.parse(localStoreItemValue);
            } else {
                //s'ij n'y en n'a pas, on y rajoute un array vide par défaut
                arrayOfItemValueLocalStore = [];
                store();
            }
    }
    function store() { 
        // on met à jour la localstorage 
        let localStoreItemValue = JSON.stringify(arrayOfItemValueLocalStore);
        localStorage.setItem(KEY, localStoreItemValue);
    }
   
}
//réactualiser la page et vider la sessionstorage
function reloadAndReinitialise() {
    sessionStorage.removeItem('sessionData');
    window.location.reload();
}







