//°°°°°°°°°°°°°°°°°°°°°°°°°°°
// Configurations
//°°°°°°°°°°°°°°°°°°°°°°°°°°°
 
/* Allow for anonymous announcements */
 
chatAnnouncementsAnonymous = true;
 
/* Allow to integrate videos into the chat */
// Currently images are set to false because they're ridiculously small
 
var chatags = { /*images: true,*/ videos: true };
 
//°°°°°°°°°°°°°°°°°°°°°°°°°°°
// Import scripts
//°°°°°°°°°°°°°°°°°°°°°°°°°°°
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatAwayButton/code.js',
        'u:dev:ChatSendButton.js',
        'u:dev:ChatBlockButton/code.2.js',
        'u:dev:ChatUserPageButton.js',
        'u:dev:EmoticonsWindow/code.js',
        'u:dev:FixAdminKick/code.js',
        'u:dev:IsTyping/code.js',
        'u:dev:TabInsert.js',
        'u:dev:GiveChatMod/code.js',
        'u:dev:ChatTimestamps/code.js',
        'u:dev:ChatTags/code.js',
        'u:dev:ExtendedPrivateMessaging/code.js'
    ]
});
 
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// Multi-kick button
// By Madnessfan34537 and Callofduty4
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
 
function showPopup() {
        $('body').append('<section style="left: 50%; top: 50px; width: 434px; z-index: 2000000002; margin-left: -222px;" class="modalWrapper" id="masskicker"><button class="close wikia-chiclet-button" onclick="cancelKick()"><img src="https://images.wikia.nocookie.net/common/skins/oasis/images/icon_close.png"></button><h1>Mass-kick</h1><section class="modalContent"><div><form method="" name="" class="WikiaForm "><fieldset><p>Enter usernames here, separated by a comma and a space. Tab insert works.</p><input type="text" name="multikickinput" id="multikickinput" /></fieldset></form><div style="float:right;"><a onclick="kickUsers()" class="wikia-button">Kick!</a>&nbsp;<a onclick="cancelKick()" id="cancel" class="wikia-button secondary">Cancel</a></div></section></section><div style="height: 100%; width: 100%; z-index: 2000000001; opacity: 0.65; display: block;" data-opacity="0.65" class="blackout"></div>');
}
 
function kickUsers() {
	var multikick = $('#multikickinput').val();
	if (multikick.length !== 0) {
		var usersToKick = multikick.split(", ");
		var i = 0;
		for (i; i<usersToKick.length; i++) {
			mainRoom.kick({name:usersToKick[i]});
		}
		cancelKick();
	}
}
 
function cancelKick() {
	$('#masskicker').remove();
	$('.blackout').remove();
}
 
$('<a id= "multiKickerButton" class="wikia-button" href="javascript:showPopup()" style="position:absolute; right:55px; top:22px;">Multikick</a>').appendTo('.Write');