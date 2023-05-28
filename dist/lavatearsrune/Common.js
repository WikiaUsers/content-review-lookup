/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Wiki Official'},
		founder: { u:'Founder'},
		newuser: { u:'New User'},
		inactive: { u: 'Inactive' },
		montheditor: { u:'Editor of the Month' },
		featured: { u:'Featured User' },
		moderator: {u:'Moderator'},
		headeditor: {u:'Head Editor'},
		rollback: {u:'Rollback'},
		terminated: { u:'Terminated'},
		blocked: { u:'Edit Banned'},
		discordbanned: {u:'Discord Banned'},
		bannedfromchat: {u: 'Chat Banned'},
		superstaff: {u: 'FANDOM Staff Member'},
		
	}
};

UserTagsJS.modules.custom = {
	'LavatearsRune': ['headeditor', 'bureaucrat'],
	'Kimberton': ['superstaff']
};
UserTagsJS.modules.newuser = {
	days: 0, // Must have been on the Wiki for 45 days - Normally 45 days, but user acct migration.
	edits: 1, // And have at least 10 edits to remove the tag - Normally 10 edits, but user acct migration.
	namespace: 0 // Edits must be made to articles to count - No change in Migration
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
        'u:dev:MediaWiki:MoreSocialLinks.js',
    ]
});