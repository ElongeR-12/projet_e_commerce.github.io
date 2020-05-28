let sessionStore = JSON.parse(sessionStorage.getItem('FFQFDQFQJYKOIUY9IEOPAZAR339209RHGBVfqkl'));
console.log(sessionStore);
let createProductsObj = () => {
    fetch('http://localhost:3000/api/cameras', {method: 'GET', mode:'cors'})
    .then(function(response) {
        return response.json()
    }).then(function(products) {
        console.log('parsed json', products);
        displayProduct(products)
    })
    .catch(function(ex) {
        console.log('parsing failed', ex)
    })
}

createProductsObj();

function displayProduct(products) {
        
    const productsStored = [];//pour conserver les produits après vérification de son authenticité

    products.filter(product => {//filtrer les produits qui correspond à un id dans session store
        sessionStore.forEach(store => {
            if (product._id == store._id) {
                productsStored.push(product)
            };
        });
    });
    
    const numberStored = productsStored.length;

   
    //cloner un bloc d'html// dans le cas où on vut ajouter plusieur produit dans la page
    let noded = document.getElementsByClassName('produit-desc-lense');
    for(let i=1; i<numberStored; i++){//itération en fonction du nombre de produit dans sessionstore
        const clone = noded[0].cloneNode(true);
        noded[0].after(clone); 
    }

    //source image des produits sélectionnés
    let src = '';// stocker les différents src de chaque produit objet
    let arraySrc = [];// assembler tous ses src dans un tableau

    for(const obj of productsStored){// parcourir chaque élement objet dans tableau
        src = obj.imageUrl;//assigner l'image url de chaque objet à src
        arraySrc.push(src); // ajouter dans arraySrc après chaque assignation      
    }

    const img = document.getElementsByClassName('img-thumbnail');// récupérer les éléments images avec classe img-thumbnai

    let i=0; //initier pour parcourir chaque image dans collection    
    for(const element of arraySrc){
       // ajouter le src dans image
        img[i++].setAttribute('src', element)
    }

    //alt  image des produits sélectionnés
    let alt = '';
    let arrayAlt = [];

    for(const obj of productsStored){
        alt = obj.name;
        arrayAlt.push(alt);       
    }
     
    
    for(let i=0; i<img.length; i++){//parcourir l'image et ajouter l'attribut alt pour chaque
        img[i].setAttribute('Alt', arrayAlt[i]);
    }


    // nom des produits sélectionnés
    let name = '';
    let arrayName = [];

    for(const obj of productsStored){
        name = obj.name;
        arrayName.push(name);       
    }

    const h5 = document.querySelectorAll('h5');
     
    for(let i=0; i<h5.length; i++){
        h5[i].textContent = arrayName[i] 
    }

     // description des produits sélectionnés
     let description = '';
     let arrayDescription = [];
 
     for(const obj of productsStored){
         description = obj.description;
         arrayDescription.push(description);       
     }
 
     const textDescription = document.getElementsByClassName('description');
      
     for(let i=0; i<textDescription.length; i++){
        textDescription[i].textContent = arrayDescription[i] 
     }

    // les lentilles des produits sélectionnés

    let lense = '';
    let arrayLenses = [];
 
    for(const obj of productsStored){
         lense = obj.lenses;
         arrayLenses.push(lense);       
     }

    //récupérer l'élement parent select des options
    function addSelect() {

        const parentSelect = document.getElementsByClassName('parentSelect');
        const select = document.createElement("select");
        select.setAttribute("id","select");
        parentSelect[0].append(select);
        select.add(new Option('Choisissez une lentille'));
        for(i=0; i<arrayLenses[0].length; i++){
            select.add(new Option(arrayLenses[0][i],arrayLenses[0][i]))
        }
        console.log(parentSelect[0]);
    }
    addSelect();

}