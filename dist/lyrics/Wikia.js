/* ATTENTION ADMINISTRATORS:

This page contains JavaScript specific to the Wikia skin.
For JavaScript used with all skins, see [[MediaWiki:Common.js]].
*/

/**
 * Move header icons into the page header for better vertical space usage
 */
$(function() {
    if (!mw.util.getParamValue('diff')) {
        $("#header-icons").prependTo(".page-header__contribution > div:first-child");
        // make sure images in header icons element are loaded
        if (window.ImgLzy) ImgLzy.onScroll();
    }
});