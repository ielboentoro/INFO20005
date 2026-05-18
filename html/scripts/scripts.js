//producta JSON array
products_arr = [
        {title: "Sakura",
        price: "24.99",
        img_src1: "images/sakura.png"},

        {title: "Chocho",
        price: "24.99",
        img_src1: "images/chocho.png"}
    ]



const params = new URLSearchParams(window.location.search);
const productData = params.get("name");

let cart = JSON.parse(localStorage.getItem('cart'))|| [];

window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("name");

    if(data === "Cart"){
        initCart(cart);
    }
    else{
        initPage(productData);
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
}

function initMiniCart(){
    for(i = 0; i < cart.length; i++){
        updateMiniCartHTML(cart[i]);
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

function resetCart(){
    localStorage.clear();
}

 