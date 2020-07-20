/* Any JavaScript here will be loaded for all users on every page load. */

/* Nouveaux boutons dans la barre d'outils */

function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText)
{
 mwCustomEditButtons[mwCustomEditButtons.length] =
 {"imageFile": imageFile,
  "speedTip": speedTip,
  "tagOpen": tagOpen,
  "tagClose": tagClose,
  "sampleText": sampleText};
}

/** Bouton Redirection **/
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png',
 'Doorverwijzing',
 '#DOORVERWIJZING [[',
 ']]',
 'Naam van bestemming',
 'mw-editbutton-redirect');

 
/** Bouton DEFAULTSORT **/
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/1/14/Bouton_Defaultsort.png','Simbio-fin','{{','}}','DEFAULTSORT:nom de famille, prénom','');
 
/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's Common.js.
  */
 
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();

/* UserTags */
window.UserTagsJS = {
	modules: {}
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'bannedfromchat', 'rollback', 'chatmoderator', 'bot'];

/* Scripts importés */
EditIntroButtonText = 'Intro bewerken'; /* Tekst voor intro bewerken */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ShowHide/code.js', /* Collapsible tables (désormais inutile, présent par défaut avec "mw-collapsible") */
        'u:dev:Countdown/code.js', /* Compte à rebours */
        'u:dev:ExternalImageLoader/code.js', /* Modèle ImageExterne */
        'u:dev:ReferencePopups/code.js', /* Références en pop-up */
        'MediaWiki:Common.js/HeaderLinks.js', /* Lien ancré pour les titres de section */
        'MediaWiki:Common.js/StandardEditSummary.js', /* Résumés de modifications prédéfinis */
        'u:dev:EditIntroButton/code.js', /* Bouton Modifier l'intro */
        'u:dev:WallGreetingButton/code.js', /* Bouton Modifier accueil mur */
        'u:dev:UserTags/code.js' /* UserTags */
    ]
});

 
 AjaxRCRefreshText = 'Auto-refresh';
 AjaxRCRefreshHoverText = 'Automatisch de pagina vernieuwen';
 ajaxPages = ["Speciaal:WikiActivity","Speciaal:RecenteWijzigingen","Speciaal:UncategorizedPages","Speciaal:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');