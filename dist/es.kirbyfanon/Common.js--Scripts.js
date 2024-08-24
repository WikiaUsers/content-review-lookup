window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Plantillas', order: 102 },
		bureaucrat: { u: 'Bur�crata', order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'Jos� Dedede': ['csshelper', 'templatehelper', 'jshelper']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

importArticles({
    type: "script",
    articles: [
        // Mensaje solo para administradores
        "MediaWiki:Common.js/soloAdmin.js",
        "MediaWiki:Common.js/resumenedicion.js",
        "u:dev:VisualSpellCheck/code.js",
        "u:dev:UserTags/code.js"
    ]
});

// Ajax de dev wiki
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Seguimiento","Especial:Registro","Especial:Contribuciones"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Autom�ticamente refresca la p�gina';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxindicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';

 /* Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME. */
$(function() {
     if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
     $("span.insertusername").html(wgUserName);
});

 /* End of the {{USERNAME}} replacement */

/* Borrado de art�culos (cr�dito a Usuario:Benfutbol10) */
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': '[[Wiki Kirby Fanon:Reglas|Incumplimiento de reglas de art�culos]]',
  'accesskey': '1',
  'label': 'Incump. art�culos'};
fdButtons[fdButtons.length] = {
  'summary': '[[Wiki Kirby Fanon:Reglas|Incumplimiento de reglas de archivos]]',
  'accesskey': '2',
  'label': 'Incump. archivos'};
fdButtons[fdButtons.length] = {
  'summary': '[[Wiki Kirby Fanon:Reglas|Incumplimiento general de reglas]]',
  'accesskey': '3',
  'label': 'Incump. general'};
fdButtons[fdButtons.length] = {
  'summary': 'A petici�n del mismo autor',
  'accesskey': '4',
  'label': 'A petici�n del autor'};

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

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110312135211/es.starwars/images/2/29/Button_user.png",
        "speedTip": "Plantilla Personaje",
        "tagOpen": "{{Infobox Personaje\n|imagen = \n|nombre = ",
        "tagClose": "\n|comentario_imagen = \n|usuario = \n|aparece en = \n|raza = \n|g�nero = \n|debut = (opcional)\n|edad = (opcional)\n|lugar = (opcional)\n|familia = (opcional)\n|japon�s = (opcional)\n|ingl�s = (opcional)\n}}",
        "sampleText": ""};
}