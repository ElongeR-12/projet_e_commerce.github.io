"use strict";
//ajouter l'évènement click sur tous les boutons sélectionner

const elt = document.getElementsByClassName("select");

function clicSelectButon () {
    for (var i = 0 ; i < elt.length; i++) {
        elt[i].addEventListener('click', putItem);
     };
}

clicSelectButon();
var id;
function putItem(e){
    id = parseInt(e.target.getAttribute('data-id'))//renvoyer l'id en nombre entier
    console.log('add to cart item', id);
    getProducts();
}

putItem();


function getProducts (success, failure) {
    fetch('https://raw.githubusercontent.com/ElongeR-12/projet_e_commerce.github.io/master/JSON/produts.json', {method: 'GET', mode:'cors'})
    .then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log('parsed json', data)
        console.log(data[1].description)
        
            let result = data.filter(obj => {
                return obj.id === id;
            })
            console.log(result);
    })
    .catch(function(ex) {
        console.log('parsing failed', ex)
    })
}


