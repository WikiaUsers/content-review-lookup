$(function() {
	if (! document.getElementById('infoboxTournament')) return;
	function requestPurges() {
		return new mw.Api().postWithToken("csrf", {
			action: "customlogswrite",
			logtype: "tournamentpurge",
			title: mw.config.get("wgPageName"),
			publish: 1,
		}).then(function(data) {
			displayColor("gadget-action-success");
		});
	}
	$(mw.util.addPortletLink('p-cactions', 'javascript:;', '!Request Purges', 'ca-request-purges', 'Request Purges')).click(requestPurges);
});