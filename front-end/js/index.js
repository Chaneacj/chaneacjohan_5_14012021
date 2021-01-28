
let url = 'http://localhost:3000/api/cameras/';
fetch( url , {method : 'GET'})
.then(data => {
    return data.json()
}).then(products =>{
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
                            <p class="card-text">${product.price}</p>
                            <button type="button" class="btn btn-dark">Voir le produit</button>
                        </div>
                    </div>
                    </div>`
    });

    console.log(myHTML)
    HTML.innerHTML = myHTML
})



/* console.log(window)
console.log(window.location)

const urlParams = new URLSearchParams(window.location.search);
const urlName = urlParams.get("name"); 

console.log(urlName) */


//https://monsite.com?key=value&key=value&key=value
//https://monsite.com?name=thomas