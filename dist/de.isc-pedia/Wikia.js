/* Social Icons */
var SocialMediaButtonsNamespaces = [0, 4, 6, 14, 500, 1201];
var SocialMediaButtons = { 
    position: 'top',
    colorScheme: 'color',
    buttonSize: '27px',
    wikiTwitterAccount: 'iSCPedia'
};
importScriptPage('SocialIcons/code.js','dev');

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:SocialIcons/code.js'
    ]
});

/* AdminNotify.js */
importScriptPage('MediaWiki:Wikia.js/AdminNotify.js');
importScriptPage('http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js');

/* Message */
if (mw.config.get('wgUserGroups').indexOf('staff') === -1 && mw.config.get('wgUserGroups').indexOf('helper') === -1 && mw.config.get('wgUserGroups').indexOf('vstf') === -1) {
    if (localStorage.newUser !== "true") {
        $.showCustomModal("Willkommen im deutschen iSC Pedia 3.0!", '<form class="WikiaForm" method="" name=""><fieldset>Hi! Wir haben dich als neuen Benutzer erkannt und freuen uns, dich im Wikias "Enzyklopädie" willkommen zu heißen.<br /><br />Beachte auf die <a href="http://de.isc-pedia.wikia.com/wiki/Projekt:Richtlinien">Richtlinien</a>!</fieldset ></form>', {
            id: "newuser-modal",
            width: 650,
            buttons: [{
                id: "submit",
                defaultButton: true,
                message: "Los zulegen!",
                handler: function () {
                    localStorage.newUser = "true";
                    $('#newuser-modal').closeModal();
                }
            }]
        });
    }
}

/* Benutzerrechten (zusätzliche Titel(n) bei Benutzer) */
$(function() {
    var rights = {
        'Suriyaa iSC'      : ['Gründer','Bürokrat','Admin'],
        'Agent Zuri'       : ['Chat-Moderator','Technischer Ansprechpartner'],
        'ElBosso'          : ['Wikia-Mitarbeiter'],
        'Mira84'           : ['Wikia-Mitarbeiter'],
        '20M61'            : ['Helfer'],
        'Wikia'            : ['Wikia-Bot']
        'BumbleBeeBot'     : ['Wikia-Bot','inaktiv'],
        'Rotatebot'        : ['Wikia-Bot','inaktiv'],
        'ArchivBot'        : ['Wikia-Bot','inaktiv'],
        'DumpsBot'         : ['Wikia-Bot','inaktiv'],
    },
        newrights = rights[wgTitle];
 
    if ( typeof newrights != 'undefined' ) {
        // remove old rights
        $( '.UserProfileMasthead .masthead-info span.tag' ).remove();
 
        for ( var i in newrights ) {
            // add new rights
            $( '<span class="tag" style="margin-left:10px;">' + newrights[i] + '</span>' ).appendTo( '.masthead-info hgroup' );
        }
    }
});

/* SexyUserPage */
importArticles({
    type: 'script',
    articles: [
        'u:dev:SexyUserPage/code.js'
    ]
});

/* Countdown */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/* Tooltips */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Tooltips/code.js'
    ]
});

/* InactiveUsers */
InactiveUsers = { 
    months: 2,
    text: 'inaktiv'
};
importScriptPage('InactiveUsers/code.js', 'dev');

/* ExtendedNavigation */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});

/* BackToTopButton */
importScriptPage('BackToTopButton/code.js', 'dev');

/* QuickTools */
importScriptPage('QuickTools/code.js', 'dev');
 //Advanced Tools
importScriptPage('QuickTools/advanced.js', 'dev');

/* AutoEditDropdown */
// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
 
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:AutoEditDropdown/code.js'
    ]
});

/* DisplayClock */
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});

/* SkinSwitchButton */
importScriptPage('SkinSwitchButton/code.js', 'dev');

/* View Source */
importArticles({
    type: 'script',
    articles: [
         'u:dev:View_Source/code.js'
    ]
});

/* Voice Output */
importScriptPage('Voice_Output/code.js', 'dev');