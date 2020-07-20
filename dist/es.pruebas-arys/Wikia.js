/** Redes sociales **/
var SocialMediaButtonsNamespaces = [0, 10, 20, 500];
var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'light',
	buttonSize: '30px',
	wikiTwitterAccount: "wikia_es"
};

/** Mensaje a la comunidad **/

importScriptPage('SocialIcons/code.js','dev');

var WikiaNotificationMessage = "Participa en... ";
importScriptPage('WikiaNotification/code.js', 'dev');
importScriptPage('UserTags/code.js', 'dev');
$(function() {
    var javascript = $('.loadjs').text();
    $('.loadjs').html('<script>'+javascript+'</script>');
});