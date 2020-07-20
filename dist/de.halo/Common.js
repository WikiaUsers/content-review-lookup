/* JavaScript an dieser Stelle wirkt sich auf alle Skins für jeden Benutzer aus. */
/* Siehe auch: [[MediaWiki:Wikia.js]] und [[MediaWiki:Monobook.js]] */
/* <pre><nowiki> */

// ================================================================
// ANFANG - Spezial:Hochladen
// Eingeführt, um ein korrektes Lizenzieren zu fördern.
// ================================================================

// Automatisches Einbinden der Vorlage:Dateiinfo
$(function preloadUploadDesc() {
  if (wgCanonicalSpecialPageName != 'Upload' || $.getUrlVar('wpForReUpload')) { return; }
 
  if ($('#wpUploadDescription').length) {
    $('#wpUploadDescription').append('{{Dateiinfo\n|Beschreibung=\n|Datum=\n|Autor=\n|Quelle=\n|Lizenz=Siehe unten\n|Sonstiges=\n}}');
  }
});

// ================================================================
// ENDE - Spezial:Hochladen
// ================================================================

// ================================================================
// ANFANG - Collapsible tables
// Dieses Skript von Wikipedia ermöglicht u.a. das Einklappen von Navboxen.
// Autoren: http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
// ================================================================

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/* Collapsible tables *********************************************************
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]] (Customized Version for Fallout wiki)
 */

var autoCollapse = 1;
var collapseCaption = "Einklappen";
var expandCaption = "Ausklappen";

function collapseTable( tableIndex )
{
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );

    if ( !Table || !Button ) {
        return false;
    }

    var Rows = Table.rows;

    if ( Button.firstChild.data == collapseCaption ) {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}

function createCollapseButtons()
{
    var tableIndex = 0;
    var collapseIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );

    for ( var i = 0; i < Tables.length; i++ ) {
        if ( hasClass( Tables[i], "collapsible" ) ) {

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;

            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );

            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";
            Button.className = "t_show_hide";

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );

            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );

            Header.insertBefore( Button, Header.childNodes[0] );

            if ( !hasClass( Tables[i], "nocount" ) ) {
		collapseIndex++;
	    }
            tableIndex++;
        }
    }

    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( collapseIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        } 
        else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if ( hasClass( element, "outercollapse" ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}

addOnloadHook( createCollapseButtons );

// ================================================================
// ENDE - Collapsible tables
// ================================================================

// ================================================================
// Importierte Skripte
// ================================================================
// Bearbeitungs-Zusammenfassungen
// Dokumentation und Autoren: http://dev.wikia.com/wiki/Standard_Edit_Summary
// 
// DISPLAYTITEL-Zauberwort
// Dokumentation und Autoren: http://dev.wikia.com/wiki/DISPLAYTITLE
// 
// Countdown
// Dokumentation und Autoren: http://dev.wikia.com/wiki/Countdown
// 
// Benutzer-Tags
// Dokumentation und Autoren: http://dev.wikia.com/wiki/UserTags
// 
// SignatureCheck
// Dokumentation und Autoren siehe: http://dev.wikia.com/wiki/SignatureCheck
//
// Bearbeiten-Schaltflächen
// Dokumentation und Autoren: http://community.wikia.com/wiki/Help:Custom_edit_buttons
// ================================================================

// Benutzer-Tags – Kern-Konfiguration
window.UserTagsJS = {
	modules: {},
	tags: {
		halopedian: { u:'Halopedian', link:'Project:Halopedian', title:'Halopedian des Monats' },
		sysop: { link:'Project:Administratoren', title:'Administrator' },
		bureaucrat: { link:'Project:Administratoren' },
		adoption: { m: 'Wiki-Adoptivvater', f: 'Wiki-Adoptivmutter', u: 'Wiki-Adoptivvater' },
		founder: { u:'Gründer', link:'Project:Über dieses Wiki' },
		ex: { u:'KIA', link:'Project:Administratoren#Inaktiv und Ehemalige', title:'Ehemaliger Administrator' },
		inactive: { u:'MIA', title:'Inaktiv' },
		newuser: { u:'Kadett', title:'Neuer Halopedia-Autor' }
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};
UserTagsJS.modules.userfilter = {
	'Superintendant': ['inactive'],
	'Guesty-Persony-Thingy': ['inactive'],
	'Jange': ['inactive']
};

// Benutzer-Tags – Zuordnung der Benutzer
UserTagsJS.modules.custom = {
	'Guesty-Persony-Thingy': ['founder', 'ex'],
	'Jange': ['ex'],
	'D93': ['adoption', 'halopedian'],
	'DerPete': ['halopedian'],
	'Kelmo': ['halopedian'],
	'ColdStation12': ['halopedian'],
	'EhmPehOh': ['halopedian'],
	'Scarface88': ['halopedian'],
	'Chief-tain': ['halopedian'],
	'N.E.D.A.': ['halopedian'],
	'SatansLilHelper666': ['halopedian'],
	'StrohMasterchief': ['halopedian'],
	'SilentchiLL': ['halopedian']
};

// SignatureCheck
window.SignatureCheckJS = {
	// Parts of the confirm prompt
	preamble: 'Es sind Probleme bei deiner Bearbeitung aufgetreten:\n\n',
	epilogue: '\nBist du dir sicher, dass du trotzdem fortfahren willst?',
	noForumheader: 'Es scheint, dass der [[Vorlage:Forumheader|Forumheader]] fehlt. Du solltest keine Forumseite ohne diesen erstellen, da die Diskussion sonst nicht in den Forenlisten angezeigt wird.\n',
	noSignature: 'Hast du vergessen, deinen Beitrag zu signieren? Bitte unterschreibe auf Diskussions- und Forenseiten immer mit vier Tilden (~~~~).\n',
	forumheader: 'Forumheader',
	checkSignature: true
};

// Importierung
importArticles({
    type: 'script',
    articles: [
        'w:dev:Standard_Edit_Summary/code.js',
        'w:deadisland:User:Jgjake2/js/DISPLAYTITLE.js',
        'w:dev:Countdown/code.js',
        'w:dev:UserTags/code.js',
        'w:dev:SignatureCheck/code.js',
        'MediaWiki:Common.js/CustomEditButtons.js'
    ]
});