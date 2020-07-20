/* Imports */
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
importScriptPage('ChatOptions/code.js', 'dev');

/* Mark admins; code written on RuneScape Wiki: http://runescape.wikia.com/wiki/MediaWiki:Chat.js */
setInterval(function() {
	$('#Rail .User.chat-mod:not(.admin) .username,#ChatHeader .User.chat-mod:not(.admin) .username').each(function() {
		if (!this.innerHTML.match(/Blanzer|Drkpanoz|Kida155|RenzXVI/)) {
			$(this).parent().addClass('admin');
		}
	});
}, 1000);

/* Add IRC tab to chat */
function switchIrcTabs(to, dzwikiapage) {
	var dzcur = document.getElementsByClassName('dzactive')[0], i;
	
	if ((dzcur.id === 'dzchat' && to === 1) || (dzcur.id === 'dzirc' && to === 2)) return;
	if (to === 1) {
		document.getElementById('dzchat').className = 'dzactive';
		document.getElementById('dzirc').className = '';
		
		for (var i = 0; i <3; i++) {
			dzwikiapage.children[i].style.display = '';
			dzwikiapage.children[3].style.display = 'none';
		}
	} else {
		document.getElementById('dzirc').className = 'dzactive';
		document.getElementById('dzchat').className = '';
		
		for (var i = 0; i <3; i++) {
			dzwikiapage.children[i].style.display = 'none';
			dzwikiapage.children[3].style.display = '';
		}
	}
}

function loadIrcTabs() {
	var dzchat = document.createElement('span'),
    dzIRC = document.createElement('span'),
    dzstyle = document.createElement('style')
    dzref = document.getElementById('ChatHeader').getElementsByTagName('a')[0],
    dzframe = document.createElement('iframe'),
    dzwikiapage = document.getElementById('WikiaPage');

	dzstyle.innerHTML = '#dzchat:not(:nth-child(2)),#dzirc:not(:nth-child(3)) { display: none } #dzchat, #dzirc { cursor: pointer; background: #EEE; padding: 1px 40px; border: 1px solid #333; font-size: 18px; border-radius: 2px 2px 0 0; margin: 0 4px 0 30px; } #dzirc { margin: 0 4px 0 0; } .dzactive { color: #000; cursor: default; background: #DDD !important; } iframe { width: 100%; height: 100%; }';
	dzframe.src = 'http://webchat.gamesurge.net?channels=terraria-wikia';
	dzframe.style.display = 'none';

	dzchat.innerHTML = 'Chat';
	dzchat.id = 'dzchat';
	dzchat.className = 'dzactive';
	dzchat.addEventListener('click', function(){
		switchIrcTabs(1, dzwikiapage);
	}, false);

	dzIRC.innerHTML = 'IRC';
	dzIRC.id = 'dzirc';
	dzIRC.addEventListener('click', function(){
		switchIrcTabs(2, dzwikiapage);
	}, false);

	dzref.parentNode.insertBefore(dzIRC, dzref.nextSibling);
	dzref.parentNode.insertBefore(dzchat, dzref.nextSibling);
	document.head.appendChild(dzstyle);
	dzwikiapage.appendChild(dzframe);
}

if (!document.getElementById('dzchat')) {
	window.setTimeout(loadIrcTabs, 3000);
}