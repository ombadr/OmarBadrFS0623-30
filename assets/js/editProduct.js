import { isValidPrice, isValidUrl } from "./utils/utils.js";

const productName = document.querySelector('#productName');
const productDescription = document.querySelector('#productDescription');
const productBrand = document.querySelector('#productBrand');
const productImageUrl = document.querySelector('#productImageUrl');
const productPrice = document.querySelector('#productPrice');
const editButton = document.querySelector('#editButton');
const deleteButton = document.querySelector('#deleteButton');
const loadingSpinner = document.querySelector('#loadingSpinner');
const productForm = document.querySelector('#productForm');

let product = {}
let productId

fetchProduct()

deleteButton.addEventListener('click', () => {
    deleteProduct()
})

editButton.addEventListener('click', (e) => {

    e.preventDefault()

    const productName = document.getElementById('productName').value.trim()
    const productDescription = document.getElementById('productDescription').value.trim()
    const productBrand = document.getElementById('productBrand').value.trim()
    const productImageUrl = document.getElementById('productImageUrl').value.trim()
    const productPrice = document.getElementById('productPrice').value.trim()

    let isFormValid = true

    if (!productName || !productDescription || !productBrand || !productImageUrl || !productPrice) {
        alert('Please fill in all fields before adding the product.');
        isFormValid = false
    }
    if (!isValidUrl(productImageUrl)) {
        document.getElementById('productImageUrl').classList.add('is-invalid')
        isFormValid = false
    }
    if (!isValidPrice(parseFloat(productPrice))) {
        document.getElementById('productPrice').classList.add('is-invalid')
        isFormValid = false
    }

    if (isFormValid && isValidUrl && isValidPrice) {

        editProduct();

        window.location.href = '/index.html'
    }



})




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
        productForm.style.display = 'none'
        const urlString = window.location.href;
        const url = new URL(urlString);
        productId = url.searchParams.get('id');

        product = await getProduct(productId);
        console.log(product);

        productName.value = product.name;
        productDescription.value = product.description;
        productBrand.value = product.brand;
        productImageUrl.value = product.imageUrl;
        productPrice.value = product.price;

        loadingSpinner.style.display = 'none'
        productForm.style.display = 'block'

    } catch (e) {
        console.error(e);
    }
}


async function editProduct() {
    try {

        let data = {
            name: productName.value.trim(),
            description: productDescription.value.trim(),
            brand: productBrand.value.trim(),
            imageUrl: productImageUrl.value.trim(),
            price: productPrice.value.trim()
        }

        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZjAyODBkOGEyMDAwMThhNDhiMmYiLCJpYXQiOjE3MDIxMTg4NDAsImV4cCI6MTcwMzMyODQ0MH0.vymDvZH0XdAmIeq993LY_XBRc71NdYtQqcRctQCwE8k'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Product updated:', responseData);
        } else {
            console.error('Failed to update product:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating product:', error);
    }
}

async function deleteProduct() {
    try {

        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZjAyODBkOGEyMDAwMThhNDhiMmYiLCJpYXQiOjE3MDIxMTg4NDAsImV4cCI6MTcwMzMyODQ0MH0.vymDvZH0XdAmIeq993LY_XBRc71NdYtQqcRctQCwE8k'
            }
        })

        if (response.ok) {
            console.log(`Product with ID ${productId} has been deleted successfully`);
            window.location.href = '/index.html'
        } else {
            console.error(`Failed to delete product with ID ${productId}`);
        }

    } catch (e) {
        console.error(e)
    }
}
