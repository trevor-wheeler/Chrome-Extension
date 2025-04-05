function main() {
  const reelsPage = document.querySelector('.x1i10hfl[href="/reels/"]').parentElement.parentElement.parentElement;
  const explorePage = document.querySelector('.x1i10hfl[href="/explore/"]').parentElement.parentElement.parentElement;

  const reelsInDMs = Array.from(document.querySelectorAll('.x1ey2m1c.xds687c.x17qophe.x10l6tqk.x13vifvy.x6m44yg'))
  .map(result => result.parentElement.parentElement.parentElement);

  const reelsInDMsReplies = Array.from(document.querySelectorAll('.x1tlxs6b.x1g8br2z.x1gn5b1j.x230xth.x6ikm8r.x10wlt62.x19g9edo.x1n2onr6'))
  .map(result => result.parentElement.parentElement.parentElement.parentElement);

  console.log(reelsInDMs);

  blockContent('ig-reel-page', [reelsPage]);
  blockContent('ig-explore-page', [explorePage]);
  blurContent('ig-reels-dms', [reelsInDMs, reelsInDMsReplies]);
}

function blurContent(option, elements) {
  chrome.storage.sync.get([option], data => {
    try {
      if (data[option] === undefined) {
        throw new Error();
      }

      elements.forEach(element => {
        // If it's a NodeList or array of elements
        if (element && typeof element.length === 'number' && element.length > 0) {
          for (let i = 0; i < element.length; i++) {
            handleBlur(data[option], element[i], option);
          }
        }
        // If it's a single element
        else if (element && typeof element.length !== 'number') {
          handleBlur(data[option], element, option);
        }
      });
    }
    catch {
      window.getDefaultState(option).then(state => {
        chrome.storage.sync.set({ [option]: state });
        blurContent(option, elements);
      });
    }
  });
}

function handleBlur(optionState, element, option) {
  // Ensure element is positioned relatively so overlay can be absolutely positioned inside
  if (getComputedStyle(element).position === 'static') {
    element.style.position = 'relative';
  }

  const overlayClass = `blur-overlay-${option}`;

  // If the option is enabled
  if (optionState) {
    // And the blur isn't applied yet
    if (!element.querySelector('.focus-blur')) {
      // Create a new div
      const blur = document.createElement('div');
      blur.className = 'focus-blur';
      // Apply blur to the div
      Object.assign(blur.style, {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backdropFilter: 'blur(15px)',
        zIndex: 9998,
        backgroundColor: 'rgba(255,255,255,0.01)',
        borderRadius: '15px',
      });
      // Append the div to the element
      element.appendChild(blur);

      // Create icon
      const icon = document.createElement('div');
      icon.className = 'focus-blur-icon';
      icon.style.position = 'absolute';
      icon.style.zIndex = '9999'
      icon.style.width = '30%';
      icon.innerHTML = `<svg id="logo" width="100%" viewBox="0, 0, 400,402.6845637583893"><g id="svgg"><path id="path0" d="M98.409 1.321 C 51.683 8.366,14.219 43.572,3.130 90.858 C -1.063 108.738,-0.538 299.468,3.747 314.765 C 15.506 356.751,45.886 387.135,87.919 398.948 C 104.766 403.683,295.234 403.683,312.081 398.948 C 354.223 387.105,384.429 356.897,396.262 314.765 C 401.036 297.765,401.032 106.700,396.257 87.919 C 386.058 47.804,356.480 17.012,316.107 4.481 L 304.027 0.731 204.698 0.501 C 150.067 0.375,102.237 0.744,98.409 1.321 M245.132 65.436 L 266.916 102.013 218.916 102.013 L 170.915 102.013 149.216 66.059 C 137.281 46.284,127.517 29.665,127.517 29.129 C 127.517 28.593,149.079 28.313,175.432 28.507 L 223.348 28.859 245.132 65.436 M302.685 30.200 C 334.978 36.957,370.470 73.929,370.470 100.813 C 370.470 101.489,354.981 102.013,335.033 102.013 L 299.596 102.013 278.321 66.243 C 266.620 46.569,256.846 29.958,256.600 29.330 C 255.837 27.383,292.530 28.076,302.685 30.200 M116.886 66.779 L 138.235 102.013 83.882 102.013 C 50.515 102.013,29.530 101.522,29.530 100.740 C 29.530 78.602,56.784 45.444,84.352 34.042 C 95.012 29.634,93.390 28.001,116.886 66.779 M371.765 211.074 C 371.716 296.785,371.278 304.033,365.229 319.216 C 355.391 343.906,332.415 364.127,305.857 371.465 C 292.505 375.155,107.065 375.063,93.960 371.361 C 69.326 364.401,49.250 348.011,38.291 325.912 C 28.442 306.052,28.289 304.302,28.235 211.074 L 28.188 130.201 200.000 130.201 L 371.812 130.201 371.765 211.074 M191.275 155.110 C 189.799 155.452,185.268 156.377,181.208 157.167 C 119.990 169.071,88.385 249.486,124.817 300.650 C 127.327 304.175,127.470 305.213,126.085 309.837 C 122.790 320.834,132.819 330.913,143.787 327.627 C 148.614 326.180,149.702 326.453,161.379 332.041 C 242.219 370.722,325.151 288.019,286.516 207.249 L 280.674 195.035 283.407 189.511 C 290.003 176.179,277.503 163.693,264.167 170.291 C 258.645 173.023,258.620 173.023,254.904 170.377 C 239.761 159.594,206.446 151.601,191.275 155.110 M218.448 185.798 C 226.150 187.849,237.584 193.002,237.584 194.423 C 237.584 197.509,148.810 283.721,147.529 281.879 C 116.137 236.750,164.372 171.402,218.448 185.798 M263.287 226.253 C 282.565 279.972,228.554 329.403,175.224 306.848 L 169.911 304.601 214.113 260.384 C 238.424 236.065,258.789 216.642,259.370 217.222 C 259.950 217.802,261.713 221.866,263.287 226.253 " stroke="none" fill="#dbdbdb60" fill-rule="evenodd"></path></g></svg>`;
      // Append icon to blur div
      blur.appendChild(icon);
      // Make the element unclickable
      element.style.pointerEvents = 'none';
    }
  } 
  // If the option is disabled and the blur exists
  else if (element.querySelector('.focus-blur')) {
    // Delete the blur
    element.querySelector('.focus-blur').remove();
    // Make the element clickable
    element.style.pointerEvents = 'auto';
  }
}

function blockContent(option, elements) {
  // Check local storage for option state
  chrome.storage.sync.get([option], data => {
    try {
      // If option state is undefined throw an error
      if (data[option] === undefined) {
        throw new Error();
      }
      // For each element that needs to be blocked/unblocked
      elements.forEach(element => {
        // If the element exists and it is a list/array
        if (element && typeof element.length === 'number' && element.length > 0) {
          // For each element in that array
          for (let i = 0; i < element.length; i++) {
            // If the option is enabled in local storage hide the element
            if (data[option]) {
              element[i].setAttribute('hidden', '');
            }
            // If the option is disabled in local storage unhide the element
            else {
              element[i].removeAttribute('hidden');
            }
          }
        }
        // If the element exists and it is not a list/array
        else if (element && typeof element.length !== 'number') {
          // If the option is enabled in local storage hide the element
          if (data[option]) {
            element.setAttribute('hidden', '');
          }
          // If the option is disabled in local storage unhide the element
          else {
            element.removeAttribute('hidden');
          }
        }
      });
    }
    // If Error was thrown
    catch {
      // Set the option state in local storage to default state
      window.getDefaultState(option).then(state => {
        chrome.storage.sync.set({[option]: state});
        // Rerun blockContent function
        blockContent(option, elements);
      });
    }
  });
}

// If document changes reload script
var observer = new MutationObserver(main);
var observerConfig = {childList: true, subtree: true};
observer.observe(document.documentElement, observerConfig);

// If local storage changes reload script
chrome.storage.onChanged.addListener(main);