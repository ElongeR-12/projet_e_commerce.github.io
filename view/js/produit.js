//ajouter l'évènement click sur tous les boutons sélectionner

const elt = document.getElementsByClassName("select");

for (var i = 0 ; i < elt.length; i++) {
    elt[i].addEventListener('click', addItem);
 };


function addItem(ev){
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));//renvoyer l'id en nombre entier
    console.log('add to cart item', id);
}



