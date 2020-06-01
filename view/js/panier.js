'use strict'

function displayResume() {
    const LOCALSTORAGE = JSON.parse(localStorage.getItem('LOCALSTORE'));
    console.log(LOCALSTORAGE);

    
    let toClone = document.getElementsByClassName('resume-area');//récupérer l'élement html
    for(let i=0; i<LOCALSTORAGE.length; i++){	    
        let clone = toClone[0].cloneNode(true);//cloner l'élément et ses nodes      
        toClone[0].after(clone); //cloner l'élement clone après l'original
        const BORDER = document.getElementsByClassName("add-border");
        BORDER[0].classList.add('border');
        const BORDERBOTTOM = document.getElementsByClassName("add-border-bottom");
        BORDERBOTTOM[0].classList.add('border-bottom');
        BORDERBOTTOM[1].classList.add('border-bottom');
    }

    const NAME = document.querySelectorAll('h3')
    console.log(NAME);
    let i=0;
    for (const element of LOCALSTORAGE){
        NAME[i++].textContent = element.name;
    }

    const IMG = document.getElementsByClassName('image-to-resume');
    console.log(IMG);
    let j=0;
    let k=0;
    for(const element of LOCALSTORAGE){
        IMG[j++].setAttribute("src", element.imageUrl);
        IMG[k++].setAttribute("alt", element.name)
    }

    const DESCRIPTION = document.getElementsByClassName('description');
    let l=0;
    for(const element of LOCALSTORAGE){
        DESCRIPTION[l++].textContent = element.description
    }

    const PRICE = document.getElementsByClassName('price');
    let m=0;
    for(const element of LOCALSTORAGE){
        PRICE[m++].textContent ='EUR  '+ element.price;
    }

    const TOTALPRICE = document.getElementsByClassName('total-price');
    let n=0;
    for(const element of LOCALSTORAGE){
        TOTALPRICE[n++].textContent = 'Sous-total des articles :';
    }

    const TOTALPRICEVALUE = document.getElementsByClassName('total-price-value');
    let o=0;
    for(const element of LOCALSTORAGE){
        let total = (element.price * element.quantity);      
        TOTALPRICEVALUE[o++].textContent = 'EUR  '+ total;
    }

    const  EXPEDITION = document.getElementsByClassName('expedition-price');
    let p=0;
    for(const element of LOCALSTORAGE){      
        EXPEDITION[p++].textContent = "Frais d'envoi :";
    }

    const  EXPEDITIONVALUE= document.getElementsByClassName('expedition-price-value');
    let q=0;
    for(const element of LOCALSTORAGE){      
        EXPEDITIONVALUE[q++].textContent = "EUR 0,00";
    }

    const  QUANTITY= document.getElementsByClassName('product-quantity');
    let r=0;
    for(const element of LOCALSTORAGE){      
        QUANTITY[r++].textContent = "Nombre d'articles :";
    }

    const  QUANTITYVALUE= document.getElementsByClassName('product-quantity-value');
    let s=0;
    for(const element of LOCALSTORAGE){      
        QUANTITYVALUE[s++].textContent = element.quantity;
    }

    const  LENSE = document.getElementsByClassName('lenses');
    let t=0;
    for(const element of LOCALSTORAGE){      
        LENSE[t++].textContent = "Catégorie lentille :";
    }

    const  LENSEVALUE= document.getElementsByClassName('lenses-value');
    let u=0;
    for(const element of LOCALSTORAGE){      
        LENSEVALUE[u++].textContent = element.lenses;
    }

    

    const H5 = document.querySelectorAll('h5');
    H5[0].textContent = 'Total';

    const SOUSTOTAL = document.getElementById('sous-total');
    SOUSTOTAL.textContent = 'Sous-total';

    const LIVRAISON = document.getElementById('livraison');
    LIVRAISON.textContent = 'Livraison';

    const TVA = document.getElementById('tva');
    TVA.textContent = 'Total (TVA incluse)';
    
    const ARRAY = [];
    let produce;
    LOCALSTORAGE.map(item =>{
        produce = item.price * item.quantity;
        ARRAY.push(produce);
    })
    console.log(ARRAY);
    

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const TOTALBOOK = ARRAY.reduce(reducer);
    console.log(TOTALBOOK);
    const TOTAL = document.getElementById('total');
    TOTAL.textContent = TOTALBOOK + ' €';
    const FINALEXPEDITION = document.getElementById('final-expetition');
    FINALEXPEDITION.textContent = "gratuit";
    const TOTALWITHTVA = document.getElementById('total-with-tva');
    TOTALWITHTVA.textContent= TOTALBOOK + ' €';
    const borderBottom = document.getElementById("add-border-bottom");
    borderBottom.classList.add('border-bottom');
};

displayResume();