/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};

/** Username replace function
 * Inserts user name into 
 * By Splarka
 */
function UserNameReplace() {
  if ( typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace )
    return;
  $('span.insertusername').text(wgUserName);
}
$(UserNameReplace);

// Uhr
window.DisplayClockJS = '%2H:%2M:%2S %2d. %B %Y (UTC)';

//Import
importArticles({
    type: 'script',
    articles: [
         'w:c:dev:DisplayClock/code.js'
    ]
});