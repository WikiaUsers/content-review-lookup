// Atualiza��o Autom�tica
AjaxRCRefreshText = 'Automaticamente recarregar a p�gina a cada 60segs';
AjaxRCRefreshHoverText = 'A p�gina recarrega-se automaticamente';
ajaxPages = ["Especial:Mudan�as_recentes","Especial:WikiActivity", "Especial:P�ginas_vigiadas", "Especial:Registro", "Especial:Arquivos_novos", "Especial:Lista_de_arquivos", "Especial:P�ginas_novas", "Especial:Contribui��es"];

// Personaliza��o de usu�rio
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:TopEditors/code.js',       // Editores
        'u:dev:MediaWiki:InactiveUsers/code.js',    // Etiqueta em Usu�rios
        'u:dev:MediaWiki:AjaxRC/code.js',           // Atualiza��o Autom�tica
        'MediaWiki:Wikia.js/userRightsIcons.js',    // Identifica��o
        'u:dev:MediaWiki:Countdown/code.js'         // Contagem Regressiva
    ]
});