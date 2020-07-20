if(wgCanonicalSpecialPageName == 'Chat') {
function createGroupPM() {
var users = prompt('Введите никнеймы пользователей, которые буду входить в МЛС','');
var users = users.split(',');
mainRoom.openPrivateChat(users);
}
$('form#Write').append('<a class="wikia-button" href="javascript:createGroupPM()" style="position:absolute; right:50px; top:0;">МЛС</a>');
}