/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "Este blog foi arquivado por não ser comentado por <expiryDays> dias. Não comente mais nele!",
    nonexpiryCategory: "Blogs não arquivados"
};

window.ajaxPages = ["Especial:Mudanças_recentes","Especial:Contribuições","Especial:WikiActivity"];

window.AjaxRCRefreshText = 'Atualização automática';

window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';

window.ajaxRefresh = 30000; 
 
importArticles({
    type: "script",
    articles: [
        'w:c:dev:LockOldBlogs/code.js',
        'w:c:dev:ReferencePopups/code.js'
    ]
});

importScriptPage('AjaxRC/code.js', 'dev');

window.LockForums = {
    expiryDays: 60,
    expiryMessage: "Este fórum foi automaticamente arquivado porque seu comentário mais recente foi há mais de <expiryDays> dias.",
    warningDays: 30,
    warningMessage: "Este fórum tem <actualDays> dias; não comente a não ser que seja estritamente necessário. Este fórum será arquivado quando tiver <expiryDays> dias desde o último comentário.",
};

importArticles({
    type: "script",
    articles: [
        "u:dev:LockForums/code.js"
    ]
});