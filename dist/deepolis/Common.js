/* Any JavaScript here will be loaded for all users on every page load. */
var popScript     = 'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=MediaWiki:Gadget-popups.js';
var popStyleSheet = 'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/css&title=User:Lupin/navpopdev.css';
if ( window.localCSS ) { popStyleSheet = 'http://localhost:8080/js/navpop.css'; }
 
function popups_importScriptURI(url) {
	var s = document.createElement('script');
	s.setAttribute('src',url);
	s.setAttribute('type','text/javascript');
	document.getElementsByTagName('head')[0].appendChild(s);
	return s;
}
 
function popups_importStylesheetURI(url) {
	return document.createStyleSheet ? document.createStyleSheet(url) : popups_appendCSS('@import "' + url + '";');
}
 
function popups_appendCSS(text) {
	var s = document.createElement('style');
	s.type = 'text/css';
	s.rel = 'stylesheet';
	if (s.styleSheet) s.styleSheet.cssText = text //IE
	else s.appendChild(document.createTextNode(text + '')) //Safari sometimes borks on null
	document.getElementsByTagName('head')[0].appendChild(s);
	return s;
}
 
popups_importStylesheetURI(popStyleSheet);
popups_importScriptURI(popScript);

popupSubpopups=true
popupImageLinks=true
popupMaxWidth=false
popupThumbAction="imagepage"
imagePopupsForImages=true
popupDragHandle='popupTopLinks'