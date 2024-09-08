// Atualização Automática
AjaxRCRefreshText = 'Automaticamente recarregar a página a cada 60segs';
AjaxRCRefreshHoverText = 'A página recarrega-se automaticamente';
ajaxPages = ["Especial:Mudanças_recentes","Especial:WikiActivity", "Especial:Páginas_vigiadas", "Especial:Registro", "Especial:Arquivos_novos", "Especial:Lista_de_arquivos", "Especial:Páginas_novas", "Especial:Contribuições"];

// Personalização de usuário
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:TopEditors/code.js',       // Editores
        'u:dev:MediaWiki:InactiveUsers/code.js',    // Etiqueta em Usuários
        'u:dev:MediaWiki:AjaxRC/code.js',           // Atualização Automática
        'MediaWiki:Wikia.js/userRightsIcons.js',    // Identificação
        'u:dev:MediaWiki:Countdown/code.js'         // Contagem Regressiva
    ]
});