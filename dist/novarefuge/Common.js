SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

function forceExpandCategories() {
    // Remove collapse state Fandom injects
    document.querySelectorAll('.mw-collapsed').forEach(el => {
        el.classList.remove('mw-collapsed');
    });

    // Force all collapsible content visible
    document.querySelectorAll('.mw-collapsible-content').forEach(el => {
        el.style.display = 'block';
        el.style.height = 'auto';
        el.style.maxHeight = 'none';
    });

    // Fandom category tree specific
    document.querySelectorAll('.CategoryTreeChildren').forEach(el => {
        el.style.display = 'block';
    });
}

// Run multiple times because Fandom re-applies it
window.addEventListener('load', () => {
    forceExpandCategories();
    setTimeout(forceExpandCategories, 500);
    setTimeout(forceExpandCategories, 1500);
});

setInterval(() => {
    document.querySelectorAll('.mw-collapsed').forEach(el => {
        el.classList.remove('mw-collapsed');
    });

    document.querySelectorAll('.mw-collapsible-content, .CategoryTreeChildren').forEach(el => {
        el.style.display = 'block';
    });
}, 1000);