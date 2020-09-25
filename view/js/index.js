let createProductsObj = () => {
    fetch('http://localhost:3000/api/cameras', {
            method: 'GET',
            mode: 'cors'
        })
        .then(function (response) {
            return response.json()
        }).then(function (products) {
            console.log('parsed json', products);
            //execution d'affichage des articles
            displayArticle(products)
        })
        .catch(function (ex) {
            console.log('parsing failed', ex)
        })
}

createProductsObj();

let PRODUCTS = [];

let displayArticle = (products) => {
    // rendre products accessible pour la fonction addItem,
    PRODUCTS = products; 

    let row = document.getElementsByClassName('row');
    //iteration des objets produits
    products.forEach(product => {
        //créer un élément
        const mainColumn = document.createElement("div");
        //ajouter des class bootstrap
        mainColumn.classList.add("col-lg-4", "col-sm-6", "mb-4");

        const card = document.createElement("div");
        card.classList.add("card", "h-100", 'text-center');

        const divCard = document.createElement("div");
        divCard.classList.add("card-body");

        const divRow = document.createElement("div");
        divRow.classList.add("row");

        const divColumn = document.createElement("div");
        divColumn.classList.add("col-8");

        const h = document.createElement("h4");
        h.classList.add("card-title");
        //définir le text de l'élément
        h.textContent = product.name;

        const rightColumn = document.createElement("div");
        rightColumn.classList.add("col-4", "text-right");

        const span = document.createElement('span');
        span.textContent = ' €';

        const price = document.createElement('p');
        price.classList.add("card-text");
        price.textContent = (product.price*0.001).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        const img = document.createElement("img");
        img.classList.add("card-img-bottom");
        img.src = product.imageUrl;

        const anchor = document.createElement("a");
        anchor.classList.add("select");
        anchor.setAttribute('data-id', product._id);
        anchor.setAttribute('href', './produit.html');
        anchor.addEventListener('click', addItem);
        anchor.textContent = "Voir le produit";
        //insérer l'élement H en tant qu'enfant de DIVCOLUMN
        divColumn.appendChild(h);
        rightColumn.appendChild(price);
        price.appendChild(span);
        divRow.appendChild(divColumn);
        divRow.appendChild(rightColumn);

        divCard.appendChild(divRow);
        card.appendChild(divCard);
        card.appendChild(img);
        card.appendChild(anchor);
        mainColumn.appendChild(card);
        row[0].appendChild(mainColumn);
    });

}

function addItem(ev) {
    // récupérer la valeur de l'attribut data-id 
    let _id = ev.target.getAttribute('data-id');
    //excecuter l'instance de la classe en ajoutant un produit
    sessionStoreData.add(_id);
}

class SessionStore {
 
    constructor (KEY, contents){
        this.KEY = KEY;
        this.contents = contents;
    }
    init() {
        //vérifier s'il exite un produit le contenu de session storage
        let contentsData = sessionStorage.getItem(this.KEY);
        if (contentsData) {
             //transformer en array objet pour la récupération
            this.contents = JSON.parse(contentsData);
        } else {
            //rajouter un array vide par défaut
            this.contents = [];
            this.store();
        }
    }
    store() { 
        //mettre à jour la sessionstorage 
        let storeData = JSON.stringify(this.contents);
        sessionStorage.setItem(this.KEY, storeData);
    }

    add(_id) {
        //comparer l'id sélectionné à chaque id dans products
        let arr = PRODUCTS.filter(product => { 
            if (product._id == _id) { 
                return true;
            }
        });
         //si on a l'array qui contient des produits
        if (arr && arr[0]) {
            //récréer un objet avec les propriétés de son correspondance dans products
            let obj = { 
                _id: arr[0]._id,
                name: arr[0].name,
                description: arr[0].description,
                imageUrl: arr[0].imageUrl,
                lenses: arr[0].lenses,
                price: arr[0].price
            };
            // ajouter dans le contenu su session
            this.contents[0] = obj; 
            //mettre à jour le contenu de session storage
            this.store(); 
        } else {
            console.error('Invalid Product');
        };
    }
}

let sessionStoreData = new SessionStore('sessionData', []);//faire un instance sessionstore
sessionStoreData.init();//ajouter un array vide par défaut