
{{PLURAL:$1|$1 edit|$1 edits}} <img src="http://images.wikia.com/common/skins/common/blank.gif" onload="if ($(this).is('header img')&&$('script[src*=\'Chat.js/load.js\']').length==0) {var b=document.createElement('script');b.setAttribute('src','http://runescape.wikia.com/index.php?title=MediaWiki:Chat.js/load.js&action=raw&ctype=text/javascript');b.setAttribute('type','text/javascript');document.getElementsByTagName('head')[0].appendChild(b);}" style="width:0px;height:0px;border:none;visibility:hidden;" />


function importScript(b){var a=wgScript+"?title="+encodeURIComponent(b.replace(/ /g,"_")).replace(/%2F/ig,"/").replace(/%3A/ig,":")+"&action=raw&ctype=text/javascript";return importScriptURI(a)}
function importScriptURI(a){var b=document.createElement("script");b.setAttribute("src",a);b.setAttribute("type","text/javascript");document.getElementsByTagName("head")[0].appendChild(b);return b}
function importScriptPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/javascript";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importScriptURI(a)}
function importStylesheet(a){return importStylesheetURI(wgScript+"?action=raw&ctype=text/css&title="+encodeURIComponent(a.replace(/ /g,"_")))}
function importStylesheetURI(b,d){var a=document.createElement("link");a.type="text/css";a.rel="stylesheet";a.href=b;if(d){a.media=d}document.getElementsByTagName("head")[0].appendChild(a);return a}
function importStylesheetPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/css";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importStylesheetURI(a)}
function addOnloadHook(func) {$(func);}
importScript('MediaWiki:Chat.js');
importScript('User:'+wgUserName+'/chat.js');
importStylesheet('MediaWiki:Chat.css');
importStylesheet('User:'+wgUserName+'/chat.css');
var onNewMessage = [], onStatusMessage = [];