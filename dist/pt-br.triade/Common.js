/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */


/* Substitui {{USERNAME}} pelo nome do usu�rio que est� vendo a p�gina. */
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