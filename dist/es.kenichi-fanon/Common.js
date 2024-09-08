
window.UserTagsJS = {
	modules: {},
	tags: {
		csshelper: { u: 'Diseñador de CSS', order: 101 },
		shimpaku: { u: 'Miembro de la Federación Shimpaku', order: 102 },
	}
};
UserTagsJS.modules.custom = {
	'Paynekiller92': ['csshelper', 'shimpaku'] // NOTE: order of list here does NOT matter
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});