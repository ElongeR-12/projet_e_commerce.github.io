(function displayResume() {
    const localStore = JSON.parse(localStorage.getItem('LOCALSTORE'));
    cloneNodeAndChild(localStore);
    displayProductsResume(localStore);
    summarizeAllBook(localStore);
    postDataProcess(localStore);
})();

function cloneNodeAndChild(localStore) {
    const TOCLONE = document.getElementsByClassName('resume-area'); //récupérer l'élement html
    for (const element of localStore) {
        let clone = TOCLONE[0].cloneNode(true); //cloner l'élément et ses nodes      
        TOCLONE[0].after(clone); //cloner l'élement clone après l'original
        const BORDER = document.getElementsByClassName("add-border");
        BORDER[0].classList.add('border');
        const BORDERBOTTOM = document.getElementsByClassName("add-border-bottom");
        BORDERBOTTOM[0].classList.add('border-bottom');
        BORDERBOTTOM[1].classList.add('border-bottom');
    }
}

function displayProductsResume(localStore) {

    class Model {
        constructor(htmlElem){
            this.htmlElem = htmlElem;
        }

        show(){
            for (const element of localStore) {
                this.htmlElem[localStore.indexOf(element)].textContent = element.name;
            }
        }
    }
    const h3 = new Model(document.querySelectorAll('h3')).show();

    class Description extends Model {
        
        show(){
            for (const element of localStore) {
                this.htmlElem[localStore.indexOf(element)].textContent = element.description;
            }
        }
    }
    const descriptionClass = new Description(document.getElementsByClassName('description')).show();

    class CustomLense extends Model {
        
        show(){
            for (const element of localStore) {
                this.htmlElem[localStore.indexOf(element)].textContent = element.lenses;
            }
        }
    }
    const lenseValueClass = new CustomLense(document.getElementsByClassName('lenses-value')).show();

    class Quantity extends Model {
        
        show(){
            for (const element of localStore) {
                this.htmlElem[localStore.indexOf(element)].textContent = element.quantity;
            }
        }
    }
    const quantityValueClass = new Quantity(document.getElementsByClassName('product-quantity-value')).show();

    class Price extends Model {
        
        show(){
            for (const element of localStore) {
                this.htmlElem[localStore.indexOf(element)].textContent = 'EUR  ' + ((element.price) * 0.001).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            }
        }
    }
    const priceClass = new Price(document.getElementsByClassName('price')).show();

    class TotalPrice extends Model {
        
        show(){
            for (const element of localStore) {
                let total = ((element.price * element.quantity) * 0.001).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                this.htmlElem[localStore.indexOf(element)].textContent = 'EUR  ' + total;
            }
        }
    }
    const TotalPriceClass = new TotalPrice(document.getElementsByClassName('total-price-value')).show();

    class Images extends Model {
        
        show(){
            for (const element of localStore) {
                this.htmlElem[localStore.indexOf(element)].setAttribute("src", element.imageUrl);
                this.htmlElem[localStore.indexOf(element)].setAttribute("alt", element.name);
            }
        }
    }
    const ImageClass = new Images(document.getElementsByClassName('image-to-resume')).show();

    class SecondModel extends Model {
        constructor(htmlElem, outputText){
            super(htmlElem);
            this.outputText = outputText;
        }

        show(){
            for (const element of localStore) {
                this.htmlElem[localStore.indexOf(element)].textContent = this.outputText;
            }
        }
    }
    const TOTALCOST = new SecondModel(document.getElementsByClassName('total-price'), "Sous-total des articles :").show();
    const EXPEDITION = new SecondModel(document.getElementsByClassName('expedition-price'), "Frais d'envoi :").show();
    const EXPEDITIONVALUE = new SecondModel(document.getElementsByClassName('expedition-price-value'), "EUR 0,00").show();
    const QUANTITY = new SecondModel(document.getElementsByClassName('product-quantity'), "Nombre d'articles :").show();
    const LENSE = new SecondModel(document.getElementsByClassName('lenses'), "Catégorie lentille :").show();  

}

function summarizeAllBook(localStore) {

    class Model {
        constructor(htmlElem, outputText){
            this.htmlElem = htmlElem;
            this.outputText = outputText;
        }

        show(){
            this.htmlElem.textContent = this.outputText;
        }
    }
    const H5 = new Model(document.querySelectorAll('h5')[0], 'Total').show();
    const SOUSTOTAL = new Model(document.getElementById('sous-total'), 'Sous-total').show();
    const LIVRAISON = new Model(document.getElementById('livraison'), 'Livraison').show();
    const TVA = new Model(document.getElementById('tva'), 'Total (TVA incluse)').show();
    const FINALEXPEDITION = new Model(document.getElementById('final-expetition'), 'gratuit').show();

    const array = [];
    let produce;
    localStore.map(item => {
        produce = (item.price * item.quantity);
        array.push(produce);
    })
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalBook = ((array.reduce(reducer)) * 0.001).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    localStorage.setItem('finalPrice', JSON.stringify(totalBook)); //store final price
    
    const TOTAL = new Model(document.getElementById('total'), totalBook + ' €').show();
    const TOTALWITHTVA = new Model(document.getElementById('total-with-tva'), totalBook + ' €').show();

    // const TOTALWITHTVA = document.getElementById('total-with-tva');
    // TOTALWITHTVA.textContent = totalBook + ' €';
    const LINEBOTTOM = document.getElementById("add-border-bottom");
    LINEBOTTOM.classList.add('border-bottom');
    const BOOKING = document.getElementsByClassName('bg-warning');
    BOOKING[0].classList.remove('d-none');
    BOOKING[0].addEventListener('click', showForm);
}

function showForm(ev) {
    ev.preventDefault();
    const FORM = document.getElementById('contactform-form');
    FORM.classList.remove("d-none");
}

function postDataProcess(localStore) {
    ///faire post fetch
    document.getElementById('contactform-form').addEventListener('submit', postBooking);


    function postBooking(e) {
        e.preventDefault();

        let firstName = document.getElementById('firstName').value;
        // console.log(firstName);
        let lastName = document.getElementById('lastName').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let email = document.getElementById('email').value;

        let contact = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        };

        let products = [];
        localStore.forEach(element => {
            products.push(element._id);
        });
        console.log(products);

        fetch('http://localhost:3000/api/cameras/order', {
                method: 'post',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    contact,
                    products
                })
            })
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data, data.orderId);
                sendOrder(data);
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }
}

function sendOrder(data) {
    localStorage.setItem('orderId', JSON.stringify(data.orderId));
    setTimeout(function (url) {
        url = './remerciement.html';
        window.location.href = url;
    }, 2000);
}