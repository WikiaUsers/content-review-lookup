/* Adds a (copy unsigned) button on diff pages */
$(function() {
	const padTime = function(time){
		return (time + "").padStart(2, "0");
	};

	const l10n_text = {
		en: "copy unsigned"
	};
	const l10n_timestamp = {
		en: function(date){
			return padTime(date.getUTCHours())
			+ ":"
			+ padTime(date.getUTCMinutes())
			+ ", "
			+ date.getUTCDate()
			+ " "
			+ date.toLocaleDateString("en-us", { month: "long", timeZone: "UTC" })
			+ " "
			+ date.getUTCFullYear();
		}
	}

	const currentRevisionId = mw.config.get("wgDiffNewId");

	if (!currentRevisionId)
		return;

	new mw.Api().get({
		action: "query",
		prop: "revisions",
		revids: currentRevisionId,
		rvprop: "user|timestamp",
		formatversion: 2
	}).done(function(data) {
		const page = data.query.pages[0];
		const revision = page.revisions[0];

		const user = revision.user;
		const date = new Date(revision.timestamp);
	
		const timestamp = (l10n_timestamp[mw.config.get("wgContentLanguage")] || l10n_timestamp["en"])(date);
			
		const textToCopy = "{{unsigned|" + user + "|UTC=" + timestamp + "}}";

		var copyUnsignedA = document.createElement("a");
		copyUnsignedA.href = "javascript:void(0);";
		copyUnsignedA.textContent = l10n_text[mw.config.get("wgUserLanguage")] || l10n_text["en"];
		$(copyUnsignedA).click(function() {
			navigator.clipboard.writeText(textToCopy);
		});

		var copyUnsignedSpan = document.createElement("span");
		copyUnsignedSpan.classList.add("copy-unsigned");
		copyUnsignedSpan.append("(");
		copyUnsignedSpan.append(copyUnsignedA);
		copyUnsignedSpan.append(")");
	
		const diffTopOptions = document.querySelector(".diff .diff-ntitle strong");
		diffTopOptions.append(" ");
		diffTopOptions.append(copyUnsignedSpan);
	});
});