    class Model {
        constructor(htmlElem, outputText){
            this.htmlElem = htmlElem;
            this.outputText = outputText;
        }
        show(){
            this.htmlElem.textContent = this.outputText;
        }
    }
    const localOrderId = JSON.parse(localStorage.getItem('orderId'));
    const cost = JSON.parse(localStorage.getItem('finalPrice'));
    const OrderIdText = new Model(document.getElementsByClassName('orderId')[0], 'commande n° ' + localOrderId).show();
    const greeting = new Model(document.getElementsByClassName('bonjour')[0], 'Bonjour,').show();
    const firstText = new Model(document.getElementsByClassName('text1')[0], 'Nous vous remercions de votre commande. Nous vous tiendrons informés par e-mail lorsque les articles de votre commande auront été expédiés. ').show();
    const secondText = new Model(document.getElementsByClassName('text2')[0], 'Nous rappelons que le montant de votre commande est de ' + cost + " euros sous l'identifiant n°" + localOrderId + '.').show();
    const wish = new Model(document.getElementsByClassName("wish")[0], 'Nous espérons vous revoir bientôt.').show();
    const sign = new Model(document.getElementsByClassName("sign")[0], 'Ornico.fr').show();

