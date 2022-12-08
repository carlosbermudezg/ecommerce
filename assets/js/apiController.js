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
        })
}

addProductCart(productStorage)

const deleteCartProducts = (index, block) => {
    //Eliminamos el item del localStorage
    const deletedItem = productStorage.splice(index,1)
    //Guardamos el nuevo valor del LocalStorage
    const newStorage = productStorage
    //Asignamos el nuevo total de los items en el carrito
    const totalCart = document.getElementById('total').getAttribute('value')
    let newTotalCart = totalCart - deletedItem[0].price
    document.getElementById('total').setAttribute('value', `${newTotalCart}`)
    document.getElementById('total').innerText = '$ ' + newTotalCart.toFixed(2)
    //removemos el item del carrito
    document.getElementById(block).remove()
    //Limpiamos el Almacenamiento Local
    localStorage.clear()
    //Asignamos el nuevo listado de Items en el carrito
    localStorage.setItem('cartProducts', JSON.stringify(newStorage))
    //rescribimos el listado de items en el carrito
    addProductCart(newStorage)
    //Actualizamos el numero de productos en el carrito
    updateItems()
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

//Correccion compartamiento de Tabs
const homeTab = document.querySelector('#home')
const btnCart = document.querySelector('#btn__cart')
btnCart.addEventListener('click', ()=> {
    homeTab.classList.remove('active')
})

const updateItems = () => {
    productStorage.length <= 0 ? document.getElementById('totalShop').innerText = '0' :  document.getElementById('totalShop').innerText = productStorage.length
    document.getElementById('items-cart').innerText = productStorage.length
}

updateItems()
export { getProducts, addProduct, deleteCartProducts, search }