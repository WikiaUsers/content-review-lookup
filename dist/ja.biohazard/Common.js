// **************************************************
//  START import coding
// **************************************************
 
window.RevealAnonIP = {
    permissions : ['sysop', 'bureaucrat']
};

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxCallAgain = [RevealAnonIP];
ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Allpages","Special:Log","Special:WikiActivity","Special:Contributions","Blog:Recent posts","Blog:News","Blog:Featured blog posts","Blog:Popular blog posts"];

var monoBookText = 'Mono',
    oasisText = 'Oasis';

SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};

importArticles({
    type: "script",
    articles: [
	'u:dev:RevealAnonIP/code.js',
	'u:dev:ArchiveTool/code.js',
	'u:dev:DisableArchiveEdit/code.js',
	'u:dev:AjaxRC/code.js',
	'u:dev:FixWantedFiles/code.js',
	'u:dev:Countdown/code.js',
	'u:dev:PurgeButton/code.js',
	'u:dev:SkinSwitchButton/code.js',
	'u:deadisland:User:Jgjake2/js/DISPLAYTITLE.js',
	'u:dev:DupImageList/code.js',
	'u:dev:LockOldBlogs/code.js',
	'u:dev:Category_Sorter/code.js',
	'u:dev:Standard_Edit_Summary/code.js',
	'u:dev:DISPLAYTITLE/code.js',
	'u:dev:LockOldBlogs/code.js',
	'u:dev:ReferencePopups/code.js',
	'u:dev:SpoilerAlert/code.js',
    ]
});
 
// **************************************************
//  END import coding
// **************************************************
 
/* Any JavaScript here will be loaded for all users on every page load. */
 
if ( /^MediaWiki(\/.+)?$/.test( wgPageName ) && wgAction == 'view' ) {
	addOnloadHook(function(){
		document.body.className+=" mainpage";
	})
}
 

/** includePage ************
 * force the loading of another JavaScript file
 * @todo Is this still needed? We have importScript and importScriptURI in wikibits.js
 * Maintainer: [[Commons:User:Dschwen]]
 */
function includePage( name ){
	document.write('<script type="text/javascript" src="' + wgScript + '?title='
		+ name + '&action=raw&ctype=text/javascript"><\/script>' 
	);
}
/* End of includePage */
 
/* Including extra .js pages */ 
 
// switches for scripts
// TODO: migrate to JSConfig
// var load_extratabs = true;
var load_edittools = true;
 
// extra drop down menu on editing for adding special characters
includePage( 'MediaWiki:Edittools.js' );
 
// Editpage scripts
if( wgAction == 'edit' || wgAction == 'submit' )
	importScript('MediaWiki:Editpage.js')
 
/* End of extra pages */
 
/* Test if an element has a certain class **************************************
 *
 * From English Resident Evil Wiki, 2008-09-15
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
var hasClass = (function() {
	var reCache = {};
	return function ( element, className ) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();
 
/** Collapsible tables *********************************************************
 *
 * From English Resident Evil Wiki, 2008-09-15
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *      [[Resident Evil Wiki:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
function collapseTable( tableIndex ){
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
 
function createCollapseButtons(){
	var tableIndex = 0;
	var NavigationBoxes = new Object();
	var Tables = document.getElementsByTagName( 'table' );
 
	for ( var i = 0; i < Tables.length; i++ ) {
		if ( hasClass( Tables[i], 'collapsible' ) ) {
			/* only add button and increment count if there is a header row to work with */
			var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
			if( !HeaderRow )
				continue;
			var Header = HeaderRow.getElementsByTagName( 'th' )[0];
			if( !Header )
				continue;
 
			NavigationBoxes[tableIndex] = Tables[i];
			Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
			var Button  = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );
 
			Button.style.styleFloat = 'right';
			Button.style.cssFloat = 'right';
			Button.style.fontWeight = 'normal';
			Button.style.textAlign = 'right';
			Button.style.width = '6em';
 
			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
			ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
			ButtonLink.appendChild( ButtonText );
 
			Button.appendChild( document.createTextNode( "[" ) );
			Button.appendChild( ButtonLink );
			Button.appendChild( document.createTextNode( "]" ) );
 
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
 
 
/** Dynamic Navigation Bars (experimental) *************************************
 *
 * From English Resident Evil Wiki, 2008-09-15
 *
 *  Description: See [[Resident Evil Wiki:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */
 
// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//  indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar( indexNavigationBar ){
	var NavToggle = document.getElementById('NavToggle' + indexNavigationBar);
	var NavFrame = document.getElementById('NavFrame' + indexNavigationBar);
 
	if( !NavFrame || !NavToggle ) {
		return false;
	}
 
	// if shown now
	if( NavToggle.firstChild.data == NavigationBarHide ) {
		for( var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
			if ( hasClass( NavChild, 'NavPic' ) ) {
				NavChild.style.display = 'none';
			}
			if ( hasClass( NavChild, 'NavContent') ) {
				NavChild.style.display = 'none';
			}
		}
	NavToggle.firstChild.data = NavigationBarShow;
 
	// if hidden now
	} else if( NavToggle.firstChild.data == NavigationBarShow) {
		for( var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
			if( hasClass( NavChild, 'NavPic' ) ) {
				NavChild.style.display = 'block';
			}
			if( hasClass( NavChild, 'NavContent' ) ) {
				NavChild.style.display = 'block';
			}
		}
		NavToggle.firstChild.data = NavigationBarHide;
	}
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton(){
	var indexNavigationBar = 0;
	// iterate over all < div >-elements
	var divs = document.getElementsByTagName('div');
	for( var i = 0; NavFrame = divs[i]; i++ ) {
		// if found a navigation bar
		if( hasClass( NavFrame, 'NavFrame' ) ) {
			indexNavigationBar++;
			var NavToggle = document.createElement("a");
			NavToggle.className = 'NavToggle';
			NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
			NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
			var NavToggleText = document.createTextNode(NavigationBarHide);
			for( var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
				if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
					if( NavChild.style.display == 'none' ) {
						NavToggleText = document.createTextNode(NavigationBarShow);
						break;
					}
				}
			}
 
			NavToggle.appendChild(NavToggleText);
			// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
			for( var j=0; j < NavFrame.childNodes.length; j++) {
				if( hasClass( NavFrame.childNodes[j], 'NavHead' ) ) {
					NavFrame.childNodes[j].appendChild(NavToggle);
				}
			}
			NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
		}
	}
} 
addOnloadHook( createNavigationBarToggleButton );
 
 // *********
 // IRC Login Fixed by Megan (Now stops f***ing loading on every page)
 // *********
 $(document).ready(function() {
  if($('#IRClogin')){
   var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
   $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-residentevil&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
  }
 });
 
/* Any JavaScript here will be loaded for all users on every page load. */
 
if ( /^MediaWiki(\/.+)?$/.test( wgPageName ) && wgAction == 'view' ) {
	addOnloadHook(function(){
		document.body.className+=" mainpage";
	})
}
 
/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

/*******************************************************************************
** "Articletype positioning" script; by [[User:Bp]]
*******************************************************************************/

function moveArticletypeDiv() {
  var fooel = document.getElementById('ma-article-type');
  if (fooel!=null) {
    var artel = document.getElementById('article');
    var wphel = document.getElementById('WikiaPageHeader');
    var titel = document.getElementById('top');
    fooel = fooel.parentNode.removeChild(fooel);
    if (artel!=null) {
      artel.parentNode.insertBefore(fooel,artel);
    } else if (wphel!=null) {
      wphel.parentNode.insertBefore(fooel,wphel);
    } else {
      //fall back to a position before H1 - useful for monobook skin
      titel.parentNode.insertBefore(fooel,titel);
    }
  }
}
 
hookEvent("load", moveArticletypeDiv);