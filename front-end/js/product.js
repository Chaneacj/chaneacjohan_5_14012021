
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
                                                <input class="quantity" min="0" name="quantity" value="1" type="number">
                                            </div>
                                            <div class="form-group pl-0">
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Open this select menu</option>
                                                <option value="1">${products.lenses[0]}</option>
                                                <option value="2">${products.lenses}</option>
                                                <option value="3">${products.lenses}</option>
                                            </select>
                                        </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                            <button type="button" id="Addbasket" class="btn btn-primary btn-md mr-1 mb-2">Ajouter au panier</button>
                        </div>`
                   
        console.log(myHTML)

        //let HTML = document.getElementById("productDetails")
        //HTML.innerHTML = myHTML

        //let HTML = $('#productDetails')
        //HTML.html(myHTML)

        document.getElementById("productDetails").innerHTML = myHTML

        //$('#productDetails').html(myHTML);

        products.lenses.forEach(lense => {
            console.log(lense)
            //Créer les option du selecte
        });
        //Ajouter les Options qu select


//ajout au panier
//récupérer l'évenement (getElementById)
let btnPanier = document.getElementById("")







    })


