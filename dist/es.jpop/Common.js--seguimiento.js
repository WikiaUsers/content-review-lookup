/** Add dismiss buttons to watchlist-message *************************************
 *
 *  Description: Allows multiple dismiss buttons on [[MediaWiki:Watchlist-details]] with bump-able cookie IDs.
 *  Note: HTML is backwards compatible with old version, new version ignores old syntax, except for dismissed IDs.
 *  Maintainers: [[User:Ruud Koot|Ruud Koot]], [[User:MZMcBride|MZMcBride]]
 */
window.dismissWatchlistMessage = function(num, cid) {
  var docobj = $('#bodyContent') || $('#content') || $(document);
  var watchItems = docobj.find('div.watchlist-message');
  if(watchItems.length == 0) watchItems = docobj.find('li.watchlist-message');
  watchItems[num].style.display = 'none';

  var e = new Date();
  e.setTime( e.getTime() + (4*7*24*60*60*1000) );
  document.cookie = 'hidewatchlistmessage-' + cid + '=yes; expires=' + e.toGMTString() + '; path=/';
  return false;
}

function addDismissButton() {
  var docobj = $('#bodyContent') || $('#content') || $(document);
  var watchItems = docobj.find('div.watchlist-message');
  if(watchItems.length == 0) watchItems = docobj.find('li.watchlist-message');
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
    var ButtonText = document.createTextNode('desechar mensaje');

    ButtonLink.setAttribute('id','dismissButton');
    ButtonLink.setAttribute('href','#');
    ButtonLink.setAttribute('onclick','return window.dismissWatchlistMessage(' + i + ',' + watchlistCookieID + ')');
    ButtonLink.setAttribute('title','Hide this message');
    ButtonLink.appendChild(ButtonText);

    Button.appendChild(document.createTextNode(' ['));
    Button.appendChild(ButtonLink);
    Button.appendChild(document.createTextNode(']'));
    watchItems[i].appendChild(Button);
  }
}
$(addDismissButton);