

Note: After saving, you have to bypass your browser's cache to see the changes.

    Internet Explorer: hold down the Ctrl key and click the Refresh or Reload button, or press Ctrl+F5.
    Firefox: hold down the Shift key while clicking Reload; alternatively press Ctrl+F5 or Ctrl+Shift+R.
    Opera users have to clear their caches through Tools→Preferences.
    Konqueror and Safari users can just click the Reload button.
    Chrome: press Ctrl+Shift+R, or Ctrl+F5 or Shift+F5. 

function importScript(b){var a=mw.config.get('wgScript')+"?title="+encodeURIComponent(b.replace(/ /g,"_")).replace(/%2F/ig,"/").replace(/%3A/ig,":")+"&action=raw&ctype=text/javascript";return importScriptURI(a)}
function importScriptURI(a){var b=document.createElement("script");b.setAttribute("src",a);b.setAttribute("type","text/javascript");document.getElementsByTagName("head")[0].appendChild(b);return b}
function importScriptPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/javascript";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importScriptURI(a)}
function importStylesheet(a){return importStylesheetURI(mw.config.get('wgScript')+"?action=raw&ctype=text/css&title="+encodeURIComponent(a.replace(/ /g,"_")))}
function importStylesheetURI(b,d){var a=document.createElement("link");a.type="text/css";a.rel="stylesheet";a.href=b;if(d){a.media=d}document.getElementsByTagName("head")[0].appendChild(a);return a}
function importStylesheetPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/css";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importStylesheetURI(a)}
function addOnloadHook(func) {$(func);}
importScript('MediaWiki:Chat.js');
importScript('User:'+mw.config.get('wgUserName')+'/chat.js');
importStylesheet('MediaWiki:Chat.css');
importStylesheet('User:'+mw.config.get('wgUserName')+'/chat.css');
var onNewMessage = [], onStatusMessage = [];