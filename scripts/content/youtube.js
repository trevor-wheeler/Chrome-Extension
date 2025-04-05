function main() {
  // Element Variables
  const nav = document.getElementById('sections')?.children[0]?.lastElementChild?.children[1];
  const collapsedNav = document.getElementsByTagName('ytd-mini-guide-entry-renderer')[1];
  const homepageShorts = document.getElementsByTagName('ytd-rich-section-renderer');
  const sidebarShorts = document.getElementsByTagName('ytd-reel-shelf-renderer');

  const searchShortsResults = Array.from(document.querySelectorAll('badge-shape[aria-label="Shorts"]'))
  .map(result => result.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement);


  // Block content
  blockContent('yt-shorts-page', [nav, collapsedNav]);
  blockContent('yt-shorts-home', [homepageShorts, sidebarShorts]);
  blockContent('yt-shorts-search', [searchShortsResults]);

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
