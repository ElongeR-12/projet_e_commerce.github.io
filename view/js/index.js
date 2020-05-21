
let createProductsObj = () => {
    class Products {
        constructor(id, name, price, description, imageUrl){
            this.id = id;
            this.name = name;
            this.price = price;
            this.description = description;
            this.imageUrl = imageUrl;
        }
    }

    let firstProduct = new Products (132, 'caméra 1', "100 €", "c'est notre caméra 1", "../images/vcam_1.jpg");
    let secondProduct = new Products (323, 'caméra 2', "200 €", "c'est notre caméra 2", "../images/vcam_2.jpg");
    let thirdProduct = new Products (432, 'caméra 3', "300 €", "c'est notre caméra 3", "../images/vcam_3.jpg");
    let forthProduct = new Products (250, 'caméra 4', "400 €", "c'est notre caméra 4", "../images/vcam_4.jpg");
    let fifthProduct = new Products (530, 'caméra 5', "500 €", "c'est notre caméra 5", "../images/vcam_5.jpg");

    let PRODUCT = [];
    PRODUCT.push(firstProduct, secondProduct, thirdProduct, forthProduct, fifthProduct);
    console.log(PRODUCT); 
    return PRODUCT;
}

let products = createProductsObj();

const displayArticle = (row) => {

    row = document.getElementsByClassName('row');

    for (let i = 0; i<products.length; i++) {
        const maincol = document.createElement("div");
        maincol.classList.add("col-lg-4", "col-sm-6", "mb-4");

        const card = document.createElement("div");
        card.classList.add("card","h-100");

        const divcard = document.createElement("div");
        divcard.classList.add("card-body");

        const h = document.createElement("h4");
        h.classList.add("card-title");
        h.textContent = products[i].name;

        const divrow = document.createElement("div");
        divrow.classList.add("row");

        const divcol = document.createElement("div");
        divcol.classList.add("col-8"); 

        const pdesc = document.createElement("p");
        pdesc.classList.add('card-text');
        pdesc.textContent = products[i].description;

        const divcolright = document.createElement("div");
        divcolright.classList.add("col-4", "text-right"); 

        const pdescright = document.createElement('p');
        pdescright.classList.add("card-text");
        pdescright.textContent = products[0].price;

        const img = document.createElement("img");
        img.classList.add("card-img-bottom");
        img.src = products[i].imageUrl;

        const b = document.createElement("button");
        b.classList.add("select");
        b.setAttribute('data-id', products[i].id);
        b.textContent = "Sélectionner";

        divcol.appendChild(pdesc);
        divcolright.appendChild(pdescright);
        divrow.appendChild(divcol);
        divrow.appendChild(divcolright);

        divcard.appendChild(h);
        divcard.appendChild(divrow);
        card.appendChild(divcard);
        card.appendChild(img);
        card.appendChild(b); 
        maincol.appendChild(card);
        row[0].appendChild(maincol);   
    };
}

displayArticle ();





