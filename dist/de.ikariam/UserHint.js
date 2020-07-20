 /**
  * The text that is shown is stored here temporarily.
  */
 var uhText;
 
 /**
  * The config for the script.
  */
 var uhConfig;
 
 /**
  * The messages that are shown to the user.
  */
 var uhMessages;
 
 /**
  * The main funtion of the Script.
  */
 function main() {
 	init();
 	showHints();
 }
 
 /**
  * Returns an element by its id.
  * 
  * @param id - the id of the element that should be returned.
  * @return the element.
  */
 function $$(id) {
 	return document.getElementById(id);
 }
 
 /**
  * Inits the Script.
  */
 function init() {
 	// Stores the text that is shown for easier handling.
 	uhText = {
 		head:	'',
 		body:	'',
		close:	''
 	}
 	
 	// Defining of the config for the script.
 	uhConfig = {
 		useUserLang:	true,
 		nextContent:	$$('editform') ? $$('editform') : $$('WikiaArticle')
 	}
 	
 	// Defining of all possible user messages.
 	uhMessages = {
 		de: { 
 			unregistered: { 
 				head:	'Achtung: Du bearbeitest diesen Artikel unangemeldet!',
 				body:	'<br>Hallo Unbekannter,<br><br>'
 							+ 'du bearbeitest den Artikel <a href="/wiki/' + wgPageName + '">' + wgPageName + '</a> gerade unangemeldet. '
 							+ 'Bitte beachte, dass dies dazu führt, dass deine IP-Adresse für immer in der Versionsgeschichte gespeichert wird. '
 							+ 'Außerdem gibt es keine Möglichkeit für andere Benutzer, dich einfach zu kontaktieren.<br><br>'
 							+ 'Falls du schon einen Benutzeraccount hast, <a href="/index.php?title=Special:UserLogin&returnto=' + wgPageName + '">melde dich an</a>. '
 							+ 'Ansonsten <a href="/index.php?title=Special:UserLogin&type=signup&returnto=' + wgPageName + '">lege dir bitte einen Benutzeraccount an</a>. '
 							+ 'Mit diesem kannst du ganz einfach deine Beiträge im Auge behalten und dich besser mit dem Rest der Community verständigen.'
 							+ 'Des Weiteren kannst du mit einem Konto <a href="/wiki/Special:Leaderboard">Abzeichen und Bearbeitungspunkte</a> erhalten.<br><br>'
 							+ 'Mit freundlichen Grüßen, die <a href="/index.php?title=Special:ListUsers&group=sysop">Administratoren</a> des ' + wgSitename + '<br><br>'
 							+ 'PS: Mit einem Benutzerkonto kannst du in jedem Wiki bei <a href="http://de.wikia.com/">Wikia</a> aktiv sein - du brauchst dich nicht noch einmal neu anmelden.'
 			},
 			mediawiki: {
 				head:	'MediaWiki Seite',
 				body:	'Hallo ' + (wgUserName ? wgUserName : 'Unbekannter') + ',<br><br>'
 							+ 'du betrachtest eine MediaWiki Seite. '
 							+ 'Diese Seiten werden für globale Einstellungen des Wikis genutzt. '
 							+ 'Aus diesem Grund ist es nur <a href="/index.php?title=Special:ListUsers&group=sysop">Administratoren</a> und <a href="/index.php?title=Special:ListUsers&group=bureaucrat">Bürokraten</a> erlaubt, diese Seiten zu bearbeiten.<br><br>'
 							+ 'Mit freundlichen Grüßen, die <a href="/index.php?title=Special:ListUsers&group=sysop">Administratoren</a> des ' + wgSitename
 			},
			close:		'Schließen'
 		},
 		en: { 
 			unregistered: { 
 				head:	'Attention: You are editing while not being logged in!',
 				body:	'Hello wanderer,'
 							+ 'you are editing <a href="/wiki/' + wgPageName + '">' + wgPageName + '</a> while not being logged in. '
 							+ 'Please note that this will cause your IP-Adress being recorded in the version history forever. '
 							+ 'In addition, there is no way for other users to contact you easily.<br><br>'
 							+ 'If you already have an useraccount, <a href="/index.php?title=Special:UserLogin&returnto=' + wgPageName + '">please log in</a>. '
 							+ 'Otherwise <a href="/index.php?title=Special:UserLogin&type=signup&returnto=' + wgPageName + '">please sign in and create a new user account</a>. '
 							+ 'It\'s an easy way to keep track of your contributions and helps you to communicate with the rest of the community.'
 							+ 'Also you can claim <a href="/wiki/Spezial:Leaderboard">badges and edit point\'s</a> with an registered account.<br><br>'
 							+ 'Greetings, the <a href="/index.php?title=Special:ListUsers&group=sysop">administrators</a> of the ' + wgSitename + '<br><br>'
 							+ 'PS: With this user account you are able to edit in every wiki hosted on <a href="http://www.wikia.com/">Wikia</a> - you need not to register again.'
 			},
 			mediawiki: {
 				head:	'MediaWiki Page',
 				body:	'Hello ' + (wgUserName ? wgUserName : 'wanderer') + ',<br><br>'
 							+ 'you are viewing a MediaWiki page. '
 							+ 'Those pages are used to define global settings for the wiki. '
 							+ 'For this reason it is just allowed to <a href="/index.php?title=Special:ListUsers&group=sysop">administrators</a> and <a href="/index.php?title=Special:ListUsers&group=bureaucrat">bureaucrats</a> to edit this page.<br><br>'
 							+ 'Greetings, the <a href="/index.php?title=Special:ListUsers&group=sysop">administrators</a> of the ' + wgSitename
 			},
			close:		'close'
 		}
 	}
 	
 	// Selection of the language which is used
 	var lang = 'en';
 	if((uhConfig.useUserLang ? wgUserLanguage : wgContentLanguage) in uhMessages) {
 		lang = uhConfig.useUserLang ? wgUserLanguage : wgContentLanguage;
 	}
 	
 	// Update of the user messages.
 	uhMessages = uhMessages[lang];
 }
 
 /**
  * Proves if a hint should be shown and shows it.
  */
 function showHints() {
 	// Shows a hint if an unregistered user does an edit.
 	if(!wgUserName && (wgAction == "edit" || wgAction == "submit")) {
 		uhText.head = uhMessages.unregistered.head;
 		uhText.body = uhMessages.unregistered.body;
 		uhText.close = uhMessages.close;

 		showUserHint('edit');
 	}
 	
 	// Shows a hint on MediaWiki Pages.
 	if(wgNamespaceNumber == 8 && !arrayContains(new Array('sysop', 'bureaucrat', 'staff'), wgUserGroups)) {
 		uhText.head = uhMessages.mediawiki.head;
 		uhText.body = uhMessages.mediawiki.body;
		uhText.close = uhMessages.close;
 		
 		showUserHint('mwpage');
 	}
 }
 
 /**
  * Returns true if an array contains at least one of the words.
  * 
  * @param words	- Array with the words that should be cotained.
  * @param array	- Array that should contain the words.
  * @return if the array contains the word or not.
  */
 function arrayContains(words, array) {
 	if(!words || !array) {
 		return false;
 	}
 
 	for(var i = 0; i < words.length; i++) {
 		for(var j = 0; j < array.length; j++) {
 			if(words[i] == array[j]) {
 				return true;
 			}
 		}
 	}
 
 	return false;
 }
 
 /**
  * Shows the hint to the user.
  * 
  * @param id - the id of the user hint.
  */
 function showUserHint(id) {
 	var uhWrapper = newElement('div', 'userHint-' + id, 'userHint-wrapper', null);
 	uhConfig.nextContent.parentNode.insertBefore(uhWrapper, uhConfig.nextContent);

 	var uhHead  = newElement('div', null, 'userHint-head', uhWrapper);
	var uhHeadL = newElement('div', null, 'userHint-head-left', uhHead);
	var uhHeadR = newElement('div', null, 'userHint-head-right', uhHead);
	var uhClose = newElement('input', null, 'userHint-close', uhHeadR);
 	newElement('hr', null, null, uhWrapper);
 	var uhBody = newElement('div', null, 'userHint-body', uhWrapper);
	
	uhClose.type = 'button';
	addEvent(uhClose, 'click', function() {var newId = id;closePanel(newId);});

 	uhHeadL.innerHTML = uhText.head;
	uhClose.value = uhText.close;
 	uhBody.innerHTML = uhText.body;
 }
 
 /**
  * Creates a new element.
  * 
  * @param	type	- the type of the new element
  * @param	id		- the id of the new element (optional, if not used type null)
  * @param	classes	- the class(es) of the new element (optional, if not used type null)
  * @param	parent	- the parent of the new element (optional, if not used type null)
  * @return	the new element
  */
 function newElement(type, id, classes, parent) {
 	var new_element = document.createElement(type);
 	
 	if(id) {
 		new_element.id = id;
 	}
 	
 	if(classes) {
 		new_element.className = classes;
 	}
 	
 	if(parent) {
 		parent.appendChild(new_element);
 	}
 	
 	return new_element;
 }
	
 /**
  * Removes an user hint.
  * 
  * @param id - the id of the user hint.
  */
 function closePanel(id) {
	var toRemove = $$('userHint-' + id);
	toRemove.parentNode.removeChild(toRemove);
 }

 /**
  * Adds an eventlistener indepent from the browser.
  * from http://ejohn.org/blog/flexible-javascript-events/
  * 
  * @param obj	- the Object where the listener should be added.
  * @param type	- the type of the listener.
  * @param fn	- the function that should be executed.
  */
 function addEvent(obj, type, fn) {
 	if (obj.addEventListener)
 		obj.addEventListener( type, fn, false );
 	else if (obj.attachEvent) {
 		obj["e"+type+fn] = fn;
 		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
 		obj.attachEvent( "on"+type, obj[type+fn] );
 	}
 }
 
 // Calls the main function.
 addOnloadHook(main);