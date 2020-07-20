/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JS Admin', order: 100 },
		csshelper: { u: 'CSS Admin', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		bureaucrat: { u: 'Bureaucrat', order: 102 },
		hadmin: { u: 'Head Admin', order: 102 },
		hbots: { u: 'Bot', order: 102 },
	}
};

UserTagsJS.modules.custom = {
	'Trainlover123123': ['templatehelper'], 	
	'ProgrammingUniverse': ['bureaucrat', 'hadmin'],
	'SailorBOT': ['hbots']
};

//UserTagsJS.modules.autoconfirmed = false; // Switch on/off
//UserTagsJS.modules.nonuser = false; // Switch on/off