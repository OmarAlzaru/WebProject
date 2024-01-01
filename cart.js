let carticon=document.querySelector('#cart-icon')
let cart=document.querySelector('.cart')
let closecart=document.querySelector('#close-cart')

jQuery(document).ready(function(){
    jQuery('.cart').addClass('.active')
})
jQuery(document).ready(function(){
    jQuery('#close-cart').removeClass('.active')
})

if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    var removecartbtn = document.getElementsByClassName('cart-remove');
    console.log(removecartbtn);
    for (var i = 0; i < removecartbtn.length; i++) {
        var button = removecartbtn[i];
        button.addEventListener('click', removecartitem);
    }

    
    var quantityInputs = document.getElementsByClassName("cart-quantity"); 
    for(var u=0; i<quantityInputs.length; i++)
    {
    var input = quantityInputs[i];
    button.addEventListener("click", quantityChanged);
    }
    {
    // Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for(var u=0; i<quantityInputs.length; i++)
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
    
}
function buyButtonClicked(){
    alert("Your Order is placed");
    var cartContent = document.getElementsByClassName("cart-content")[0]; 
    while(cartContent.hasChildNodes()){
    cartContent.removechild(cartcontent.firstchild);}
    updatetotal();
}


function removecartitem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

// Add event listener for DOMContentLoaded
if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Define the ready function
function ready() {
    var removecartbtn = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removecartbtn.length; i++) {
        var button = removecartbtn[i];
        if (button) {
            button.addEventListener('click', removecartitem);
        }
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        if (input) {
            input.addEventListener("change", quantityChanged);
        }
    }

    var addCartButtons = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCartButtons.length; i++) {
        var button = addCartButtons[i];
        if (button) {
            button.addEventListener("click", addCartClicked);
        }
    }

    var buyButton = document.querySelector(".btn-buy");
    if (buyButton) {
        buyButton.addEventListener("click", buyButtonClicked);
    }
}


function buyButtonClicked() {
    alert("Your Order is placed");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

// Quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// Add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.closest('.common-col'); // find the closest parent with the class 'common-col'
    
    if (shopProducts) {
        var title = shopProducts.querySelector("h1").innerText;
        var price = shopProducts.querySelector(".price").innerText;
        var productImg = shopProducts.querySelector(".product-img").src;
        addProductToCart(title, price, productImg);
        updatetotal();
    }
    if (shopProducts) {
        var title = shopProducts.querySelector("h1").innerText;
        var price = shopProducts.querySelector(".price").innerText;
        var productImg = shopProducts.querySelector(".product-img").src;

        console.log("Title:", title);
        console.log("Price:", price);
        console.log("Product Img:", productImg);

        // rest of the code
    } else {
        console.log("Shop Products not found!");
    }
}
function addProductToCart(title, price, productImg) {
    var cartshopBox = document.createElement("div");
    cartshopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];

    var cartBoxContent = `<img src="${productImg}" class="cart-img"> <div class="detail-box">
                    <div class="cart-product-title">${title}</div>
                    <div class="cart-price">${price}</div>
                    <input type="number" value="1" class="cart-quantity"> </div>
                    <i class="fa-solid fa-trash cart-remove"></i>`;

    cartshopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartshopBox);

    cartshopBox
        .querySelector(".cart-remove")
        .addEventListener("click", removecartitem);

    cartshopBox
        .querySelector(".cart-quantity")
        .addEventListener("change", quantityChanged);

    updatetotal();
}

// Update total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector(".cart-price");
        var quantityElement = cartBox.querySelector(".cart-quantity");

        if (priceElement && quantityElement) {
            var price = parseFloat(priceElement.innerText.replace("LE", ""));
            var quantity = quantityElement.value;
            total = total + price * quantity;
        }
    }

    total = Math.round(total * 100) / 100;

    var totalElement = document.querySelector(".total-price");
    if (totalElement) {
        totalElement.innerText = "EGP " + total;
    }
}
