// 09:17, March 30, 2012 (UTC)
//<source lang="JavaScript">
 
// Create a section on the WikiaRail to display the copyright notice.
 
if ( wgNamespaceNumber != undefined && !window.spCopy ) {
        addOnloadHook( addSPCopy );
}
 
var spCopy = true;
 
function addSPCopy () {
 $('<section class="CopyrightNotice module"><h1 style="margin-top:0px; margin-bottom:10px;color: #7CFC00">Direitos autorais do Encanamentos Max</h1><div><p style="text-align:justify;">Salvo disposi��o em contr�rio, o texto nesta wiki est� licenciado sob a Creative Commons Attribution-Share Alike License 3.0 (Unported) (CC-BY-SA).<br style="margin-bottom: 10px;"/> &bull; <a href="http://creativecommons.org/licenses/by-sa/3.0/deed.pt_BR" target="_blank">Leia o sum�rio da licen�a</a><br />&bull; <a href="http://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank">Leia o c�digo legal completo da licen�a</a></p></div></section>').insertAfter('.ChatModule');
}
 
// </source>