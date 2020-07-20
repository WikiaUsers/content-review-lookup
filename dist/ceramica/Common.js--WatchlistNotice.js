/***** dismissWatchlistNote *********
 * Add dismiss button to MediaWiki:watchlist-details to
 * hide the watchlist message for one week.
 *
 *  Maintainers: [[w:User:Ruud Koot|Ruud Koot]], [[User:Dschwen]]
 */
 
var dismissWatchlistNote = {
 i18n: {
  'en': [ 'dismiss', 'Hide this message for one week' ],
  'de': [ 'verstecken', 'Diese Nachricht für eine Woche verstecken' ],
  'fr': [ 'enlever', 'Masquer ce message pour une semaine' ],
  'km': [ 'លាក់', 'លាក់សារនេះសំរាប់រយៈមួយសប្តាហ៍' ]
 },

 install: function () {
  var watchlistMessage = document.getElementById("watchlist-message");
  if ( watchlistMessage == null ) return;
 
  if ( document.cookie.indexOf( "hidewatchlistmessage=yes" ) != -1 ) {
   watchlistMessage.style.display = "none";
  }
 
  with( dismissWatchlistNote )
  {
   var Button     = document.createElement( "span" );
   var ButtonLink = document.createElement( "a" );

   var text0 = '▲';
   var text1 = i18n['en'][1];
   if( i18n[wgUserLanguage] )
   {
    text0 = i18n[wgUserLanguage][0];
    text1 = i18n[wgUserLanguage][1];
   }
   var ButtonText = document.createTextNode( text0 );

   ButtonLink.setAttribute( "id", "dismissButton" );
   ButtonLink.setAttribute( "href", "javascript:dismissWatchlistNote.setCookie();" );
   ButtonLink.setAttribute( "title", text1 );
   ButtonLink.appendChild( ButtonText );
  
   Button.appendChild( document.createTextNode( "[" ) );
   Button.appendChild( ButtonLink );
   Button.appendChild( document.createTextNode( "]" ) );
  
   // add another link to [[MediaWiki_talk:Watchlist-details.js]] if the translation
   // for the button does not yet exist. This works well (see sse_i18n!)
   if( !i18n[wgUserLanguage] )
   {
    var HelpLink = document.createElement("a");
    HelpLink.href = "/wiki/MediaWiki_talk:Watchlist-details.js";
    HelpLink.appendChild( document.createTextNode( "help translate this button to ('"+wgUserLanguage+"')" ) );
    Button.appendChild( document.createTextNode( " [" ) );
    Button.appendChild( HelpLink );
    Button.appendChild( document.createTextNode( "]" ) );
   }
  }

  watchlistMessage.appendChild( Button );
 },
 
 setCookie: function() {
  var e = new Date();
  e.setTime( e.getTime() + (7*24*60*60*1000) );//one week
  document.cookie = "hidewatchlistmessage=yes; expires=" + e.toGMTString() + "; path=/";
  var watchlistMessage = document.getElementById("watchlist-message");
  watchlistMessage.style.display = "none";
 }
};
 
addOnloadHook( dismissWatchlistNote.install );