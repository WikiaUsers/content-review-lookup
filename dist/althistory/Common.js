/* Any JavaScript here will be loaded for all users on every page load. */

function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<object width="350" height="450" id="obj_1304928377414"><param name="movie" value="http://althistory.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1304928377414&b=60&f=50&l=999999&q=999999&s=1&w=0"/><embed id="emb_1304928377414" src="http://althistory.chatango.com/group" width="600" height="450" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1304928377414&b=60&f=50&l=999999&q=999999&s=1&w=0"></embed></object><br>[ <a href="http://althistory.chatango.com/clonegroup?ts=1304928377414">Copy this</a> | <a href="http://chatango.com/creategroup?ts=1304928377414">Start New</a> | <a href="http://althistory.chatango.com">Full Size</a> ]';
  }
}

if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}

/** Collapsible tables **/
 
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

( function( $, mw ) {
$alert = '<div id="mw-echo-sliding-alert">';
$alert += '<div id="mw-echo-close-box"><img style="display: block;" src="//upload.wikimedia.org/wikipedia/commons/3/36/CloseWindow.svg"/></div>';
$alert += '<div id="mw-echo-alert-text">You have <a href="#" id="mw-echo-talk-link">new messages</a>. (<a href="#" id="mw-echo-talk-diff-link">view changes</a>)</div>';
$alert += '</div>';
$(document).ready(function() {
	var newMsgRevisionId = mw.config.get( 'wgUserNewMsgRevisionId' );
	if ( newMsgRevisionId ) {
		var userName = mw.config.get( 'wgUserName' );
		var talkLink = '/wiki/User_talk:' + userName + '?redirect=no';
		var diffLink = '/w/index.php?title=User_talk:' + userName + '&oldid=' + newMsgRevisionId + '&diff=cur';
		$( 'body' ).append( $alert );
		$( '#mw-echo-close-box' ).click( function( e ) {
			$( '#mw-echo-sliding-alert' ).hide();
			e.preventDefault();
		} );
		$( 'a#mw-echo-talk-link' ).attr( 'href', talkLink );
		$( 'a#mw-echo-talk-diff-link' ).attr( 'href', diffLink );
		mw.config.set( 'echoNewMsgAlertDisplayed', true );
	}
} );
} )( jQuery, mediaWiki );

window.dev.multiupload.options = {
    max: 100
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultiUpload.js',
    ]
});