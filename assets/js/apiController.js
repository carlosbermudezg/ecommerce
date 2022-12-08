import { printProducts, addProductCart, addToast } from "./interface.js"
//Api's Route
const baseUrl = 'https://academlo-api-production.up.railway.app/api/'

//Get all Products
const getProducts = () => {
    axios.get(`${baseUrl}products`)
        .then((response) => {
            printProducts(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
}

//Add Product to Shopping Cart
let productStorage = JSON.parse(localStorage.getItem('cartProducts')) || []
const addProduct = (id)=> {
    axios.get(`${baseUrl}products/${id}`)
        .then((response) => {
            const product = response.data
            productStorage.push(product)
            localStorage.setItem('cartProducts', JSON.stringify(productStorage))
            updateItems()
            addProductCart(productStorage)
            addToast(product)
            // document.getElementById('toast-price').innerText = '$ ' + product.price.toFixed(2)
            // document.getElementById('addedProduct').innerText = product.name
            // const toastLiveExample = document.getElementById('liveToast')
            // const toast = new bootstrap.Toast(toastLiveExample)
            // toast.show()
        })
}

addProductCart(productStorage)

const deleteCartProducts = (index, block) => {
    const total = productStorage.splice(index,1)
    const newStorage = productStorage
    localStorage.clear()
    localStorage.setItem('cartProducts', JSON.stringify(newStorage))
    console.log(productStorage);
    document.getElementById(block).remove()
    updateItems()
    
    const act = document.getElementById('total').getAttribute('value')
    let res = act - total[0].price
    console.log(res);

    document.getElementById('total').setAttribute('value', `${res}`)

    document.getElementById('total').innerText = '$ ' + res.toFixed(2)
}

const updateItems = () => {
    productStorage.length <= 0 ? document.getElementById('totalShop').innerText = '0' :  document.getElementById('totalShop').innerText = productStorage.length
    document.getElementById('items-cart').innerText = productStorage.length
}

const search = (value) => {
    axios.get(`${baseUrl}products`)
        .then((response) => {
            let arr = []
            const s = response.data
            for(let i = 0; i < s.length; i++){
                if(s[i].name.includes(value)){
                    arr.push(s[i])
                }
            }
            if(arr.length > 0){
                printProducts(arr)
            }
        })
        .catch((error) => {
            console.log(error);
        })
} 

//Capturamos Busqueda
const btnSearch = document.querySelector('#btn__search')
const inputSearch = document.querySelector('#search')
btnSearch.addEventListener('click', () => {
    search(inputSearch.value)
})

updateItems()
export { getProducts, addProduct, deleteCartProducts, search }