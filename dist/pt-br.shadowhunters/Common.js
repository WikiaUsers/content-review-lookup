/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */

/* == Da Wiki Le Seigneur des Anneaux == */
/* A+ Wiki Badge */
$('.fandom-community-header__community-name-wrapper').append(
    $('<img/>').addClass('hover-community-header-wrapper').css('height', '45px')
	.attr('src', 'https://static.wikia.nocookie.net/cacadores-de-sombras/images/e/ed/A%2B_wiki_badge.png/revision/latest?cb=20240223024929&format=original&path-prefix=pt-br')
);

/* == Da Shadowhunter's Wiki em ingl�s == */// Alerta de Spoilers e N�o Finalizados
window.SpoilerAlertJS = {
    question: 'ATEN��O! Esta �rea cont�m spoilers ou informa��es provis�rias que voc� pode n�o querer ver. Tem certeza que deseja prosseguir?',
    yes: 'Sim, por favor',
    no: 'N�o, ainda n�o',
    fadeDelay: 1600
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscussionsFeed.js',
        'u:dev:MediaWiki:PageRenameAuto-update/code.js',
    ]
});

// Banner do Discord
window.DiscordBannerSettings = {
    bannerStyle: '1',
    inviteLink: 'xZX5WRu2Fy',
    prependToRail: false,
    noRail: true
};

// Pop-ups em Refer�ncias
importScriptPage('ReferencePopups/code.js', 'dev');

/* Auto Refresh */
window.AjaxRCRefreshText = 'Carregamento Autom�tico';
window.AjaxRCRefreshHoverText = 'A p�gina recarrega-se automaticamente';
window.ajaxPages = [
    "Especial:Mudan�as_recentes",
    "Especial:P�ginas_vigiadas",
    "Especial:Arquivos_novos",
    "Especial:Lista_de_arquivos",
    "Especial:P�ginas_novas",
    "Especial:Contribui��es"
];

// User tags
window.UserTagsJS = {
	modules: {
        inactive: 45,
		mwGroups: [
            'bureaucrat',
            'chatmoderator',
            'patroller',
            'rollback',
            'sysop',
            'bannedfromchat',
            'bot',
            'bot-global'
        ],
		autoconfirmed: true,
		metafilter: {
			sysop: ['bureaucrat'],
			chatmoderator: ['sysop'],
			rollback: ['sysop'],
		},
		newuser: true,
	},
 
    tags: {
        bureaucrat: {
            u:'C�nsul',
            link:'Project:Administradores',
            color:'white',
            title:'Burocrata' 
        },
		sysop: {
            u:'Membro do Conselho',
            link:'Project:Administradores',
            color:'white',
            title:'Administradores' 
        },
		patroller: { 
            u:'Inquisidor',
            link:'Project:Administradores',
            color:'white',
            title:'Patroller' 
        },
		rollback: {
            u:'Ca�ador de Sombras',
            link:'Project:Administradores',
            color:'white',
            title:'Rollback' 
        },
	}
};
// -end - User tags