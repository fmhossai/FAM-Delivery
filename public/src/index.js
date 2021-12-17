const card = document.querySelector('.card');
const blur = document.getElementById('blur');
const closeBtn = document.querySelector('.closeBtn');

card.addEventListener('click', (e) => {
    blur.classList.toggle('active');
    document.getElementById('modal').classList.toggle('active');
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
    console.log(selected, description);
})
