/* CustomOasis.css is a custom skin for Casualty Wiki      */
/* You can install this theme by adding the following to your personal files:      */
/* Add this to your wikia.css: @import url("http://casualty.wikia.com/index.php?title=MediaWiki:CustomOasis.css&usemsgcache=yes&ctype=text/css&smaxage=86400&action=raw&maxage=86400");      */
/* Add this to your wikia.js: importScriptPage('MediaWiki:CustomOasis.js', 'casualty');      */

function HeaderLink() {
  if(((document.URL).indexOf("action=edit")) == -1 ) {
    $('#WikiHeader').prepend('<div style="position: absolute; left: 0px; width:1030px; height: 96px; top: 0px"><a href="/wiki/Casualty_Wiki"><img src="https://images.wikia.nocookie.net/casualty/images/archive/6/62/20141109091227%21LargeLogo.png"></a></div>');
  }
}
addOnloadHook(HeaderLink);