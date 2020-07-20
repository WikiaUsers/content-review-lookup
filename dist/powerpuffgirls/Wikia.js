// Additional UserRights Icons in profile mastheads
window.UserTagsJS = {
    modules: {
        inactive: 30,
        newuser: true,
        autoconfirmed: false,
        mwGroups: ['bureaucrat', 'chatmoderator', 'patroller', 'rollback',
            'sysop', 'bannedfromchat', 'bot', 'bot-global'],
        metafilter: {
            sysop: ['bureaucrat', 'founder'],
            bureaucrat: ['founder'],
            chatmoderator: ['sysop', 'bureaucrat']
        }
    }
};
// END Additional UserRights Icons in profile mastheads


importArticles({
    type: 'script',
    articles: [
        'u:dev:UserTags/code.js',
        'u:dev:AjaxRC/code.js'
    ]
})

// Randomize wiki logo: http://community.wikia.com/wiki/Thread:578801
$(function() {
    var images = [
		'https://images.wikia.nocookie.net/powerpuff/images/8/89/Wiki-wordmark.png',
		'https://images.wikia.nocookie.net/powerpuff/images/a/a3/Wiki-wordmark_reboot.png',
	];
 
	$('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});