/* Any JavaScript here will be loaded for all users on every page load. */

/* The following is based on [[w:c:dev:MediaWiki:Common.js]]. */
$(function () {
    // Load [[MediaWiki:Geshi.css]] as needed for pages in the following
    // namespaces:
    //     * Message Wall (1200)
    //     * Thread (1201)
    var validNamespaces = [1200, 1201];
    var namespcae = mw.config.get('wgNamespaceNumber');

    if (validNamespaces.indexOf(namespcae) > -1 && $('.mw-geshi').length) {
        mw.loader.load('ext.geshi.local');
    }
});