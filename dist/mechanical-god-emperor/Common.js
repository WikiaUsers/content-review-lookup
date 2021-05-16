/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "style",
    articles: [
        "w:c:dev:MediaWiki:FontAwesome.css"
    ]
});

$(function addPageBottom() {
        $("#WikiaRail").append('{{Translated}}');
});
window.countdownTimer = {
    myFunction: function () {
       $(this).text(' MGE TL has been completed!');
    }
};