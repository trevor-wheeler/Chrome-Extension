// Wait until content is loaded
document.addEventListener('DOMContentLoaded', () => {

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

    // When clicked
    option.addEventListener('click', () => {
      // If checkbox is checked, uncheck it and update state in local storage/vice versa 
      if (checkbox.checked) {
        checkbox.checked = false;
        chrome.storage.sync.set({[checkbox.dataset.option]: false});
      } else {
        checkbox.checked = true;
        chrome.storage.sync.set({[checkbox.dataset.option]: true});
      }
      // Toggle styling
      toggleOptionStyling(checkbox.checked, option);
    });

    // Check local storage for option state
    chrome.storage.sync.get([checkbox.dataset.option], data => {
      // If option state is true check the checkbox
      if (data[checkbox.dataset.option] === true) {
        checkbox.checked = true;
      }
      // If option state is false uncheck the checkbox
      else if (data[checkbox.dataset.option] === false) {
        checkbox.checked = false;
      }
      // If option state is not yet stored in local storage, or is an invalid value
      else {
        // Set the option state in local storage to default state
        window.getDefaultState(checkbox.dataset.option).then(state => {
          chrome.storage.sync.set({[checkbox.dataset.option]: state});
          // Toggle the checkbox accordingly
          checkbox.checked = state;
          toggleOptionStyling(checkbox.checked, option);
        });
      }

      // Toggle styling
      toggleOptionStyling(checkbox.checked, option);
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

function toggleOptionStyling(state, option) {
  if (!state) {
    option.classList.add('option-disabled');
  }
  else {
    option.classList.remove('option-disabled');
  }
}