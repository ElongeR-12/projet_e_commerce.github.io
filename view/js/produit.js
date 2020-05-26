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
let PRODUCTS = [];
function displayProduct(products) {
    PRODUCTS = products;
    
    let productsStored = [];

    PRODUCTS.filter(product => {
        sessionStore.forEach(store => {
            if (product._id == store._id) {
                productsStored.push(product) 
            };
        });
    });
    

    let numberStored = productsStored.length;

   
    //cloner un bloc d'html
    let noded = document.getElementsByClassName('produit-desc-lense');
    for(let i=1; i<numberStored; i++){
        
        let clone = noded[0].cloneNode(true);
        noded[0].after(clone);
        
    }

    //source image des produits sélectionnés
    let src = '';
    let arraySrc = [];

    for(const obj of productsStored){
        src = obj.imageUrl;
        arraySrc.push(src);       
    }

    
    let img = document.getElementsByClassName('img-thumbnail');

    let i=0;     
    for(let element of arraySrc){
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
     
    
    for(let i=0; i<img.length; i++){
        img[i].setAttribute('Alt', arrayAlt[i]);
    }


    // nom des produits sélectionnés
    let name = '';
    let arrayName = [];

    for(const obj of productsStored){
        name = obj.name;
        arrayName.push(name);       
    }

    let h5 = document.querySelectorAll('h5');
     
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
 
     let textDescription = document.getElementsByClassName('description');
      
     for(let i=0; i<textDescription.length; i++){
        textDescription[i].textContent = arrayDescription[i] 
     }


}