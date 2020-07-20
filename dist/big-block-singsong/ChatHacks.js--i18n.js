/* 
 * i18n for User:Monchoman45/ChatHacks.js
 * Please suggest new translations or corrections to translations on my talk page (User talk:Monchoman45).
 */
 
switch(wgUserLanguage) {
	case 'pl':		
        	var i18n = {
			'activity': 'Aktywność - $1 czat',
			'afk': 'Z/W',
			'away': 'Jesteś teraz nieobecny.',
			'back': 'Nie jesteś już oddalony.',
			'clear': 'Wyczyść',
			'cleared': 'Okno wiadomości zostało wyczyszczone.',
			'commands': 'Komendy czatu: $1',
			'coppa': '- musisz mieć przynajmniej 13 lat, by korzystać legalnie z Wikia.',
			'demodded': '$1 nie jest już moderatorem czatu.',
			'emote': 'Twój stan',
			'erruser': 'Błąd komendy $1: Musisz podać nick użytkownika',
			'errroom': 'Błąd komendy $1: Musisz podać ID pokoju czatu',
			'example': 'Przykład',
			'exampleuser': 'PrzykładowyUżytkownik',
			'help': 'Pomoc - /$1: $2',
			'help-afk': 'Zaraz wracam -> przełącza status na "Oddalony".\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/afk\')">/afk</span>',
			'help-me': 'Wyraź swój stan. Podobny do IRC-owego /me.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/me likes chat hacks\')">/me likes chat hacks</span>',
			'help-clear': 'Wyczyszcza obecne okno czatu.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/clear\')">/clear</span>',
			'help-room': 'Napisz prywatne wiadomości.\nImiona muszą zostać oddzielone pionową kreską (#).\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/room $2\')">/room $2</span>',
			'help-mod': 'Czyni użytkownika moderatorem czatu.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/mod $2\')">/mod $2</span>',
			'help-block': 'Blokuje wysyłanie do ciebie prywatnych wiadomości przez danego użytkownika.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/block $2\')">/block $2</span>',
			'help-unblock': 'Odblokowuje wysyłanie do ciebie przez danego użytkownika prywatnych wiadomości.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/unblock $2\')">/unblock $2</span>',
			'help-kickban': 'Wyrzuć danego użytkownika z czatu.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/kickban $2\')">/kickban $2</span>',
			'help-join': 'Dołącz do czatu o wybranym ID.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/join 10\')">/join 10</span>',
			'help-part': 'Opuść obecny pokój czatu.\nAn id can also be specified for leaving a particular chat room.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/part\')">/part</span>',
			'help-id': 'Przywraca ID pokoju, w którym jesteś.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/id\')">/id</span>',
			'help-help': 'Wyświetla informację na temat komendy.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/help\')">/help</span>',
			'id': 'ID',
			'init': 'Usprawnienia czatu załadowane.\nBy zgłosić błędy, albo zaproponować tłumaczenie lub usprawnienia, napisz na <a href="http://community.wikia.com/wiki/User_talk:Monchoman45">stronie dyskusji Monchoman45</a>.',
			'nohelp': 'Brak opisu pomocy dla /$1',
			'notbanned': '$1 nie jest zbanowany/a.',
			'notmod': '$1 nie jest moderatorem czatu.',
			'pingphrases': 'Pinguj frazy',
			'pingphrasestooltip': 'Gdy ktoś wpisze wybrane przez ciebie słowa (wielkość liter nie ma znaczenia), usłyszysz brzęczyk',
			'subcoms': 'Podkomendy',
			'subdirs': 'Podkatalogi',
			'unbanned': 'Użytkownik $1 został odblokowany.',
		}
		break;
	case 'en':
	default:
		var i18n = {
			'activity': 'Activity - $1 chat',
			'afk': 'AFK',
			'away': 'You are now agay.',
			'back': 'You are no longer agay. :[',
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
			'init': 'Chat hacks initialized.\nTo rtestrors or bugs, or to suggest features or translations, leave a message at <a href="http://community.wikia.com/wiki/User_talk:Monchoman45">w:c:User talk:Monchoman45</a>.',
			'nohelp': 'No help data found for /$1',
			'notbanned': '$1 is not banned.',
			'notmod': '$1 is not a mod.',
			'pingphrases': 'Ping phrases',
			'pingphrasestooltip': 'If a user says one of these phrases (case insensitive), you will be pinged',
			'subcoms': 'Subcommands',
			'subdirs': 'Subdirectories',
			'unbanned': '$1 was unbanned.',
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