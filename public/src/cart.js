function updateCart(choice) {
    axios.post('/update-cart', choice).then((res) => {
        console.log(res)
        if(res.data.quantityT == -1){
            new Noty({
                type: 'error',
                timeout: 1000,
                text: 'Exceeded Quantitiy',
                progressBar: false
            }).show();
        }
        else{
            document.querySelector('.cartCtr').innerText = res.data.quantityT
            new Noty({
                type: 'success',
                timeout: 1000,
                text: 'item added to cart',
                progressBar: false
            }).show();
            if(document.querySelector(`#cart-qty-${choice.product_id}`)){
                let qtyButton = document.querySelector(`#cart-qty-${choice.product_id}`)
                qtyButton.textContent = `${res.data.quantity} pcs`
            }
        }

        if(document.querySelector(`#cart-amount`)) {
            let amountButton = document.querySelector(`#cart-amount`);
            amountButton.textContent = `$${parseFloat(res.data.priceT).toFixed(2)}`;
        }

        if(document.querySelector(`#row-price-${choice.product_id}`)) {
            let rowPrice = document.querySelector(`#row-price-${choice.product_id}`);
            rowPrice.textContent = `$${parseFloat(res.data.price).toFixed(2)}`;
        }

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
function removeItemCart(choice){
    axios.post('/remove-cart', choice).then((res) => {
        console.log(res)
        if(res.data.quantity == 0) {
            let qtyButton = document.querySelector(`#cart-qty-${choice.product_id}`);
            qtyButton.parentNode.remove();
        }
        else{
            document.querySelector('.cartCtr').innerText = res.data.quantityT
            new Noty({
                type: 'success',
                timeout: 1000,
                text: 'item removed from cart',
                progressBar: false
            }).show();
            if(document.querySelector(`#cart-qty-${choice.product_id}`)){
                let qtyButton = document.querySelector(`#cart-qty-${choice.product_id}`)
                qtyButton.textContent = `${res.data.quantity} pcs`
            }
        }

        if(document.querySelector(`#cart-amount`)) {
            let amountButton = document.querySelector(`#cart-amount`);
            amountButton.textContent = `$${parseFloat(res.data.priceT).toFixed(2)}`;
        }

        if(document.querySelector(`#row-price-${choice.product_id}`)) {
            let rowPrice = document.querySelector(`#row-price-${choice.product_id}`);
            rowPrice.textContent = `$${parseFloat(res.data.price).toFixed(2)}`;
        }

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

let addToCart = document.querySelectorAll(".add-to-cart");
addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let choice = JSON.parse(btn.dataset.choice);
       updateCart(choice);
    })
});

if(document.querySelectorAll(".remove-from-cart").length > 0){
    let removeFromCart = document.querySelectorAll(".remove-from-cart")
    removeFromCart.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            console.log(e)
            let choice = JSON.parse(btn.dataset.choice);
            removeItemCart(choice);
        })
    })
}


if(document.querySelector(".orderBtn")){
    let orderBtn = document.querySelector(".orderBtn").getAttribute("data-in");
    document.querySelector('.orderBtn').addEventListener('click', (e) => {
        console.log(orderBtn);
        if(orderBtn){
            
        }else {
            //not logged in
            new Noty({
                type: 'error',
                timeout: 1000,
                text: 'Create an account before checking out',
                progressBar: false
            }).show();
        }
    })
}