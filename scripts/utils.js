// Create a global function
window.getDefaultState = option => {
  // Open default configuration file
  return fetch(chrome.runtime.getURL('data/defaultconfig.json'))
  .then(response => response.json())
  // Return default option state
  .then(data => data[option]);
}