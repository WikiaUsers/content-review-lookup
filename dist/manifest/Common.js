/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'u:dev:ReferencePopups/code.js',
    ]
});
(function() {
    var a = localStorage.getItem('RefPopupsJS');
    a = a ? JSON.parse(a) : {react: "hover", hoverDelay: 200, animate: true, disabled: false, stick: false};
    a.animate = true;
    localStorage.setItem('RefPopupsJS', JSON.stringify(a));
}());
importArticles({
    type: "script",
    articles: [
        "w:dev:AjaxRC/code.js",
    ]
});
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
window.MessageWallUserTags = {
    tagColor: '#000',
    glow: false,
    users: {
        'Matheus1234zx': 'Admin',
        'Schroeswald': 'Admin',
        'Lightwielder13': 'Content Mod',
    }
};