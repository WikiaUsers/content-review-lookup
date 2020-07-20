/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
			$("li").click(function(open) {
			  e.preventDefault();
			  $("li").removeClass("selected");
			  $(this).addClass("selected");
			});
		});


/* IRClogin div */
$(function() {
    if ($('#IRClogin').length) {
        if (typeof wgUserName == 'undefined') {
            var nick = 'Wikian' + Math.floor(Math.random() * 100);
        } else {
            var nick = wgUserName.replace(/ /g, "_");
        }
        $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=halcyonictests&prompt=true" width="660" height="400" style="border:0;"></iframe>');
    }
});