
let createProductsObj = () => {
    fetch('http://localhost:3000/api/cameras', {method: 'GET', mode:'cors'})
    .then(function(response) {
        return response.json()
    }).then(function(products) {
        console.log('parsed json', products);
        displayArticle(products)//execution d'affichage des articles dès qu'on reçoit le produits
    })
    .catch(function(ex) {
        console.log('parsing failed', ex)
    })
}

createProductsObj();

let PRODUCTS = [];

displayArticle = (products) =>{
    PRODUCTS = products; // rendre products accessible pour la fonction addItem, dont pour SESSIONSTORE.add()
    
    let row = document.getElementsByClassName('row');
    products.forEach(product =>{
        const maincol = document.createElement("div");
        maincol.classList.add("col-lg-4", "col-sm-6", "mb-4");

        const card = document.createElement("div");
        card.classList.add("card","h-100");

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
        pdescright.textContent = product.price;

        const img = document.createElement("img");
        img.classList.add("card-img-bottom");
        img.src = product.imageUrl;

        const b = document.createElement("button");
        b.classList.add("select");
        b.setAttribute('data-id', product._id);
        b.addEventListener('click', addItem);
        b.textContent = "Sélectionner";

        divcol.appendChild(h);
        divcolright.appendChild(pdescright);
        pdescright.appendChild(span);
        divrow.appendChild(divcol);
        divrow.appendChild(divcolright);

        divcard.appendChild(divrow);
        card.appendChild(divcard);
        card.appendChild(img);
        card.appendChild(b); 
        maincol.appendChild(card);
        row[0].appendChild(maincol); 
    });
  
}

function addItem(ev){
    ev.preventDefault();
    let _id = ev.target.getAttribute('data-id');// récupérer la valeur de l'attribu data-id sur le bouton cliqué
    console.log('add to cart item', _id);
    SESSIONSTORE.add(_id, 1);
}


const SESSIONSTORE = { // créer un constante objet
    KEY: 'FFQFDQFQJYKOIUY9IEOPAZAR339209RHGBVfqkl',
    contents: [],
    init(){
        //vérifier s'il exite un produit le contenu de session storage
        let _contents = sessionStorage.getItem(SESSIONSTORE.KEY);
        if(_contents){// s'il y en a, on le transforme en array objet pour la récupération
            SESSIONSTORE.contents = JSON.parse(_contents);
        }else{
            //s'ij n'y en n'a pas, on y rajoute un objet(produit1) par défaut
            SESSIONSTORE.contents = [
                {
                    _id: "5be1ed3f1c9d44000030b061",
                    name: "Zurss 50S",
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    imageUrl: "http://localhost:3000/images/vcam_1.jpg",
                    lenses: ["35mm 1.4", "50mm 1.6"],
                    price: 49900,
                    qty: 1
                }
            ];
            SESSIONSTORE.sync();
        }
    },
    async sync(){// on met la sessionstorage à jour de manière asynchrone 
        let _cart = JSON.stringify(SESSIONSTORE.contents);
        await sessionStorage.setItem(SESSIONSTORE.KEY, _cart);
    },
    find(_id){
        //chercher un id dans sessionstorage, le comparer par l'id de l'item séléctionné
        let match = SESSIONSTORE.contents.filter(item=>{
            if(item._id == _id)
                return true;
        });
        if(match && match[0])
            return match[0]; //retourner la valeur dans find() pour l'utiliser das add()
    },
    add(_id){
        
        if(SESSIONSTORE.find(_id)){//si id existait déjà, 
            SESSIONSTORE.increase(_id, 1);//ajouter la quantité, en fonction du nombre de click de sélection
        }else{
            let arr = PRODUCTS.filter(product=>{//comparaison de l'id sélectionné à chaque id dans les objets produits
                if(product._id == _id){
                    return true;
                }
            });
            if(arr && arr[0]){//si un et seul unique objet contient l'id qui correspond à l'id du sélection
                let obj = {
                    _id: arr[0]._id,
                    name: arr[0].name,
                    description: arr[0].description,
                    imageUrl: arr[0].imageUrl,
                    lenses: arr[0].lenses,
                    price: arr[0].price,
                    qty: 1
                };
                SESSIONSTORE.contents.push(obj);// ajouter dans le contenu su session
                //mettre à jour le contenu de session storage
                SESSIONSTORE.sync();// mise à jour
            }else{
                console.error('Invalid Product');
            }
        }
    },
    increase(_id, qty=1){
        //ajouter un la quantité de produit quand celui-ci existe déjà dans la session storage
        SESSIONSTORE.contents = SESSIONSTORE.contents.map(item=>{
            if(item._id === _id)
                item.qty = item.qty + qty;
            return item;
        });
        //mettre à jour le contenu de session storage
        SESSIONSTORE.sync()
    }
};

SESSIONSTORE.init();// Pour avoir un produit par défaut dans sessionstorage
