/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
	var nick = (wgUserName == null) ? ('LegoGames-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRCReplace').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=LegoGames&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="900" height="400" style="border:0;"></iframe>');
});