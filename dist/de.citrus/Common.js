/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

/* IMPORTIERTE SKRIPTE
Referenzen: 
http://dev.wikia.com/wiki/Category:JavaScript
*/
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:BackToTopButton/code.js',
        'w:c:dev:FacebookLikeBox/code.js',
        'w:c:dev:PurgeButton/code.js',
        'w:c:dev:ReferencePopups/code.js',
    ]
});

/* EDIT-HOVER-EVENT */ 
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
};
/* automatically open edit menu on hover */
importScriptPage('AutoEditDropdown/code.js', 'dev');



/* KLAPPBARE BOXEN der Klasse collapse */
function collapsercexpanded() {
   $(".rc-conntent span.mw-collapsible-toggle-expanded").each( function() { 
     this.click(); //collapsing expanded sections on recentchanges by default.  Wikia has been notified about this problem, but have not fixed it.
   });
}
addOnloadHook(collapsercexpanded);



/* NAVIGATION */
$(document).ready(function() {
   $('.WikiNav ul li.marked ul').prepend('<li><a class="subnav-2a" title="Spezial:Letzte_Änderungen" href="/wiki/Spezial:Letzte_Änderungen">Änderungen</a></li>');
});



/* SPOILER-WARNBOX */
SpoilerAlert = {
    question: 'Achtung Spoiler!<br />' +
       'Eine Zitrone rollt an und warnt dich vor Spoiler. Dieses Wiki enthält Informationen aus dem japanischen Manga. Es kann sein, dass die Spannung auf den Manga und Anime verdorben wird. Mehr über Spoiler unter:<br />' +
       '<a href="http://de.citrus.wikia.com/wiki/Spoiler">Spoiler ▼</a>',
    yes: 'OK, ich habe die Warnung gelesen',
    no: '',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');



/* WIKIA-CODE */
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