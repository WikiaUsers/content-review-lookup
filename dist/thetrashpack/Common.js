/**
 * Replaces {{USERNAME}} with the name of the user browsing the page.
 * For usage with Template:USERNAME.
 */
$(function () {
    $('.insertusername').html(mediaWiki.config.get("wgUserName"));
});