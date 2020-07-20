/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

importArticles({
    type: "style",
    articles: [
        "w:c:dev:InterlanguageFlags/code.css"
    ]
});

window.railWAM = {
    logPage:"Project:WAM Log"
};