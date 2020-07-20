/* Usertags  - Credit to Gallows Hill Wiki */
window.UserTagsJS = {
	modules: {},
	tags: {
                writer: { u: 'Writer', order:101 }
	}
};
UserTagsJS.modules.custom = {
        'Cori11': ['writer'],
        'KathrineAndJeremy4eva': ['writer'],
        'OldOneX': ['writer'],
        'CarolovesTVD': ['writer']
        // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'],
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});