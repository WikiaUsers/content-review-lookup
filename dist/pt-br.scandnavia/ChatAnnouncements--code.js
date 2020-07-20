/* 
* Chat Announcements
* @description Create announcements for all the users in chat
* Must be installed in the wiki's MediaWiki:Chat.js or it will not work
* @author Ozuzanna - Modified by @Guilhermemau for him use.
*/
 
$(function() {
 
if (mw.config.get('wgCanonicalSpecialPageName') !== "Chat") return;
 
var forAll = window.chatAnnouncementsAll,
message,
isInlineAlert;
 
mainRoom.model.chats.bind("afteradd", function (child) {
    isInlineAlert = child.attributes.isInlineAlert == null ? false : true;
 
	if (!isInlineAlert && mainRoom.model.users.findByName(child.attributes.name) != null) {
		username = child.attributes.name;
		message = child.attributes.text;
 
		if ((mainRoom.model.users.findByName(username).attributes.isModerator || forAll) && /^\/announce2 /i.test(message)) {
			mainRoom.viewDiscussion.chatUL.children().last().remove();
			mainRoom.model.chats.add(new models.InlineAlert({text: 'Motivo:' + mw.html.escape(message.slice(10))}));
		}
	}
});
 
});