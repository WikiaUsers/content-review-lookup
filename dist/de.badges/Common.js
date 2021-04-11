/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

/* <pre> */
 
// Has the Navigation templates set to be hidden by default
var ShowHideConfig = { autoCollapse: 0 };
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ShowHide/code.js',
        'u:dev:CollapsibleInfobox/code.js', //for examples on [[CollapsibleInfobox]]
        'MediaWiki:Maintenance.js'
    ]
});

/** Username replace function
 * Inserts user name into 
 * By Splarka
 *
 * Replaces {{BENUTZERNAME}} with the name of the user browsing the page.
 * Requires copying Template:USERNAME.
 */
 
/* Changes WikiActivity to Recent Changes */
$(function () {
	$('a.wikia-button[data-id$="wikiactivity"]').replaceWith('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
});
 
/* Variablen für das Skript AjaxRC (siehe http://dev.wikia.com/wiki/AjaxRC) */
ajaxPages = ['Spezial:Letzte_Änderungen', 'Spezial:WikiActivity'];
AjaxRCRefreshText = 'Auto-Aktualisierung';
AjaxRCRefreshHoverText = 'automatische Aktualisierung ohne Neuladen der kompletten Seite';

/* Import verschiedener Skripts */

importArticles({
  type: "script",
  articles: [
    "w:c:dev:ShowHide/code.js",
    "w:c:dev:LockOldBlogs/code.js",
    "w:c:dev:AjaxRC/code.js",
    "w:c:dev:Countdown/code.js"
  ]
});

 /* Any JavaScript here will be loaded for all users on every page load. */
  
 /* Replaces "USERNAME" with the name of the user browsing the page.
    Requires copying Template:USERNAME. */
  
 /* End of the "USERNAME" replacement */

/***********************/
/*  ReferencePopups,   */
/* Navigation expanded */
/***********************/
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:ReferencePopups/code.js',
        'u:dev:ExtendedNavigation/code.js'
    ]
});

/* Sachen, die nur Administratoren und Helfern angezeigt werden (sysop.js ist ausschließlich den Administratoren vorbehalten) */

/* </pre> */