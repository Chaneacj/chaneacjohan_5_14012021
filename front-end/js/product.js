
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


        let myHTML = '';
        console.log(products.name)
        console.log(products.price)
        console.log(products.imageUrl)
        console.log(products.description)
       

 
    })


