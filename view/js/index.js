
let createProductsObj = () => {
    fetch('http://localhost:3000/api/cameras', {method: 'GET', mode:'cors'})
    .then(function(response) {
        return response.json()
    }).then(function(products) {
        console.log('parsed json', products)
        displayArticle(products);
    
    })
    .catch(function(ex) {
        console.log('parsing failed', ex)
    })
}

createProductsObj();

displayArticle = (products) =>{
    
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





