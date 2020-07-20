/* Any JavaScript here will be loaded for all users on every page load. */
{{Sidebar}}
{{Specials}}
/**
 * Replaces NikkiSarah with the name of the user browsing the page.
 * For usage with Template:USERNAME.
 */
$(function () {
    $('.insertusername').html(mediaWiki.config.get("wgUserName"));
});