/* 
* Chat Announcements
* @description Create announcements for all the users in chat
* Must be installed in the wiki's MediaWiki:Chat.js or it will not work
* @author Ozuzanna
*/
 
;(function($, mw) {
 
if (mw.config.get('wgCanonicalSpecialPageName') !== "Chat") return;
 
var forAll = window.chatAnnouncementsAll,
object,
username,
escapedUsername,
message;
 
mainRoom.model.chats.bind("afteradd", function (child) {
	object = $('#entry-' + child.cid);
 
	if (!object.hasClass('inline-alert')) {
		username = object.attr('data-user');
		escapedUsername = username.replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, '\\$&').replace(/ /g, "_");
		message = object.children('.message').text().trim();
 
		if (($("#WikiChatList #user-" + escapedUsername).hasClass('chat-mod') || forAll) && message.substr(0,10).match(/\/announce/i))
			object.addClass('inline-alert custom-ca').removeClass('you continued').html('<a href="' + mw.util.getUrl('User:' + mw.html.escape(username)) + '">' + mw.html.escape(username) + '</a>: ' + mw.html.escape(message.substr(10)));
	}
	//make next post not invisible avatar if same user as announcement prior
	if (!object.hasClass('custom-ca') && object.prev().hasClass('custom-ca'))
		object.removeClass('continued');
});
 
}) (this.jQuery, this.mediaWiki);
//