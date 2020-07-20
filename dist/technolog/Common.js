/* Any JavaScript here will be loaded for all users on every page load. */


UserTagsJS.modules.mwGroups = ['sysop', 'rollback', 'bannedfromchat', 'chatmoderator'];

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
importArticle({type:'script', article:'u:dev:MediaWiki:LastEdited/code.js'
});

/* user tags */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data 
		'bureaucrat': { u:'Website Main Administrator', title:'This user is a bureaucrat of this site.', order:-1/0 }, 
		'sysop': { u:'Website Administrator', title:'This user is an administrator of this site.' },
		'founder': { u:'iRaven' },
	}
};

UserTagsJS.modules.custom = {
	'Raven45222': ['inactive'],
};

UserTagsJS.modules.metafilter = {
    'chatmoderator': ['sysop'], // remove chat moderator from admin
    'bureaucrat': ['founder'] //   remove DisMod from admin
};


/* Last edited plugin */
window.lastEdited = {
    avatar: true,
    size: false,
    diff: true,
    comment: false,
    time: 'timestamp',
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};


/* highlighted messagewall tags */
window.MessageWallUserTags = {
tagColor: '#00BFFF',
glow: true,
glowSize: '15px',
glowColor: '#9370DB',
users: {
'Raven4522': 'Founder',
}
};