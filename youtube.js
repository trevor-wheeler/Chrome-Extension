// main script

function removecontent() {

    try {
        var nav = document.getElementById('sections').children[0].lastElementChild.children[1];
    }
    catch (error) {
        nav = undefined;
    }

    try {
        var smallnav = document.getElementsByTagName('ytd-mini-guide-entry-renderer')[1];
    }
    catch (error) {
        smallnav = undefined;
    }

    try {
        var homepage = document.getElementsByTagName('ytd-rich-section-renderer');
    }
    catch (error) {
        homepage = undefined;
    }

chrome.storage.sync.get(['shorts'], function(data) {
    
    if (data.shorts == true) {
        if (nav != undefined) {
            nav.setAttribute("hidden", "");
        }
        if (smallnav != undefined) {
            smallnav.setAttribute("hidden", "");
        }
        if (homepage != undefined) {
            for (let i = 0; i < homepage.length; i++) {
                homepage[i].setAttribute("hidden", "");
            }
        }
    }
    else {
        if (nav != undefined && nav.hasAttribute("hidden")) {
            nav.removeAttribute("hidden");
        }
        if (smallnav != undefined && smallnav.hasAttribute("hidden")) {
            smallnav.removeAttribute("hidden");
        }
        if (homepage.length > 0 && homepage[0].hasAttribute("hidden")) {
            for (let i = 0; i < homepage.length; i++) {
                homepage[i].removeAttribute("hidden");
            }
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