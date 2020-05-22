
//ajouter l'évènement click sur tous les boutons sélectionner

const elt = document.getElementsByClassName("select");

function clicSelectButon () {
    for (var i = 0 ; i < elt.length; i++) {
        elt[i].addEventListener('click', putItem);
     };
}

clicSelectButon();


function putItem(e){
    id = parseInt(e.target.getAttribute('data-id'))//renvoyer l'id en nombre entier
    console.log('add to cart item', id);
    getProducts();
}

putItem();

var id;
function getProducts (success, failure) {// requête du json data par fetch
    fetch('https://raw.githubusercontent.com/ElongeR-12/projet_e_commerce.github.io/master/JSON/produts.json', {method: 'GET', mode:'cors'})
    .then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log('parsed json', data)
        console.log(data[1].description)
        
            result = data.filter(obj => {
                return obj.id === id;
            })
            console.log(result);
            displayProduct();
    })
    .catch(function(ex) {
        console.log('parsing failed', ex)
    })
}

var result;
function displayProduct() { //afficher le produit dans la page produit
    const elemt = document.getElementsByClassName('produit-desc-lense');
    console.log(elemt, result);
    let produitDescLense = `
                                <div class="col-4 text-center border-bottom>
                                <img src="${result[0].imageUrl}" class="img-fluid rounded img-thumbnail" alt="${result[0].name}">
                                <h4>${result[0].name}</h4>
                                </div>
                                <div class="col-4 d-flex align-items-center justify-content-center border-bottom">
                                    <p>${result[0].description}</p>
                                </div>
                                <div class="col-4 text-center border-bottom">
                                    <img src="${result[0].imageUrl}" class="img-fluid rounded img-thumbnail" alt="${result[0].lenses[0]}">
                                    <p>Lentilles</p>
                                </div>
                            
                            `
    console.log(produitDescLense);
    elemt[0].innerHTML = produitDescLense;
    console.log(elemt[0].innerHTML)
}

