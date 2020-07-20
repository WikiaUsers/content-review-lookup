// <nowiki>
/*
 * Rollback-mods.js
 * Adds several rollback buttons to diff pages, which place a warning template on the talk page of the user who was reverted
 * Authored by http://callofduty.wikia.com/wiki/User:Sactage <sactage@sactage.com> 2012
 */
function warnUser(username, warntype, warnpage, rblink) {
	var addtext, reason;
	switch (warntype) {
		case "vandalism":
			addtext = "{{subst:Vandalism|" + warnpage + "|~~~~}}";
			reason = "Warning user for vandalism";
			break;
		case "badedit":
			addtext = "{{subst:Bad Edit|" + warnpage + "|~~~~}}";
			reason = "Warning user for a bad edit";
			break;
		case "ddd":
			addtext = "{{subst:DDD|~~~~}}";
			reason = "Warning user for [[COD:DDD]] violation";
			break;
		case "irl":
			addtext = "{{subst:No IRL|" + wgUserName + "|~~~~}}";
			reason = "Warning user for addition of IRL info";
			break;
		case "leak":
			addtext = "{{subst:Leaked|~~~~}}";
			reason = "Warning user for violation of [[COD:LEAK]]";
			break;
		default:
			return;
		}
		$.post("/api.php", {action: "edit", title: "User talk:" + username, token: mw.user.tokens.values.editToken, appendtext: addtext, summary: reason}, function(data){
			$.ajax( {
				url: rblink.attr("href"),
				success: function () {
                                window.location = "/wiki/" + mw.config.get("wgUserName") + "?action=purge";
					console.log("Success!");
				},
				error: function () {
					rblink.text( function ( i, val ) {
						return val + ' [failed]';
					} );		
				}
			} );
		});
        
}
function rollbackLinks () {
	baselink = $(".mw-rollback-link a")[0];
	warntypes = {"vandalism": "V", "badedit": "BE", "ddd": "DDD", "irl": "IRL", 'leak': "LEAK"};
	for ( var i in warntypes ) {
		if ( warntypes.hasOwnProperty( i ) ) {
			$(baselink).after('&nbsp;&bull;&nbsp;<a href="' + baselink.href + '" warntype="' + i + '">RB (' + warntypes[i] + ')</a>');
		}
	}
}
$(function() {
	if ($("#mw-diff-ntitle2 .mw-rollback-link").length) {
		rollbackLinks();
		$(".mw-rollback-link a").click( function (event) {
			var $rblink = $( this );
			var user = $rblink.attr( 'href' ).replace( /.*[&?]from=([^&]*).*/, '$1' ).replace( /\+/g, '_' );
			if ($rblink.attr("warntype") != undefined && $rblink.attr("warntype") != null) {
				event.preventDefault();
				warnUser(user, $rblink.attr("warntype"), mw.config.get("wgPageName"), $rblink);
				console.log("Warned " + user);
			} else {
				window.location = $rblink.attr("href");
			}
		});
	}
});
// </nowiki>