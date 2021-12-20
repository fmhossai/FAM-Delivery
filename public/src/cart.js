// if add to cart button is clicked in the home page
let addToCart = document.querySelectorAll(".add-to-cart");
addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // collect and send product's info to be added
       let choice = JSON.parse(btn.dataset.choice);
       updateCart(choice);
    })
});

// if - in cart is clicked
if(document.querySelectorAll(".remove-from-cart").length > 0){
    let removeFromCart = document.querySelectorAll(".remove-from-cart")
    removeFromCart.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            // collect and send product's info to be removed appropriately
            let choice = JSON.parse(btn.dataset.choice);
            removeItemCart(choice);
        })
    })
}

//remove from cart
function removeItemCart(choice){
    axios.post('/remove-cart', choice).then((res) => {
        // if fully remove
        if(res.data.quantity == 0) {
            document.querySelector('.cartCtr').innerText = res.data.quantityT
            document.querySelector(`#cart-qty-${choice.product_id}`).parentNode.remove();
        }
        // else decrease by 1
        else{
            document.querySelector('.cartCtr').innerText = res.data.quantityT
            new Noty({
                type: 'success',
                timeout: 1000,
                text: 'Item Removed',
                progressBar: false
            }).show();

            // update cart total
            if(document.querySelector(`#cart-qty-${choice.product_id}`))
                document.querySelector(`#cart-qty-${choice.product_id}`).textContent = `${res.data.quantity} pcs`
        }

        // total cart amount update in UI
        if(document.querySelector(`#cart-amount`)) 
            document.querySelector(`#cart-amount`).textContent = `$${parseFloat(res.data.priceT).toFixed(2)}`
        
        // update each item total price if more than 1 qty
        if(document.querySelector(`#row-price-${choice.product_id}`)) 
            document.querySelector(`#row-price-${choice.product_id}`).textContent = `$${parseFloat(res.data.price).toFixed(2)}`
    }).catch(err => {
        console.log(err)
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false
        }).show();
    })
}

// update/add to cart
function updateCart(choice) {
    axios.post('/update-cart', choice).then((res) => {
        const flagCode = res.data.flagCode
        let status = ''
        // different cases as determinded by cart controller: out of stock, availbale, over available stock
        if(flagCode == -1){ status = 'Exceeded Quantitiy' }
        else if(flagCode === -2){ status = 'Out of Stock' }
        else{
            status = 'item added to cart'
            // update total in UI beside cart in header
            document.querySelector('.cartCtr').innerText = res.data.quantityT
            // update qty for each item in UI
            if(document.querySelector(`#cart-qty-${choice.product_id}`))
                document.querySelector(`#cart-qty-${choice.product_id}`).textContent = `${res.data.quantity} pcs`  
        }

        // total cart amount update in UI
        if(document.querySelector(`#cart-amount`)) 
            document.querySelector(`#cart-amount`).textContent = `$${parseFloat(res.data.priceT).toFixed(2)}`
        
        // update each item total price if more than 1 qty
        if(document.querySelector(`#row-price-${choice.product_id}`)) 
            document.querySelector(`#row-price-${choice.product_id}`).textContent = `$${parseFloat(res.data.price).toFixed(2)}`
        
        // display the error/success message
        new Noty({
            type: res.data.flagCode < 0 ? 'error':'success',
            timeout: 1000,
            text: status,
            progressBar: false
        }).show();
    }).catch(err => {
        console.log(err)
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false
        }).show();
    })
}

// if order now button is clicked
if(document.querySelector("#order-link")){
    let orderBtn = document.querySelector(".orderBtn").getAttribute("data-in");
    document.querySelector("#order-link").setAttribute("rel", "modal:close");
    document.querySelector("#order-link").addEventListener('click', (e) => {
        // if logged in display order model
        if(orderBtn){
            document.querySelector("#order-link").setAttribute("rel", "modal:open");
        // if not display error
        }else {
            new Noty({
                type: 'error',
                timeout: 1000,
                text: 'Create an account before checking out',
                progressBar: false
            }).show();
        }
    })
}