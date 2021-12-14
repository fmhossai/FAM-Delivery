let searchBar = document.querySelector(".search").firstElementChild

searchBar.addEventListener("keydown", (e)=>{
    if(e.key == "Enter"){
        console.log(e.target.value)
        let params = new URLSearchParams({string: e.target.value});
        window.location.replace(`/search?${params.toString()}`)
    }
})