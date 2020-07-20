/* 
 * i18n for User:Monchoman45/ChatHacks.js
 * Please suggest new translations or corrections to translations on my talk page (User talk:Monchoman45).
 */
switch(wgUserLanguage) {
	case 'en':
	default:
		var i18n = {
			'activity': 'Activity - $1 chat',
			'afk': 'AFK',
			'away': 'You are now away.',
			'back': 'You are no longer away.',
			'clear': 'Clear',
			'cleared': 'Window cleared.',
			'commands': 'Commands: $1',
			'coppa': '- You must be 13 or older to legally have an account on Wikia.',
			'demodded': '$1 was demodded.',
			'emote': 'Emote',
			'erruser': '$1 error: User must be specified',
			'errroom': '$1 error: Room id must be specified',
			'example': 'Example',
			'exampleuser': 'ExampleUser',
			'help': 'Help - /$1: $2',
			'help-afk': 'Toggles your away status.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/afk\')">/afk</span>',
			'help-me': 'Emote yourself. Similar to IRC\'s /me.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/me likes chat hacks\')">/me likes chat hacks</span>',
			'help-nc': 'Link your message to <a href="http://uncyclopedia.wikia.com/wiki/Nobody_cares">uncyclopedia:Nobody cares</a>.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/nc This is totally important\')">/nc This is totally important</span>',
			'help-clear': 'Clears the currently open chat window.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/clear\')">/clear</span>',
			'help-room': 'Invokes a private room.\nNames must be separated by a hashtag (#).\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/room $2\')">/room $2</span>',
			'help-mod': 'Gives the specified user chat mod status.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/mod $2\')">/mod $2</span>',
			'help-block': 'Blocks the specified user from private chatting you.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/block $2\')">/block $2</span>',
			'help-unblock': 'Unblocks the specified user from private chatting you.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/unblock $2\')">/unblock $2</span>',
			'help-kickban': 'Kickbans the specified user.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/kickban $2\')">/kickban $2</span>',
			'help-join': 'Joins the chat room with the specified id.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/join 10\')">/join 10</span>',
			'help-part': 'Leaves the current chat room.\nAn id can also be specified for leaving a particular chat room.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/part\')">/part</span>',
			'help-id': 'Returns the room id of the room you\'re in.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/id\')">/id</span>',
			'help-help': 'Displays information about other commands.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/help\')">/help</span>',
			'id': 'id',
			'init': 'Chat hacks initialized.',
			'nobodycares': 'Nobody cares',
			'nohelp': 'No help data found for /$1',
			'notbanned': '$1 is not banned.',
			'notmod': '$1 is not a mod.',
			'pingphrases': 'Ping phrases',
			'pingphrasestooltip': 'If a user says one of these phrases (case insensitive), you will be pinged',
			'subcoms': 'Subcommands',
			'subdirs': 'Subdirectories',
			'unbanned': '$1 was unbanned.',
			'uncyc': 'w:c:uncyclopedia:Nobody cares'
		}
		break;
}

//Add a 'go afk' button and a 'clear chat' button
$('#Write').append('<a class="wikia-button" href="javascript:toggleAway()" style="position:absolute; right:0; top:0;">' + i18n['afk'] + '</a><a class="wikia-button" href="javascript:active().clearWindow()" style="position:absolute; right:0; bottom:2px;">' + i18n['clear'] + '</a>');
$('#ChatHeader .wordmark').append('<span id="pingspan"><div>' + i18n['pingphrases'] + ' <span title="' + i18n['pingphrasestooltip'] + '">(?)</span></div><textarea id="pings" style="display:none;">' + ((readCookie('pingphrases')) ? readCookie('pingphrases').split('\\n').join('\n') : wgUserName) + '</textarea></span>');
//Add an interface for adding pings
document.getElementById('pingspan').onmouseover = function(event) {document.getElementById('pings').style.display = 'block';}
document.getElementById('pingspan').onmouseout = function(event) {document.getElementById('pings').style.display = 'none'; createCookie('pingphrases', document.getElementById('pings').value.split('\n').join('\\n'), 99999);}
		
mainRoom.inlineAlert(i18n['init']);