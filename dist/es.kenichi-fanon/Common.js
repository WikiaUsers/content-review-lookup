
window.UserTagsJS = {
	modules: {},
	tags: {
		csshelper: { u: 'Dise�ador de CSS', order: 101 },
		shimpaku: { u: 'Miembro de la Federaci�n Shimpaku', order: 102 },
	}
};
UserTagsJS.modules.custom = {
	'Paynekiller92': ['csshelper', 'shimpaku'] // NOTE: order of list here does NOT matter
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});