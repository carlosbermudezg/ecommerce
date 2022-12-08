const printProducts = (products) => {
    const container = document.querySelector('#card-container')
    let html = ''
    for(let i = 0; i < products.length; i++){
        html += `
        <div class="card mt-5" style="width: 18rem;">
            <div id="carouselProduct${i}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselProduct${i}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselProduct${i}" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="5000">
                    <img src="${products[i].images.image1}" class="card-img-top" alt="...">
                    </div>
                    <div class="carousel-item" data-bs-interval="5000">
                    <img src="${products[i].images.image2}" class="card-img-top" alt="...">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselProduct${i}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselProduct${i}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div class="card-body">
                <h5 class="card-title">${products[i].name}</h5>
                <p class="card-text">$ ${products[i].price.toFixed(2)}</p>
                <a onclick="addProduct(${products[i].id})" class="btn bg-secondary text-light"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</a>
            </div>
        </div>
        `
    }
    container.innerHTML = html
}
//Agregar productos al carrito
const addProductCart = (products) => {
    const container = document.querySelector('#product-cart')
    let total = 0
    let html = ''
    for( let i = 0; i < products.length; i++){
        total += products[i].price
        html += `
        <li id="list-group${i}" class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-secondary">
            <h6 class="my-0">${products[i].name}</h6>
            </div>
            <span class="text-success">$ ${products[i].price.toFixed(2)}</span>
            <a onclick="deleteCartProducts(${i},'list-group${i}')" class="btn btn-danger"><i class="fa-solid fa-trash"></i></a>
        </li>
        `
    }
    document.getElementById('total').setAttribute('value',total)
    document.getElementById('total').innerText = '$ ' + total.toFixed(2)
    container.innerHTML = html
}

const addToast = (product) => {

    const container = document.querySelector('.toast-container')

    const toastLive = `
    <div class="toast${product.id} toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
        <strong class="me-auto">Producto Agregado</strong>
        <small class="text-muted">$ ${product.price.toFixed(2)}</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
        ${product.name}
        </div>
    </div>
    `

    container.innerHTML += toastLive 

    const toastLiveExample = document.querySelector(`.toast${product.id}`)
    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
}

export { printProducts, addProductCart, addToast }