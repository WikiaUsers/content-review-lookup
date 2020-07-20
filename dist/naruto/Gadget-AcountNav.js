/**
 * Add stuff to user menu
 */
jQuery(function ($) {
    $(".wds-global-navigation__user-menu .wds-dropdown__content").find("ul").prepend(
        '<li><a class="wds-global-navigation__dropdown-link" href="/wiki/Special:Contributions/' + mw.config.get("wgUserName") + '">Contributions</a></li>' + 
        '<li><a class="wds-global-navigation__dropdown-link" href="/wiki/Special:Following">Followed Pages</a></li>'
    );
});