/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
	    valued: { u: 'Inner Party', order: 87 },
	    thoughtpol: { u: 'Thought Police', order: 88 },
		code: { u: 'Code Wrangler', order: 89 },
		artist: { u: 'Artist', order: 90 },
		writer: { u: 'Political Theorist', order: 91},
		sysop: { u: 'Big Brother' }
	}
};

UserTagsJS.modules.autoconfirmed = true;

UserTagsJS.modules.newuser = {
	days: 14,
	edits: 30,
	namespace: 0
};

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true
};

UserTagsJS.modules.custom = {
	'Violinium': ['code', 'artist', 'writer', 'valued', 'thoughtpol'],
	'Konlord 44': ['valued', 'thoughtpol'],
	'Monkeysszz': ['valued'],
	'Popedesu': ['writer', 'thoughtpol']
};

window.highlightUsersConfig = {
    colors: {
        'sysop': '#604DFF',
        'bot': '#C3BEB6'
    },
    styles: {
        'sysop': 'font-weight: bold;'
    }
};
$.getJSON("/api/v1/Articles/Top?cb=" + new Date().getTime(), function(data) {
	var a = data.items; // array of results
	$("span.mostvisited").each(function() {
		var b = String(Number($(this).attr("data-limit"))) == "NaN" ? a.length : Number($(this).attr("data-limit")) > a.length ? a.length : Number($(this).attr("data-limit")), // limit (if larger than the results length, override with length of results))
			c = [];
		for (var i = 0; i < b; i++) {
			c.push('\t<li><a href="/wiki/' + a[i].title.replace(" ", "_") + '">' + a[i].title + '</a></li>');
			if (i + 1 == b) {
				$(this).replaceWith('<ol>\n' + c.join("\n") + '\n</ol>');
			}
		}
	});
});