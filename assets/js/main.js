import { getProducts, addProduct, deleteCartProducts, search } from "./apiController.js";

// Obtener todos los productos
getProducts();
//search('Hoodie')
window.addProduct = addProduct
window.deleteCartProducts = deleteCartProducts