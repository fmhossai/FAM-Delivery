
let getForms = document.querySelectorAll(".form-profile")

function checkForInput(type, val){
    console.log(type)
    console.log(val)
    if(type == "streetno"){
        let reg = /^\d+$/
        console.log(reg.test(val))
        return (reg.test(val))
    }
    if(type == "phone"){
        let reg = /^\d+$/
        return (reg.test(val))
    }
    return true;
}

getForms.forEach((e) => {
    e.addEventListener("submit", (event) => {
        // console.log("hi")
        // tippyInstance.destroy()
        console.log(event.target.children)
        console.log(event.target.children[1].value)
        if(event.target.children[1].value == ""){
            let instance = tippy(document.getElementById(`${event.target.children[1].id}`), {
                content: "Field is blank",
                placement: "bottom",
                trigger: 'manual',
            })
            instance.show()
            event.preventDefault()
        }
        else if(checkForInput(event.target.children[1].id.toLowerCase(), event.target.children[1].value)){
            e.submit();
        }
        else{
            if(event.target.children[1].id.toLowerCase() == "streetno"){
                let instance = tippy(document.getElementById(`${event.target.children[1].id}`), {
                    content: "Street no must be all numbers",
                    placement: "bottom",
                    trigger: 'manual',
                })
                console.log(instance)
                instance.show()
            }
            if(event.target.children[1].id.toLowerCase() == "phone"){
                let tippyInstance = tippy(document.getElementById(`${event.target.children[1].id}`), {
                    content: "Phone number must be all numbers",
                    placement: "bottom",
                    trigger: "manual"
                })
                tippyInstance.show()
            }
            event.preventDefault()
        }
    })
})