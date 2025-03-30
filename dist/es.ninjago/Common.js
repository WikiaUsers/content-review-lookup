
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

importArticles({
    type: "script",
    articles: [
        // Mensaje solo para administradores
        "MediaWiki:Common.js/resumenedicion.js",
        "w:c:dev:VisualSpellCheck/code.js",
        "w:dev:TopEditors/code.js",
        "MediaWiki:Common.js/borradoRapido.js"
    ]
});

InactiveUsers = { text: 'Inactivo' };

// Ajax de dev wiki
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Seguimiento","Especial:Registro","Especial:Contribuciones"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automáticamente refresca la página';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxindicator = 'http://images2.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';


/* Borrado de artículos (crédito a Usuario:Benfutbol10) */
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': '[[Wiki Ninjago:Políticas|Incumplimiento de reglas de artículos]]',
  'accesskey': '1',
  'label': 'Incump. artículos'};
fdButtons[fdButtons.length] = {
  'summary': '[[Wiki Ninjago:Políticas|Incumplimiento de reglas de archivos]]',
  'accesskey': '2',
  'label': 'Incump. archivos'};
fdButtons[fdButtons.length] = {
  'summary': '[[Wiki Ninjago:Políticas|Incumplimiento general de reglas]]',
  'accesskey': '3',
  'label': 'Incump. general'};
fdButtons[fdButtons.length] = {
  'summary': 'A petición del mismo autor',
  'accesskey': '4',
  'label': 'A petición del autor'};

/* Prueba 
function destac() {
    if(skin == 'oasis') {
	 document.getElementById('WikiaFooter').getElementsByTagName('ul')[0].outerHTML += '<ul id="WikiaNotifications" class="WikiaNotifications"><li><div data-type="1"><a class="sprite close-notification"></a>Prueba</div></li></ul>';
    }
    else if (skin == 'monobook') { 
        document.getElementById('contentSub').outerHTML += '<div class="usermessage">Prueba.</div>';
    }
}addOnloadHook(destac);
*/