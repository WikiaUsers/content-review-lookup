// Usertags
// Core configuration. We add 2 custom tags and change what the built-in sysop tag says.
window.UserTagsJS = {
	modules: {},
	tags: {
		activeadmin: 'Active Admin',
        complien: 'Complien',
        humanoid: 'Humanoid',
        mogurian: 'Mogurian',
        demon: 'Demon',
        pvzccuser: 'PVZCC User'
}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
    'CompliensCreator00': ['Founder, activeadmin, pvzccuser'],
    'DJcraft789': ['activeadmin, complien, pvzccuser'],
    'DarkHenrik': ['activeadmin'],
    'Ker-plop0990': ['activeadmin']
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 90; // Inactive if no edits in 90 days
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'rollback']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.userfilter = {
	'John Smith': ['inactive'] // John Smith is never inactive, even when he is
};
UserTagsJS.modules.metafilter = { sysop: ['bureaucrat', 'inactive'],
rollback: ['bureaucrat', 'inactive'],
chatmoderator: ['bureaucrat', 'inactive'],
};

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});