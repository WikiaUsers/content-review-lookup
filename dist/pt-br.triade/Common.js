/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */


/* Substitui {{USERNAME}} pelo nome do usuário que está vendo a página. */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);



/* Atualizar Automaticamente - Atividade Recente */
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
    ]
});