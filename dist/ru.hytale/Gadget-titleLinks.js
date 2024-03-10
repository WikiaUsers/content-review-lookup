// Автор Equazcion: http://terraria.gamepedia.com/User:Equazcion
// Перевод Alex Great: http://terraria-ru.gamepedia.com/User:Alex_Great
// Доработка Ivan-r: http://minecraft-ru.gamepedia.com/User:Ivan-r

var wgNamespaceNumber = mw.config.get( 'wgNamespaceNumber' );
var wgPageName = mw.config.get( 'wgPageName' );

if (wgNamespaceNumber > -1){ 

var edittopHTML = '<span class="mw-editsection" style="z-index:1000 !important;zoom:1;position:relative;float:right;padding:1.3px 2.7px;margin:-0 .63rem">' +
    '<a href="/index.php?title=' + wgPageName + '&amp;action=edit&amp;section=0" title="Править введение данной страницы">править введение</a>' +
    '</span>';
    
$('#siteSub').append(edittopHTML);

}