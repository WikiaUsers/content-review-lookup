/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */
window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "Este blog foi arquivado por n�o ser comentado por <expiryDays> dias. N�o comente mais nele!",
    nonexpiryCategory: "Blogs n�o arquivados"
};

window.ajaxPages = ["Especial:Mudan�as_recentes","Especial:Contribui��es","Especial:WikiActivity"];

window.AjaxRCRefreshText = 'Atualiza��o autom�tica';

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
    expiryMessage: "Este f�rum foi automaticamente arquivado porque seu coment�rio mais recente foi h� mais de <expiryDays> dias.",
    warningDays: 30,
    warningMessage: "Este f�rum tem <actualDays> dias; n�o comente a n�o ser que seja estritamente necess�rio. Este f�rum ser� arquivado quando tiver <expiryDays> dias desde o �ltimo coment�rio.",
};

importArticles({
    type: "script",
    articles: [
        "u:dev:LockForums/code.js"
    ]
});