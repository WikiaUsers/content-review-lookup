/**
 * Add stuff to user menu
 */
jQuery(function ($) {
    $("#AccountNavigation").find("ul").prepend(
        '<li><a href="/wiki/Special:Contributions/' + mw.config.get("wgUserName") + '">Contributions</a></li>' + 
        '<li><a href="/wiki/Special:Following">Followed Pages</a></li>'
    );
});