/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Wiki Official'},
		founder: { u:'Creator'},
		blocked: { u:'Suspended'},
		newuser: { u:'New User'},
		inactive: { u: 'Inactive' },
		bannedfromchat: {u: 'Suspended From Chat'},
		montheditor: { u:'Editor of the Month' },
		featured: { u:'Featured User' },
		moderator: {u:'Moderator'},
		ministerformagic: {u:'Minister for Magic'},
		terminated: { u:'Terminated'}
		
	}
};
UserTagsJS.modules.custom = {
	'DieselDorky16': ['ministerformagic', 'founder', 'bureaucrat']
};
UserTagsJS.modules.newuser = {
	days: 45, // Must have been on the Wiki for 45 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.inactive = 45;

$.getJSON("/api/v1/Articles/Top?cb=" + new Date().getTime(), function(data) {
	var a = data.items; // array of results
	$("span.mostvisited").each(function() {
		var b = String(Number($(this).attr("data-limit"))) == "NaN" ? a.length : Number($(this).attr("data-limit")) > a.length ? a.length : Number($(this).attr("data-limit")), // limit (if larger than the results length, override with length of results))
			c = [];
		for (var i = 0; i < b; i++) {
			c.push('\t<li><a href="/wiki/"' + encodeURIComponent(a[i].title.replace(/ /g, "_")) + '">' + a[i].title + '</a></li>');
			if (i + 1 == b) {
				$(this).replaceWith('<ol>\n' + c.join("\n") + '\n</ol>');
			}
		}
	});
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EditConflictAlert/code.js',
    ]
});