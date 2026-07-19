/* Any JavaScript here will be loaded for all users on every page load. */
mw.loader.getScript("https://cdn.jsdelivr.net/npm/@twemoji/api@latest/dist/twemoji.min.js")
.then(function () {

    function convertEmoji() {
        if (window.twemoji) {
            twemoji.parse(document.body, {
                folder: "svg",
                ext: ".svg"
            });
        }
    }

    // Initial page load
    convertEmoji();

    // Catch Fandom dynamic content (comments, widgets, etc.)
    const observer = new MutationObserver(function () {
        convertEmoji();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

});


window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 180;