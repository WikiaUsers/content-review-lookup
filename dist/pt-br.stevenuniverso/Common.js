window.AjaxRCRefreshText = 'Automaticamente recarregar a p�gina a cada 60segs';
window.AjaxRCRefreshHoverText = 'A p�gina recarrega-se automaticamente';
window.ajaxPages = [
    "Especial:Mudan�as_recentes",
    "Especial:WikiActivity",
    "Especial:P�ginas_vigiadas",
    "Especial:Registro",
    "Especial:Arquivos_novos",
    "Especial:Lista_de_arquivos",
    "Especial:P�ginas_novas",
    "Especial:Contribui��es"
];

// Importa��es
importArticles({
    type: 'script',
    articles: [
        'u:xiaolinpedia:MediaWiki:Chat.js/options.js', // Op��es M�ltiplas
    ]
});
/* Spoiler tag + buttons (Cr�ditos a SUW americana)*/
if ($('.spoiler').length) {
    switch (wgCanonicalNamespace) {
        case 'User':
        case 'User_talk':
            $('.UserProfileActionButton .wikia-menu-button').before(
                '<button class="wikia-button" id="toggle-spoiler" title="Mostra todos os spoilers na p�gina">Mostrar Spoilers</button>'
            );
            break;
    }
    $('.wikinav2 .WikiaPageHeader').css('padding-right', '0');
    $('#WikiaPageHeader .comments').after(
        '<button class="wikia-button" id="toggle-spoiler" title="Mostra todos os spoiler na p�gina">Mostrar Spoilers</button>'
    );
}
$('#toggle-spoiler').click(function() {
    if ($('.spoiler.on, .spoiler.off').length) {
        $('.spoiler').attr('class', 'spoiler').removeAttr('title');
        $('.wikia-button#toggle-spoiler').attr('title', 'Esconde todos os spoilers na p�gina').html('Esconder Spoilers');
    } else {
        $('.spoiler').attr('class', 'spoiler on').attr('title', 'clique para mostrar os spoilers');
        $('.wikia-button#toggle-spoiler').attr('title', 'Mostrar todos os spoilers').html('Mostrar Spoilers');
    }
});
var spoilerConfig = function(i, el) {
    var $el = $(el);
    $el.attr('title', 'clique para mostrar os spoilers');
    $el.click(function() {
        var $this = $(this);
        if ($this.hasClass('on'))
            $this.attr('class', 'spoiler off').removeAttr('title');
        else
            $this.attr('class', 'spoiler on').attr('title', 'clique para mostrar os spoilers');
    });
};
$('.spoiler.on').each(spoilerConfig);

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
        threadmoderator: {
            link: 'Special:ListUsers/threadmoderator'
        }, 
         'content-moderator': {
            link: 'Special:ListUsers/content-moderator'
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
            'threadmoderator',
            'founder',
            'sysop',
            'content-moderator',
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
        newuser: { u:'Em Forma��o'},
        sysop: { u:'Crystal Gem'},
        rollback: {u:'Reversor'},
        chatmoderator: {u:'Sentinela do Templo'},
        founder: {u:'Mestre Gem'},
        'content-moderator': {u:'Safira'},
        threadmoderator: {u:'Rubi'},
    }
};