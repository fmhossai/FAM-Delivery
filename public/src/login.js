let switchCtn = document.querySelector("#alternate");
let switchC1 = document.querySelector("#altLogin");
let switchC2 = document.querySelector("#altSignUp");
let switchBtn = document.querySelectorAll(".alternateBtn");
let aContainer = document.querySelector("#signUpContainer");
let bContainer = document.querySelector("#loginContainer");
let allButtons = document.querySelectorAll(".submit");
let login = document.querySelector(".login").getAttribute("data");

let getButtons = (e) => e.preventDefault()

document.addEventListener("DOMContentLoaded", function(event) {
    console.log(login)
    /*
    if(!login) {
        switchCtn.classList.toggle("is-txr");
        switchC1.classList.toggle("is-hidden");
        switchC2.classList.toggle("is-hidden");
        aContainer.classList.toggle("is-txl");
        bContainer.classList.toggle("is-txl");
        bContainer.classList.toggle("is-z200");
    }
    */
   if(login){
        switchC1.classList.remove("is-hidden");
        switchC2.classList.add("is-hidden");
        aContainer.classList.remove("is-txl");
        bContainer.classList.add("is-z200");
   }else {
        switchC1.classList.add("is-hidden");
        switchC2.classList.remove("is-hidden");
        aContainer.classList.add("is-txl");
        bContainer.classList.remove("is-z200");
   }
});


let changeForm = (e) => {

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
    for (var i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener("click", getButtons );
    for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm)
}

window.addEventListener("load", mainF);
