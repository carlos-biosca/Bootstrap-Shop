const clean = document.getElementById('clean')
const items = document.getElementById('items')
const table = document.getElementById('table')
const counter = document.getElementById('counter')

var products = [
    {
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 4.76
        }
    },
    {
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 66
        }
    },
    {
        name: 'All-in-1',
        price: 260,
        type: 'beauty'
    },
    {
        name: 'Zero Makeup Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    },
    {
        name: 'Bestsellers',
        price: 30,
        type: 'books'
    },
    {
        name: 'Kids',
        price: 10,
        type: 'books',
        offer: {
            number: 4,
            percent: 20
        }
    },
    {
        name: 'Sci-fi',
        price: 12,
        type: 'books'
    },
    {
        name: 'Mobile',
        price: 150,
        type: 'technology'
    },
    {
        name: 'Tablet',
        price: 300,
        type: 'technology'
    },
    {
        name: 'Desktop screen',
        price: 120,
        type: 'technology'
    },
    {
        name: 'Bike',
        price: 180,
        type: 'sports'
    },
    {
        name: 'Tennis kit',
        price: 50,
        type: 'sports',
        offer: {
            number: 2,
            percent: 15
        }
    },
    {
        name: 'Soccer ball',
        price: 99.99,
        type: 'sports'
    }
]

var cartList = [];
var cart = [];

var subtotal = {
    grocery: {
        value: 0,
        discount: 0
    },
    beauty: {
        value: 0,
        discount: 0
    },
    clothes: {
        value: 0,
        discount: 0
    },
    books: {
        value: 0,
        discount: 0
    },
    technology: {
        value: 0,
        discount: 0
    },
    sports: {
        value: 0,
        discount: 0
    }
};
var total = 0;

function updateCartCounter () {
    counter.innerHTML = cartList.length
}


function addToCartList (id) {
    // Añade producto a cartList 
    // Llama a calcular los subtotales 
    for (let product of products) {
        if (product.name.toLowerCase() == id.toLowerCase()) {
            cartList.push(product)
            calculateSubtotals()
        }
    }
    updateCartCounter()
}


function cleanCart () {
    // Vacia cartList y cart 
    // Llama a calcular los subtotales y vacia el modal cart
    cartList = []
    cart = []
    calculateSubtotals()
    printCart()
    updateCartCounter()
}


function calculateSubtotals () {
    // Calcula subtotal a partir de cartList
    // Llama a calcular promociones 
    for (let category in subtotal) {
        subtotal[category].value = 0
        subtotal[category].discount = 0
    }
    for (const product of cartList) {
        subtotal[product.type].value += product.price
    }
    for (let category in subtotal) {
        subtotal[category].value = subtotal[category].value
    }

    applyPromotionsSubtotals()
}


function calculateTotal () {
    // Calcula el total a partir de subtotal 
    // Llama a generateCart. Esta comentado porque no uso esa función 
    total = 0
    for (const category in subtotal) {
        total += subtotal[category].value - subtotal[category].discount
    }
}


function applyPromotionsSubtotals () {
    // Comprueba si el producto tiene oferta, comprueba si la oferta se cumple y calcula el descuento que se aplica al subtotal 
    // Llama a calcular el total 
    for (const product of products) {
        if (product.offer) {
            let count = 0
            for (const item of cartList) {
                if (item.name === product.name) count++
            }
            if (count >= product.offer.number) {
                subtotal[product.type].discount += count * (product.price * product.offer.percent / 100)
                subtotal[product.type].discount = subtotal[product.type].discount
            }
        }
    }

    calculateTotal()
}


function applyPromotionsCart (item) {
    // Comprueba si el producto tiene oferta y si ha comprado la cantidad necesaria 
    // Añade el descuento al item de cart 
    for (const product of products) {
        if (item.name === product.name && product.offer && item.quantity >= product.offer.number) {
            item.subtotalWithDiscount = item.quantity * (product.price * product.offer.percent / 100)
            item.subtotalWithDiscount = (item.subtotalWithDiscount).toFixed(2)
        }
    }
}


function addToCart (id) {
    // Añade el producto a cart, y luego también a cartList. 
    let productIndex = id - 1
    for (let item of cart) {
        if (item.name == products[productIndex].name) {
            item.quantity++
            item.subtotal = item.quantity * products[productIndex].price
            item.subtotal = item.subtotal.toFixed(2)
            addToCartList(products[productIndex].name)
            applyPromotionsCart(item)
            return
        }
    }
    let newItem = {
        name: products[productIndex].name,
        price: products[productIndex].price,
        type: products[productIndex].type,
        quantity: 1,
        subtotal: 1 * products[productIndex].price,
        subtotalWithDiscount: 1 * products[productIndex].price
    }
    cart.push(newItem)

    addToCartList(products[productIndex].name)
}


function removeFromCart (id) {
    // Disminuye en 1 la cantidad del item de cart, y si es el último lo elimina 
    // Despúes lo remueve de cartList 
    for (let item of cart) {
        if (item.name === products[id].name) {
            if (item.quantity > 1) {
                item.quantity--
                item.subtotal = item.quantity * products[id].price
                item.subtotal = item.subtotal.toFixed(2)
            } else {
                const index = cart.indexOf(item)
                cart.splice(index, 1)
            }
            removeFromCartList(item.name)
            applyPromotionsCart(item)
        }
    }
    updateCartCounter()
}

function removeFromCartList (name) {
    for (let product of cartList) {
        if (product.name === name) {
            const index = cartList.indexOf(product)
            cartList.splice(index, 1)
            calculateSubtotals()
            return
        }
    }
}


function printCart () {
    // Rellena el cart modal manipulando el DOM 
    items.innerHTML = ' '
    table.innerHTML = ''

    if (cart.length === 0) {
        const empty = document.createElement('td')
        empty.classList.add('text-center', 'mx-auto', 'pt-5', 'pb-0', 'display-4')
        empty.colSpan = 5
        empty.textContent = 'EMPTY'
        items.appendChild(empty)
    } else {
        printHeadList()
        printBodyList()
        printCategories()
    }
}

// Titulos tabla lista de productos 
function printHeadList () {
    const titles = ['Product', 'Price', 'Quantity', 'Total']
    const fragment = document.createDocumentFragment()

    const head = document.createElement('thead')
    head.classList.add('thead-light')
    const tr = document.createElement('tr')
    tr.classList.add('text-center')
    for (let title of titles) {
        const th = document.createElement('th')
        th.scope = 'col'
        th.textContent = title
        tr.appendChild(th)
    }
    const th = document.createElement('th')
    tr.appendChild(th)

    head.appendChild(tr)
    fragment.appendChild(head)
    items.appendChild(fragment)
}

// Tabla lista de productos 
function printBodyList () {
    const fragment = document.createDocumentFragment()
    const body = document.createElement('tbody')

    for (const item of cart) {
        const fila = document.createElement('tr')
        fila.classList.add('text-center', 'item__row')
        const name = document.createElement('td')
        name.classList.add('text-left')
        name.textContent = item.name
        const price = document.createElement('td')
        price.textContent = `$${item.price}`
        const quantity = document.createElement('td')
        quantity.textContent = item.quantity
        const total = document.createElement('td')
        total.textContent = `$${item.subtotal}`
        const remove = document.createElement('td')
        const button = document.createElement('button')
        button.classList.add('btn', 'btn-secondary', 'item__button')
        button.textContent = '-'

        remove.appendChild(button)

        fila.appendChild(name)
        fila.appendChild(price)
        fila.appendChild(quantity)
        fila.appendChild(total)
        fila.appendChild(remove)
        body.appendChild(fila)
        fragment.appendChild(body)
    }
    items.appendChild(fragment)
}

// Tabla de categorias 
function printCategories () {
    printHeadCategories()
    printBodyCategories()
}

function printHeadCategories () {
    const titles = ['Subtotal', 'Discount', 'Total']
    const fragment = document.createDocumentFragment()

    const head = document.createElement('thead')
    head.classList.add('thead-light')
    const trhead = document.createElement('tr')
    trhead.classList.add('text-center')
    const thhead = document.createElement('th')
    thhead.scope = 'col'
    trhead.appendChild(thhead)
    for (let title of titles) {
        const thhead = document.createElement('th')
        thhead.scope = 'col'
        thhead.textContent = title
        trhead.appendChild(thhead)
    }

    head.appendChild(trhead)
    fragment.appendChild(head)
    table.appendChild(fragment)
}

function printBodyCategories () {
    let types = new Set()
    for (let item of cart) {
        types.add(item.type)
    }
    const fragment = document.createDocumentFragment()


    const body = document.createElement('tbody')
    for (let type of types) {
        const tr = document.createElement('tr')
        tr.classList.add('text-center')
        const th = document.createElement('th')
        th.scope = 'row'
        th.classList.add('text-capitalize')
        th.textContent = type
        const value = document.createElement('td')
        value.textContent = `$${subtotal[type].value.toFixed(2)}`
        const discount = document.createElement('td')
        discount.textContent = `-$${subtotal[type].discount.toFixed(2)}`
        const valuediscount = document.createElement('td')
        const rest = (subtotal[type].value - subtotal[type].discount).toFixed(2)
        valuediscount.textContent = `$${rest}`

        tr.appendChild(th)
        tr.appendChild(value)
        tr.appendChild(discount)
        tr.appendChild(valuediscount)
        body.appendChild(tr)
    }

    const trtotal = document.createElement('tr')
    trtotal.classList.add('text-center')
    const thtotal = document.createElement('th')
    thtotal.scope = 'row'
    thtotal.colSpan = 3
    thtotal.classList.add('text-right')
    thtotal.textContent = 'TOTAL PRICE'
    const tdtotal = document.createElement('td')
    tdtotal.textContent = `$${total.toFixed(2)}`

    trtotal.appendChild(thtotal)
    trtotal.appendChild(tdtotal)
    body.appendChild(trtotal)

    fragment.appendChild(body)
    table.appendChild(fragment)
}


// Comprueba que productos tienen ofertas y las pinta al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    for (let product of products) {
        if (product.offer) {
            const category = document.getElementById(`${product.type}`).children[1]
            for (let card of category.children) {
                if (card.children[0].children[1].children[0].textContent === product.name) card.children[0].children[0].children[1].textContent = `Buy ${product.offer.number} / ${product.offer.percent}% OFF`
            }

        }
    }

});

// Elimina todos lo productos del carrito al pulsar clean cart
clean.addEventListener('click', () => {
    cleanCart()
})

// Actualiza cart modal cuando se elemina un producto de la lista pulsando boton - 
items.addEventListener('click', (e) => {
    if (e.target.classList.contains('item__button')) {
        for (const product of products) {
            if (product.name === e.target.parentElement.parentElement.firstElementChild.textContent) {
                const index = products.indexOf(product)
                removeFromCart(index)
                printCart()
            }
        }
    }
})