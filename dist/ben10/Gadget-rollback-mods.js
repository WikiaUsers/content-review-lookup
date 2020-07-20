// <nowiki>
/*
 * Rollback-mods.js
 * Adds several rollback buttons to diff pages, which place a warning template on the talk page of the user who was reverted
 * Authored by http://callofduty.wikia.com/wiki/User:Sactage <sactage@sactage.com> 2012
 */
function warnUser(username, warntype, warnpage) {
	$.getJSON("/api.php", {action: "query", prop: "info", titles: "User talk:" + username, intoken: "edit", format: "json", indexpageids: 1}, function(json) {
		var pageid = json.query.pageids[0];
		var tk = json.query.pages[pageid].edittoken;
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
		$.post("/api.php", {action: "edit", title: "User talk:" + username, token: tk, appendtext: addtext, summary: reason}, function(data){});
                
	});
}
function rollbackLinks () {
	baselink = $(".mw-rollback-link a")[0];
	warntypes = {"vandalism": "V", "badedit": "BE", "ddd": "DDD", "irl": "IRL", 'leak': "LEAK"};
	for (var i in warntypes) {
		$(".mw-rollback-link").append(' | <a href="' + baselink.href + '" warntype="' + i + '">RB (' + warntypes[i] + ')</a>');
		$(".mw-rollback-link a").click( function (event) {
			event.preventDefault();
			var $rblink = $( this );
			$.ajax( {
				url: $rblink.attr( 'href' ),
				success: function () {
					console.log("Success!");
					var	user = $rblink.attr( 'href' ).replace( /.*[&?]from=([^&]*).*/, '$1' ).replace( /\+/g, '_' );
					console.log($rblink.attr("warntype"));
					if ($rblink.attr("warntype") != undefined && $rblink.attr("warntype") != null) {
						warnUser(user, $rblink.attr("warntype"), wgPageName);
                                                alert("Warned " + user);
                                                window.location.href = "/wiki/" + wgPageName + "?action=purge";
					}
				},
				error: function () {
					$rblink.text( function ( i, val ) {
						return val + ' [failed]';
					} );		
				}
			} );
		});
	}
}
$(document).ready( function() {
 if ($("#mw-diff-ntitle2 .mw-rollback-link").length) {
  rollbackLinks();
 }
});
// </nowiki>