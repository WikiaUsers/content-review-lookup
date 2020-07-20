window.UserTagsJS = {
	modules: {},
	tags: {
		EIN: 'Dragon Ruler of Flames',
                CA: 'Akumi~Akuma',
                HI: 'Hachi~Hachi :3'
	}
};
 
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'Hiperhazz': ['EIN'],
        'CyberAkumaTvChars': ['CA'],
        'Hachiman65': ['HI']
};
  
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

importArticles({
	type:'script',
	articles: [
                'w:c:dev:RevealAnonIP/code.js',
                'w:c:dev:UserTags/code.js'
	]
});
UserTagsJS.modules.metafilter = {
	sysop: ['EIN']
};