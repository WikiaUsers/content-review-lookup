/* Summary filler
 * From RuneScape Wiki
 */

importScriptPage('MediaWiki:Common.js/standardeditsummaries.js', 'runescape');

 
$(document).ready(function() {
    if (skin == "oasis" || skin == "wikia") {
        $('.WikiaPageHeader').append($('#icons'));
    }
});