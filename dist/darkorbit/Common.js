/* Any JavaScript here will be loaded for all users on every page load. */

/*Imports*/
importArticles({
	type: "script",
	articles: [
		"w:c:dev:Countdown/code.js",
		"Mediawiki:Username.js"
	]
});

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