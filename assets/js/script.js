const productsContainer = document.querySelector('#products-container');
const loadingSpinner = document.querySelector('#loadingSpinner');

let products = []

fetchProducts();

async function getImages() {
    try {

        const data = await fetch('https://striveschool-api.herokuapp.com/api/product', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZjAyODBkOGEyMDAwMThhNDhiMmYiLCJpYXQiOjE3MDIxMTg4NDAsImV4cCI6MTcwMzMyODQ0MH0.vymDvZH0XdAmIeq993LY_XBRc71NdYtQqcRctQCwE8k'
            }
        })

        const response = data.json()
        products = response
        return products
    } catch (error) {
        console.log(error)
    }
}

async function fetchProducts() {
    try {
        loadingSpinner.style.display = 'block'
        const products = await getImages();
        displayProducts(products);
        loadingSpinner.style.display = 'none'
    } catch (e) {
        console.error(e);
    }
}

function displayProducts(products) {
    productsContainer.innerHTML = ''
    products.forEach((product) => {
        productsContainer.innerHTML += `<div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                <img
                  src="${product.imageUrl}"
                  class="card-img-top img-fluid"
                  style="height: 200px; object-fit: cover"
                  alt="${product.name}"
                />
                <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">${product.description}</p>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="btn-group">
                      <a
                      href="/product-details.html?id=${product._id}"
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        Learn More
                      </a>
                      <a
                      href="/product-edit.html?id=${product._id}"
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        onclick=""
                      >
                        Edit
                      </a>
                    </div>
                    <p>${product.price} €</p>
                  </div>
                </div>
              </div>
            </div>`
    })
}

