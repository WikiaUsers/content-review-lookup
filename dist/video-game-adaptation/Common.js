/* VIDEO GAME ADAPTATION WIKI JAVASCRIPT

      *MAINTAINERS: Withersoul 235
      *NOTES: Please only edit Wikia.js or Monobook.js if absolutely necessary.
*/

// Allows CSS to target pages with a specific template. Made by KockaAdmiralac upon request.
 
$('body').attr('data-topic', $('#mw-content-text .article-topic').attr('data-topic'));
 
// Test if an element has a certain class.
// Required for collapsible tables.
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
// Collapsible tables; allows tables to be collapsed, showing only the header.
// See [[Wikipedia:NavFrame]]. Taken from Wikipedia's Common.js.
 
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
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
 
/* 

Redirects "User:<username>/skin.js" or "User:<username>/skin.css" 
to the skin page they are currently using, unless the 
"skin.js" or "skin.css" subpage really exists. 
 
For example, heading to "User:<username>/skin.js" 
while using the Oasis skin will redirect them to 
"User:<username>/wikia.js", and going to 
"User:<username>/skin.css" on the Monobook skin 
will take them to "User:<username>/monobook.css".
 
*/
 
 if ( mw.config.get( 'wgArticleId' ) === 0 && mw.config.get( 'wgNamespaceNumber' ) === 2 ) {
	var titleParts = mw.config.get( 'wgPageName' ).split( '/' );
	/* Make sure there was a part before and after the slash
	   and that the latter is 'skin.js' or 'skin.css' */
	if ( titleParts.length == 2 ) {
		var userSkinPage = titleParts.shift() + '/' + mw.config.get( 'skin' );
		if ( titleParts.slice( -1 ) == 'skin.js' ) {
			window.location.href = mw.util.getUrl( userSkinPage + '.js' );
		} else if ( titleParts.slice( -1 ) == 'skin.css' ) {
			window.location.href = mw.util.getUrl( userSkinPage + '.css' );
		}
	}
}

// Prevents videos from playing in unsupported browsers

function understandsVideo() {
    return !!document.createElement('video').canPlayType; // boolean
}

if ( !understandsVideo() ) {
// Must be older browser or IE.
videoControls.style.display = 'none';
}

// Add Section Button (lightly modified version of Grunny's EditIntroButton)
/* If the button overlaps with the Edit button in Monobook,
   insert "a#ca-edit-newsection { display: none !important;}" to your
   personal Monobook CSS.
*/

if ( wgNamespaceNumber != -1 && !window.AddSectionButtonLoaded ) {
	$( addAddSectionButton );
}
 
var AddSectionButtonLoaded = true;
 
function addAddSectionButton () {
	var theText = 'Add section';
 
	if ( typeof AddSectionButtonText == "string" ) {
		theText = AddSectionButtonText;
	}
 
	switch( skin ) {
		case 'answers':
		case 'awesome':
		case 'monaco_old':
		case 'monaco':
			$('#page_controls > #control_edit').after('<li><img src="/skins/common/blank.gif" class="sprite edit" /><a id="ca-edit-newsection" href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=edit&section=new" rel="nofollow" title="Add section">'+ theText + '</a></li>');
			break;
 
 
		case 'uncyclopedia':
		case 'wowwiki':
		case 'lostbook':
		case 'monobook':
			$('#p-cactions > .pBody > ul > #ca-edit').after('<li id="ca-edit-newsection"><a href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=edit&section=new" title="Add section">'+ theText + '</a></li>');
			break;
 
		case 'oasis':
		case 'wikia':
			$(( wgNamespaceNumber == 2 || wgNamespaceNumber == 3 ) && $( '.UserProfileActionButton' ).length ? '.UserProfileActionButton  > .wikia-menu-button > ul' : '.page-header__contribution-buttons .wds-list').append('<li><a href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=edit&section=new" title="Add section">'+ theText + '</a></li>');
			break;
 
	}
}