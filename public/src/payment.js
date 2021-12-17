const card_number = document.querySelector("#card-number")
const card_name = document.querySelector("#card-name")
const card_date = document.querySelector("#card-date")
const card_cvv = document.querySelector("#card-cvv")
let payment_form = document.querySelector("#payment-form")

function validatePayment(type, val){
    if(val == ""){
        return [false, "Field is blank"];
    }
    if(type == "card-name"){
        let reg = /^\D+$/
        return [(reg.test(val)), "Invalid - must be all letters"]
    }
    if(type == "card-number"){
        let reg = /^\d+$/
        return [(reg.test(val)), "Invalid - must be all numbers"]
    }
    if(type == "card-date"){
        let reg = /^\d\d\/\d\d$/ig
        return [(reg.test(val)), "Invalid - must be in form 01/01"]
    }
    if(type == "card-cvv"){
        let reg = /^\d+$/
        return [(reg.test(val)), "Invalid - must be all numbers"]
    }

}

payment_form.addEventListener("submit", (e) => {
    console.log(e.target.children)
    let inputChildren = e.target.querySelectorAll('input')
    for(let element of inputChildren){
        if(!validatePayment(element.id, element.value)[0]){
            let instance = tippy(document.getElementById(`${element.id}`), {
                content: `${validatePayment(element.id)[1]}`,
                placement: "right",
                trigger: 'manual',
                maxWidth: 100,
            })
            instance.show()
            e.preventDefault();
            return;
        }
    }
    payment_form.submit();
    
})