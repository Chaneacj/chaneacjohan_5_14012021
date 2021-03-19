//Récupération de l'id du produit sélectionné
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

//  Récupération des données avec l'id associé au produir avec l'API fetch.
let url = `http://localhost:3000/api/cameras/${id}`;
fetch(url, { method: 'GET' })
    .then(data => {
        return data.json()
    }).then(products => {
        console.log(products)
        // Affichage des données chargé dans le html
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
                        <p><span class="mr-1"><strong>${(products.price / 100).toFixed(2).replace(".", ",")}€</strong></span></p>
                        <p class="pt-1">${products.description}</p>
                        <hr>
                        <div class="table-responsive mb-2">
                            <table class="table table-sm table-borderless">
                                <tbody>
                                    <tr>
                                        <td class="pl-0 pb-0 w-25">Quantité</td>
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

        // Incorpore les donnée de l'API dans le html
        document.getElementById("productDetails").innerHTML = myHTML


        // Variable qui récupére le select avec les option de lentille
        let lensesSelect = document.getElementById('lenses-select');
        // Boucle Foreach qui répéte l'opération selon le nombre de options disponible pour ce produit
        products.lenses.forEach(lense => {
            let lenseOption = document.createElement("option");
            lenseOption.textContent = lense
            lenseOption.value = lense
            lensesSelect.appendChild(lenseOption);
        });



        //AJOUT AU PANIER
        //Récupérer l'événement (getElementById + addEventListener)
        let btnPanier = document.getElementById("add-to-card")

        btnPanier.addEventListener("click", event => {
            //Récupérer la quantité et la lentille choisie
            let inputLense = lensesSelect.value
            let inputQty = itemQty.value

            //J'enregistre les informations sous forme de tableau
            myProduct = {
                id: products._id,
                name: products.name,
                description: products.description,
                price: products.price,
                lense: inputLense,
                qty: inputQty,
            };

            let cart = [myProduct];
            //Convertir mon tableau JavaScript en chaîne JSON pour le stocker
            cardProduct = JSON.stringify(cart);

            //Si panier vide création d'un nouveau tableau
            //Sinon récupère le tableau dans le localStorage, ajoute le nouveau produit.
            if (localStorage.getItem("panier") === null || localStorage.getItem("panier") === "") {
                localStorage.setItem("panier", cardProduct);
            } else {
                let cartArray = JSON.parse(localStorage.getItem("panier"))
                cartArray.push(myProduct)
                cartArray = JSON.stringify(cartArray)
                localStorage.setItem("panier", cartArray)
            }

            //Afficher un message, produit ajouter au panier
            alert("L'article a été ajouté à votre panier");
            //btnPanier.textContent = "Ajouté !"

        });
    })



