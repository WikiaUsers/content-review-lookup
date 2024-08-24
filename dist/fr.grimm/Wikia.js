/* Navigation */

importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});

/* Change Tags */
/* programme */
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* Changement */ 
window.UserTagsJS = {
	modules: {},
	tags: {
        sysop: { u: 'Grimm', },
        bureaucrat: { u: 'Royauté' },
        threadmoderator: { u: 'Hexenbiest' },
        moderator: { u: 'Fuchsbau' },
	}
};

UserTagsJS.modules.inactive = 50

;

/*Enlever le bouton "ajouter une image à cette galerie"*/
$( "li:last" ).removeClass(function() {
  return $( this ).prev().attr( "wikia-photogallery-add wikia-button noprint" );
});