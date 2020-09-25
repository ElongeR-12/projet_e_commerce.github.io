let sessionStore = JSON.parse(sessionStorage.getItem('sessionData'));
console.log(sessionStore);

let createProductsObj = () => {//async
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
    const img = document.getElementsByClassName('img-thumbnail'); 
    //ajouter le chemin image
    img[0].setAttribute('src', product.imageUrl)
    img[0].setAttribute('Alt', product.name)
}
function displayProductName(product) {
    const h5 = document.querySelectorAll('h5');
    h5[0].textContent = product.name;
}

function displayDescription(product) {
   const description = document.getElementsByClassName('description');
   description[0].textContent = product.description
}
function addSelect(product) {
    //récupérer l'élement parent select des options
    const selectParent = document.getElementsByClassName('parentSelect'); 
    const select = document.createElement("select");
    select.setAttribute("id", "select");
    select.setAttribute("required", "");
    selectParent[0].append(select);

    for (const element of product.lenses){
        //ajouter les différents options et ses valeur sur select élément
        select.add(new Option(element, element))
    }
}
function displayPrice(product) {
    //initialiser l'affichage du prix
    const priceElement = document.getElementsByClassName('priceElement');
    const span = document.getElementsByClassName('spanEuroElement');
    span[0].textContent = ' EUR';
    //remplacer le nombre suivi par 3 ensemble de nombre et un point par sa valeur et un virgule
    priceElement[0].textContent = ((product.price)*0.001).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');    
}
function setQuantity(product) {
    const KEY = 'LOCALSTORE';
    let arrayOfItemValueLocalStore = [];
    let productToSet = [];
    productToSet.push(product);
    productToSet[0].quantity = 1; 
    const quantity = document.getElementsByClassName('qty'); 
    quantity[0].textContent = productToSet[0].quantity; 
    const plus = document.getElementsByClassName('plus'); 
    plus[0].setAttribute("data-id", productToSet[0]._id); 
    plus[0].addEventListener('click', incrementQuantity);
    const minus = document.getElementsByClassName('minus');  
    minus[0].setAttribute('data-id', productToSet[0]._id);
    minus[0].addEventListener('click', decrementQuantity); 
    function incrementQuantity(ev, increment = 1) {
        ev.preventDefault(); 
        productToSet[0].quantity += increment; 
        const newQty = productToSet[0].quantity; 
        const newTextContent = document.getElementsByClassName('qty'); 
        newTextContent[0].textContent = newQty; 
        uptdatePrice()
    }
    function decrementQuantity(ev, decrement = 1) {
        ev.preventDefault();
        productToSet[0].quantity -= decrement;
        const newQty = productToSet[0].quantity;
        const newTextContent = document.getElementsByClassName('qty');
        newTextContent[0].textContent = newQty;
        uptdatePrice()
    }
    function uptdatePrice(){
        let total = ((productToSet[0].quantity * productToSet[0].price)*0.001).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        let price = document.getElementsByClassName('priceElement');          
        price[0].textContent = total;
        if(total < 1){
            setTimeout(function (url) {
                url = './index.html';
                window.location.href = url;
            }, 1000);
        }
    }
    (function sendProductToLocastorage(){
        let button = document.querySelector('button');
        button.setAttribute('data-id', productToSet[0]._id);
        button.addEventListener('click', sendProduct);
        init();
    })(); 
    function sendProduct(ev){
        ev.preventDefault();
        let _id = ev.target.getAttribute('data-id');
        let e = document.getElementById("select");
        let lensesCategory = e.options[e.selectedIndex].text;
        productToSet[0].lenses = lensesCategory;
        addLocal(_id, lensesCategory);
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
    function compareLenseCategory(lensesCategory){
        //chercher un produit dans localstorage la catégorie de lentille choisi
        let match = arrayOfItemValueLocalStore.filter(item=>{
            if(item.lenses == lensesCategory)
                return true;
        });
        if(match && match[0])
            return match[0];
    }  
    function addLocal(_id, lensesCategory){
        //ajouter le produit dans local storage
        //checker si celui-ci existe déjà dans le local storage
        if(find(_id) && compareLenseCategory(lensesCategory)){
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
    setTimeout(function (url) {
        url = './panier.html';
        window.location.href = url;
    }, 1000);
}







