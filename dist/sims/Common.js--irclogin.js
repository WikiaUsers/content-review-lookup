/* smarter IRC login system */
$(function() {
	var nick = (mw.config.get('wgUserName') == null) ? ('TSWUser-' + Math.floor(Math.random() * 10)) : mw.config.get('wgUserName').replace(/ /g, '_'); 
	$('#IRClogin').html('<iframe src="https://webchat.freenode.net/?nick=' + nick + '&channels=wikia-sims&prompt=true&uio=d4" width="450" height="370"></iframe>');
});