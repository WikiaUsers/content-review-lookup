/* Any JavaScript here will be loaded for all users on every page load. */

}

function fbl() {
    fixBlogLinks();
    $("#bodyContent").bind("ajaxPageLoad", fixBlogLinks);
}
addOnloadHook(fbl);