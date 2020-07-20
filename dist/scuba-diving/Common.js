/* Any JavaScript here will be loaded for all users on every page load. */

/*Imports*/
importArticles({
	type: "script",
	articles: [
		"w:c:dev:Countdown/code.js"
	]
});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
	Requires copying Template:USERNAME. */

function UserNameReplace() {
	if (typeof (disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
	$("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */
// Insert username
if (mwConfig.wgAction === 'view' && mwConfig.wgUserName !== null) {
	$('.insertusername').text(mwConfig.wgUserName);
}

// Insert username
if (mwConfig.wgAction === 'view' && mwConfig.wgUserName !== null) {
	$('.insertusername').text(mwConfig.wgUserName);
}

/* Disuse Chat Module
//DO Chat Embed
$('#dochatwindow').html("Notice: This is a external chat system, and it doesn't use your normal Wikia login. You may use the anon-name identifier if you do not wish to create an account.<br><button onclick='dochatwindow()' style='margin:10px auto;'>Enter the DO Wikia Chat <!--(Bug right now, please use External Link below)--></button>")
function dochatwindow() {
	$("#dochatwindow").html("<object width='600px' height='800px' data='http://st.chatango.com/flash/group.swf?ref=dowiki.chatango.com&gn=dowiki.chatango.com'></object>")
}



//Chat Link Module
if ($('#dochatwindow').length == 0) {
	$('#WikiaRail').append('<section class="module" id="dowikichatmodule"><h1>External Chat</h1>NOTE: We are using an external chat system, and not the chat system provided by Wikia.<br><button>Continue to the chat page.</button></section>');
	$('#dowikichatmodule > button').attr("onclick", 'window.open("http://darkorbit.wikia.com/wiki/Darkorbit_Wiki:Chat", "DO Wiki Chat", "menubar=no,toolbar=no")')
}
*/