// Credit to Joeytje50 of RSW
// Made the page for CoD4's Options script
 
if(wgCanonicalSpecialPageName == 'Chat') {
function createGroupPM() {
var users = prompt('Enter comma seperated list of users to start a PM with',);
var users = users.split(',');
mainRoom.openPrivateChat(users);
}
$('form#Write').append('<a class="wikia-button" href="javascript:createGroupPM()" style="position:absolute; right:50px; top:0;">PM</a>');
}