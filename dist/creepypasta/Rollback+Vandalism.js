/*
 * Rollback-mods.js
 * Adds several rollback buttons to diff pages, which place a warning template on the talk page of the user who was reverted
 * Authored by http://callofduty.wikia.com/wiki/User:Sactage <sactage@sactage.com> 2012
 */
function warnUser(username, warntype, warnpage, rblink) {
	var addtext, reason;
	switch (warntype) {
		case "vandalism":
			addtext = "<br>
==Vandalism Warning==
<br>
Attention! Your edit(s) have been reverted because they were considered vandalism. I suggest you review the [[Site Rules|site rules]] before editing any further. After 3 vandalism warnings you will be blocked for 1 week with the reason of vandalizing pages. If you continue to vandalize after you have been blocked the first time you will be blocked permanently. (If unsigned {{Unsigned|Benjaminthewill123123}}) [[File:Ben.png|link=http://creepypasta.wikia.com/wiki/User:Benjaminthewill123123|User Page]][[File:Ben2.png|link=http://creepypasta.wikia.com/wiki/User_talk:Benjaminthewill123123|Talk Page]] 04:34, April 2, 2013 (UTC)";
			reason = "Warning user for vandalism";
			break;
		default:
			return;
		}
		$.post("/api.php", {action: "edit", title: "User talk:" + username, token: mw.user.tokens.values.editToken, appendtext: addtext, summary: reason}, function(data){
			$.ajax( {
				url: rblink.attr("href"),
				success: function () {
                                window.location = "/wiki/" + wgPageName + "?action=purge";
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
				warnUser(user, $rblink.attr("warntype"), wgPageName, $rblink);
				console.log("Warned " + user);
			} else {
				window.location = $rblink.attr("href");
			}
		});
	}
});