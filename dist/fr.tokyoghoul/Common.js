/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
importScriptPage('SpoilerAlert/code.js', 'dev');
SpoilerAlert = {
    question: 'Cette page contient des spoilers (informations dévoilant l\'intrigue d\'une œuvre). Êtes-vous sûr(e) de vouloir la lire ?',
    yes: 'Oui',
    no: 'Non, pas maintenant',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};

SpoilerAlert = {
  'class': "Spoiler",
}
// =====================================
//                Imports
// =====================================
 
// See MediaWiki:ImportJS