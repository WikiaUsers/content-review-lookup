/* Nome dos Cargos Personalizados */

window.UserTagsJS = {
modules: {},
tags: {
        founder: { 
            u:'Fundador',
            link: 'Special:ListUsers/bureaucrat'
            },
        bureaucrat: { 
            u:'Burocrata', 
            link: 'Special:ListUsers/bureaucrat'
            }, 
        bot: {
            link: 'Special:Listusers/bot'
            },
        newuser: { 
            u:'Novo Usuário'
            },
        sysop: { 
            u:'Administrador',
            link: 'Special:ListUsers/sysop'
            },
        rollback: {
            u:'Reversor',
            link: 'Special:ListUsers/rollback'
            },
        chatmoderator: {
            u:'Vigilante do Chat',
            link: 'Special:ListUsers/chatmoderator'
            },
        threadmoderator: {
            u:'Vigilante do Fórum',
            link: 'Special:ListUsers/threadmoderator'
            },
        'content-moderator': {
            u:'Vigilante de Conteúdo',
            link: 'Special:ListUsers/content-moderator'
            },
     }, 
};
UserTagsJS.modules.inactive = {
            days: 60,
            namespaces: [0],
            zeroIsInactive: false
            };
UserTagsJS.modules.mwGroups =  [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'threadmoderator',
            'founder',
            'sysop',
            'content-moderator',
            'rollback',
            'bot'
            ];
UserTagsJS.modules.newuser = false;
            
window.AjaxRCRefreshText = 'Automaticamente recarregar a página a cada 60segs';
window.AjaxRCRefreshHoverText = 'A página recarrega-se automaticamente';
window.ajaxPages = [
    "Especial:Mudanças_recentes",
    "Especial:WikiActivity",
    "Especial:Páginas_vigiadas",
    "Especial:Registro",
    "Especial:Arquivos_novos",
    "Especial:Lista_de_arquivos",
    "Especial:Páginas_novas",
    "Especial:Contribuições"
];

// Importações
importArticles({
    type: 'script',
    articles: [
        'u:xiaolinpedia:MediaWiki:Chat.js/options.js', // Opções Múltiplas
    ]
});
/* Spoiler tag + buttons (Créditos a SUW americana)*/
if ($('.spoiler').length) {
    switch (wgCanonicalNamespace) {
        case 'User':
        case 'User_talk':
            $('.UserProfileActionButton .wikia-menu-button').before(
                '<button class="wikia-button" id="toggle-spoiler" title="Mostra todos os spoilers na página">Mostrar Spoilers</button>'
            );
            break;
    }
    $('.wikinav2 .WikiaPageHeader').css('padding-right', '0');
    $('#WikiaPageHeader .comments').after(
        '<button class="wikia-button" id="toggle-spoiler" title="Mostra todos os spoiler na página">Mostrar Spoilers</button>'
    );
}
$('#toggle-spoiler').click(function() {
    if ($('.spoiler.on, .spoiler.off').length) {
        $('.spoiler').attr('class', 'spoiler').removeAttr('title');
        $('.wikia-button#toggle-spoiler').attr('title', 'Esconde todos os spoilers na página').html('Esconder Spoilers');
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

window.railWAM = {
    logPage:"Project:WAM Log"
};