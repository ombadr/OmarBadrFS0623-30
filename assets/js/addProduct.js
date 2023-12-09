import { isValidPrice, isValidUrl } from "./utils/utils.js";

const productForm = document.querySelector('#product-add-form')
const resetButton = document.querySelector('#resetButton')


productForm.addEventListener('submit', (e) => {
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
        const formData = {
            name: productName,
            description: productDescription,
            brand: productBrand,
            imageUrl: productImageUrl,
            price: parseFloat(productPrice)
        };

        addProduct(formData)

        window.location.href = '/index.html'
    }

})

async function addProduct(data) {
    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZjAyODBkOGEyMDAwMThhNDhiMmYiLCJpYXQiOjE3MDIxMTg4NDAsImV4cCI6MTcwMzMyODQ0MH0.vymDvZH0XdAmIeq993LY_XBRc71NdYtQqcRctQCwE8k'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Product added:', responseData);
        } else {
            console.error('Failed to add product:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding product:', error);
    }
}


function resetForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productBrand').value = '';
    document.getElementById('productImageUrl').value = '';
    document.getElementById('productPrice').value = '';
}

resetButton.addEventListener('click', function () {
    resetForm();
});