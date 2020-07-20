/* smarter IRC login system */
$(function() {
	var nick = (wgUserName == null) ? ('TSWUser-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-sims&prompt=true&uio=d4" width="600" height="370"></iframe>');
});