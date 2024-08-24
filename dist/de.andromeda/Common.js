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

importArticles( {
	type: 'script',
	articles: [
                'w:c:dev:DISPLAYTITLE/code.js',
		]
} );

/*User Tags*/

window.UserTagsJS = {
	modules: {},
	tags: {
		newuser: { u:'Ensign', order:-1/0 },
		lieutenant: { u:'Lieutenant', order:-1/0 },
		commander: { u:'Commander', order:-1/0 },
		bureaucrat: { order: 1 },
		inactive: { u: 'MIA' },
	}
};

UserTagsJS.modules.custom = {
    'ME47': ['lieutenant']
    'Dr.med.Elizabeth Kessler': ['lieutenant']
};

UserTagsJS.modules.newuser = {
	days: 5, 
	edits: 10, 
};

/*UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];*/
UserTagsJS.modules.inactive = 50;

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/** Spoiler ********************************************************************
 * 
 *  Beschreibung: Eine kleine Funktion zur Erstellung eines Knops, welcher die Spoiler 
 *  auf verschiedenen Seiten mithilfe eines Knopfes ein und ausschalten kann.
 */
/*var spoilers = {
	enabled: true,
	text: null,
	nodes: null,
	imgOn: null,
	imgOff: null,
	toggle: function() {
		spoilers.set(!spoilers.enabled);
	},
	set: function(enabled) {
		spoilers.enabled = enabled;
		if(enabled) {
			spoilers.nodes.removeClass('spoiler-inline');
                        $(".spoiler-thumb").remove();
                        spoilers.nodes.find("img").show();
			$.cookie('spoilers', 'true', {expires: 31, path: '/'});
			spoilers.text.text(' Spoilers on');
			spoilers.imgOff.hide(0);
			spoilers.imgOn.show(0);
		} else {
			spoilers.nodes.addClass('spoiler-inline');
                        spoilers.nodes.find("img").hide();
                        spoilers.thumbNodes.each(function() { if($(this).find(".spoiler-text").length > 0) { $(this).find(".thumb, .thumbinner").append('<div class="spoiler-thumb"/>');} });
			$.cookie('spoilers', 'false', {expires: 31, path: '/'});
			spoilers.text.text(' Spoilers off');
			spoilers.imgOn.hide(0);
			spoilers.imgOff.show(0);
		}
	},
	init: function() {
		spoilers.nodes = $('.spoiler-text');
                spoilers.thumbNodes = $(".gallerybox, .thumb");
		spoilers.text = $('<div style="display:inline;"></div>');
		spoilers.imgOn = $('<img alt="" style="display:none;"/>').attr('src', 'bild1');
		spoilers.imgOff = $('<img alt="" style="display:none;"/>').attr('src', 'bild2');
		var wrapped = $('<li/>').append($('<span/>').append($('<a/>').append(spoilers.imgOn, spoilers.imgOff, spoilers.text)));
		wrapped.click(spoilers.toggle);
		$('#p-namespaces ul').append(wrapped);
		spoilers.set(!$.cookie('spoilers') || $.cookie('spoilers') == 'true');
	}
};
$(spoilers.init);*/

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[**MAINTAINERS**]]
 */
var autoCollapse = 2;
var collapseCaption = '-';
var expandCaption = '+';
 
function collapseTable( tableIndex ) {
	var Button = document.getElementById( 'collapseButton' + tableIndex );
	var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
	if ( !Table || !Button ) {
		return false;
	}
 
	var Rows = Table.rows;
 
	if ( Button.firstChild.data == collapseCaption ) {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = 'none';
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
	var Tables = document.getElementsByTagName( 'table' );
 
	for ( var i = 0; i < Tables.length; i++ ) {
		if ( hasClass( Tables[i], 'collapsible' ) ) {
			/* only add button and increment count if there is a header row to work with */
			var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
			if( !HeaderRow ) continue;
			var Header = HeaderRow.getElementsByTagName( 'th' )[0];
			if( !Header ) continue;
 
			NavigationBoxes[tableIndex] = Tables[i];
			Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
			var Button     = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );
 
			Button.className = 'collapseButton'; // Styles are declared in MediaWiki:Common.css
 
			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
			ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
			ButtonLink.appendChild( ButtonText );
 
			Button.appendChild( document.createTextNode( '[' ) );
			Button.appendChild( ButtonLink );
			Button.appendChild( document.createTextNode( ']' ) );
 
			Header.insertBefore( Button, Header.childNodes[0] );
			tableIndex++;
		}
	}
 
	for ( var i = 0;  i < tableIndex; i++ ) {
		if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
			collapseTable( i );
		}
	}
}
 
addOnloadHook( createCollapseButtons );
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function() {
	var reCache = {};
	return function( element, className ) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();