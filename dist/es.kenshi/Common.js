/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/Usernames.js',
        ]
});
// Customize tags on user profiles
window.UserTagsJS = {
    modules: {},
    tags: {
        sysop: { u: 'Administrador' },
        bureaucrat: { u: 'Burócrata'},
     	threadmoderator: { u: 'Mod. de discusiones' },
    	'content-moderator': { u:'Mod. de contenido'},
    	rollback : { u:'Reversor'},
        inactive: { u: 'Usuario Inactivo', title: 'Este usuario es inactivo.' },
        newuser: {u: 'Nuevo usuario' }
    }
};
    
UserTagsJS.modules.inactive      = 30;
UserTagsJS.modules.newuser       = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'content-moderator',
    'threadmoderator',
    'rollback',
    'bot',
    'bot-global',
    'blocked', 
    'checkuser',
    'council',
    'helper',
    'staff',
    'vanguard',
	'soap',
];
    
UserTagsJS.modules.metafilter = {
    sysop:           ['bureaucrat'],
    'content-moderator': ['bureaucrat', 'sysop'],
    threadmoderator: ['bureaucrat', 'sysop'],
    rollback:        ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator'],
    inactive:        ['retiredstaff']
   };