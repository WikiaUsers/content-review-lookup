/* Any JavaScript here will be loaded for all users on every page load. */
importScript('DupLinks/code.js'); // [[User:Ucucha/duplinks]]

//Add this to your global.js file (http://c.wikia.com/wiki/Special:MyPage/global.js)


/* Chat Rules Notice Test*/
if(wgCanonicalSpecialPageName == 'Chat') {
	function ChatTopic() {
		var api = new APIQuery();
		api.send(new api.Query(api, 'GET', {action: 'query', prop: 'revisions', rvprop: 'content', titles: 'Project:Chat/Topic', indexpageids: '1'}, function(result) {
			document.getElementById('chat-topic').innerHTML = result.query.pages[result.query.pageids[0]].revisions[0]['*'];
		}));

		document.getElementById('ChatHeader').getElementsByTagName('h1')[0].innerHTML += '<div id="chat-topic" style="position:absolute; bottom:2px; z-index:5; font-weight:normal; left:250px; right:160px; height:35px; line-height:17px; font-size:smaller; color:#ccc" contenteditable="true" onblur="var api = new APIQuery(); api.send(new api.Query(api, \'POST\', {action: \'edit\', text: this.innerHTML, title: \'Project:Chat/Topic\', summary: \'changing topic\', bot: 1}, function(result) {if(result.edit.result == \'Succeeded\') {$(\'#Write textarea\').val(\'ätopic:\' + document.getElementById(\'chat-topic\').innerHTML); mainRoom.sendMessage({which: 13, preventDefault: function() {}});} else {window.alert(\'You do not have permission to change the topic.\');}}));">Topic loading...</div>';
	}
	addOnloadHook(ChatTopic);
	
	mainRoom.model.chats.bind('afteradd', $.proxy(function(data) {
		if(data.attrs.text.indexOf('ätopic:') == 0) {
			document.getElementById('chat-topic').innerHTML = data.attrs.text.substring(data.attrs.text.indexOf(':') + 1);
			this.chatUL.children().last().children('.message')[0].innerHTML = '*** Changed topic to ' + document.getElementById('chat-topic').innerHTML + ' ***';
		}
	}, mainRoom.viewDiscussion));
}
else if(!window.ChatCheck) {
	$(function () {
		if(document.body.className.indexOf('skin-oasis') == -1) {
			var a = document.getElementsByTagName('a');
			for(var i in a) {
				if(a[i].href && a[i].href.indexOf('/wiki/Special:Chat') != -1) {
					a[i].href = 'javascript:OpenChatWindow()';
				}
			}
		}
		else {
			window.chatcheck = setInterval('ChatCheck()', 200);
		}
	});
 
	function ChatCheck() {
		if($('.chat-join button').length != 0) {
			$('.chat-join button').replaceWith('<a class="wikia-button" onclick="OpenChatWindow()">' + $('.chat-join button').html() + '</a>');
			clearInterval(window.chatcheck);
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

			//common.js
			window.chatwindow.importScriptURI(wgServer + '/index.php?title=MediaWiki:Common.js&action=raw&ctype=text/javascript');
		}
	}
}

//=============================================================================
// IRC support
// from http://dev.wikia.com/wiki/Freenode_IRC#Embedding_Wikia.27s_IRC_gateway
//=============================================================================
function onloadhookcustom() {
	var replace = document.getElementById("JRChatReplace");
	if (null != replace) {
		replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=Ldbtesting" width="450" height="400"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);

if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   importScriptPage("MediaWiki:FileUsageAuto-update/code.js/min.js", "dev");
}

//Filter Table
$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});

//External Image Loader
importScriptPage('MediaWiki:ExternalImageLoader/code.js', 'dev');