// [[Category:Internal]] Meta-category for internal technical pages

window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1500
};

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
	'PexyWasTaken': ['technician'],
	'ScutoidWasTaken': ['technician'],
};

// random number generator
const random = document.querySelector('.random');
const rng = document.createElement('rng');
rng.textContent = Math.imul(getRandomIntInclusive(320, 32000), getRandomIntInclusive(320, 32000)); // just a little over a billion possibilities
random.appendChild(rng);
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// fade-in
var fadeinclass = document.getElementsByClassName("fadeintext");
    for(var i = 0; i < fadeinclass.length; i++) {
        var sec = (i/4).toString();
        fadeinclass[i].style.animation = "fadeInAnimation ease 1.5s";
        fadeinclass[i].style.animationDelay = sec.concat("s");
        fadeinclass[i].style.animationIterationCount = "1";
        fadeinclass[i].style.animationFillMode = "forwards";
}