// [[Category:Internal]] Meta-category for internal technical pages

window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1500
};

// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
});

// UserTags thingamajigs
window.UserTagsJS = {
	modules: {},
	tags: {
		// usergroup: { associated tag data }
		inactive: { order:-2 },
		bot: { link:'Help:Bots', order:-1 },
		bureaucrat: { order:0 }, // <- lower order value = will be placed before other tags (in space, not as of which loads first)
		sysop: { order:1 },
		technician: { u:'Technician', order:2 },
		'content-moderator': { order:3 }, // <- usergroup wrapped in quotes as there is a hyphen in the name
		threadmoderator: { order:4 },
		rollback: { u:'Trusted', order:5 },
	},
};

UserTagsJS.modules.inactive = { days: 90, zeroIsInactive: true }; // no edits for 90 days and/or no edits at all = inactive
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = false;
UserTagsJS.modules.userfilter = { 'ScutoidWasTaken': ['sysop'] };
UserTagsJS.modules.custom = {
	'Dotvoid': ['bot'],
	'Pexy0': ['technician'],
	'ScutoidWasTaken': ['technician'],
};

// fade-in
var fadeinclass = document.getElementsByClassName("fadeintext");
    for(var i = 0; i < fadeinclass.length; i++) {
        var sec = (i/4).toString();
        fadeinclass[i].style.animation = "fadeInAnimation ease 1.5s";
        fadeinclass[i].style.animationDelay = sec.concat("s");
        fadeinclass[i].style.animationIterationCount = "1";
        fadeinclass[i].style.animationFillMode = "forwards";
}