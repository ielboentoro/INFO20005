//producta JSON array
products_arr = [
        {title: "Sakura",
        price: "24.99",
        img_src1: "images/sakura.png"},

        {title: "Chocho",
        price: "24.99",
        img_src1: "images/sakura.png"}
    ]



const params = new URLSearchParams(window.location.search);
const productData = params.get("name");

var cart = [];

console.log(productData);

window.onload = function() {
    initPage(productData);
}

function initPage(product) {
    const item = products_arr.find(element => element.title === product);
    console.log(item.img_src1);
    document.getElementById("prodImage").src = item.img_src1;
}

function addToCart(product){
    const item = products_arr.find(element => element.title === product);

    if(cart.find(element => element.title === product)){
        cart.find(element => element.title === product).quantity++;
    }
    else{
        cart.push({title: item.title, price: item.price, quantity: 1});
    }

    //debugging output

    console.log(cart);
}