/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		troy: { u:'Troy Bottoroff' }, 
                leontyev: { u:'Leontyev Valeryevich' }, 
                eggy: { u:'Eggy Soulster' }
	}
};
UserTagsJS.modules.custom = {
	'VimoVarshi': ['troy'], // Add Troy Bottoroff
        'Averon25': ['leontyev'], // Add Leontyev Valeryevich
        'Eggium': ['eggy'], // Add Eggy Soulster
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});