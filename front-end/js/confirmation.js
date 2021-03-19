// Renvoi à la page d'acceil si le localStorage est vide
if (localStorage.getItem('contact') === null) {
    window.location.replace("./index.html");
}

//Récupération des différents éléments dans le localStorage afin de les afficher sur la page confirmation
const contact = JSON.parse(localStorage.getItem("contact"));
console.log(contact)
const orderId = JSON.parse(localStorage.getItem("orderId"));
let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));

let html = "";

html += `
    <h1>Confirmation de la commande Numéro:</br> ${orderId}</h1>
    <p>
    Merci  ${contact.firstName} ${contact.lastName} 
    </p>
    <p>Nous avons bien reçu votre commande d'un montant de : ${(totalPrice / 100).toFixed(2).replace(".",",")} €</br>
    </p>`
    
document.getElementById("orderConfirmed").innerHTML = html;

localStorage.clear();