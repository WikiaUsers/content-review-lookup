/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
importArticles({
	type: 'script',
	article: 'u:zh.pad.wikia.com:MediaWiki:CountDown.js'
}, {
	type: 'style',
	article: 'u:zh.pad.wikia.com:MediaWiki:CountDown.css'
});


/* SpoilerAlert */
window.SpoilerAlert = {
    question: 'Cette page contient des spoilers (informations dévoilant l\'intrigue d\'une œuvre). Êtes-vous sûr(e) de vouloir la lire ?',
    yes: 'Oui',
    no: 'Non, pas maintenant',
    fadeDelay: 1600
};


/* Inversion des couleurs des elements grace au modele [[Modèle:InversionTheme]] */
var couleurPageThemeClair = '#ffffff';
var root = document.querySelector(':root');
var tabImages;
if (getComputedStyle(root).getPropertyValue('--theme-page-background-color') == couleurPageThemeClair) {
	tabImages = Array.from(document.getElementsByClassName('inversionClair'));
} else {
	tabImages = Array.from(document.getElementsByClassName('inversionSombre'));
}
console.log(tabImages);
for (var i = 0; i<tabImages.length; i++) {
	tabImages[i].style.filter = 'invert(100%)';
}