/*

	this feature automatically disables commenting in old threads
	works both in Oasis and Monobook

*/
if (mw.config.get("wgNamespaceNumber") == 1201) { // check if namespace is Thread
$(function() {
	var messages = $("#Wall .message.SpeechBubble:not(.message-removed)"),
		lastMessage = $(messages).last(),
		lastMessageTimeWrapper = $(lastMessage).find(".MiniEditorWrapper:first > .msg-toolbar .permalink span"),
		lastMessageTimeString = $(lastMessageTimeWrapper).last().html(),
		lastMessageTime = new Date(lastMessageTimeString.substr(7) + ", " + lastMessageTimeString.split(",")[0]).getTime();
	if ($("li#1 > .deleteorremove-infobox").length == 0 && (new Date().getTime() - lastMessageTime) / 86400000 > 30) {
		// thread hasn't been closed && last message was posted 30 days ago or before
		$(".editarea").last().html(
			'<div style="color: #aaa; font-style: italic; text-align: center; cursor: default;">\n' +
				'\tThis thread hasn\'t been edited for over a month. There is no reason to add new replies.\n' +
			'</div>'
		);
	}
});
}