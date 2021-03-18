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

        //valider formulaire
        const formValidation = document.getElementById(".form");
        form.addEventListener('submit', e => {
            e.preventDefault();
            //Input
            //let resEqil = validateEmail(emailInput);
            //if(resEqil){
                formSend();
            //}

            
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

const emailInput = document.getElementById("email");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const country = document.getElementById("country");


function validateEmail(input) {
    var mailRegExp = ('^([a-zA-Z0-9-_.]+)@([a-zA-Z0-9-_.]+)\.([a-zA-Z]{2,5})$');
    if (input.value.match(mailRegExp)) {
        input.focus();
        return true;
    }
    else {
        input.focus();
        return false;
    }
}

console.log(validateEmail(emailInput))


function validateTextInput(input) {
    var textRegExp = ('^[^0-9]{2,50}$');
    if (input.value.match(textRegExp)) {
        input.focus();
        return true;
    }
    else {
        input.focus();
        return false;
    }
}

console.log(validateTextInput(city))


function validateAddress(input) {
    var addressRegExp = ('^.{5,200}$');
    if (input.value.match(addressRegExp)) {
        input.focus();
        return true;
    }
    else {
        input.focus();
        return false;
    }
}

function checkInput () {
    let resCity = validateTextInput(city);
    let resCity2 = validateTextInput(city);
    if (resCity && resCity2){
        return true
    }
    return false
}

console.log(validateAddress(address))

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
        console.log(productTab)
        productTab.forEach(p => {
            products.push(p.id);
        })

        //L'objet contact et le tableau products sont envoyés dans la fonction postOrder
        
        let contactItems = JSON.stringify({
            contact, products
        })
        console.log(contactItems)
        postOrder(contactItems);    
    }
    
};


//Requête POST, envoi au serveur "contact" et le tableau d'id products
//Enregistre l'objet contact et l'Id de la commande sur le localStorage
//Envoie page confirmation

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

