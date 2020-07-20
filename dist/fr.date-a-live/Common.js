/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/*Import*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:CategoryRenameAuto-update/fr.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'w:c:dev:ReferencePopups/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:DisplayClock/code.js',
        'u:onepiece:MediaWiki:Common.js/togglers.js',
        'u:dev:AllPagesHideRedirect/code.js',
    ]
});
 
/*Alerte Spoil*/
SpoilerAlert = {
    question: 'Cette page contient pas mal de spoilers. Voulez-vous toutefois continuer ?',
    yes: 'Oui s\'il vous plaît',
    no: 'Non, pas question',
isSpoiler: function () {
        return Boolean($('.spoiler').length);
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');