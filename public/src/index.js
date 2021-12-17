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
})

