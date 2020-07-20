alert('Uh-Oh, you have fallen upon the most beast wiki in history! And it's specially awesome founder, KLINTRIN! :D')

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		montheditor: { u:'Editor of the Month' },
		featured: { u:'Most likely your boss' },
		templates: { u:'KING OF ADMINS' }
	}
};

UserTagsJS.modules.custom = {
	'Klintrin': ['montheditor', 'featured'], // Add Editor of the Month + Featured
	'Klintrin': ['featured'], // Add featured
	'Klintrin': ['featured', 'templates'], // Add featured + templates guru
	'AnimalLover1011': ['inactive'] // Always inactive
};