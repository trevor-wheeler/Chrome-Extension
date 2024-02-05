// main script
function removecontent() {

    try {
        var explore = document.querySelector(".x1iyjqo2.xh8yej3:not(.x1n2onr6)").children[2];
    }
    catch (error) {
        explore = undefined;
    }

    try {
        var reels = document.querySelector(".x1iyjqo2.xh8yej3:not(.x1n2onr6)").children[3]; 
    }
    catch (error) {
        reels = undefined;
    }

chrome.storage.sync.get(['reels'], function(data) {
    if (data.reels != false) {
        if (explore != undefined) {
            explore.setAttribute("hidden", "");
        }
        if (reels != undefined) {
            reels.setAttribute("hidden", "");
        }
    }
    else {
        if (explore != undefined && explore.hasAttribute("hidden")) {
            explore.removeAttribute("hidden");
        }
        if (reels != undefined && reels.hasAttribute("hidden")) {
            reels.removeAttribute("hidden");
        }
    }
});
}

// run script
removecontent();

// if document changes reload script
var observer = new MutationObserver(removecontent);
var observerConfig = {childList: true, subtree: true};
observer.observe(document.documentElement, observerConfig);

// if storage changes reload script
chrome.storage.onChanged.addListener(function(changes, namespace) {
    removecontent();
});