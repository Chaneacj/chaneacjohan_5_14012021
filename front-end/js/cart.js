let HTML = document.getElementById("cardResume");

// Récupére les données dans le localStorage
let cartArray = JSON.parse(localStorage.getItem("panier"))

//Appel la fonction qui affiche le panier
displayCart()

// Contenu et gestion du panier
function displayCart() {
    //Si le panier n'est pas vide on affiche les produits dans le panier
    if (localStorage.getItem('panier') !== null) {

        let myHTML = ""
        cartArray.forEach((product, index) => {

            myHTML += `<li class="list-group-item d-flex justify-content-between lh-condensed" >
                        <div>
                            <h6 class="my-0">${product.name}</h6>
                            <small class="text-muted">Lentille: ${product.lense}</small>
                            <small class="text-muted">Quantité: ${product.qty}</small>
        
                        </div>
                        <span class="text-muted">${(product.price * product.qty / 100).toFixed(2).replace(".", ",")}€</span>
                      </li>
                      `

            HTML.innerHTML = myHTML
        })

        //Variable qui donne le valeur zero au prix total
        let totalPrice = 0;
        //Boucle qui ajoute le prix total avec le prix des produits et leurs quantités.
        cartArray.forEach(product => {
            totalPrice = totalPrice + (product.price * product.qty);
            let HTMLtotalOrder = `<strong id="totalOrder">${(totalPrice / 100).toFixed(2).replace(".", ",")}€</strong>`
            document.getElementById("totalOrder").innerHTML = HTMLtotalOrder
            localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
        })

        //Annuler le panier
        const cancelMyCart = document.getElementById("cancelOrderBtn")
        cancelMyCart.addEventListener('click', () => {
            cancelCard();
        });

        //Sinon panier vide
    } else {
        let myHTML = `<li class="list-group-item d-flex justify-content-between lh-condensed" >
                        <div>
                            <h6 class="my-0">Votre panier est vide</h6>
                            <small class="text-muted"><a href="index.html"><b>Revenir à la page d'accueil</b></a></small>
                        </div>
                        <span class="text-muted">0€</span>
                    </li>`
        HTML.innerHTML = myHTML
        document.getElementById("totalOrder").innerHTML = `<strong id="totalOrder">0€</strong>`
    }
}

//Annulation du panier
function cancelCard() {
    localStorage.removeItem('panier');
    updatecart();
}

//Mettre à jour l'affichage du panier
function updatecart() {
    HTML.innerHTML = "";
    displayCart();
}

//// GESTION DU FORMULAIRE ////

//validation des input
const emailInput = document.getElementById("email");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");

function validateEmail(input) {
    var mailRegExp = ('^([a-zA-Z0-9-_.]+)@([a-zA-Z0-9-_.]+)\.([a-zA-Z]{2,5})$');
    if (input.value.match(mailRegExp)) {
        return true;
    }
    else {
        alert("Le champs Email contient des erreurs");
        return false;
    }
}

function validateFirstName(input) {
    var textRegExp = ('^[^0-9]{2,50}$');
    if (input.value.match(textRegExp)) {
        return true;
    }
    else {
        alert("Le champs prénom contient des erreurs");
        return false;
    }
}

function validateLastName(input) {
    var textRegExp = ('^[^0-9]{2,50}$');
    if (input.value.match(textRegExp)) {
        return true;
    }
    else {
        alert("Le champs nom contient des erreurs");
        return false;
    }
}

function validateCity(input) {
    var textRegExp = ('^[^0-9]{2,50}$');
    if (input.value.match(textRegExp)) {
        return true;
    }
    else {
        alert("Le champs ville contient des erreurs");
        return false;
    }
}

function validateAddress(input) {
    var addressRegExp = ('^.{5,200}$');
    if (input.value.match(addressRegExp)) {
        return true;
    }
    else {
        alert("You have entered an invalid address!");
        return false;
    }
}

//Le formulaire est validé et corrrectement rempli
const formValidation = document.getElementById(".form");
form.addEventListener('submit', e => {
    e.preventDefault();

    let resEmail = validateEmail(emailInput);
    let resfirstName = validateFirstName(firstName);
    let reslastName = validateLastName(lastName);
    let resadress = validateAddress(address);
    let resCity = validateCity(city);

    if (resCity && resEmail && resfirstName && reslastName && resadress) {
        formSend();
    } 
});

//Récupère les valeurs des l'input 
function formSend() {
    let contact = {
        email: emailInput.value,
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value
    };

    //Récupère les id des produits du panier dans le tableau products
    let products = [];
    if (localStorage.getItem('panier') !== null) {
        let productTab = JSON.parse(localStorage.getItem('panier'));
        productTab.forEach(p => {
            products.push(p.id);
        })

        //le tableau contact et le tableau products sont convertis en JSON Pour être utiliser dans la fonction postOrder
        let contactItems = JSON.stringify({
            contact, products
        })
        postOrder(contactItems);
    } else {
        alert("Votre panier est vide");
    }
};


//Appel de l'API fetch et en voi les données avec POST
//Enregistre le tableau contact, l'Id et le prix total de la commande sur le localStorage
//Renvoi à la page de confirmation page confirmation
function postOrder(contactItems) {

    fetch("http://localhost:3000/api/cameras/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: contactItems
    }).then(response => {
        return response.json();
    }).then(r => {
        console.log(r)
        localStorage.setItem('contact', JSON.stringify(r.contact));
        localStorage.setItem('orderId', JSON.stringify(r.orderId));

        localStorage.removeItem('panier');
        window.location.replace("./confirmation.html");
    })
}