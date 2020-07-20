/* Watchlist notifier ([[https://en.wikipedia.org/wiki/User:Ais523/watchlistnotifier.js]]); displays a message every time a watched page changes. */
//<pre><nowiki>
 
var wmwpajax;
// From [[WP:US]] mainpage (wpajax renamed to wmwpajax)
wmwpajax={
        download:function(bundle) {
                // mandatory: bundle.url
                // optional:  bundle.onSuccess (xmlhttprequest, bundle)
                // optional:  bundle.onFailure (xmlhttprequest, bundle)
                // optional:  bundle.otherStuff OK too, passed to onSuccess and onFailure
 
                var x = window.XMLHttpRequest ? new XMLHttpRequest()
                : window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP")
                : false;
 
                if (x) {
                        x.onreadystatechange=function() {
                                x.readyState==4 && wmwpajax.downloadComplete(x,bundle);
                        };
                        x.open("GET",bundle.url,true);
                        x.send(null); 
                }
                return x;
        },
 
        downloadComplete:function(x,bundle) {
                x.status==200 && ( bundle.onSuccess && bundle.onSuccess(x,bundle) || true )
                || ( bundle.onFailure && bundle.onFailure(x,bundle));
        }
};
 
// Example:
// function dlComplete(xmlreq, data) {
//      alert(data.message + xmlreq.responseText);
// }
//  wmwpajax.download({url:'http://en.wikipedia.org/w/index.php?title=Thresher&action=raw', 
//                   onSuccess: dlComplete, message: "Here's what we got:\n\n" });
 
// End of [[WP:US]] quote
 
function wmWatchEditFound(xmlreq, data) {
  var watchrev, watchsum, watchrevold, watchpage, junk;
  if(xmlreq.responseText.indexOf('revid=')==-1)
  {
    document.getElementById('contentSub').innerHTML+=
      "<div class='watchlistnotify'>(<i>watchlistnotifier can't determine whether a "+
      "watched page has changed<i>)</div>";
    return;
  }
  watchrev=xmlreq.responseText.split('revid="')[1].split('"')[0];
  try
  {
    watchrevold=document.cookie.split('ais523wmwatchrev=')[1].split('.')[0];
  }
  catch(junk) {watchrevold=0;}
  if(wgPageName == "Special:Watchlist")
  {
    document.cookie="ais523wmwatchrev="+watchrev+".; path=/";
    var aas=document.getElementById('bodyContent').getElementsByTagName('a');
    var i=aas.length;
    while(i--)
    {
      if(aas[i].href.indexOf('diff=')!=-1&&watchrevold)
        if(+(aas[i].href.split('diff=')[1].split('&')[0])>watchrevold)
          aas[i].parentNode.style.fontWeight='bold';
    }
  }
  else
  {
    watchsum=xmlreq.responseText.split('comment="')[1].split('"')[0];
    watchpage=xmlreq.responseText.split('title="')[1].split('"')[0];
    watchsum=watchsum.split('<').join('&lt;').split('>').join('&gt;');
    watchpage=watchpage.split('<').join('&lt;').split('>').join('&gt;');
    if(watchrev!=watchrevold)
      document.getElementById('contentSub').innerHTML+=
        "<div class='watchlistnotify'>\""+watchpage+'" changed: "'+watchsum+
        '". (<a href="/wiki/Special:Watchlist">watchlist</a>)</div>';
  }
}
 
addOnloadHook(function() {
  /* Find the top item in the watchlist, and its edit summary. We only need one item, so
     set the limit to 1 to ease the load on the server. */
    wmwpajax.download({url:wgScriptPath+'/api.php?action=query&list=watchlist&wllimit=1&'+
      'wldir=older&format=xml&wlprop=comment|ids|title', onSuccess: wmWatchEditFound});
});
// </nowiki></pre>