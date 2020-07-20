/* Przycisk anuluj by TK-999 i Rappy_4187 */
$(function addCancel() {
    if (typeof(wgIsEditPage) != 'undefined') {
    $('<span id="cancbutton" class="button" style="margin-top:2px"><a href="' + mw.util.wikiGetlink() + '"><span style="color:#FFFFFF">Anuluj</span></a></span>').appendTo('#EditPageHeader h2');
    }
});

/* Second railmodule by Szynka013 */
$(function(){
    $('<section class="railModule2 rail-module"></section>')
    .appendTo('#WikiaRail')
    .load( mw.util.wikiScript( 'index' ) + '?title=Template:DiscordModule&action=render' );
});