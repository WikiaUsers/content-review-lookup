//Imports
importScriptPage('ChatOptions/code.js', 'dev');

//Third line: if (!this.innerHTML.match(/<names of users who are chat mods but ***not*** admins, separated by vertical bars (|)>/)) {
setInterval(function() {
	$('#Rail .User.chat-mod:not(.admin) .username,#ChatHeader .User.chat-mod:not(.admin) .username').each(function() {
		if (!this.innerHTML.match(/default/)) {
			$(this).parent().addClass('admin');
		}
	});
}, 1000);

//Third line: if (!this.innerHTML.match(/<names of users who are admins or chat mods but ***not*** bureaucrats, separated by vertical bars (|)>/)) {
setInterval(function() {
	$('#Rail .User.chat-mod:not(.bureaucrat) .username,#ChatHeader .User.chat-mod:not(.bureaucrat) .username').each(function() {
		if (!this.innerHTML.match(/~Boggy B~/)) {
			$(this).parent().addClass('bureaucrat');
		}
	});
}, 1000);
//Code inplemented from http://runescape.wikia.com/wiki/MediaWiki%3AChat.js and modified by user Oscuritaforze