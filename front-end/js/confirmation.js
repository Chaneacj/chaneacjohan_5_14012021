//Récupération des différents éléments dans le sessionStorage afin de les afficher sur la page confirmation
const contact = JSON.parse(localStorage.getItem("contact"));
console.log(contact)
const orderId = JSON.parse(localStorage.getItem("orderId"));
let html = "";

html += `
    <h2>Confirmation de la commande Numéro:</br> ${orderId}</h2>
    <ul>
        <li>Nom: ${contact.lastName}</li>
        <li>Prénom: ${contact.firstName}</li>
        <li>Adresse: ${contact.address}</li>
        <li>Ville: ${contact.city}</li>
        <li>Email: ${contact.email}</li>
    </ul>`
document.getElementById("orderConfirmed").innerHTML = html;

localStorage.clear();