/* Auto Refresh */

AjaxRCRefreshText = 'Carregamento Automático';
AjaxRCRefreshHoverText = 'A página recarrega-se automaticamente';
ajaxPages = ["Especial:Mudanças_recentes","Especial:WikiActivity", "Especial:Páginas_vigiadas", "Especial:Registro", "Especial:Arquivos_novos", "Especial:Lista_de_arquivos", "Especial:Páginas_novas", "Especial:Contribuições"];
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