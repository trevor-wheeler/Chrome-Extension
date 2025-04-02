// Wait until content is loaded
document.addEventListener('DOMContentLoaded', function() {

  // Variables
  const options = document.querySelectorAll('.option-tile');
  const navBtns = document.querySelectorAll('.nav-btn');
  const moreBtns = document.querySelectorAll('.more-tile');

  // For each navigation button
  navBtns.forEach(navBtn => {
    // When clicked
    navBtn.addEventListener('click', () => {
      // Call navigation function
      navigate(navBtn.dataset.pageClose, navBtn.dataset.pageOpen);
    });
  });

  // For each button in the more section
  moreBtns.forEach(moreBtn => {
    // When clicked
    moreBtn.addEventListener('click', () => {
      // Check the id of the button and redirect to the correct page
      switch (moreBtn.id) {
        case 'donate-btn':
          window.open("https://buy.stripe.com/8wM4hpf1S3NebD23cc", "_blank");
          break;
        case 'github-btn':
          window.open("https://github.com/trevor-wheeler/Chrome-Extension", "_blank");
          break;
        case 'contact-btn':
          window.open("https://www.trevorwheeler.com/contact", "_blank");
          break;
      }
    });
  });

  // For each option
  options.forEach(option => {
    // Select the corresponding toggle switch/checkbox
    const checkbox = option.querySelector('.form-check-input');

    // If the option is disabled apply the correct styling
    if (!checkbox.checked) {
      option.classList.toggle('option-disabled');
    }

    // When clicked
    option.addEventListener('click', () => {
      // Flip the toggle switch
      checkbox.checked = !checkbox.checked;
      // Toggle styling
      option.classList.toggle('option-disabled');
    });
  });
});

function navigate(close, open) {

  // If the page that is being closed is the home page
  if (close === 'home') {
    // Hide the homepage 200 pixels to the right
    document.getElementById(close).style.transform = 'translateX(-200px)';
    // Unhide config page that was hiding 200 pixels to the left
    document.getElementById(open).style.transform = 'translateX(-200px)';
  }
  // If the page that is being closed is not the home page
  else {
    // Open the homepage by resetting transform properties
    document.getElementById(close).style.transform = 'translateX(0px)';
    document.getElementById(open).style.transform = 'translateX(0px)';
  }
}