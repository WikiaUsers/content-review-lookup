importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {
		Staff: { u: 'TerraNova Staff Member', order: 100 }
	}
};

UserTagsJS.modules.custom = {
	'Lunarity': ['Staff']
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

.tag.usergroup-Staff {
	background-color: orange !important;
}