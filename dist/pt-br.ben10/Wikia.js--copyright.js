// 09:17, March 30, 2012 (UTC)
//<source lang="JavaScript">
 
// Create a section on the WikiaRail to display the copyright notice.
 
if ( wgNamespaceNumber != undefined && !window.spCopy ) {
        addOnloadHook( addSPCopy );
}
 
var spCopy = true;
 
function addSPCopy () {
 $('<section class="CopyrightNotice module"><h1 style="margin-top:0px; margin-bottom:10px;color: #7CFC00">Direitos autorais do Universo Ben 10</h1><div><p style="text-align:justify;">Salvo disposição em contrário, o texto nesta wiki está licenciado sob a Creative Commons Attribution-Share Alike License 3.0 (Unported) (CC-BY-SA).<br style="margin-bottom: 10px;"/> &bull; <a href="http://creativecommons.org/licenses/by-sa/3.0/deed.pt_BR" target="_blank">Leia o sumário da licença</a><br />&bull; <a href="http://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank">Leia o código legal completo da licença</a></p></div></section>').insertAfter('.ChatModule');
}
 
// </source>