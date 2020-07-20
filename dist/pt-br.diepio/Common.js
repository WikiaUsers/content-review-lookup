/* Anon Tags - by KockaAdmiralac */
(function() {
    var $masthead = $('#UserProfileMasthead');
    if (!$masthead.exists()) {
        return;
    }
    var $info = $masthead.find('.masthead-info hgroup'),
        username = $info.find('h1').text();
    if (
        mw.util.isIPv4Address(username) ||
        mw.util.isIPv6Address(username)
    ) {
        var $tag = $info.find('.tag');
        if ($tag.exists()) {
            var blocked = $tag.remove().text();
            $info.append(
                $('<span>', {
                    'class': 'tag-container'
                }).append(
                    $('<a>', {
                        'text':    blocked,
                        'href':    mw.util.getUrl('Ajuda:Bloqueio#Desbloqueio'),
                        'title':   'Ajuda:Bloqueio',
                        'class':   'tag usergroup-blocked blocked-user'
                    })
                )
            );
        }
    }
})();

/* Tag Definitions */
window.UserTagsJS = {
    modules: {},
    tags: {
        //Global Fandom Groups
        'authenticated': {
            link:  'Ajuda:Direitos de usuários#Authenticated',
            title: 'Ajuda:Direitos de usuários'
        },
        'bot-global': {
            link:  'Ajuda:Bots',
            title: 'Help:Bots'
        },
        'content-team-member': {
            link:  'w:c:comunidade:Blog de usuário:Matheus Leonardo/Apresentando as equipes de Gerentes de Wiki e de Conteúdo do Fandom!',
            title: 'Apresentando as equipes de Gerentes de Wiki e de Conteúdo do Fandom!'
        },
        'content-volunteer': {
            link:  'w:c:community:Thread:1401657'
        },
        'council': {
            link:  'Ajuda:Community Council',
            title: 'Ajuda:Community Council'
        },
        'global-discussions-moderator': {
            link:  'Ajuda:Moderadores globais de Discussões',
            title: 'Ajuda:Moderadores globais de Discussões'
        },
        'helper': {
            link:  'Ajuda:Voluntários e Helpers#Helpers',
            title: 'Ajuda:Voluntários e Helpers'
        },
        'staff': {
            link:  'Ajuda:Equipe da Comunidade',
            title: 'Ajuda:Equipe da Comunidade'
        },
        'vanguard': {
            link:  'Ajuda:Vanguarda',
            title: 'Ajuda:Vanguarda'
        },
        'voldev': {
            link:  'Ajuda:Direitos_de_usuários#Volunteer_Developers.2C_os_Programadores_Volunt.C3.A1rios',
            title: 'Ajuda:Direitos de usuários'
        },
        'vstf': {
            link:  'Ajuda:VSTF',
            title: 'Ajuda:VSTF'
        },
        'wiki-manager': {
            link:  'w:c:comunidade:Blog de usuário:Matheus Leonardo/Apresentando as equipes de Gerentes de Wiki e de Conteúdo do Fandom!',
            title: 'Apresentando as equipes de Gerentes de Wiki e de Conteúdo do Fandom!'
        },

        //Local Groups
        'bannedfromchat': {
            link:  'Ajuda:Chat#Desbanindo',
            title: 'Ajuda:Chat',
            order: 1100
        },
        'blocked': {
            link:  'Ajuda:Bloqueio#Desbloqueio',
            title: 'Ajuda:Bloqueio',
            order: 500
        },
        'bot': {
            link:  'Ajuda:Bots',
            title: 'Ajuda:Bots',
            order: 200
        },
        'bureaucrat': {
            link:  'Ajuda:Guia como-fazer para burocratas',
            title: 'Ajuda:Guia como-fazer para burocratas',
            order: 300
        },
        'chatmoderator': {
            link:  'Ajuda:Chat#Moderadores de chat',
            title: 'Ajuda:Chat',
            order: 900
        },
        'checkuser': {
            link:  'Ajuda:CheckUser',
            title: 'Ajuda:CheckUser',
            order: 600
        },
        'content-moderator': {
            link:  'Ajuda:Direitos_de_usuários#Moderadores_de_Conte.C3.BAdo',
            title: 'Ajuda:Direitos de usuários',
            order: 700
        },
        'founder': {
            link:  'Ajuda:Fundadores',
            title: 'Ajuda:Fundadores',
            order: 101
        },
        'rollback': {
            link:  'Ajuda:Direitos de usuários#Rollbacks',
            title: 'Ajuda:Direitos de usuários',
            order: 1000
        },
        'sysop': {
            link:  'Ajuda:Guia como-fazer para administradores',
            title: 'Ajuda:Guia como-fazer para administradores',
            order: 400
        },
        'threadmoderator': {
            link:  'Ajuda:Direitos_de_usuários#Moderadores_de_Discuss.C3.B5es',
            title: 'Ajuda:Direitos de usuários',
            order: 800
        }
    }
};

/* Modules */
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.stopblocked   = false;
UserTagsJS.modules.inactive      = false;
UserTagsJS.modules.newuser       = false;
UserTagsJS.modules.mwGroups      = [
    //Global Fandom Groups
    'authenticated',
    'bot-global',
    
    //Local Groups
    'bannedfromchat',
    'blocked',
    'bot',
    'bureaucrat',
    'chatmoderator',
    'checkuser',
    'content-moderator',
    'founder',
    'rollback',
    'sysop',
    'threadmoderator'
];

/* MetaFilter */
UserTagsJS.modules.metafilter = {
    'bannedfromchat': [
        'blocked',
        'bot',
        'chatmoderator',
        'helper',
        'staff',
        'sysop',
        'threadmoderator',
        'vstf',
        'wiki-manager'
    ],
    'bot': 'bot-global',
    'bureaucrat': [
        'bot',
        'founder'
    ],
    'chatmoderator': [
        'blocked',
        'bot',
        'bureaucrat',
        'founder',
        'sysop',
        'threadmoderator'
    ],
    'checkuser': [
        'blocked',
        'bot'
    ],
    'content-moderator': [
        'blocked',
        'bot',
        'bureaucrat',
        'founder',
        'sysop'
    ],
    'founder': 'bot',
    'rollback': [
        'blocked',
        'bot',
        'bureaucrat',
        'content-moderator',
        'founder',
        'sysop'
    ],
    'sysop': [
        'bot',
        'bureaucrat',
        'founder'
    ],
    'threadmoderator': [
        'blocked',
        'bot',
        'bureaucrat',
        'founder',
        'sysop'
    ]
};

/* Custom */
UserTagsJS.modules.custom = {
    'DorKDandazx': ['founder']//In case her rights are lost
};

/* Non-Dev imports */
importArticles({
    type: 'script',
    articles: [
        'u:diepio:MediaWiki:Tournaments.js',
        'u:elderscrolls:MediaWiki:Common.js/DiscussionsLinks.js'
    ]
});