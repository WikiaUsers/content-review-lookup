/* Any JavaScript here will be loaded for all users on every page load. */
/** Username replace function ([[template:USERNAME]]) *******************************
  * Inserts user name into <span class="insertusername"></span>
  * Originally by [[wikia:User:Splarka|Splarka]]
  * New version by [[User:Spang|Spang]]
  */
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
$(function() {
	var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-bl&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
});