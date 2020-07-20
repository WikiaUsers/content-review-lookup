/** <source lang="javascript">
    Any JavaScript here will be loaded for all users on every page load. **/

if(typeof WikiaScriptLoader === 'undefined') {
  var WikiaScriptLoader=WikiaScriptLoader?WikiaScriptLoader:function(){var b=navigator.userAgent.toLowerCase();this.useDOMInjection=b.indexOf("opera")!=-1||b.indexOf("firefox")!=-1&&b.indexOf("/4.0b")==-1;this.isIE=b.indexOf("opera")==-1&&b.indexOf("msie")!=-1;this.headNode=document.getElementsByTagName("HEAD")[0]}; WikiaScriptLoader.prototype={loadScript:function(b,c){this.useDOMInjection?this.loadScriptDOMInjection(b,c):this.loadScriptDocumentWrite(b,c)},loadScriptDOMInjection:function(b,c){var a=document.createElement("script");a.type="text/javascript";a.src=b;var d=function(){a.onloadDone=true;typeof c=="function"&&c()};a.onloadDone=false;a.onload=d;a.onreadystatechange=function(){a.readyState=="loaded"&&!a.onloadDone&&d()};this.headNode.appendChild(a)},loadScriptDocumentWrite:function(b,c){document.write('<script src="'+ b+'" type="text/javascript"><\/script>');var a=function(){typeof c=="function"&&c()};typeof c=="function"&&this.addHandler(window,"load",a)},loadScriptAjax:function(b,c){var a=this,d=this.getXHRObject();d.onreadystatechange=function(){if(d.readyState==4){var e=d.responseText;if(a.isIE)eval(e);else{var f=document.createElement("script");f.type="text/javascript";f.text=e;a.headNode.appendChild(f)}typeof c=="function"&&c()}};d.open("GET",b,true);d.send("")},loadCSS:function(b,c){var a=document.createElement("link"); a.rel="stylesheet";a.type="text/css";a.media=c||"";a.href=b;this.headNode.appendChild(a)},addHandler:function(b,c,a){if(window.addEventListener)window.addEventListener(c,a,false);else window.attachEvent&&window.attachEvent("on"+c,a)},getXHRObject:function(){var b=false;try{b=new XMLHttpRequest}catch(c){for(var a=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"],d=a.length,e=0;e<d;e++){try{b=new ActiveXObject(a[e])}catch(f){continue}break}}return b}};window.wsl=new WikiaScriptLoader;
}



$('[href="/wiki/User:BioBrain"]').attr('title', 'This user is an Founder');

importScriptURI('http://us.battle.net/d3/static/js/tooltips.js');
importScriptURI('http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.24/jquery-ui.js');

// BioScript.js
//importScriptPage('Template:BioScript.js');

// http://dev.wikia.com/wiki/BotoneraPopups
importScriptURI('http://dev.wikia.com/wiki/BotoneraPopups/Code/en.js?action=raw&ctype=text/javascript&templates=expand');
importStylesheetPage('BotoneraPopups/code.css', 'dev');

// http://processingjs.org
importScriptURI('http://s3.amazonaws.com/github/downloads/processing-js/processing-js/processing-1.3.6.min.js');

importScriptPage('User:Grunny/bdel.js', 'firefly');

/*
function importScriptPage(page, server) {
    var url = '/index.php?title='
              + encodeURIComponent(page.replace(/ /g, '_')).replace('%2F', '/').replace('%3A', ':')
              + '&action=raw&ctype=text/javascript';
    if (typeof server == "string")
        url = (server.indexOf('://') == -1)
              ? 'http://' + server + '.wikia.com' + url
              : server + url;
    return importScriptURI(url);
}
*/

// </source>