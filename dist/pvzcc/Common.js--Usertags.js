
// Usertags
// Core configuration. We add 2 custom tags and change what the built-in sysop tag says.
window.UserTagsJS = {
	modules: {},
	tags: {
		technician: 'Technician',
        hismofounder: 'Hismo Founder',
        hismomember: 'Hismo Member',
		featured: 'Featured User',
		wasfeatured: 'Former Featured User',
		imagecontrol: 'Image Control',
        analyst: 'Plant + Zombie Analyst',
        critic: 'Critic'
        j192: { u:'Zomplant Jelo’s New Account', link:'User_blog:J192/Hello_there.' }
}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'BLACK OUT': ['technician'],
	'Guppie the Third': ['technician', 'wasfeatured'],
	'Emeraldgreeny': ['wasfeatured'],
    'Uglyfish63': ['wasfeatured'],
    'Milesprower2': ['analyst', 'wasfeatured'],
    'Mister Stay Puft': ['hismofounder'],
    'HyperKing Hesham': ['hismomember'],
    'MasterNinja321': ['wasfeatured'],
    'MN321': ['wasfeatured'],
    'Magnet Plant': ['wasfeatured'],
	'Logologologol': ['technician'],
	'FlamingoPhoenixFeathers': ['wasfeatured'],
	'DJcraft789': ['imagecontrol'],
    'J192': ['j192', 'founder'],
    'Orbacal': ['technician', 'wasfeatured', 'hismomember']
    'Wikia-Critic': ['critic']
    'ThatToasterGuy': ['wasfeatured']
    'Awesome wiggler': ['featured']
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