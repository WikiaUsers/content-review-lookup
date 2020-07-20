// Source : http://callofduty.wikia.com/wiki/User:Madnessfan34537/multipm.js
// Modifié par Aster09 pour traduction en français
// Code importé depuis les Sims Wiki francophone
 
if(wgCanonicalSpecialPageName == 'Chat') {
function createGroupPM() {
var users = prompt('Entrez la liste des utilisateurs avec lesquels démarrer une discussion privée en les séparant par une virgule','');
var users = users.split(',');
mainRoom.openPrivateChat(users);
}
$('form#Write').append('<a class="wikia-button" href="javascript:createGroupPM()" style="position:absolute; right:0px; top:0;">Multi-MP</a>');
}