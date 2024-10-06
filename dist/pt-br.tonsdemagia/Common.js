/* Códigos JavaScript colocados aqui serão carregados por todos aqueles que acessarem alguma página desta wiki */

// Alerta de Spoilers e Não Finalizados
window.SpoilerAlertJS = {
    question: 'ATENÇÃO! Esta área contém spoilers ou informações provisórias que você pode não querer ver. Tem certeza que deseja prosseguir?',
    yes: 'Sim, por favor',
    no: 'Não, ainda não',
    fadeDelay: 1600
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AddBlockUserTag/code.js',
        'u:dev:MediaWiki:DiscussionsFeed.js',
        'u:dev:MediaWiki:PageRenameAuto-update/code.js',
        'u:dev:MediaWiki:CategoryQuickRemove.js',
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

/* == Da Shades of Magic Wiki == */
/* Toggle spoiler button text */
$(function () {
    var button = $('.mw-customtoggle-ShowSpoiler');
    if (!button.length) {
        return;
    }

    function toggleText () {
        if ($(this).hasClass('shown')) {
            $(this).removeClass('shown');
            $(this).text('Uma Vida Restaurada');
        } else {
            $(this).addClass('shown');
            $(this).text('Uma Vida Apagada');
        }
    }

    button.text('Uma Vida Restaurada');

	button.click(toggleText);
});