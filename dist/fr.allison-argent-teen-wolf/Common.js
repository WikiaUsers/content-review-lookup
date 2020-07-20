window.UserTagsJS = {
	modules: {},
	tags: {
		chasseuse: { u:'Chasseuse De Loup Garou' },
                membre: { u:'Membre De La Meute De Scott' },
                amour: { u:'Grand Amour De Scott' }
	}
};

UserTagsJS.modules.custom = {
	'AllisonArgentTW': ['chasseuse', 'membre', 'amour']
};

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});