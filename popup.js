// popup.js
document.addEventListener('DOMContentLoaded', function() {
    const instagram = document.getElementById('instagram');
    const youtube = document.getElementById('youtube');

    // check storage for saved options
    chrome.storage.sync.get(['reels'], function(data) {
        if (data.reels == false) {
            instagram.checked = false;
        }
        else {
            instagram.checked = true;
        }
    });

    chrome.storage.sync.get(['shorts'], function(data) {
        if (data.shorts == false) {
            youtube.checked = false;
        }
        else {
            youtube.checked = true;
        }
    });

    // when checkbox is switched update storage
    instagram.addEventListener('change', function() {
        if (instagram.checked) {
            console.log('Turning off Instagram Reels');
            chrome.storage.sync.set({reels: true});
        } else {
            console.log('Turning on Instagram Reels');
            chrome.storage.sync.set({reels: false});
        }
    });

    youtube.addEventListener('change', function() {
        if (youtube.checked) {
            console.log('Turning off Youtube Shorts');
            chrome.storage.sync.set({shorts: true});
        } else {
            console.log('Turning on Youtube Shorts');
            chrome.storage.sync.set({shorts: false});
        }
    });
});