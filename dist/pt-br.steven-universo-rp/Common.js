/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

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
                chatmoderator: {u:'Guardião'},
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

// Auto-atualização da Atividade Recente
/* Veja w:c:dev:AjaxRC para informação & atribuição */
AjaxRCRefreshText = 'Atualizar automaticamente';
AjaxRCRefreshHoverText = 'Ativar esta opção permite a atualização automática da página de Atividade Recente na Wikia.';
ajaxPages = ["Especial:RecentChanges","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

// Chat Hacks
importScriptPage('User:Monchoman45/ChatHacks.js','c');
importScriptPage('User:Joeytje50/ChatPMs.js', 'c');
importScriptPage('MediaWiki:Chat.js/options.js','xiaolinpedia');
importScriptPage(('MessageBlocker/code.js', 'dev'),'xiaolinpedia')