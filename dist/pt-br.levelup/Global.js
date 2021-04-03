importScriptPage('MediaWiki:ChatPMs.js', 'c');
importScriptPage('MediaWiki:multikick.js', 'callofduty');
importScriptPage('MediaWiki:ChatHacks.js', 'c');
//Multiple PMS
if(wgCanonicalSpecialPageName == 'Chat') {
function createGroupPM() {
var users = prompt('Enter comma seperated list of users to start a PM with','');
var users = users.split(',');
mainRoom.openPrivateChat(users);
}
$('form#Write').append('<a class="wikia-button" href="javascript:createGroupPM()" style="position:absolute; right:50px; top:0;">PVT</a>');
}