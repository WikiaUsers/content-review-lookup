// Автор Equazcion: http://terraria.gamepedia.com/User:Equazcion
// Перевод Alex Great: http://terraria-ru.gamepedia.com/User:Alex_Great
// Доработка Ivan-r: http://minecraft-ru.gamepedia.com/User:Ivan-r
// Dzięki dla https://minecraft-pl.gamepedia.com

var wgNamespaceNumber = mw.config.get( 'wgNamespaceNumber' );
var wgPageName = mw.config.get( 'wgPageName' );

if (wgNamespaceNumber > -1){ 

var edittopHTML = '<small><small><small><small>' + '<span class="mw-editsection">' +
    '<span class="mw-editsection-bracket" style="margin-right: 0.25em;color: #555555;">[</span>' +
    '<a href="/index.php?title=' + wgPageName + '&amp;action=edit&amp;section=0" title="Zmień wprowadzenie tej strony">edytuj wprowadzenie</a>' +
    '<span class="mw-editsection-bracket" style="margin-left: 0.25em;color: #555555;">]</span>' +
    '</span>' + '</small></small></small></small>';
    
$('#firstHeading').append(edittopHTML);

}

 /*<pre><nowiki>*/
//  _________________________________________________________________________________________
// |                                                                                         |
// |                    === WARNING: GLOBAL GADGET FILE ===                                  |
// |                  Changes to this page affect many users.                                |
// |                      You probably shouldn't edit it.                                    |
// |_________________________________________________________________________________________|
//
/*
 * Adds a button next to the regular edit button which acts as a "section edit" button for the intro
 * Written by Grunny (http://starwars.wikia.com/wiki/User:Grunny)
 *
 */
 
var EditIntroButtonText = 'Edit intro';
importScriptPage( 'EditIntroButton/code.js', 'dev' );
 
/*</nowiki></pre>*/