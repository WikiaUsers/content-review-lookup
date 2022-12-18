/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		featured: { u:'Star Writer', link:'Headless_Devs_Wiki:Featured_Article', title:'This user has contributed to a Featured Article before'},
		dev: { u:'Involved', title:'This user has been involved in Headless Devs projects before' },
		bureaucrat: { link:'Headless_Devs_Wiki:Bureaucrats', order:1 },
		sysop: { link:'Headless_Devs_Wiki:Administrators', order:0 }
	},
	oasisPlaceBefore: '> h2' // Place tags before the H2
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.inactive = 50; // 50 days
UserTagsJS.modules.nonuser = true; // Switch on
UserTagsJS.modules.autoconfirmed = true; // Switch on
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.custom = {
	'TikTokToxi': ['featured','dev'],
	'Tissuedup': ['dev'],
	'ToxiBot': ['bot']
};

if (window.andrewds1021 && window.andrewds1021.sysop_show
 && window.andrewds1021.sysop_show.has_run) return;
if (!window.andrewds1021) {
    window.andrewds1021 = {
    sysop_show: {}
};
    } else if (!window.andrewds1021.sysop_show) {
        window.andrewds1021.sysop_show = {};
    }
    window.andrewds1021.sysop_show.has_run = true;
 
    var groups = mw.config.get("wgUserGroups");
 
    if (!groups || (groups.indexOf("sysop") === -1)) return;
 
    var elems = document.querySelectorAll(".sysop-show");
    var num = elems.length;
 
    for (var i = 0; i < num; i++) {
        elems[i].style.display = "initial";
    }