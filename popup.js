// popup.js
document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.option-tile');

    const navBtns = document.querySelectorAll('.nav-btn');

    navBtns.forEach(navBtn => {
        navBtn.addEventListener('click', () => {
            navigate(navBtn.dataset.pageClose, navBtn.dataset.pageOpen);
        });
    });

   options.forEach(option => {
    option.addEventListener('click', () => {
        const checkbox = option.querySelector('.form-check-input');
        
        checkbox.checked = !checkbox.checked;
    });
   });
});

function navigate(close, open) {

    if (close === 'home') {
        document.getElementById(close).style.transform = 'translateX(-200px)';
        document.getElementById(open).style.transform = 'translateX(-200px)';
    }
    else {
        document.getElementById(close).style.transform = 'translateX(0px)';
        document.getElementById(open).style.transform = 'translateX(0px)';
    }
}