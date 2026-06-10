//producta JSON array
products_arr = [
        {title: "Sakura",
        price: "24.99",
        img_src1: "images/sakura.png",
        href: "sakura.html",
        tags: ['Strong', 'Espresso'],
        description: "The sakura blend is an exclusive seasonal blend inspired by the cherry blossoms of Japan. It’s versatile, and suitable for both espresso and filter. However, we prefer it brewed with an espresso machine."},

        {title: "Chocho",
        price: "24.99",
        img_src1: "images/chocho.png",
        href: "chocho.html",
        tags: ['Mild', 'Filter'],
        description: "Coming soon..."},

        {title: "Zen",
        price: "19.99",
        img_src1: "images/zen.png",
        href: "zen.html",
        tags: ['Mild', 'Filter'],
        description: "Coming soon..."},

        {title: "Brazil",
        price: "14.99",
        img_src1: "images/brazil.png",
        href: "brazil.html",
        tags: ['Mild', 'Espresso'],
        description: "Coming soon..."},

        {title: "Home",
        price: "9.99",
        img_src1: "images/home.png",
        href: "home_b.html",
        tags: ['Weak', 'Filter'],
        description: "Coming soon..."},
        
        {title: "Guatemala",
        price: "9.99",
        img_src1: "images/guatemala.png",
        href: "guatemala.html",
        tags: ['Weak', 'Filter'],
        description: "Coming soon..."},

        {title: "Kenya",
        price: "29.99",
        img_src1: "images/kenya.png",
        href: "kenya.html",
        tags: ['Mild', 'Espresso'],
        description: "Coming soon..."}
    ]

const params = new URLSearchParams(window.location.search);
const productData = params.get("name");
const productWeight = params.get("weight");
const productGrind = params.get("grind");

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let productFilters = []
let product_quantity = 1;
let product_price = 0;

const variants_weight = [
    {weight: "250g", multiplier: 1},
    {weight: "500g", multiplier: 2},
    {weight: "1kg", multiplier: 4}
]

const variants_grind = [
    {grind: "grind-espresso", title: "Espresso Grind"},
    {grind: "grind-filter", title: "Filter Grind"},
    {grind: "whole", title: "Whole Beans"}
]

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
let query = "";

function initFilters(){
    checkBoxes = document.querySelectorAll("input[type=checkbox]");
    checkBoxes.forEach(element => element.addEventListener("change", filterProducts));

    filters = {
        strengthStrong: ["Strong"],
        strengthMild: ["Mild"],
        strengthWeak: ["Weak"],
        espressoType: ["Espresso"],
        filterType: ["Filter"]
    }

    const searchInput = document.getElementById('query');

    searchInput.addEventListener('input', (e) => {
        query = e.target.value.toLowerCase();

        filterProducts();
    });

    const mobileSearchInput = document.getElementById('query2');

    mobileSearchInput.addEventListener('input', (e) => {
        query = e.target.value.toLowerCase();

        filterProducts();
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

function changeVariant(itemID){
    const index = document.getElementById(itemID).getAttribute('name');
    window.location.href=`product.html?name=${productData}&weight=${variants_weight[index].weight}&grind=${productGrind}`;
}

function changeGrind(itemID){
    const index = document.getElementById(itemID).getAttribute('name');
    window.location.href=`product.html?name=${productData}&weight=${productWeight}&grind=${variants_grind[index].grind}`;
}

function initPage(product) {
    product_quantity = 1;
    document.getElementById("quantity").innerHTML = product_quantity;
    const item = products_arr.find(element => element.title === product);
    const weight = variants_weight.find(element => element.weight === productWeight);
    const grind = variants_grind.find(element => element.grind === productGrind);

    product_price = item.price * weight.multiplier;

    document.getElementById("title").innerHTML = `${item.title} | Disciple Coffee Store`;

    document.getElementById("product-title").innerHTML = `${item.title}`
    document.getElementById("prodImage").src = item.img_src1;
    document.getElementById("product-price").innerHTML = `$${item.price * weight.multiplier}`;
    document.getElementById("description").innerHTML = `${item.description}`

    document.getElementById(productWeight).classList.toggle("selected");
    document.getElementById(productGrind).classList.toggle("selected");

    document.getElementById("variant-weight").innerHTML = `${productWeight}`;
    document.getElementById("variant-grind").innerHTML = `${grind.title}`;

    for(i = 0; i < variants_weight.length; i++){
        document.getElementById(variants_weight[i].weight).addEventListener("click", (event) => {
            const itemID = event.currentTarget.id;
            changeVariant(itemID)
        });
    }

    for(i = 0; i < variants_grind.length; i++){
        document.getElementById(variants_grind[i].grind).addEventListener("click", (event) => {
            const itemID = event.currentTarget.id;
            changeGrind(itemID);
        });
    }
}

function addToCart(product){
    const item = products_arr.find(element => element.title === product);
    const weight = variants_weight.find(element => element.weight === productWeight);
    const grind = variants_grind.find(element => element.grind === productGrind);

    const product_title = `${item.title} ${productWeight} ${grind.title}`;

    if(cart.find(element => element.title === product_title)){
        cart.find(element => element.title === product_title).quantity += product_quantity;
    }
    else{  
        cart.push({title: product_title, price: item.price * weight.multiplier, img_src1: item.img_src1, quantity: product_quantity});
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert("Product added to Cart!")
}

function addQtyCart(product_title){
    const params = new URLSearchParams(window.location.search);
    const data = params.get("name");

    cart.find(element => element.title === product_title).quantity++;

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

function addQtyProduct(){
    product_quantity++;
    document.getElementById("quantity").innerHTML = product_quantity;

    let visual_price = product_price * product_quantity;
    visual_price = visual_price.toFixed(2);
    document.getElementById("product-price").innerHTML = `$${visual_price}`;
}

function deleteQtyProduct(){
    if(product_quantity != 1){
        product_quantity--;
    }

    document.getElementById("quantity").innerHTML = product_quantity;

    let visual_price = product_price * product_quantity;
    visual_price = visual_price.toFixed(2);
    document.getElementById("product-price").innerHTML = `$${visual_price}`;
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

function filterProducts(){
    console.log(query);
    const elem = document.getElementById("product-view");
    elem.innerHTML = ``;

    document.getElementById("product-view").innerHTML = ``;

    productFilters = Array.from(checkBoxes).filter(element => element.checked).flatMap(element => filters[element.getAttribute('name')]);

    console.log(productFilters);

    for(i = 0; i < products_arr.length; i++){
        let q = products_arr[i].title.toLowerCase().trim();
        if(q.includes(query) && productFilters.every(value => products_arr[i].tags.includes(value))){
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

    let totalPrice = product.price*product.quantity;
    totalPrice = totalPrice.toFixed(2);

    elem.innerHTML += 
    `<div class="cartBox">
        <div class="preview">
            <image class="small-img" src="${product.img_src1}" width="auto"></image>
        </div>

        <div class="title">
            <div class="cartItemInfo">
                <div class="info">
                    <a class="cart-title smallText">Product</a>
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
                    <a class="cart-title" id="TotalPrice">$${totalPrice}</a>
                </div>
                
                <div class="controls">
                    <button class="qty-button" onclick="addQtyCart('${product.title}')">+</button>
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
    let totalPrice = product.price * product.quantity;
    totalPrice.toFixed(2);

    elem.innerHTML += 
    `<div class="cartBox" id="TEST">
        <div class="preview">
            <image class="small-img" src="${product.img_src1}" width="auto"></image>
        </div>

        <div class="title">
            <div class="cartItemInfo">
                <div class="info">
                    <a class="cart-title smallText">Product</a>
                    <a class="cart-title">${product.title}</a>
                </div>
            </div>
        </div>

        <div class="aux">
            <div class="cartItemControls">
                <div class="info">
                    <a class="cart-title smallText">${product.quantity} Items @</a>
                    <a class="cart-title" id="TotalPrice">$${totalPrice}</a>
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
            <a class="preview-text subheader">${product.tags[0]} ${product.tags[1]}</a>
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
            <button class="product-button" onclick="window.location.href='product.html?name=${product.title}&weight=250g&grind=grind-espresso'">
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

    currTotal = currTotal.toFixed(2);

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

function goCheckout(){
    if(cart.length === 0){
        alert("There are no products in your cart. Add a product to continue.");
    }
    else{
        window.location.href='checkout.html';
    }
}

function alertUnimplemented(){
    alert("Coming soon!")
}