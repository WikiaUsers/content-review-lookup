/* Auto Refresh */

AjaxRCRefreshText = 'Carregamento Autom�tico';
AjaxRCRefreshHoverText = 'A p�gina recarrega-se automaticamente';
ajaxPages = ["Especial:Mudan�as_recentes","Especial:WikiActivity", "Especial:P�ginas_vigiadas", "Especial:Registro", "Especial:Arquivos_novos", "Especial:Lista_de_arquivos", "Especial:P�ginas_novas", "Especial:Contribui��es"];
importScriptPage('AjaxRC/code.js', 'dev');


/* ReferencePopups */

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});