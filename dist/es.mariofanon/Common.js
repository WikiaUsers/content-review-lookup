window.SpoilerAlertJS = {
    question: 'Esta página puede contener spoilers. ¿Quieres leerla?',
    yes: 'Sí',
    no: 'No',
    fadeDelay: 1600
};
window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 }, 
		templatehelper: { u: 'Plantillas', order: 102 }, 
		rollbackers: { u: 'Reversor', order: 103 }, 
		contentmod: { u: 'Moderador de contenido', order: 105 }, 
        bureaucrat: { u: 'Burócrata', order: 1 } 
	}
};
UserTagsJS.modules.custom = {
	'José Dedede': ['csshelper'],
	'JorgeyGari': ['rollbackers'],
	'HumanoidPikachu': ['csshelper'],
	'HumanoidPikachu': ['jshelper'],
	'BowserRDML': ['contentmod']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

// Ajax de dev wiki
window.ajaxPages = [
    "Especial:CambiosRecientes",
    "Especial:WikiActivity",
    "Especial:Seguimiento",
    "Especial:Registro",
    "Especial:Contribuciones"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automáticamente refresca la página';
window.ajaxindicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
 
/*  Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME. */
$(function() {
     if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
     $("span.insertusername").html(wgUserName);
});
/* End of the {{USERNAME}} replacement */
 
/* Borrado de artículos (crédito a Usuario:Benfutbol10) */
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': '[[Wiki Mario Fanon:Reglas|Incumplimiento de reglas de artículos]]',
  'accesskey': '1',
  'label': 'Incump. artículos'};
fdButtons[fdButtons.length] = {
  'summary': '[[Wiki Mario Fanon:Reglas|Incumplimiento de reglas de archivos]]',
  'accesskey': '2',
  'label': 'Incump. archivos'};
fdButtons[fdButtons.length] = {
  'summary': '[[Wiki Mario Fanon:Reglas|Incumplimiento general de reglas]]',
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

// Cuenta regresiva
importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

countdownTimer.translations = { 
    es: {
        and: 'y',
        second: 'segundo',
        seconds: 'segundos',
        minute: 'minuto',
        minutes: 'minutos',
        hour: 'hora',
        hours: 'horas',
        day: 'dia',
        days: 'dias'
    }
};