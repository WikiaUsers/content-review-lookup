/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
//importações
importArticles({
    type: 'script',
    articles: [
        'u:dev:UserTags/code.js', // Etiquetas de Usuários
        'u:dev:WallGreetingButton/code.js', // Saudações de Murais
        'u:dev:ReferencePopups/code.js', // Referências
        'u:dev:LockForums/code.js', // Fóruns
        'u:dev:Countdown/code.js', // Contador
        'u:dev:LastEdited/code.js', // Edições
        'u:dev:AjaxRC/code.js', // Atualização Automática
        'u:dev:ChatHacks.js', // ChatHack
        // 'u:c:User:Joeytje50/ChatPMs.js', // Chat Múltiplo
        'u:xiaolinpedia:MediaWiki:Chat.js/options.js', // Opções Múltiplas
        'u:dev:MessageBlocker/code.js', // Bloqueio de Mensagens
        'u:dev:ShowHide/code.js' // Mostrar e Ocultar
    ]
});
 

// Etiquetas
window.UserTagsJS = {
    tags: {
        bureaucrat: { link: 'Special:ListUsers/bureaucrat' },
        founder: { link: 'Special:ListUsers/bureaucrat' },
        bot: { link: 'Special:Listusers/bot' },
        chatmoderator: { link: 'Special:ListUsers/chatmoderator' },
        rollback: { link: 'Special:ListUsers/rollback' },
        sysop: { link: 'Special:ListUsers/sysop' }
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
		bureaucrat: { u:'Lord Chanceler'},
        newuser: { u:'Na Academia'},
        sysop: { u:'Castelão'},
        rollback: {u:'Guarda da Chancelaria'},
        chatmoderator: {u:'Guarda do Capitólio'},
        founder: {u:'Lord Presidente'},
        Autoconfirmed: {u:'Time Lord'},
    }
};