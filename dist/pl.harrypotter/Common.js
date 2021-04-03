/* Second railmodule by Szynka013 */
$(function(){
    $('<section class="railModule2 rail-module"></section>')
    .appendTo('#WikiaRail')
    .load( mw.util.wikiScript( 'index' ) + '?title=Template:DiscordModule&action=render' );
});