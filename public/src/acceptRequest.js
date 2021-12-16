let acceptRequest = document.querySelectorAll(".acceptBtn");
acceptRequest.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let choice = JSON.parse(btn.dataset.choice);
        console.log(choice);
        const reqId = choice.request_id;

        e.target.setAttribute("name", "btn");
        e.target.setAttribute("value", reqId);
    })
});