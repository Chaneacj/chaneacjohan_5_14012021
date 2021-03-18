// Récupére le JSON du local Storage
let cartArray = JSON.parse(localStorage.getItem("panier"))

// Contenu et gestion du panier
func
if (localStorage.getItem('panier') !== null) {
    let HTML = document.getElementById("cardResume");
    let myHTML = ""
    cartArray.forEach(product => {

        console.log(total)
        myHTML += `
                      <li class="list-group-item d-flex justify-content-between lh-condensed" >
                        <div>
                          <h6 class="my-0">${product.name}</h6>
                          <small class="text-muted">Lentille: ${product.lense}</small>
                          <small class="text-muted">Quantité: ${product.qty}</small>
                          <small class="text-muted">Supprimer</small>
                        </div>
                        <span class="text-muted">${(product.price * product.qty / 100).toFixed(2).replace(".", ",")}€</span>
                      </li>
                  `
        console.log(myHTML)
        HTML.innerHTML = myHTML
    })
    //Sinon, Panier vide
} else {
    let HTML = document.getElementById("cardResume");
    let myHTML = ""
    myHTML += `    
                              <li class="list-group-item d-flex justify-content-between lh-condensed" >
                                <div>
                                  <h6 class="my-0">Votre panier est vide</h6>
                                  <small class="text-muted"><a href="index.html"><b>Revenir à la page d'accueil</b></a></small>
                                </div>
                                <span class="text-muted"> 0€</span>
                              </li>
                          `
    HTML.innerHTML = myHTML
}


let myHTML = `    
          <div class="list-group-item d-flex justify-content-between" id="totalOrder">
          <span>Total</span>
          <strong>Total: ${(total / 100).toFixed(2).replace(".", ",")}€</strong>
      </div>
                        `
console.log(myHTML)
document.getElementById("productDetails").innerHTML = myHTML
















