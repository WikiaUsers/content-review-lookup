/* Any JavaScript here will be loaded for all users on every page load. */

jQuery(document).ready(function($) {
    //Main Page About Link
    $('<a href="http://halo-spv3.wikia.com/wiki/Singleplayer_Version_3"><span width="100%" height="100%"><p class="MainPageLinkText">ABOUT</p></span></a>').insertBefore("#MainPage-Link-About");
    //Main Page Download Link
    $('<a href="https://www.reddit.com/r/halospv3/comments/6umz3f/spv31_released_all_new_install_method_11_missions/"><span width="100%" height="100%"><p class="MainPageLinkText">DOWNLOAD</p></span></a>').insertBefore("#MainPage-Link-Download");
    //Main Page Reddit Link
    $('<a href="https://www.reddit.com/r/halospv3/"><span width="100%" height="100%"><p class="MainPageLinkText">REDDIT</p></span></a>').insertBefore("#MainPage-Link-Reddit");
    //Main Page Discord Link
    $('<a href="https://discord.gg/vztTGy3"><span width="100%" height="100%"><p class="MainPageLinkText">DISCORD</p></span></a>').insertBefore("#MainPage-Link-Discord");
});