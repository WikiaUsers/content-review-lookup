/* get all personal code files in chat */
    /* Important: you must click the chat button in the rail for this to work. */
    /* Very important: Chat is still a beta feature. Chat hacks may break as the feature is changed and updated, as it is a work in progress. */

importScriptPage('MediaWiki:Wikia.js', 'agentswipetest')
 
    $(setTimeout('ChatCheck()', 200));
 
    function ChatCheck() {
            if($('.chat-join button').length != 0) {
                    $('.chat-join button').replaceWith('<a class="wikia-button" onclick="OpenChatWindow()"><img src="https://images.wikia.nocookie.net/common/__cb36140/extensions/wikia/Chat/images/chat_icon.png" style="margin-right:3px;">Join the Chat</a>');
            } else {
                    setTimeout('ChatCheck()', 200);
            }
    }
 
    function OpenChatWindow() {
            window.chatwindow = window.open('/index.php?title=Special:Chat&useskin=wikia');
            window.chatwindow.onload = function () {
                    //addOnloadHook, importScript, and importStylesheet
                    window.chatwindow.$('body').prepend('<script>\nfunction importScript(b){var a=wgScript+"?title="+encodeURIComponent(b.replace(/ /g,"_")).replace(/%2F/ig,"/").replace(/%3A/ig,":")+"&action=raw&ctype=text/javascript";return importScriptURI(a)}\nfunction importScriptURI(a){var b=document.createElement("script");b.setAttribute("src",a);b.setAttribute("type","text/javascript");document.getElementsByTagName("head")[0].appendChild(b);return b}\nfunction importScriptPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/javascript";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importScriptURI(a)}\nfunction importStylesheet(a){return importStylesheetURI(wgScript+"?action=raw&ctype=text/css&title="+encodeURIComponent(a.replace(/ /g,"_")))}\nfunction importStylesheetURI(b,d){var a=document.createElement("link");a.type="text/css";a.rel="stylesheet";a.href=b;if(d){a.media=d}document.getElementsByTagName("head")[0].appendChild(a);return a}\nfunction importStylesheetPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/css";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importStylesheetURI(a)}\n//This isn\'t the same as the regular addOnloadHook, because the regular one runs from a script tag in the body that I don\'t feel like appending. It\'s easier to just make it $(function), which is essentially equivalent\nfunction addOnloadHook(func) {$(func);}\n</script>');
                    //global.js
                    window.chatwindow.importScriptURI('http://community.wikia.com/index.php?title=User:' + wgUserName + '/global.js&action=raw&ctype=text/javascript');
                    //wikia.js
                    window.chatwindow.importScriptURI(wgServer + '/index.php?title=User:' + wgUserName + '/wikia.js&action=raw&ctype=text/javascript');
                    //global.css
                    window.chatwindow.importStylesheetURI('http://community.wikia.com/index.php?title=User:' + wgUserName + '/global.css&action=raw&ctype=text/css');
                    //wikia.css
                    window.chatwindow.importStylesheetURI(wgServer + '/index.php?title=User:' + wgUserName + '/wikia.css&action=raw&ctype=text/css');
 
                    //These are my chat hacks. If you don't want them, you can delete this line.
                    window.chatwindow.importScriptURI('http://fate.wikia.com/index.php?title=ChatHacks.js&action=raw&ctype=text/javascript');
            }
    }