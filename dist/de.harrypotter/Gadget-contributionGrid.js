/**
 * Source: https://help.fandom.com/wiki/MediaWiki:Gadget-contributionGrid.js
 */
mw.loader.using('mediawiki.api').then(function () {
	if (mw.config.get("wgNamespaceNumber") != /*20*/2) return;
	if (document.getElementById('gridOutput') === null) {
		$(".mw-parser-output").append('<div class="contribution-grid section"><h3>Contribution grid</h3><div id="gridOutput">Loading &hellip;</div></div>');
	}
	var user = mw.config.get("wgTitle");
	var api = new mw.Api();
	var formatter = new Intl.DateTimeFormat('en-GB', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	});
	var startDate = new Date();
	startDate.setFullYear(startDate.getFullYear() - 1);
	var contribs = [];
	var dateContribs = [];
	var testDate = structuredClone(startDate);
	var today = new Date();
	do {
		dateContribs.push({ date: structuredClone(testDate), contribs: 0 });
	} while (testDate.setTime(testDate.getTime() + 86400000) <= today.getTime());

	function isoDate(date) {
		var parts = formatter.formatToParts(date).reduce(function (carry, p) { carry[p.type] = p.value; return carry; }, {});
		return [parts.year, parts.month, parts.day].join('-');
	}

	function processData() {
		var container = document.getElementById('gridOutput');
		container.textContent = "Found " + contribs.length + " contributions. Render &hellip;";
		var contribFind = function (c) { return isoDate(c.date) == isoDate(new Date(contrib.timestamp)); };
		for (var c in contribs) {
			var contrib = contribs[c];
			dateContribs.find(contribFind).contribs++;
		}
		var numWeeks = dateContribs.length / 7;
		var urlBase = mw.util.wikiScript();
		var urlParams = new URLSearchParams({
			title: 'Special:Contributions',
			contribs: 'user',
			target: user.replace(/ /g, '_'),
		});
		var fragment = new DocumentFragment();
		for (var d in dateContribs) {
			var da = dateContribs[d];
			var dayNum = da.date.getUTCDay() + 1;
			var weekNum = Math.floor(
				(da.date.getTime() - dateContribs[0].date.getTime()) /
				(1000 * 60 * 60 * 24 * 7)
			) + 1 + (
					(dayNum < (dateContribs[0].date.getUTCDay() + 1)
					) ? 1 : 0);
			var bgColor = "#9999997d";
			if (da.contribs > 0) bgColor = "#F3B67D";
			if (da.contribs > 10) bgColor = "#F3B679";
			if (da.contribs > 20) bgColor = "#F39A48";
			if (da.contribs > 30) bgColor = "#F37F20";
			urlParams.set('start', isoDate(da.date));
			urlParams.set('end', isoDate(da.date));
			var el = Object.assign(document.createElement('a'), {
				title: isoDate(da.date) + ': ' + da.contribs,
				href: [ urlBase, urlParams ].join('?'),
			});
			el.style.backgroundColor = bgColor;
			el.style.gridArea = dayNum + ' / ' + weekNum + ' / ' + (dayNum + 1) + ' / ' + (weekNum + 1);
			fragment.append(el);
		}
		container.textContent = '';
		container.style.setProperty("--week-rows", Math.ceil(numWeeks));
		container.appendChild(fragment);
	}

	function getData(uccontinue) {
		var params = {
			action: "query",
			list: "usercontribs",
			ucuser: user,
			ucend: startDate.toISOString(),
			uclimit: "max"
		};
		if (uccontinue !== "") params.uccontinue = uccontinue;
		api.get(params).done(function (data) {
			contribs = contribs.concat(data.query.usercontribs);
			if (data["continue"] !== undefined && data["continue"].uccontinue !== undefined) {
				getData(data["continue"].uccontinue);
				return;
			}
			processData();
		});
	}
	getData("");
});