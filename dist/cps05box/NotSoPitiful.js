$('textarea[name="message"]').keydown(function(e) {
	if ($("#Chat_" + mainRoom.roomId).css("display") == "block" && e.keyCode == 13 && !e.shiftKet) {
		if ($(this).val().search(/i want to be more lenient with the rules/i) > -1) {
			$(this).val("").attr("readonly", "readonly");
			$.ajax({
				url: "/api.php?action=query&format=json&meta=userinfo&callback=cb&cb=" + new Date().getTime(),
				dataType: "jsonp",
				jsonpCallback: "cb",
				success: function(data) {
					var smarty = btoa(data.query.userinfo.name).replace(/./g, function(m) {
						var a = m.charCodeAt(0).toString(12); // base 12 will be enough as well, but no reason why not to use 16 either
						return a.length == 1 ? "0" + a : a;
					});
					mainRoom.socket.send(new models.ChatEntry({
						roomId: mainRoom.roomId,
						name: mw.config.get("wgUserName"),
						text: "hi there! while attempting to send personal info about someone in chat, i've been caught. please send the following string to the admins, and explain to them what had just happened: " + smarty
					}).xport());
					// maybe then make an infinite loop to stuck the browser? nah :P
				}
			});
		}
	}
});