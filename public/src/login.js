let switchCtn = document.querySelector("#alternate");
let switchC1 = document.querySelector("#altLogin");
let switchC2 = document.querySelector("#altSignUp");
let switchBtn = document.querySelectorAll(".alternateBtn");
let aContainer = document.querySelector("#signUpContainer");
let bContainer = document.querySelector("#loginContainer");
let login = document.querySelector("#loginContainer").getAttribute("data");

let changeForm = (e) => {
    let root = document.querySelector(":root")
    root.style.setProperty("--transitionvalue", "1.25s")


    switchCtn.classList.add("is-gx");
    setTimeout(function(){
        switchCtn.classList.remove("is-gx");
    }, 1500)

    switchCtn.classList.toggle("is-txr");
    switchC1.classList.toggle("is-hidden");
    switchC2.classList.toggle("is-hidden");
    aContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-z200"); 
}

let mainF = (e) => {
    if(login == "true"){
        let root = document.querySelector(":root")
        root.style.setProperty("--transitionvalue", "0s")
        switchCtn.classList.add("is-txr");
        switchC1.classList.add("is-hidden");
        switchC2.classList.remove("is-hidden");
        aContainer.classList.add("is-txl");
        bContainer.classList.add("is-txl");
        bContainer.classList.add("is-z200"); 
    }
    for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm)
}

window.addEventListener("load", mainF);
