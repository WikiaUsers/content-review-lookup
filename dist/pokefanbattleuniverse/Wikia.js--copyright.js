// 02:15 May 20, 2012
//<source lang="JavaScript">
 
// Create a section on the WikiaRail to display the copyright notice.
 
if ( wgNamespaceNumber != undefined && !window.spCopy ) {
        addOnloadHook( addSPCopy );
}
 
var spCopy = true;
 
function addSPCopy () {
    $('<section class="CopyrightNotice module"><h1 style="margin-top:0px; margin-bottom:10px;">PokeFan Battle Universe Copyright</h1><div><p style="text-align:justify;">Except where otherwise specified, the text on this wiki is licensed under the Creative Commons Attribution-Share Alike License 3.0 (Unported) (CC-BY-SA).<br style="margin-bottom: 10px;"/> &bull; <a href="http://creativecommons.org/licenses/by-sa/3.0/" target="_blank">Read the license summary</a>.<br />&bull; <a href="http://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank">Read the full legal code of the license</a>.</p></div></section>').insertAfter('.ChatModule');
}
 
// </source>