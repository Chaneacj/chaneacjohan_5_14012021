//  Récupération des données avec l'API fetch.

let url = 'http://localhost:3000/api/cameras/';
fetch(url, { method: 'GET' })
    .then(data => {
        return data.json()
    }).then(products => {

        //Je créer ma variable qui va me permettre d'afficher les données chargé
        let HTML = document.getElementById("productList")

        let myHTML = ""
        // Boucle Foreach qui répéte l'opération pour chaque produit dans l'API
        products.forEach(product => {
            myHTML += `<div class="col-12 col-lg-4">
                    <div class="card">
                        <img class="card-img-top" src=${product.imageUrl} alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${(product.price / 100).toFixed(2).replace(".", ",")}€</p>
                            <a href="Product.html?id=${product._id}"><button type="button" class="btn btn-dark" >Voir le produit</button></a>
                        </div>
                    </div>
                    </div>`
        });
        // Incorpore les donnée de l'API dans le html
        HTML.innerHTML = myHTML
    })



