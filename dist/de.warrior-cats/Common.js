/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

/* Automatische Begrüßung */
window.AutoCreateUserPagesConfig = {
    content: {
        2:false,
        3:'{{sub'+'st:MediaWiki:Welcome-message-user}}'
    },
    summary:'Automatische Begrüßungsnachricht',
    notify: '<a href="/de/wiki/Benutzer_Diskussion:$2">Herzlich willkommen im Wiki, $1! Du hast eine neue Nachricht.</a>'
};

importArticles({ 
    type: 'script', 
    articles: [ 
        'u:dev:MediaWiki:AutoCreateUserPages.js', 
    ]
});

/* AjaxRC */
window.ajaxPages = [
    "Spezial:Letzte_Änderungen",
    "Spezial:WikiActivity",
    "Spezial:Logbuch",
    "Spezial:Beobachtungsliste",
    "Spezial:Beiträge",  
    "Spezial:Neue_Dateien",
    "Spezial:Statistik",
    "Spezial:Neue_Seiten",
    "Spezial:Dateien",
    "Spezial:Videos",
    "Spezial:WikiActivity/watchlist",
    "Spezial:MultipleActivity"
];
window.AjaxRCRefreshText = 'Auto-Aktualisierung';
window.ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};

// anzeigen & verbergen
function einaus (inhalt, einblenden, ausblenden) {
    var thisLevel  = document.getElementById(inhalt);
    var otherLevel = document.getElementById(einblenden);
    var linkLevel  = document.getElementById(ausblenden);
    if (thisLevel.style.display == 'none') {
        thisLevel.style.display = 'block';
        otherLevel.style.display = 'none';
        linkLevel.style.display = 'inline';
    } else {
        thisLevel.style.display = 'none';
        otherLevel.style.display = 'inline';
        linkLevel.style.display = 'none';
    }
}

// Ein- und Ausblenden per Javascript
 
// mit den folgenden Funktionen lässt sich ein div-Konstrukt in ein Einblende-Ausblende-Ding verwandeln
//
// Variante 1 (Klick irgendwo blendet ein oder aus):
//	<div class="klapp">
//		<div class="klapp_t">Titel im eingeblendeten Zustand</div>
//		<div class="klapp_e">Titel im ausgeblendeten Zustand</div>
//		<div class="klapp_i">Einzublendender Inhalt</div>
//	</div>
//
// Variante 2 (ein- und ausblenden nur mit Links):
//	<div class="klapp_x">
//		<div class="klapp_t">Titel im eingeblendeten Zustand mit <span class="klapp">Einblendelink</span></div>
//		<div class="klapp_e">Titel im ausgeblendeten Zustand mit <span class="klapp">Ausblendelink</span></div>
//		<div class="klapp_i">Einzublendender Inhalt</div>
//	</div>
 
function ausklapp( element ) {
	var klapp_i = null;
	var klapp_e = null;
	var klapp_t = null;
 
	for (i=0; i<element.childNodes.length; i++)	{
		if( element.childNodes[i].nodeType == 1 ) {
			if ( element.childNodes[i].className == "klapp_i" )
				klapp_i = element.childNodes[i];
			else if ( element.childNodes[i].className == "klapp_t" )
				klapp_t = element.childNodes[i];
			else if ( element.childNodes[i].className == "klapp_e" )
				klapp_e = element.childNodes[i];
		}
 
		if ( klapp_i && klapp_t && klapp_e )
			break;
	}
 
	if( klapp_i.style.display != "none") {
		klapp_i.style.display = "none";
		klapp_e.style.display = "none";
		klapp_t.style.display = "block";
 
	} else {
		klapp_i.style.display = "block";
		klapp_e.style.display = "block";
		klapp_t.style.display = "none";
	}
}
 
function getKlappDiv( obj ) {
	while ( obj && obj.parentNode && obj.className != "klapp_x" )
		obj = obj.parentNode;
 
	return obj;
}
 
// Event-Handler für alle class="klapp"-Objekte zuweisen
function makeAusklapp() {
	// klapp-div-Rahmen
	var a = document.getElementsByTagName("div"); 
	for ( div=0; div<a.length; div++ ) {
		if ( a[div].className == "klapp" ) {
			//Leider nicht IE-Kompatibel:
			//var f = function () { ausklapp(this) };
			//addEvent( a[div], "click", f , false );
			//stattdessen:
 
			a[div].onclick = function() { ausklapp(this); }
		}
	}
 
	// klapp-spans-Rahmen als Link-Ersatz
	var a = document.getElementsByTagName("span"); 
	for ( span=0; span<a.length; span++ ) {
		if ( a[span].className == "klapp" ) {
			a[span].onclick = function () { ausklapp(getKlappDiv( this ));}
		}
	}
}
 
// Nach dem Laden des Fensters folgendes Ausführen:
addOnloadHook(makeAusklapp);
 
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
 
 
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "verbergen";
var expandCaption = "anzeigen";
 
function collapseTable( tableIndex ) {
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
 
function createCollapseButtons() {
    var tableIndex = 0;
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
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );
 
            Header.insertBefore( Button, Header.childNodes[0] );
            tableIndex++;
        }
    }
 
    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        }
    }
}
 
addOnloadHook( createCollapseButtons );