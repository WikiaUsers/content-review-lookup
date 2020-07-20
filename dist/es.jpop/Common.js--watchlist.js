/* Load the geonotices. See [[Wikipedia:Geonotice]]. */
addOnloadHook(function() {
  importScriptURI( wgScript + '?title=MediaWiki:Geonotice.js&action=raw&ctype=text/javascript&maxage=3600&ver=2');
});
 
 
/** Add dismiss buttons to watchlist-message *************************************
 *
 *  Description: Allows multiple dismiss buttons on [[MediaWiki:Watchlist-details]] with bump-able cookie IDs.
 *  Note: HTML is backwards compatible with old version, new version ignores old syntax, except for dismissed IDs.
 *  Maintainers: [[User:Ruud Koot|Ruud Koot]], [[User:MZMcBride|MZMcBride]]
 */
 
function addDismissButton() {
  var docobj = document.getElementById('bodyContent') || document.getElementById('content') || document;
  var watchItems = getElementsByClassName(docobj, 'div', 'watchlist-message');
  if(watchItems.length == 0) watchItems = getElementsByClassName(docobj, 'li', 'watchlist-message');
  if(watchItems.length == 0) return
  for(var i=0;i<watchItems.length;i++) {
    var watchlistCookieID = parseInt(watchItems[i].className.replace(/.*cookie\-ID\_(\d*).*/ig,'$1'));
    if(isNaN(watchlistCookieID)) continue
    if(document.cookie.indexOf('hidewatchlistmessage-' + watchlistCookieID + '=yes') != -1) {
      watchItems[i].style.display = 'none';
      continue;
    }
    var Button     = document.createElement('span');
    var ButtonLink = document.createElement('a');
    var ButtonText = document.createTextNode('dismiss');
 
    ButtonLink.className = 'dismissButton';
    ButtonLink.setAttribute('href','javascript:dismissWatchlistMessage(' + i + ',' + watchlistCookieID + ')');
    ButtonLink.setAttribute('title','Hide this message');
    ButtonLink.appendChild(ButtonText);
 
    Button.appendChild(document.createTextNode(' ['));
    Button.appendChild(ButtonLink);
    Button.appendChild(document.createTextNode(']'));
    watchItems[i].appendChild(Button);
  }
}
 
function dismissWatchlistMessage(num,cid) {
  var docobj = document.getElementById('bodyContent') || document.getElementById('content') || document
  var watchItems = getElementsByClassName(docobj, 'div', 'watchlist-message');
  if(watchItems.length == 0) watchItems = getElementsByClassName(docobj, 'li', 'watchlist-message');
  watchItems[num].style.display = 'none';
 
  var e = new Date();
  e.setTime( e.getTime() + (4*7*24*60*60*1000) );
  document.cookie = 'hidewatchlistmessage-' + cid + '=yes; expires=' + e.toGMTString() + '; path=/';
}
addOnloadHook(addDismissButton);