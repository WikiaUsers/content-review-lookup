/* Any JavaScript here will be loaded for all users on every page load. */

/* Standard Edit Summaries */

importScript('MediaWiki:Common.js/standardeditsummaries.js');

// ============================================================
// BEGIN Template:Era
// ============================================================
 
// Description: Add game icons to top right corner of articles
// Credit:      User:Mirar (based on Template:Eras by User:Sikon), copied from fallout.wikia
 
function addTitleGames() {
   var titleDiv = document.getElementById("title-games");
   if (titleDiv != null && titleDiv != undefined)
   {
      var content = document.getElementById('article');
      if (!content) {
         var content = document.getElementById('content');
      }
 
      if (content) {
         var hs = content.getElementsByTagName('h1');
         var firstHeading;
         for (var i = 0; i < hs.length; i++)
         {
            if ( (' '+hs[i].className+' ').indexOf(' firstHeading ') != -1){
               firstHeading=hs[i];
               break;
            }
         }
 
         var cloneNode = titleDiv.cloneNode(true);
         firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
         cloneNode.style.display = "block";
         cloneNode.style.visibility = "visible";
         if (skin != "monaco") {
            cloneNode.style.marginTop = "-11px";
         }
      }
   }
}
 
addOnloadHook( addTitleGames );

/** Helper script for .hlist class in Common.css
 *  Maintainer: [[User:Edokter]]
 *  Revision: 2.0
 *  Last updated: September 23, 2012
 */
 
if ( $.client.profile().name == 'msie' ) {
    /* Add pseudo-selector class to last-child list items in IE 8 */
    if ( $.client.profile().versionBase == '8' ) {
        $( '.hlist' ).find( 'dd:last-child, dt:last-child, li:last-child' )
            .addClass( 'hlist-last-child' );
    }
    /* Generate interpuncts and parentheses for IE < 8 */
    if ( $.client.profile().versionBase < '8' ) {
        var hlists = $( '.hlist' );
        hlists.find( 'dt:not(:last-child)' )
            .append( ': ' );
        hlists.find( 'dd:not(:last-child)' )
            .append( '<b>·</b> ' );
        hlists.find( 'li:not(:last-child)' )
            .append( '<b>·</b> ' );
        hlists.find( 'dl dl, dl ol, dl ul, ol dl, ol ol, ol ul, ul dl, ul ol, ul ul' )
            .prepend( '( ' ).append( ') ' );
    }
}

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 *

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

window.collapseTable = function( tableIndex ){
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

function createCollapseButtons(){
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

            Button.className = "collapseButton";  //Styles are declared in Common.css

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "#" );
            addHandler( ButtonLink,  "click", new Function( "evt", "collapseTable(" + tableIndex + " ); return killEvt( evt );") );
            ButtonLink.appendChild( ButtonText );

            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );

            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    }

    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
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

$( createCollapseButtons );
*/

/* Any JavaScript here will be loaded for all users on every page load. */

// This contains the current, April 2012 code, now
// found at [[starwars:MediaWiki:Common.js]].  Grunny no longer
// keeps this code in a separate file, but it seems to be 
// working just as well to have it separately as to have it
// imbedded in THIS file.  Since it's fairly arcane, mundane code
// it may be better to have it out of the way in its own file.

/* =================
   BEGIN PRELOADS 
   ================= */

/* =================
   Edit summaries 
   from runescape.wikia.com
   ================= */
$(function() {
        if (skin == 'oasis'){
            var $label = $('#edit_enhancements_toolbar #wpSummaryLabel');
	    if (!$label.size()) {
	    	    return;
	    }
        }
 
        if (skin == 'monobook'){
	    var $label = $('.editOptions #wpSummaryLabel');
	    if (!$label.size()) {
	    	    return;
	    }
        }
 
	$combo = $('<select />').attr('id', 'stdSummaries').change(function() {
		var val = $(this).val();
		if (val != '') {
			$('#wpSummaryEnhanced,#wpSummary').val(val);
		}
	});
 
        $label.prepend('<br />').prepend($combo).prepend('Summaries: ');
 
	$.ajax({
		'dataType': 'text',
		'data': {
			'title': 'Template:Stdsummaries',
			'action': 'raw',
			'ctype': 'text/plain'
		},
		'url': wgScript,
		'success': function(data) {
			var lines = data.split("\n");
			for (var i in lines) {
				var val = (lines[i].indexOf('-- ') == 0) ? lines[i].substring(3) : '';
				var text = (lines[i].indexOf('-- ') == 0) ? '&nbsp;&nbsp;' + lines[i].substring(3) : lines[i];
				var disable = (lines[i].indexOf('-- ') == 0 || lines[i].indexOf('(') == 0) ? '' : 'disabled';
				var $opt = '<option value="' + val + '" ' + disable + '>' + text + '</option>';
				$combo.append($opt);
			}
		}
	});
})


/* =================
 * jQuery version of fillPreloads
 * by Grunny at starwars.wikia.com
 * ================= */

function fillPreloads() {
 
	if( !$( '#lf-preload' ).length ) {
		return;
	}
	var	preloadOptionsHtml = '',
		$preloadOptionsList;
 
	$( '#lf-preload' ).attr( 'style', 'display: block' );
 
	$.get( wgScript, { title: 'Template:Stdpreloads', action: 'raw', ctype: 'text/plain' }, function( data ) {
		var lines = data.split( '\n' );
		for( var i = 0; i < lines.length; i++ ) {
			var value = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : "";
			preloadOptionsHtml += '<option value="' + value + '">' + lines[i] + '</option>';
		}
		$preloadOptionsList = $( '<select />' ).attr( 'id', 'stdSummaries' ).html( preloadOptionsHtml ).change( function() {
			var value = $( this ).val();
			if ( value !== '' ) {
				value = 'Template:' + value + '/preload';
				value = value.replace( ' ', '_' );
				$.get( wgScript, { title: value, action: 'raw', ctype: 'text/plain' }, function( data ) {
					insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
				} );
			}
		} );
 
		$( '#lf-preload-cbox' ).html( $preloadOptionsList );
	} );
 
	$( '#lf-preload-pagename' ).html( '<input type="text" class="textbox" />' );
	$( '#lf-preload-button' ).html( '<input type="button" class="button" value="Insert" onclick="doCustomPreload()" />' );
 
}
 
function doCustomPreload() {
	var value = $( '#lf-preload-pagename > input' ).val();
	value = value.replace( ' ', '_' );
	$.get( wgScript, { title: value, action: 'raw', ctype: 'text/plain' }, function( data ) {
		insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
	} );
}

/* =============
   Title rewrite 
   jQuery version and new wikia skin fixes by Grunny
   ==============
   This is what powers 
   [[template:title]],
   principally allowing
   for italic page titles
   ============== */
 
function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}
 
	if( $('#title-meta').length == 0 ) {
		return;
	}
 
	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}

importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('EditIntroButton/code.js', 'dev');
//importScriptPage('DisplayClock/code.js', 'dev');
importScriptPage('DupImageList/code.js', 'dev');

var ArchiveToolConfig = { 
   archiveListTemplate: 'ArchCat',
   archivePageTemplate: 'ArchPage',
   archiveSubpage: 'Archive',
   userLang: true
}; 
importScriptPage('ArchiveTool/code.js', 'dev');


/* =============
   MOS box 
   from Brickipedia
   ==============
   This is the little box underneath the
   search bar and article tally, which has the 
   Seal of Rassilon in it.
   ===============
   Keep at end of common.js, but before
   any addOnloadHooks.
   ================ */

importScript('MediaWiki:Common.js/mosbox.js');

/* ================
   TABLE stuff 
   ================ */

//$("tr:odd").addClass("zebra-stripe"); (adversely affects TOCs for a reason I've not yet determined)

$("table").delegate('td','mouseover mouseleave', function(e) {
    if (e.type == 'mouseover') {
      $(this).parent().addClass("hover");
      $("colgroup").eq($(this).index()).addClass("hover2");
    }
    else {
      $(this).parent().removeClass("hover");
      $("colgroup").eq($(this).index()).removeClass("hover2");
    }
});

/** 
 * SpoilerAlert
 * documentation at: http://dev.wikia.com/wiki/SpoilerAlert
 * © Peter Coester, 2012
 * 
 * __NOWYSIWYG__
 */

SpoilerAlert = {
            question: 'This page may contain spoilers about unreleased stories. Are you sure you want to read it?',
            yes: 'Hit me with your best shot',
            no: 'Get me the hell out of here',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Contains spoilers');
    },
    back:true
};

/* ================
   Other imports
   ================ */

importArticles({
    type: "script",
    articles: [
        "w:dev:FixWantedFiles/code.js",
        "w:dev:Countdown/code.js",
        "w:dev:SpoilerAlert/code.js",
        "MediaWiki:Functions.js",
        "u:dev:ListFiles/code.js",
        "u:dev:RevealAnonIP/code.js",
        "u:dev:AjaxRC/code.js"
    ]
});


/*  ================
    addOnloadHook area
    ================
    Necessary for calling to life functions
    specified elsewhere in this document.
    ================= */

addOnloadHook( rewriteTitle );