/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */

// Etiquetas
window.UserTagsJS = {
    tags: {
        bureaucrat: {
            link: 'Special:ListUsers/bureaucrat'
        },
        founder: {
            link: 'Special:ListUsers/bureaucrat'
        },
        bot: {
           link: 'Special:Listusers/bot'
        },
        chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        rollback: {
            link: 'Special:ListUsers/rollback'
        },
        sysop: {
            link: 'Special:ListUsers/sysop'
        }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: false
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'founder',
            'sysop',
            'rollback',
            'bot'
        ],
        newuser: false
    }
};
 
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Diamante'},
                newuser: { u:'Cacos de Pedra'},
                sysop: { u:'Crystal Gem'},
                rollback: {u:'Lutador'},
                chatmoderator: {u:'Guardi�o'},
                founder: {u:'Diamante Transparente'},
}
};

// Import Script pages
importArticles({
    type: 'script',
    articles: [
        'u:dev:UserTags/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:LockForums/code.js',
        'u:dev:ShowHide/code.js'
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

// Auto-atualiza��o da Atividade Recente
/* Veja w:c:dev:AjaxRC para informa��o & atribui��o */
AjaxRCRefreshText = 'Atualizar automaticamente';
AjaxRCRefreshHoverText = 'Ativar esta op��o permite a atualiza��o autom�tica da p�gina de Atividade Recente na Wikia.';
ajaxPages = ["Especial:RecentChanges","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

// Chat Hacks
importScriptPage('User:Monchoman45/ChatHacks.js','c');
importScriptPage('User:Joeytje50/ChatPMs.js', 'c');
importScriptPage('MediaWiki:Chat.js/options.js','xiaolinpedia');
importScriptPage(('MessageBlocker/code.js', 'dev'),'xiaolinpedia')