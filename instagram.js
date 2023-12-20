// main script
function removecontent() {
    var nav = document.querySelector(".x1iyjqo2.xh8yej3:not(.x1n2onr6)");
chrome.storage.sync.get(['reels'], function(data) {
    if (data.reels == true) {
        nav.children[2].setAttribute("hidden", "");
        nav.children[3].setAttribute("hidden", "");
    }
    else if (nav.children[2].hasAttribute("hidden")) {
        nav.children[2].removeAttribute("hidden");
        nav.children[3].removeAttribute("hidden");
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