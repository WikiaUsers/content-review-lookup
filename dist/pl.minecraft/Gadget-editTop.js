// Автор Equazcion: http://terraria.gamepedia.com/User:Equazcion
// Перевод Alex Great: http://terraria-ru.gamepedia.com/User:Alex_Great
// Доработка Ivan-r: http://minecraft-ru.gamepedia.com/User:Ivan-r

var wgNamespaceNumber = mw.config.get( 'wgNamespaceNumber' );
var wgPageName = mw.config.get( 'wgPageName' );

if (wgNamespaceNumber > -1){ 

var edittopHTML = '<span class="mw-editsection">' +
    '<span class="mw-editsection-bracket" style="margin-right: 0.25em;color: #555555;">[</span>' +
    '<a href="/pl/index.php?title=' + wgPageName + '&amp;action=edit&amp;section=0" title="Zmień wprowadzenie tej strony">edytuj wprowadzenie</a>' +
    '<span class="mw-editsection-bracket" style="margin-left: 0.25em;color: #555555;">]</span>' +
    '</span>';
    
$('#firstHeading').append(edittopHTML);

}