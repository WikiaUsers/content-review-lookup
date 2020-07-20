//BEGIN IRC CODE
///HERE IS THE IRC REPLACER. Adds Embedded IRC to RS:IRC made by Green Reaper & ShadowTale
$(function() {
	var nick = (wgUserName == null) ? ('RSWiki-Visitor-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRCReplace').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=codesah&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="660" height="400" style="border:0;"></iframe>');
	$('#CVNIRCReplace').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=cvn-wikia-codesah&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="660" height="400" style="border:0;"></iframe>');
});
//END IRC CODE