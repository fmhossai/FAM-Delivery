
let getForms = document.querySelectorAll(".form-profile")

document.addEventListener("DOMContentLoaded", (e) => {
    if(document.querySelector("#Password")){
        let ele = document.querySelector("#Password");
        ele.addEventListener("input", (e) => {
            e.target.value = "*".repeat(e.target.value.length);
        })
    }
    if(document.querySelector("#columnPassword")){
        let ele = document.querySelector("#columnPassword");
        ele.textContent = ele.textContent.replace(/./g, "*")
    }
})

function checkForString(val){
    if((val == "name") || (val == "streetname") || (val == "city") || (val == "country")){
        return true;
    }
    return false;
}
function checkForInput(type, val){
    if(type == "streetno"){
        let reg = /^\d+$/
        return (reg.test(val))
    }
    if(type == "name"){
        let reg = /^\D+$/
        return (reg.test(val))
    }
    if(type == "streetname"){
        let reg = /^\D+$/
        return (reg.test(val))
    }
    if(type == "country"){
        let reg = /^\D+$/
        return (reg.test(val))
    }
    if(type == "city"){
        let reg = /^\D+$/
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
        console.log(event.target.children)
        const ID = event.target.children[1].id.toLowerCase()
        if(event.target.children[1].value == ""){
            let instance = tippy(document.getElementById(`${event.target.children[1].id}`), {
                content: "Field is blank",
                placement: "top",
                trigger: 'manual',
            })
            instance.show()
            event.preventDefault()
        }
        else if (checkForInput(ID, event.target.children[1].value)){
            e.submit()
        }
        else{
            if(ID == "streetno"){
                let instance = tippy(document.getElementById(`${event.target.children[1].id}`), {
                    content: "Street no must be all numbers",
                    placement: "top",
                    trigger: 'manual',
                })
                console.log(instance)
                instance.show()
            }
            if(checkForString(ID)){
                let instance = tippy(document.getElementById(`${event.target.children[1].id}`), {
                    content: `${event.target.children[1].getAttribute("data")} must be all letters`,
                    placement: "top",
                    trigger: 'manual',
                })
                console.log(instance)
                instance.show()
            }
            if(ID == "phone"){
                let tippyInstance = tippy(document.getElementById(`${event.target.children[1].id}`), {
                    content: "Phone number must be all numbers",
                    placement: "top",
                    trigger: "manual"
                })
                tippyInstance.show()
            }
            event.preventDefault()
        }
    })
})