const productDetailsContainer = document.querySelector('#product-details-container')
const loadingSpinner = document.querySelector('#loadingSpinner');


let product = {}
let productId

fetchProduct()

async function getProduct(id) {
    try {
        const data = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZjAyODBkOGEyMDAwMThhNDhiMmYiLCJpYXQiOjE3MDIxMTg4NDAsImV4cCI6MTcwMzMyODQ0MH0.vymDvZH0XdAmIeq993LY_XBRc71NdYtQqcRctQCwE8k'
            }
        })

        const response = data.json()
        product = response
        return product
    } catch (error) {
        console.error(error)
    }
}

async function fetchProduct() {
    try {
        loadingSpinner.style.display = 'block'
        const urlString = window.location.href;
        const url = new URL(urlString);
        productId = url.searchParams.get('id');

        product = await getProduct(productId);
        console.log(product);
        displayProduct(product);
        loadingSpinner.style.display = 'none'

    } catch (e) {
        console.error(e);
    }
}


function displayProduct(product) {

    productDetailsContainer.innerHTML = `<div class="card text-center mb-3">
            <div class="card-body">
              <img
                src="${product.imageUrl}"
                alt="${product.name}"
                class="img-fluid"
                width="50%"
              />

              <h3 class="card-title mt-3" id="productTitle">${product.name}</h3>
              <p class="card-text" id="productPrice">Price: ${product.price} €</p>
              <p class="card-text" id="productDescription">
                Description: ${product.description}
              </p>
              <p class="card-text" id="productBrand">Brand: ${product.brand}</p>

              <a
                href="/product-edit.html?id=${product._id}"
                class="btn btn-primary"
                >Edit Product</a
              >
            </div>
          </div>`

}