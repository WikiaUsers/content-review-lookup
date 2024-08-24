/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */
//importa��es
importArticles({
    type: 'script',
    articles: [
        'u:dev:UserTags/code.js', // Etiquetas de Usu�rios
        'u:dev:WallGreetingButton/code.js', // Sauda��es de Murais
        'u:dev:ReferencePopups/code.js', // Refer�ncias
        'u:dev:LockForums/code.js', // F�runs
        'u:dev:Countdown/code.js', // Contador
        'u:dev:LastEdited/code.js', // Edi��es
        'u:dev:AjaxRC/code.js', // Atualiza��o Autom�tica
        'u:dev:ChatHacks.js', // ChatHack
        // 'u:c:User:Joeytje50/ChatPMs.js', // Chat M�ltiplo
        'u:xiaolinpedia:MediaWiki:Chat.js/options.js', // Op��es M�ltiplas
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
        sysop: { u:'Castel�o'},
        rollback: {u:'Guarda da Chancelaria'},
        chatmoderator: {u:'Guarda do Capit�lio'},
        founder: {u:'Lord Presidente'},
        Autoconfirmed: {u:'Time Lord'},
    }
};