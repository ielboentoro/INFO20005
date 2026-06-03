//producta JSON array
products_arr = [
        {title: "Sakura",
        price: "24.99",
        img_src1: "images/sakura.png",
        href: "sakura.html",
        tags: ['strong', 'Espresso']},

        {title: "Chocho",
        price: "24.99",
        img_src1: "images/chocho.png",
        href: "chocho.html",
        tags: ['mild', 'Filter']},

        {title: "Zen",
        price: "19.99",
        img_src1: "images/zen.png",
        href: "zen.html",
        tags: ['mild', 'Filter']},

        {title: "Brazil",
        price: "14.99",
        img_src1: "images/brazil.png",
        href: "brazil.html",
        tags: ['mild', 'Espresso']},

        {title: "Home",
        price: "9.99",
        img_src1: "images/home.png",
        href: "home_b.html",
        tags: ['weak', 'Filter']},
        
        {title: "Guatemala",
        price: "9.99",
        img_src1: "images/guatemala.png",
        href: "guatemala.html",
        tags: ['weak', 'Filter']},

        {title: "Kenya",
        price: "29.99",
        img_src1: "images/kenya.png",
        href: "kenya.html",
        tags: ['mild', 'Espresso']}
    ]

const params = new URLSearchParams(window.location.search);
const productData = params.get("name");

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let productFilters = []

window.onload = function() {
    insertHeader();
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
        espressoType: ["Espresso"],
        filterType: ["Filter"]
    }

    const searchInput = document.getElementById('query');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        filterProducts(query);
    });

    const mobileSearchInput = document.getElementById('query2');

    mobileSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        filterProducts(query);
    });
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

function filterProducts(string){
    console.log(string);
    const elem = document.getElementById("product-view");
    elem.innerHTML = ``;

    for(i = 0; i < products_arr.length; i++){
        let q = products_arr[i].title.toLowerCase().trim();
        console.log(q);
        console.log(q.includes(string));
        if(q.includes(string)){
            updateStorePage(products_arr[i]);
        }
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
    `<div class="cartBox">
        <div class="preview">
            <image class="small-img" src="${product.img_src1}" width="auto"></image>
        </div>

        <div class="title">
            <div class="cartItemInfo">
                <div class="info">
                    <a class="cart-title smallText">Espresso Blend</a>
                    <a class="cart-title">${product.title}</a>
                </div>

                <div class="controls">
                    <button class="delete-product-button" onclick="deleteFromCart('${product.title}')">Delete</button>
                </div>
            </div>
        </div>

        <div class="aux">
            <div class="cartItemControls">
                <div class="info">
                    <a class="cart-title smallText">${product.quantity} Items @</a>
                    <a class="cart-title" id="TotalPrice">$${product.price * product.quantity}</a>
                </div>
                
                <div class="controls">
                    <button class="qty-button" onclick="addToCart('${product.title}')">+</button>
                    <a class="cart-quantity"> ${product.quantity} </a>
                    <button class="qty-button" onclick="deleteQtyCart('${product.title}')">-</button>
                    <br>
                </div>
            </div>
        </div>
    </div>`
}

function updateMiniCartHTML(product){
    const elem = document.getElementById("cartContent");

    elem.innerHTML += 
    `<div class="cartBox" id="TEST">
        <div class="preview">
            <image class="small-img" src="${product.img_src1}" width="auto"></image>
        </div>

        <div class="title">
            <div class="cartItemInfo">
                <div class="info">
                    <a class="cart-title smallText">Espresso Blend</a>
                    <a class="cart-title">${product.title}</a>
                </div>
            </div>
        </div>

        <div class="aux">
            <div class="cartItemControls">
                <div class="info">
                    <a class="cart-title smallText">${product.quantity} Items @</a>
                    <a class="cart-title" id="TotalPrice">$${product.price * product.quantity}</a>
                </div>
            </div>
        </div>
    </div>`
}

function updateStorePage(product){
    const elem = document.getElementById("product-view");

    elem.innerHTML +=
    `<div class="product">
        <div class="image">
            <image src="${product.img_src1}" class="product-image"></image>
        </div>
        
        <div class="product-text">
            <a class="preview-text subheader">For ${product.tags[1]}</a>
            <a class="preview-text">
                ${product.title}
            </a>
        </div>

        <div class="price">
            <a class="preview-text subheader">From</a>
            <a class="preview-text price">
                $${product.price}
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

function insertHeader(){
    document.getElementById("headerCont").innerHTML =
    `<div class="desktop-subheader left">
            <img src="images/brand-mini.png" alt="Disciple Coffee" height="53px" href="home.html">
        </div>
        
        <div class="desktop-subheader spacerL"></div>

        <div class="floating-header">
            <ul>
                <li><a href="home.html">Home</a></li>
                <li><a href="store.html">Store</a></li>
                <li><a href="locations.html">Locations</a></li>
                <li><a href="about.html">About</a></li>
            </ul>
        </div>

        <div class="desktop-subheader spacerR"></div>

        <div class="desktop-subheader right">
            <img src="images/svg/account.svg" alt="account" class="icon">
            <a href="cart.html?name=Cart"><image src="images/svg/cart.svg" alt="cart" class="icon"></image></a>
            <img src="images/svg/burger.svg" alt="burger" class="icon">
        </div>

        <div class="floating-header mobile">
            <div class="floating-header-mobile-container">
                <div class="logo">
                    <img class="header-img" src="images/brand-mini.png" alt="Disciple Coffee" height="53px" href="home.html">
                </div>
                
                <div class="dropdownCont">
                    <div class="dropdown">
                        <button class="dropbtn"><img src="images/svg/burger.svg" alt="burger" class="icon"></button>
                        <div class="dropdown-content">
                            <a href="home.html"><image src="images/svg/home.svg" alt="home" class="icon dropdown"></image> Home</a>
                            <a href="store.html"><image src="images/svg/store.svg" alt="cart" class="icon dropdown"></image> Store</a>
                            <a href="locations.html"><image src="images/svg/locations.svg" alt="locations" class="icon dropdown"></image> Locations</a>
                            <a href="about.html"><image src="images/svg/about.svg" alt="about" class="icon dropdown"></image> About</a>
                            <a href="cart.html?name=Cart"><image src="images/svg/cart.svg" alt="cart" class="icon dropdown"></image> Cart</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    ;
}