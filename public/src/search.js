let searchBar = document.querySelector(".search").firstElementChild

searchBar.addEventListener("keydown", (e)=>{
    if(e.key == "Enter"){
        console.log(e.target.value)
    }
})