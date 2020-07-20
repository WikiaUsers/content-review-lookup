// **************************************************
//  START import coding
// **************************************************

importScriptPage('ArchiveTool/code.js', 'dev');
importScriptPage('DisableArchiveEdit/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');
var ShowHideConfig = { autoCollapse: 2 };
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('MediaWiki:Common.js/mosbox.js');
importScriptPage('Countdown/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('User:Jgjake2/js/DISPLAYTITLE.js', 'deadisland');
importScriptPage('DupImageList/code.js', 'dev'); 

SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

// **************************************************
//  END import coding
// **************************************************

/* Any JavaScript here will be loaded for all users on every page load. */

if ( /^MediaWiki(\/.+)?$/.test( wgPageName ) && wgAction == 'view' ) {
	addOnloadHook(function(){
		document.body.className+=" mainpage";
	})
}

/* Force preview for anons */
/* by Marc Mongenet, 2006, fr.Resident Evil Wiki */
function forcePreview() {
	if( wgUserGroups && wgUserGroups.join(' ').indexOf('user') != -1 || wgAction != 'edit' )
		return;
	saveButton = document.getElementById('wpSave');
	if( !saveButton )
		return;
	saveButton.disabled = true;
	saveButton.value = 'Save page (use preview first)';
	saveButton.style.fontWeight = 'normal';
	document.getElementById('wpPreview').style.fontWeight = 'bold';
}
addOnloadHook(forcePreview);
/* End of forcePreview */

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