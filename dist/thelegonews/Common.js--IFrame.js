/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
	var nick = (wgUserName == null) ? ('LUW-Visitor-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRCReplace').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=LUWiki&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="900" height="400" style="border:0;"></iframe>');
});

/* NS MAP TEST */
$(function() {
	var nick = (wgUserName == null) ? ('LUW-Visitor-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#NSMAPReplace').html('<iframe src="http://www.wix.com/luwiki1234/test/" width="1100" height="680" scrolling="no" style="border:0;"></iframe>');
});