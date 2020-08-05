/**
 * Pienoisohjelma tekee nappulan jolla voi tarkistaa onko artikkeli muuttunut muokkaamisen aikana.
 * @see http://fi.wikipedia.org/wiki/K%C3%A4ytt%C3%A4j%C3%A4:Zache/checkEditCollision.js
 * @date 11 April 2010
 */
function XMLHttpRequestWrapper() {
	if ( window.XMLHttpRequest ) {
		return new XMLHttpRequest();
	} else if ( window.ActiveXObject ) {
		return new ActiveXObject( 'Microsoft.XMLHTTP' );
	} else {
		_error( 'Could not create XMLHttpRequest on this browser' );
		return null;
	}
}

function alert_msg( str, color ) {
	var e = document.getElementById( 'alert_msgbox' );
	if ( !e ) {
		var alert_msgbox = '<div id="alert_msgbox"></div>';
		var node = document.getElementById( 'wpSave' ).parentNode;
		node.innerHTML += alert_msgbox;
		e = document.getElementById( 'alert_msgbox' );
	}
	e.innerHTML = '<div style="margin-top:0.5em; margin-bottom:0.5em; display:block; padding:0.5em; color:' + color + ';border:0.2em solid ' + color + '">' + str + '</div>';
}

function checkPage() {
	var url = wgServer + wgScript + '?action=view&title=' + wgPageName + '&uniq=' + wgCurRevisionId;
	var http = XMLHttpRequestWrapper();
	http.open( 'GET', url, true );
	http.onreadystatechange = function() { // Call a function when the state changes.
		if ( http.readyState == 4 && http.status == 200 ) {
			var re = new RegExp( 'wgCurRevisionId=([0-9]{1,16})[,\n;]', 'igm' );
			var wgLatestRevisionId = re.exec( http.responseText )[1];
			if ( wgLatestRevisionId == wgCurRevisionId ) {
				submitPage();
			} else {
				alert_msg( 'Joku muu on muokannut artikkelia sen jälkeen kun sinä olet aloittanut muokkaamisen.\n', 'red' );
				document.getElementById( 'wpSave' ).disabled = 'disabled';
				return false;
			}
		}
	}
	http.send( null );
}

function submitPage() {
	// copy wikEd (http://en.wikipedia.org/wiki/User:Cacycle/wikEd.js) frame to wpTextbox1 textarea
	if ( typeof( wikEdUseWikEd ) != 'undefined' ) {
		if ( wikEdUseWikEd == true ) {
			WikEdUpdateTextarea();
		}
	}

	var editForm = window.document.getElementById( 'editform' );

/*
	// Tehdään lomakkeen onsubmit (http://en.wikipedia.org/wiki/User:PleaseStand/References_segregator )
	// Käsittelee mm. References_segregator -pienoisohjelman erottelemat viitteet

	if( typeof editForm.onsubmit == 'function' ) {
		editForm.onsubmit.apply( this, arguments );
	}
*/
	// Lähetetään lomake
	editForm.wpSave.click();
}

function initEditCollisionChecker() {
	var newSpan = document.createElement( 'span' );
	newSpan.innerHTML = '<button type="button" onclick="checkPage()">Törmäystarkistettu tallennus</button>';
	var e = document.getElementById( 'wpSave' );
	e.parentNode.insertBefore( newSpan, e );
}

if (
	document.title.search( 'Muokataan' ) >-1 || document.title.search( 'Redigerar' ) >-1 ||
	document.title.search( 'Editing' ) >-1 || document.title.search( 'Bearbeiten' ) >-1
)
{
	if ( wgArticleId > 0 ) {
		addOnloadHook( initEditCollisionChecker );
	}
}