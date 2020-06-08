let createProductsObj = () => {
    fetch('http://localhost:3000/api/cameras/', {
            method: 'GET',
            mode: 'cors'
        })
        .then(function (response) {
            return response.json()
        }).then(function (products) {
            console.log('parsed json', products);
            displayArticle(products) //execution d'affichage des articles dès qu'on reçoit les produits
        })
        .catch(function (ex) {
            console.log('parsing failed', ex)
        })
}

createProductsObj();

let PRODUCTS = [];

let displayArticle = (products) => {
    PRODUCTS = products; // rendre products accessible pour la fonction addItem, dont pour SESSIONSTORE.add()

    let row = document.getElementsByClassName('row');
    products.forEach(product => {
        const maincol = document.createElement("div");
        maincol.classList.add("col-lg-4", "col-sm-6", "mb-4");

        const card = document.createElement("div");
        card.classList.add("card", "h-100", 'text-center');

        const divcard = document.createElement("div");
        divcard.classList.add("card-body");

        const divrow = document.createElement("div");
        divrow.classList.add("row");

        const divcol = document.createElement("div");
        divcol.classList.add("col-8");

        const h = document.createElement("h4");
        h.classList.add("card-title");
        h.textContent = product.name;

        const divcolright = document.createElement("div");
        divcolright.classList.add("col-4", "text-right");

        const span = document.createElement('span');
        span.textContent = ' €';

        const pdescright = document.createElement('p');
        pdescright.classList.add("card-text");
        pdescright.textContent = (product.price*0.001).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        const img = document.createElement("img");
        img.classList.add("card-img-bottom");
        img.src = product.imageUrl;

        // const ANCHOR = document.createElement("a");
        // ANCHOR.setAttribute('href', './produit.html');

        const ANCHOR = document.createElement("a");
        ANCHOR.classList.add("select");
        ANCHOR.setAttribute('data-id', product._id);
        ANCHOR.setAttribute('href', './produit.html');
        ANCHOR.addEventListener('click', addItem);
        ANCHOR.textContent = "Voir le produit";

        divcol.appendChild(h);
        divcolright.appendChild(pdescright);
        pdescright.appendChild(span);
        divrow.appendChild(divcol);
        divrow.appendChild(divcolright);

        divcard.appendChild(divrow);
        card.appendChild(divcard);
        card.appendChild(img);
        // ANCHOR.appendChild(button);
        card.appendChild(ANCHOR);
        maincol.appendChild(card);
        row[0].appendChild(maincol);
    });

}

function addItem(ev) {
    let _id = ev.target.getAttribute('data-id'); // récupérer la valeur de l'attribut data-id sur le bouton cliqué
    console.log('add to cart item', _id);
    sessionStoreData.add(_id);//excecuter l'instance de la classe en ajoutant un produit
}

class SessionStore {
 
    constructor (KEY, contents){
        this.KEY = KEY;
        this.contents = contents;
    }
    init() {
        //vérifier s'il exite un produit le contenu de session storage
        let contentsData = sessionStorage.getItem(this.KEY);
        if (contentsData) { // s'il y en a, on le transforme en array objet pour la récupération
            this.contents = JSON.parse(contentsData);
        } else {
            //s'ij n'y en n'a pas, on y rajoute un array vide par défaut
            this.contents = [];
            console.log(this.contents);
            this.store();
        }
    }
    store() { // on met à jour la sessionstorage 
        let storeData = JSON.stringify(this.contents);
        sessionStorage.setItem(this.KEY, storeData);
    }

    add(_id) {
        let arr = PRODUCTS.filter(product => { //comparaison de l'id sélectionné à chaque id dans les objets produits
            if (product._id == _id) { //si on a le même id que l'item sélectionné dans le produits fetched
                return true;
            }
        });
        if (arr && arr[0]) { //si on a l'array et un premier élément 
            let obj = { //on associe les propriétés des produits à ajouter à son correspondance dans le data produits
                _id: arr[0]._id,
                name: arr[0].name,
                description: arr[0].description,
                imageUrl: arr[0].imageUrl,
                lenses: arr[0].lenses,
                price: arr[0].price
            };
            this.contents[0] = obj; // ajouter dans le contenu su session
            //mettre à jour le contenu de session storage
            this.store(); // mise à jour
            this.contents.forEach(item => console.log(item._id));
        } else { //quand on séléctionne un produit qui n'extiste pas dans data products
            console.error('Invalid Product');
        };
    }
}

let sessionStoreData = new SessionStore('sessionData', []);//faire un instance sessionstore
sessionStoreData.init();//ajouter un array vide par défaut