// popup.js
document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.option-tile');

    const navBtns = document.querySelectorAll('.nav-btn');

    navBtns.forEach(navBtn => {
        navBtn.addEventListener('click', () => {
            navigate('home', navBtn.dataset.page);
        });
    });

   options.forEach(option => {
    option.addEventListener('click', () => {
        const checkbox = option.querySelector('.form-check-input');
        
        console.log(checkbox);
        
        checkbox.checked = !checkbox.checked;
    });
   });
});

function navigate(close, open) {
    document.getElementById(close).classList.toggle('open');
    document.getElementById(open).classList.toggle('open');
}