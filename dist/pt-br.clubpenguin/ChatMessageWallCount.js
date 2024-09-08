//ChatMessageWallCount - Count of Howard
//Credit to Penguin-Pal
//17-10-16 - Initial revision
 
(function () {
	if (mw.config.get("wgCanonicalSpecialPageName") == "Chat") {
 
		var config = mw.config.get([
			'wgServer'
		]);
		var textHeader = "Message Wall Activity";
		var htmlContent = '<div id="messages" style="font-weight: bold; font-size: 11px; position: absolute; cursor: pointer; top: 5px; right: 190px;">' + textHeader + '<br /><span id ="count" style="font-size: 10px; color: #cc0000; display: none;">Carregando...</span></div>';
 
		function getJSON() {
			$.getJSON(config.wgServer + "/wikia.php?controller=WallNotificationsExternal&method=getUpdateCounts&format=json", function(data) {
				var json = data;
			}).done(notify);
		}
 
		function notify(json) {
			var messagesNumber = json.count;
			var messageText = "Você tem " + (messagesNumber) + " mensagens não-lidas" + (messagesNumber > 1 || messagesNumber === 0 ? "s" : "") + ".";
			$("#messages #count").html(messageText);
		}
 
		$("header#ChatHeader .public.wordmark").after(htmlContent);
		$("#messages").on( "click", function() {
			getJSON();
			$("#messages #count").fadeIn(500).delay(2000);
			$("#messages #count").fadeOut(500);
		});
	}
}());