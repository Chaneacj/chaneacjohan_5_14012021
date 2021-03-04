//récupére mes données
  let productName = localStorage.getItem('panier');
  let cartArray = JSON.parse(localStorage.getItem("panier"))
  console.log(cartArray)

  let productTitle = cartArray[0].name;
  console.log(productTitle)

  let productLense = cartArray[0].lense;
  console.log(productLense)

  let productPrice = cartArray[0].price;
  console.log(productPrice)


  const cart = cartArray

  for (let i in cart) {
    console.log("Embarquement du passager " + cart[i]);
}

for (let i = 0; i < cart.length; i++) {
  console.log("Embarquement du passager " + cart[i]);
}



  let myHTML = ""
        myHTML += `<div class="col-md-4 order-md-2 mb-4" >
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Articles</span>
        </h4>
        <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                    <h6 class="my-0">${cartArray[0].name}</h6>
                    <small class="text-muted">${cartArray[0].lense}</small>
                </div>
                <span class="text-muted">${cartArray[0].price}</span>
            </li>

            <li class="list-group-item d-flex justify-content-between">
                <span>Total</span>
                <strong>20€</strong>
            </li>
        </ul>
    </div>`
    
    console.log(myHTML)
    document.getElementById("cardResume").innerHTML = myHTML
   







