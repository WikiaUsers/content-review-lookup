/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
importArticles({
	type: 'script',
	article: 'u:zh.pad.wikia.com:MediaWiki:CountDown.js'
}, {
	type: 'style',
	article: 'u:zh.pad.wikia.com:MediaWiki:CountDown.css'
}, {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:NullEditButton/code.js',
    ]
});


/* SpoilerAlert */
window.SpoilerAlert = {
    question: 'Cette page contient des spoilers (informations dévoilant l\'intrigue d\'une œuvre). Êtes-vous sûr(e) de vouloir la lire ?',
    yes: 'Oui',
    no: 'Non, pas maintenant',
    fadeDelay: 1600
};