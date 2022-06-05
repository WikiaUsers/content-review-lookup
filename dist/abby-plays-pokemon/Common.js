/* Any JavaScript here will be loaded for all users on every page load. */

/* function importScriptPage (page, server) {
var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript';
if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url;
return importScriptURI(url);
}
*/

// IMPORT SCRIPTS
var ShowHideConfig = { autoCollapse: 0 };
var collapseCaption = '-';
var expandCaption = '+';
importScriptPage('ShowHide/code.js', 'dev');

// SORTING REPLACEMENTS
mw.config.set(
  'tableSorterCollation', {
    'ä' : 'ae',
    'ö' : 'oe',
    'ß' : 'ss',
    'ü' : 'ue',
    /* REMOVE ANY NONE ALPHA CHARACTERS */
    ' ' : '',
    ',' : '',
    '!' : '',
    ':' : '',
    '.' : ''
  }
);

mw.hook( 'wikipage.editform' ).add( function ()
{
    mw.loader.using( 'mediawiki.toolbar' ).then( function ()
    {
        mw.toolbar.clear();
        mw.toolbar.addButton(
        {
            imageFile: "//vignette.wikia.nocookie.net/animeono/images/e/e2/Button_bold.png",
            speedTip: "Comment visible only for editors",
            tagOpen: "<!-- ",
            tagClose: " -->",
            sampleText: "Insert comment here"
        });
    });
});