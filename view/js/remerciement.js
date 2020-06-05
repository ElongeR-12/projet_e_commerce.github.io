(function displayThanking() {
    const ORDERID = document.getElementsByClassName('orderId');
    const localOrderId = JSON.parse(localStorage.getItem('orderId'));
    const cost = JSON.parse(localStorage.getItem('finalPrice'));
    console.log(localOrderId);

    ORDERID[0].textContent = 'commande n° ' + localOrderId;

    const GREETING = document.getElementsByClassName('bonjour');
    GREETING[0].textContent = 'Bonjour,';
    const FIRSTTEXT = document.getElementsByClassName('text1');
    FIRSTTEXT[0].textContent = 'Nous vous remercions de votre commande. Nous vous tiendrons informés par e-mail lorsque les articles de votre commande auront été expédiés. '
    const SECONDTEXT = document.getElementsByClassName('text2');
    SECONDTEXT[0].textContent = 'Nous rappelons que le montant de votre commande est de ' + cost + " euros sous l'identifiant n°" + localOrderId + '.';

    const WISH = document.getElementsByClassName("wish")[0];
    WISH.textContent = 'Nous espérons vous revoir bientôt.';
    const SIGN = document.getElementsByClassName("sign")[0];
    SIGN.textContent = "Ornico.fr";
})();