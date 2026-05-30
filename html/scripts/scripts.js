//producta JSON array
products_arr = [
        {title: "Sakura",
        price: "24.99",
        img_src1: "images/sakura.png",
        href: "sakura.html",
        tags: ['strong', 'espresso']},

        {title: "Chocho",
        price: "24.99",
        img_src1: "images/chocho.png",
        href: "chocho.html",
        tags: ['mild', 'filter']}
    ]

const params = new URLSearchParams(window.location.search);
const productData = params.get("name");

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let productFilters = []

window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("name");

    if(data === "Cart"){
        initCart(cart);
    }
    else if(data){
        initPage(productData);
    }
}

let checkBoxes;
let filters;

function initFilters(){
    checkBoxes = document.querySelectorAll("input[type=checkbox]");
    checkBoxes.forEach(element => element.addEventListener("change", filterCart));

    filters = {
        strengthStrong: ["strong"],
        strengthMild: ["mild"],
        strengthWeak: ["weak"],
        espressoType: ["espresso"],
        filterType: ["filter"]
    }
}

function filterCart(){
    document.getElementById("product-view").innerHTML = ``;

    productFilters = Array.from(checkBoxes).filter(element => element.checked).flatMap(element => filters[element.getAttribute('name')]);

    for(i = 0; i < products_arr.length; i++){
        if(productFilters.every(value => products_arr[i].tags.includes(value))){
            updateStorePage(products_arr[i]);
        }
    }
}

function initPage(product) {
    const item = products_arr.find(element => element.title === product);
    console.log(item.img_src1);
    document.getElementById("prodImage").src = item.img_src1;
}

function addToCart(product){
    const item = products_arr.find(element => element.title === product);

    console.log(item);

    const params = new URLSearchParams(window.location.search);
    const data = params.get("name");

    if(cart.find(element => element.title === product)){
        cart.find(element => element.title === product).quantity++;
    }
    else{
        cart.push({title: item.title, price: item.price, img_src1: item.img_src1, quantity: 1});
    }

    if(data === "Cart"){
        refreshCart(cart);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function deleteQtyCart(product){
    const item = products_arr.find(element => element.title === product);

    console.log(item);

    const params = new URLSearchParams(window.location.search);
    const data = params.get("name");

    if(cart.find(element => element.title === product)){
        if(cart.find(element => element.title === product).quantity !== 1){
            cart.find(element => element.title === product).quantity--;
        }
        else{
            cart.find(element => element.title === product).quantity--;
            deleteFromCart(product);
        }
    }

    if(data === "Cart"){
        refreshCart(cart);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function deleteFromCart(product){
    const params = new URLSearchParams(window.location.search);
    const data = params.get("name");

    const toDelete = cart.find(element => element.title === product);

    cart.find(element => element.title === product).quantity = 0;

    cart.splice(cart.indexOf(toDelete), 1);

    if(data === "Cart"){
        refreshCart(cart);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function initCart(cart){
    for(i = 0; i < cart.length; i++){
        updateCartHTML(cart[i]);
    }
    
    updatePrice();
}

function initMiniCart(){
    for(i = 0; i < cart.length; i++){
        updateMiniCartHTML(cart[i]);
    }
}

function initProductPage(){
    for(i = 0; i < products_arr.length; i++){
        updateStorePage(products_arr[i]);
    }
}

function clearCartVis(){
    const elem = document.getElementById("cartContent");

    elem.innerHTML = ``;
}

function refreshCart(cart){
    clearCartVis();
    initCart(cart);
}

function updateCartHTML(product){
    const elem = document.getElementById("cartContent");

    elem.innerHTML += 
    `<div class="cartBox" id="${product.title}">
        <div class="preview">
            <image class="small-img" src="${product.img_src1}" width="auto"></image>
        </div>

        <div class="title">
            <a class="section-header product-description">${product.title}</a>
        </div>

        <div class="aux">
            <br>
            <a class="product-description" id="${product.title}totalPrice">Total Price: ${product.price * product.quantity}</a>
            <br>
            <a>Quantity: ${product.quantity}</a>
            <br>

            <button onclick="deleteFromCart('${product.title}')">Delete</button>
            <button onclick="addToCart('${product.title}')">Add Quantity</button>
            <button onclick="deleteQtyCart('${product.title}')">Reduce Quantity</button>
        </div>
    </div>`
}

function updateMiniCartHTML(product){
    const elem = document.getElementById("cartContent");

    elem.innerHTML += 
    `<div class="cartBox" id="${product.title}">
        <div class="preview">
            <image class="small-img" src="${product.img_src1}" width="auto"></image>
        </div>

        <div class="title">
            <a class="section-header product-description">${product.title}</a>
        </div>

        <div class="aux">
            <br>
            <a class="product-description" id="${product.title}totalPrice">Total Price: ${product.price * product.quantity}</a>
            <br>
            <a>Quantity: ${product.quantity}</a>
        </div>
    </div>`
}

function updateStorePage(product){
    const elem = document.getElementById("product-view");

    elem.innerHTML +=
    `<div class="product">
        <div class="image">
            <image src="${product.img_src1}" width="270px"></image>
        </div>
        
        <div class="product-text">
            <a class="preview-text">
                ${product.title}
            </a>
        </div>

        <div class="price">
            <a class="preview-text price">
                ${product.price}
            </a>
        </div>

        <div class="button">
            <button class="product-button" onclick="window.location.href='${product.href}?name=${product.title}'">
                View
            </button>
        </div>
    </div>`
}

function updatePrice(){
    let currTotal = 0;
    let currQuantity = 0;

    for(i = 0; i < cart.length; i++){
        currTotal += cart[i].price * cart[i].quantity;
    }

    document.getElementById("totalPrice").innerHTML = `$${currTotal}`;
    document.getElementById("totalQty").innerHTML = `${cart.length} Items`;
}

function resetCart(){
    localStorage.clear();
}

 