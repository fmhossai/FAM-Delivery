const con1 = document.querySelectorAll('.content-1');
const blur = document.getElementById('blur');
const closeBtn = document.querySelector('.closeBtn');

let productId;

con1.forEach(element => {
    element.addEventListener('click', (e) => {
        blur.classList.toggle('active');
        productId = parseInt(element.dataset.pid);
        let reviewInfo = `${element.dataset.pn} | ${element.dataset.pc} | ${element.dataset.pr ? element.dataset.pr : "No ratings"}`;
        console.log(reviewInfo);
        document.querySelector(".rInfo").innerHTML = reviewInfo;
        document.getElementById('modal').classList.toggle('active');
    });
});

closeBtn.addEventListener('click', (e) => {
    blur.classList.toggle('active');
    document.getElementById('modal').classList.toggle('active');
});

document.querySelector('.reviewBtn').addEventListener('click', (e) => {
    let description = document.querySelector(".ta").value;
    let selected;

    if(document.getElementById('rate-5').checked) selected = document.getElementById("rate-5").value;
    else if(document.getElementById('rate-4').checked) selected = document.getElementById("rate-4").value;
    else if(document.getElementById('rate-3').checked) selected = document.getElementById("rate-3").value;
    else if(document.getElementById('rate-2').checked) selected = document.getElementById("rate-2").value;
    else if(document.getElementById('rate-1').checked) selected = document.getElementById("rate-1").value;

    axios.post("/reviews", {productId:productId, selected:selected, description:description}).then((res)=>{
        console.log(res);
    })
    
    blur.classList.toggle('active');
    document.getElementById('modal').classList.toggle('active');
})