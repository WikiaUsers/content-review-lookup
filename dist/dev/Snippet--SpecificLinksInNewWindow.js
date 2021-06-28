/* from https://nkch.fandom.com/wiki/MediaWiki:Snippet/SpecificLinksInNewWindow.js */
/**
 * @source https://www.mediawiki.org/wiki/Snippets/Open_specific_links_in_new_window
 * @version 2018-09-15
 */
$(function () {
    $("#mw-content-text").on("click", ".newwin > a", function () {
        var otherWindow = window.open();
        otherWindow.opener = null;
        otherWindow.location = this;
        return false;
    });
});