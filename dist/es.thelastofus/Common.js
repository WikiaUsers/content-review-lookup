/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
/*User Tags*/
window.UserTagsJS = {
	modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'content-moderator',
            'bot',
            'rollback'
        ],
        newuser: true
    },
	tags: {
        bureaucrat: {
            link: 'Especial:ListaUsuarios/bureaucrat'
        },
         sysop: {
            link: 'Especial:ListaUsuarios/sysop'
        },
         chatmoderator: {
            link: 'Especial:ListaUsuarios/chatmoderator'
        },
        threadmoderator: {
            link: 'Especial:ListaUsuarios/threadmoderator'
        },
        blocked: {
            link: 'Especial:UsuariosBloqueados'
        },
        'content-moderator': { u: 'Content Moderator', link: 'Special:ListUsers/content-moderator'
        },
        'rollback': { u: 'Rollback', link: 'Special:ListUsers/rollback'
        },
        LucasMillonario: { u:'Chanel' },
		Waffletzthecat: { u:'Chanel #2' }
		Waffletzthecat: { u:'Dios' }
	}
};
 
UserTagsJS.modules.custom = {
	'Lucas Millonario': ['LucasMillonario'],
	'Waffletz the cat': ['Waffletzthecat']
};
 
UserTagsJS.modules.metafilter = {
    'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
	'rollback': ['sysop', 'bureaucrat'], // Remove rollback from admins
	'chatmoderator': ['sysop', 'bureaucrat', 'threadmoderator'], // Remove chat mod from all discussions mods & admins
	'threadmoderator':['sysop', 'bureaucrat'], //Remove discussions mod from admins
	'content-moderator':['sysop', 'bureaucrat'] //Remove content mod from admins
};

window.railWAM = {
    logPage:"Project:WAM Log"
};

if (wgUserName != 'null') {
$('.insertusername').html(wgUserName);
}