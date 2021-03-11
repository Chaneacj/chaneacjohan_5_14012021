let url = 'http://localhost:3000/api/cameras/';
fetch(url, { method: 'GET' })
    .then(data => {
        return data.json()
    }).then(products => {
        console.log(products)

        let HTML = document.getElementById("produits")

        let myHTML = ""
        products.forEach(product => {
            console.log(product.name)
            console.log(product.price)
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
        console.log(myHTML)
        HTML.innerHTML = myHTML
    })



