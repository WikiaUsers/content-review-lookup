/* Any JavaScript here will be loaded for all users on every page load. */
//BEGIN IRC CODE
///HERE IS THE IRC REPLACER. Adds Embedded IRC to RS:IRC made by Green Reaper & ShadowTale
$(function() {
	var nick = (wgUserName == null) ? ('MBW-Visitor-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRCReplace').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-mythbusters&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="1000" height="400" style="border:0;"></iframe>');
	$('#CVNIRCReplace').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=cvn-wikia-mythbusters&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="1000" height="400" style="border:0;"></iframe>');
});
//END IRC CODE