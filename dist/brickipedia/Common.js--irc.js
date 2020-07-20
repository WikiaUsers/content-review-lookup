$(function() {
	var nick = (wgUserName == null) ? ('BP-Visitor-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRCReplace').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=brickipedia&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="650" height="400" style="border:0;"></iframe>');
});