importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
 //Prevent other wiki chats being linked in main chat
    if (message.match(/Special:Chat/i) && mainRoom.active == true) {
      e.preventDefault();
      inlineAlert('You cannot post other Wiki chats here on Treasure Island');
    }

	/* the user's username color above his messages */
body.ChatWindow section#WikiaPage > .Chat li[data-user="Photo Negative Mickey"] .username {
	color: #00ffff
}
	/* the user's chat message color */
body.ChatWindow section#WikiaPage > .Chat li[data-user="Photo Negative Mickey"] .message {
	color: #00ffff;
}
	/* the user's username color in the users rail */
body.ChatWindow #Rail li[data-user="Photo Negative Mickey"] .username {