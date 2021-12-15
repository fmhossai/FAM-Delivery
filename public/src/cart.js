function updateCart(choice) {
    axios.post('/update-cart', choice).then((res) => {
        document.querySelector('.cartCtr').innerText = res.data.quantityT
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'item added to cart',
            progressBar: false
        }).show();
    }).catch(err => {
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
        console.log(choice);
       updateCart(choice);
    })
});


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