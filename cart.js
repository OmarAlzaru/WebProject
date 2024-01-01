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


