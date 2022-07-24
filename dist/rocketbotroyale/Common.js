/* Any JavaScript here will be loaded for all users on every page load. */

//UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: {link:'Project:Staff', title:'This user is a bureaucrat.' },
		inactive: {u: 'Has not edited recently' },
		Founder: {u: 'Founder', order:-1},
		'Awesome Penguin': {u: 'Awesome Penguin', order:-2}
	}
};

UserTagsJS.modules.custom = {
	'TaNk8k': ['Founder', 'Awesome Penguin']
};