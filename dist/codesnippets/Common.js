/* Any JavaScript here will be loaded for all users on every page load. */

/** Add dismiss button to watchlist-message *************************************
  *
  *  Description: Hide the watchlist message for one week.
  *  Maintainers: [[User:Ruud Koot|Ruud Koot]]
  */
 
 function addDismissButton() {
    var watchlistMessage = document.getElementById("watchlist-message");
    if ( watchlistMessage == null ) return;
    var watchlistCookieID = watchlistMessage.className.replace(/cookie\-ID\_/ig,'');
 
    if ( document.cookie.indexOf( "hidewatchlistmessage-" + watchlistCookieID + "=yes" ) != -1 ) {
        watchlistMessage.style.display = "none";
    }
 
    var Button     = document.createElement( "span" );
    var ButtonLink = document.createElement( "a" );
    var ButtonText = document.createTextNode( "dismiss" );
 
    ButtonLink.setAttribute( "id", "dismissButton" );
    ButtonLink.setAttribute( "href", "javascript:dismissWatchlistMessage();" );
    ButtonLink.setAttribute( "title", "Hide this message for one week" );
    ButtonLink.appendChild( ButtonText );
 
    Button.appendChild( document.createTextNode( "[" ) );
    Button.appendChild( ButtonLink );
    Button.appendChild( document.createTextNode( "]" ) );
 
    watchlistMessage.appendChild( Button );
 }
 
 function dismissWatchlistMessage() {
    var e = new Date();
    e.setTime( e.getTime() + (7*24*60*60*1000) );
    var watchlistMessage = document.getElementById("watchlist-message");
    var watchlistCookieID = watchlistMessage.className.replace(/cookie\-ID\_/ig,'');
    document.cookie = "hidewatchlistmessage-" + watchlistCookieID + "=yes; expires=" + e.toGMTString() + "; path=/";
    watchlistMessage.style.display = "none";
 }
 
 addOnloadHook( addDismissButton );