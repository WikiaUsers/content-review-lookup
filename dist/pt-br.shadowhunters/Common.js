/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

// Alerta de Spoilers e Não Finalizados
window.SpoilerAlertJS = {
    question: 'ATENÇÃO! Esta área contém spoilers ou informações provisórias que você pode não querer ver. Tem certeza que deseja prosseguir?',
    yes: 'Sim, por favor',
    no: 'Não, ainda não',
    fadeDelay: 1600
};
importScriptPage('SpoilerAlert/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WikiActivity.js',
        'u:dev:MediaWiki:AddUserRightsTag/code.js',
        'u:dev:MediaWiki:AddBlockUserTag/code.js',
        'u:dev:MediaWiki:AjaxRename/code.js',
        'u:dev:MediaWiki:DiscussionsFeed.js',
    ]
});

// Pop-ups em Referências
importScriptPage('ReferencePopups/code.js', 'dev');

/* Auto Refresh */
window.AjaxRCRefreshText = 'Carregamento Automático';
window.AjaxRCRefreshHoverText = 'A página recarrega-se automaticamente';
window.ajaxPages = [
    "Especial:Mudanças_recentes",
    "Especial:WikiActivity",
    "Especial:Páginas_vigiadas",
    "Especial:Arquivos_novos",
    "Especial:Lista_de_arquivos",
    "Especial:Páginas_novas",
    "Especial:Contribuições"
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
            u:'Cônsul',
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
            u:'Caçador de Sombras',
            link:'Project:Administradores',
            color:'white',
            title:'Rollback' 
        },
	}
};
// -end - User tags