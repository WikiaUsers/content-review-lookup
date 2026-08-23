/* Any JavaScript here will be loaded for all users on every page load. */
/* https://dev.fandom.com/wiki/MisspelledPage */
window.deletedToo = true;

/* Fixing the wrong output for Achievements on userpages (currently, there are <br />s inside the text, treated as part of the string rather than an actual html element) */
function fixBadgeBreaks(root = document) {
    root.querySelectorAll('.profile-hover-text p').forEach(function (paragraph) {
        const walker = document.createTreeWalker(
            paragraph,
            NodeFilter.SHOW_TEXT
        );

        const nodes = [];

        while (walker.nextNode()) {
            nodes.push(walker.currentNode);
        }

        nodes.forEach(function (node) {
            node.nodeValue = node.nodeValue.replace(
                /\s*<br\s*\/?>\s*/gi,
                ' '
            );
        });
    });
}

fixBadgeBreaks();

new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
            if (node.nodeType !== Node.ELEMENT_NODE) {
                return;
            }

            if (node.matches('.profile-hover-text')) {
                fixBadgeBreaks(node.parentNode);
            } else if (node.querySelector('.profile-hover-text')) {
                fixBadgeBreaks(node);
            }
        });
    });
}).observe(document.body, {
    childList: true,
    subtree: true
});
/**/