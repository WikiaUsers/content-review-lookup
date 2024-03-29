/* Any JavaScript here will be loaded for all users on every page load. */
// Tags //
window.UserTagsJS = {
	modules: {},
	tags: {
		cm: { u:'Archive Reveiwer', order: 1/0 },
		ad: { u:'Enforcer', order: 1/0 },
		v: { u:'Veiwer', order: 1/0 },
		e: { u:'Editor', order: 1/0 },
		c: { u:'commenter', order: 1/0 },
		template: { u:'Template maker', order: 1/0 },
		code: { u:'Code helper', order: 1/0 },
		bureaucrat: { order: -1/0 },
		founder: { order: -1/0 },
		oasisPlaceBefore: 'h1 >  founder, bureaucrat, ad, v, c, cm, template, code, e'
	},
};

UserTagsJS.modules.custom = {
	'LavaShark.Wiki.Persona': ['ad', 'code', 'cm', 'bureaucrat', 'template', 'founder'] 
};

// Chrome toolbar //
window.ChromeToolbarColor = '#262626';

//Spolier blur configuration//
window.SpoilerAlertJS = {
    question: 'This area contains classified information any none classified personel who wishes to continue will be hunted.',
    yes: 'Bypass',
    no: 'Return back',
    fadeDelay: 1200
};