const card = document.querySelector('.card')
card.addEventListener('click', (e) => {
    
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var modal = document.getElementById('modal');
    modal.classList.toggle('active');
});
