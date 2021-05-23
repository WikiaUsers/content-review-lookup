<span class="kw2" style="font-weight:bold;color:rgb(0,51,102);">var</span> b<span class="sy0" style="color:rgb(51,153,51);">=</span>document.<span class="me1" style="color:rgb(102,0,102);">createElement</span><span class="br0" style="color:rgb(0,153,0);">(</span><span class="st0" style="color:rgb(51,102,204);">'script'</span><span class="br0" style="color:rgb(0,153,0);">)</span><span class="sy0" style="color:rgb(51,153,51);">;</span>b.<span class="me1" style="color:rgb(102,0,102);">innerHTML</span><span class="sy0" style="color:rgb(51,153,51);">=</span><span class="st0" style="color:rgb(51,102,204);">'<span class="es0" style="font-weight:bold;color:rgb(0,0,153);">\n</span>function importScript(b){var a=wgScript+"?title="+encodeURIComponent(b.replace(/ /g,"_")).replace(/%2F/ig,"/").replace(/%3A/ig,":")+"&action=raw&ctype=text/javascript";return importScriptURI(a)}<span class="es0" style="font-weight:bold;color:rgb(0,0,153);">\n</span>function importScriptURI(a){var b=document.createElement("script");b.setAttribute("src",a);b.setAttribute("type","text/javascript");document.getElementsByTagName("head")[0].appendChild(b);return b}<span class="es0" style="font-weight:bold;color:rgb(0,0,153);">\n</span>function importScriptPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/javascript";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importScriptURI(a)}<span class="es0" style="font-weight:bold;color:rgb(0,0,153);">\n</span>function importStylesheet(a){return importStylesheetURI(wgScript+"?action=raw&ctype=text/css&title="+encodeURIComponent(a.replace(/ /g,"_")))}<span class="es0" style="font-weight:bold;color:rgb(0,0,153);">\n</span>function importStylesheetURI(b,d){var a=document.createElement("link");a.type="text/css";a.rel="stylesheet";a.href=b;if(d){a.media=d}document.getElementsByTagName("head")[0].appendChild(a);return a}<span class="es0" style="font-weight:bold;color:rgb(0,0,153);">\n</span>function importStylesheetPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/css";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importStylesheetURI(a)}<span class="es0" style="font-weight:bold;color:rgb(0,0,153);">\n</span>function addOnloadHook(func) {$(func);}<span class="es0" style="font-weight:bold;color:rgb(0,0,153);">\n</span>'</span><span class="sy0" style="color:rgb(51,153,51);">;</span>document.<span class="me1" style="color:rgb(102,0,102);">getElementsByTagName</span><span class="br0" style="color:rgb(0,153,0);">(</span><span class="st0" style="color:rgb(51,102,204);">'head'</span><span class="br0" style="color:rgb(0,153,0);">)</span><span class="br0" style="color:rgb(0,153,0);">[</span><span class="nu0" style="color:rgb(204,0,0);">0</span><span class="br0" style="color:rgb(0,153,0);">]</span>.<span class="me1" style="color:rgb(102,0,102);">appendChild</span><span class="br0" style="color:rgb(0,153,0);">(</span>b<span class="br0" style="color:rgb(0,153,0);">)</span><span class="sy0" style="color:rgb(51,153,51);">;</span>
 importScript<span class="br0" style="color:rgb(0,153,0);">(</span><span class="st0" style="color:rgb(51,102,204);">'MediaWiki:Chat.js'</span><span class="br0" style="color:rgb(0,153,0);">)</span><span class="sy0" style="color:rgb(51,153,51);">;</span>
 importScript<span class="br0" style="color:rgb(0,153,0);">(</span><span class="st0" style="color:rgb(51,102,204);">'User:'</span><span class="sy0" style="color:rgb(51,153,51);">+</span>wgUserName<span class="sy0" style="color:rgb(51,153,51);">+</span><span class="st0" style="color:rgb(51,102,204);">'/chat.js'</span><span class="br0" style="color:rgb(0,153,0);">)</span><span class="sy0" style="color:rgb(51,153,51);">;</span>
 importStylesheet<span class="br0" style="color:rgb(0,153,0);">(</span><span class="st0" style="color:rgb(51,102,204);">'MediaWiki:Chat.css'</span><span class="br0" style="color:rgb(0,153,0);">)</span><span class="sy0" style="color:rgb(51,153,51);">;</span>
 importStylesheet<span class="br0" style="color:rgb(0,153,0);">(</span><span class="st0" style="color:rgb(51,102,204);">'User:'</span><span class="sy0" style="color:rgb(51,153,51);">+</span>wgUserName<span class="sy0" style="color:rgb(51,153,51);">+</span><span class="st0" style="color:rgb(51,102,204);">'/chat.css'</span><span class="br0" style="color:rgb(0,153,0);">)</span><span class="sy0" style="color:rgb(51,153,51);">;</span>