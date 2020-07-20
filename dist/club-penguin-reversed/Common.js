/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		founder: { link:'Project:Founder', order:1e101 }
	}
};
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { link:'Project:Bureaucrats', order:1e102 }
	}
};
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { link:'Project:Content-Moderator', order:1e103 }
	}
};

UserTagsJS.modules.custom = {
	'Blackout03': ['founder', 'bureaucrat', 'content-moderator'], // Add Founder, Bureaucrat + Content-moderator
};