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
 'Redirection',
 '#REDIRECT [[',
 ']]',
 'nom de la destination',
 'mw-editbutton-redirect');

/** Bouton Sim1 **/
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/3/30/Bouton_Sim1.png','Sim1','{{','}}','Sim1\n|image      = \n|bio        = \n|nom        = \n|sexe       = \n|âge        = \n|famille    = \n|parent(s)  = \n|fratrie    = \n|amour(s)   = \n|statut     = \n|enfant(s)  = \n|foyer      = \n|coloc      = \n|animal     = \n|espèce     = \n|peau       = \n|poids      = \n|physique   = \n|cheveux    = \n|yeux       = \n|signe      = \n|apparition = \n|jouabilité = \n|mort       = \n|quartier   = \n','');
 
/** Bouton Sim2 **/
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/2/2e/Bouton_Sim2.png','Sim2','{{','}}','Sim2\n|image      = \n|bio        = \n|nom        = \n|sexe       = \n|âge        = \n|famille    = \n|parent(s)  = \n|fratrie    = \n|amour(s)   = \n|statut     = \n|enfant(s)  = \n|autre(s)   = \n|foyer      = \n|coloc      = \n|animal     = \n|espèce     = \n|peau       = \n|poids      = \n|physique   = \n|cheveux    = \n|yeux       = \n|signe      = \n|asp        = \n|apparition = \n|jouabilité = \n|mort       = \n|quartier   = \n','');
 
/** Bouton Sim3 **/
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/8/8b/Bouton_Sim3.png','Sim3','{{','}}','Sim3\n|image      = \n|bio        = \n|nom        = \n|sexe       = \n|âge        = \n|célébrité  = \n|famille    = \n|parent(s)  = \n|fratrie    = \n|amour(s)   = \n|statut     = \n|enfant(s)  = \n|autre(s)   = \n|foyer      = \n|coloc      = \n|animal     = \n|espèce     = \n|peau       = \n|poids      = \n|physique   = \n|cheveux    = \n|yeux       = \n|signe      = \n|trait1     = \n|trait2     = \n|trait3     = \n|trait4     = \n|trait5     = \n|souhait    = \n|musique    = \n|nourriture = \n|couleur    = \n|apparition = \n|jouabilité = \n|mort       = \n|quartier   = \n','');
 
/** Bouton Simbio-début **/
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/0/0f/Bouton_Simbio-d%C3%A9but.png','Simbio-début','{{','}}','Simbio-début\n|image      = \n|nom        = \n|sexe       = \n|famille    = \n|parent(s)  = \n|fratrie    = \n|amour(s)   = \n|enfant(s)  = \n|autre(s)   = \n','');
 
/** Bouton Simbio1 **/
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/a/a8/Bouton_Simbio1.png','Simbio1','{{','}}','Simbio1\n|image      = \n|bio        = \n|nom        = \n|âge        = \n|statut     = \n|foyer      = \n|coloc      = \n|animal     = \n|espèce     = \n|peau       = \n|poids      = \n|physique   = \n|cheveux    = \n|yeux       = \n|signe      = \n|apparition = \n|jouabilité = \n|mort       = \n|quartier   = \n','');
 
/** Bouton Simbio2 **/
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/7/74/Bouton_Simbio2.png','Simbio2','{{','}}','Simbio2\n|image      = \n|bio        = \n|nom        = \n|âge        = \n|statut     = \n|espèce     = \n|peau       = \n|poids      = \n|physique   = \n|cheveux    = \n|yeux       = \n|signe      = \n|asp        = \n|apparition = \n|jouabilité = \n|mort       = \n|quartier   = \n','');
 
/** Bouton Simbio3 **/
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/1/11/Bouton_Simbio3.png','Simbio3','{{','}}','Simbio3\n|image      = \n|bio        = \n|nom        = \n|âge        = \n|statut     = \n|espèce     = \n|peau       = \n|poids      = \n|physique   = \n|cheveux    = \n|yeux       = \n|signe      = \n|trait1     = \n|trait2     = \n|trait3     = \n|trait4     = \n|trait5     = \n|souhait    = \n|musique    = \n|nourriture = \n|couleur    = \n|apparition = \n|jouabilité = \n|mort       = \n|quartier   = \n','');
 
/** Bouton Simbio-fin **/
addCustomButton('https://images.wikia.nocookie.net/sims/fr/images/3/3f/Bouton_Simbio-fin.png','Simbio-fin','{{','}}','Simbio-fin','');
 
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
EditIntroButtonText = 'Modifier l\'intro'; /* Texte pour bouton Modifier l'intro */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ShowHide/code.js', /* Collapsible tables (désormais inutile, présent par défaut avec "mw-collapsible") */
        'u:dev:Countdown/code.js', /* Compte à rebours */
        'u:dev:ExternalImageLoader/code.js', /* Modèle ImageExterne */
        'u:dev:ReferencePopups/code.js', /* Références en pop-up */
        'MediaWiki:Common.js/HeaderLinks.js', /* Lien ancré pour les titres de section */
        'MediaWiki:Common.js/StandardEditSummary.js', /* Résumés de modifications prédéfinis */
        'MediaWiki:Common.js/Forum.js', /* Modifications du forum */
        'u:dev:EditIntroButton/code.js', /* Bouton Modifier l'intro */
        'u:dev:WallGreetingButton/code.js', /* Bouton Modifier accueil mur */
        'u:dev:UserTags/code.js' /* UserTags */
    ]
});