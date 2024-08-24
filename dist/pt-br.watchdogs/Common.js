/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */
AjaxRCRefreshText = 'Atualização automática';
AjaxRCRefreshHoverText = 'Atualiza automaticamente a página';
ajaxPages = ["Especial:Mudan\xE7as_recentes","Especial:WikiActivity","Especial:P\xE1ginas_sem_categorias","Especial:Todas_as_p\xE1ginas"];
importScriptPage('AjaxRC/code.js', 'dev');

 
/**********************/
/* Back to top button by Loleil */
/**********************/
 
importScriptPage('BackToTopButton/code.js', 'dev');

//**Nuke**//
importScriptPage('MediaWiki:Nuke.js');

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

if (wgPageName=="Especial:Lista_de_usu\xE1rios") $("fieldset.lu_fieldset tr:last-child").prepend('<td valign="middle" style="padding:0px 2px 0px 1px;"><label for="checkBoxForpoweruser"><span style="vertical-align:middle"><input type="checkbox" name="lu_target" class="lu_target" value="poweruser" checked="checked" id="checkBoxForpoweruser"></span><span style="padding-bottom:5px;">Power Users</span></label></td>');
 
importArticles({
    type: 'script',
    articles: [
        'w:dev:MediaWiki:WallGreetingButton/code.js'
    ]
});