let HTML = document.getElementById("cardResume");
// récupére les données dans le localStorage
let cartArray = JSON.parse(localStorage.getItem("panier"))
//Appel la fonction qui affiche le panier
displayCart()

// Contenu et gestion du panier
function displayCart() {

    if (localStorage.getItem('panier') !== null) {

        let myHTML = ""
        cartArray.forEach(product => {

            myHTML += `<li class="list-group-item d-flex justify-content-between lh-condensed" >
                        <div>
                            <h6 class="my-0">${product.name}</h6>
                            <small class="text-muted">Lentille: ${product.lense}</small>
                            <small class="text-muted">Quantité: ${product.qty}</small>
                        </div>
                        <span class="text-muted">${(product.price * product.qty / 100).toFixed(2).replace(".", ",")}€</span>
                      </li>`

            HTML.innerHTML = myHTML
        })

        let totalPrice = 0;

        cartArray.forEach(product => {
            totalPrice = totalPrice + (product.price * product.qty);
            let HTMLtotalOrder = `<strong id="totalOrder">${(totalPrice / 100).toFixed(2).replace(".", ",")}€</strong>`

            document.getElementById("totalOrder").innerHTML = HTMLtotalOrder
        })

        //annuler tout le panier
        const cancelMyCart = document.getElementById("cancelOrderBtn")
        cancelMyCart.addEventListener('click', () => {
            cancelCard();
        });

        //validation formulaire
        const form = document.querySelector("form");
        form.addEventListener('submit', e => {
            e.preventDefault();
            sendform();
        });

        //Sinon, Panier vide
    } else {
        let myHTML = `<li class="list-group-item d-flex justify-content-between lh-condensed" >
                        <div>
                            <h6 class="my-0">Votre panier est vide</h6>
                            <small class="text-muted"><a href="index.html"><b>Revenir à la page d'accueil</b></a></small>
                        </div>
                        <span class="text-muted"> 0€</span>
                    </li>`
        HTML.innerHTML = myHTML
        document.getElementById("totalOrder").innerHTML = `<strong id="totalOrder">0€</strong>`
        //document.getElementById("productDetails").innerHTML = myHTML
    }
}

//Annulation tout le panier
function cancelCard() {
    localStorage.removeItem('panier');
    updatecart();
}
//Mettre à jour l'affichage du panier
function updatecart() {
    HTML.innerHTML = "";
    displayCart();
}


//Récupère les valeurs de l'input dans contact__form
//Récupère les id des produits du panier dans le tableau products
//L'objet contact et le tableau products sont envoyé dans la function postOrder
function sendform() {
    let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value, 
    };

    let products = [];
    if (sessionStorage.getItem('panier') !== null) {
        let productTab = JSON.parse(sessionStorage.getItem('panier'));
        
        productTab.forEach( p => {
            products.push(p._id);
        })
    }
    
    let contactItems = JSON.stringify({
        contact, products
    })
    postOrder(contactItems);
};

//Requête POST, envoi au serveur "contact" et le tableau d'id "products"
//Enregistre l'objet "contact" et Id, le total de la commande sur le sessionStorage.
//Envoie page "confirmation"
function postOrder(contactItems) {

    fetch("http://localhost:3000/api/teddies/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode:'cors',
        body: contactItems
    }).then(response => {

        return response.json();

    }).then( r => {
        sessionStorage.setItem('contact', JSON.stringify(r.contact));
        sessionStorage.setItem('orderId', JSON.stringify(r.orderId));
        sessionStorage.setItem('total', JSON.stringify(total));
        sessionStorage.removeItem('panier');
        window.location.replace("confirmation.html");
    })
}


/*
let emailInput = document.getElementById("email");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const country = document.getElementById("country");*/


//console.log(validate())

/*function ValidateEmail(input) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.value.match(mailformat)) {
        alert("Valid email address!");
        input.focus();
        return true;
    }
    else {
        alert("You have entered an invalid email address!");
        input.focus();
        return false;
    }
}

console.log(ValidateEmail(emailInput))*/

/*
// checks user input
const checkForm = () => {
    if (checkEmail(emailInput.value, emailInput) && checkTextInput(firstName.value, firstName) && checkTextInput(lastName.value, lastName) && checkAddress(address.value, address) && checkTextInput(city.value, city)) {
        return true;
    } else {
        return false;
    }
}

console.log(checkForm())

// checks input with regex and displays alerts
const regexTest = (data, regex, inputNode) => {
    const alert = inputNode.nextElementSibling;

    if (regex.test(data) === false) {
        inputNode.classList.add('error-input');
        alert.classList.remove('alert-hidden');
        alert.classList.add('alert-displayed');
        return false;
    } else {
        alert.classList.remove('alert-displayed');
        alert.classList.add('alert-hidden');
        inputNode.classList.remove('error-input');
        return true;
    }
}

// defines the email regex
const checkEmail = (data, input) => {
    const regex = new RegExp('^([a-zA-Z0-9-_.]+)@([a-zA-Z0-9-_.]+)\.([a-zA-Z]{2,5})$');

    if (regexTest(data, regex, input) === true) {
        return true;
    }
}

// defines the names and city regex
const checkTextInput = (data, input) => {
    const regex = new RegExp('^[^0-9]{2,50}$');

    if (regexTest(data, regex, input) === true) {
        return true;
    }
}

// defines the address regex
const checkAddress = (data, input) => {
    const regex = new RegExp('^.{5,200}$');

    if (regexTest(data, regex, input) === true) {
        return true;
    }
}

// continous input checks
emailInput.addEventListener("input", (e) => {
    checkEmail(e.target.value, emailInput);
});

firstName.addEventListener("input", (e) => {
    checkTextInput(e.target.value, firstName);
});

lastName.addEventListener("input", (e) => {
    checkTextInput(e.target.value, lastName);
});

address.addEventListener("input", (e) => {
    checkAddress(e.target.value, address);
});

city.addEventListener("input", (e) => {
    checkTextInput(e.target.value, city)
});*/
