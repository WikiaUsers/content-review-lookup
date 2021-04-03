/* When this gadget is enabled and the user is in bot mode, 
 * the edit summary will be auto-filled with its previous value.
 * This is meant as a convenience when making a manual change to multiple pages on the wiki.
 */
const SUMMARY_INPUT = "#wpSummary";

$(document).ready(function() {
	$(SUMMARY_INPUT).on("blur", saveSummary);
	isBot().then(insertSummary);
});

function saveSummary() {
	const summary = $(SUMMARY_INPUT).val();
	if (summary !== "") {
		localStorage.setItem("editSummary", summary);
	}
}

function isBot() {
	return new mw.Api().get({
		action: "query",
		meta: "userinfo",
		uiprop: "groups",
	}).then(function(result) {
		return result.query.userinfo.groups.includes("bot");
	});
}

function insertSummary(isBot) {
	if (!isBot) {
		return;
	}
	const savedSummary = localStorage.getItem("editSummary");
	const currentSummary = $(SUMMARY_INPUT).val();
	if (currentSummary === "" && savedSummary !== "") {
		$(SUMMARY_INPUT).val(savedSummary);
		mw.notify("Inserted previous edit summary: " + savedSummary);
	}
}