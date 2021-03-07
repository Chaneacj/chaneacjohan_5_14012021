
//Je recupère mon id
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

console.log(id)

let url = `http://localhost:3000/api/cameras/${id}`;
fetch(url, { method: 'GET' })
    .then(data => {
        return data.json()
    }).then(products => {
        console.log(products)
        console.log(products.name)
        console.log(products.price)
        console.log(products.imageUrl)
        console.log(products.description)

        let myHTML = `<div class="col-md-6 mb-4 mb-md-0">
                        <div id="mdb-lightbox-ui"></div>
                            <div class="mdb-lightbox">
                                <div class="row product-gallery mx-1">
                                    <div class="col-12 mb-0">
                                        <figure class="view overlay rounded z-depth-1 main-img" style="max-height: 450px;">
                                         <img src="${products.imageUrl} "
                                         class="img-fluid z-depth-1">
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div class="col-md-6">

                        <h5>${products.name}</h5>
                        <p class="mb-2 text-muted text-uppercase small">Lenses</p>
                        <p><span class="mr-1"><strong>${products.price}€</strong></span></p>
                        <p class="pt-1">${products.description}</p>
                        <hr>
                        <div class="table-responsive mb-2">
                            <table class="table table-sm table-borderless">
                                <tbody>
                                    <tr>
                                        <td class="pl-0 pb-0 w-25">Quantity</td>
                                        <td class="pb-0">Select size</td>
                                    </tr>
                                    <tr>
                                        <td class="pl-0">
                                            <div class="def-number-input number-input safari_only mb-0">
                                                <input class="quantity" id="itemQty" min="0" name="quantity" value="1" type="number">
                                            </div>
                                            <div class="form-group pl-0">
                                            <select class="form-select" id=lenses-select aria-label="Default select example">
                                                
                                            </select>
                                        </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                            <button type="button" id="add-to-card" class="btn btn-primary btn-md mr-1 mb-2">Ajouter au panier</button>
                        </div>`
                   
    

        //let HTML = document.getElementById("productDetails")
        //HTML.innerHTML = myHTML

        //let HTML = $('#productDetails')
        //HTML.html(myHTML)

        document.getElementById("productDetails").innerHTML = myHTML

        //$('#productDetails').html(myHTML);

        let lensesSelect = document.getElementById('lenses-select');
        products.lenses.forEach(lense => {
            let lenseOption = document.createElement("option");
            lenseOption.textContent = lense
            lenseOption.value = lense
            lensesSelect.appendChild(lenseOption);
        });



//ajout au panier
//récupérer l'évenement (getElementById)
    let btnPanier = document.getElementById("add-to-card")
    btnPanier.addEventListener("click", event => {
        //récupérer la quantité et la lentille choisie
        let inputLense = lensesSelect.value
        let inputQty = itemQty.value
        
        //j'enregistre les informations dans le localstorage sous forme de tableau
        myProduct = { 
            id : products._id,
            name : products.name,
            description : products.description,
            price : products.price,
            lense : inputLense,
            qty : inputQty
        };

        
        
        //si Panier vide
        let cart = [ myProduct ];

        cardProduct = JSON.stringify(cart);
       if (localStorage.getItem("panier") === null || localStorage.getItem("panier") === "" ){
            localStorage.setItem("panier", cardProduct);
        } else {
            console.log(localStorage.getItem("panier"))

            let cartArray = JSON.parse(localStorage.getItem("panier"))
            cartArray.push(myProduct)
            cartArray = JSON.stringify(cartArray)
            localStorage.setItem("panier",cartArray)
        } 
    

        console.log(localStorage.getItem('panier'));

        //Afficher un ,essqge , produit qjouter qu pqnier
        btnPanier.textContent = "Ajouté !"
        /*let val = confirm("Voulez-vous ajouter ce produit au panier?");
        if( val == true ) {
            document.write ("L'utilisateur veut continuer!");
        } else {
            document.write ("L'utilisateur ne veut pas continuer!");
        }*/
    


        
    });
})



