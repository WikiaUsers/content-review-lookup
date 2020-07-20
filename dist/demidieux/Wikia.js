//      SOMMAIRE : WIKIA.JS
//  Tout ajout de code ou de fonctionnalité doit être recensé ici, dans l'ordre 
//  d'apparition
//
//      ¤ SpoilerAlert : Configuration du script (l'appel a lieu dans 
//          Mediawiki:ImportJS)
//      ¤ Univers Riordan : 
//      ¤ Spécial:Communauté : création des modules Pages sans liens interwiki, 
//          Pages sans images 
//      ¤ AddRailModule : Ajout d'un module dans la barre latérale (en bas).
//          Repris du Wiki Dev pour voir le module intégrer le bas de la barre
//      ¤ Imports de scripts (à migrer vers Mediawiki:ImportJS)

/* Spoiler alert */
SpoilerAlert = {
    question: 'Cette page contient des spoilers. La lire est à vos risques et périls. Souhaitez-vous vraiment la faire apparaître ?',
    yes: 'Oui',
    no: 'Non, pas maintenant',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Héros de l\'Olympe : Le Sang de l\'Olympe');
    }
};

//???????????????????????????????????????????????
$('#primetabberboiteaccueilslider').mouseenter(cleantabbertitle)

function cleantabbertitle() {
    var chaine = $('.boiteaccueilslidertabber .tabbernav').html();
    chaine = chaine.replace(/&nbsp;/g, '_');
    $('.boiteaccueilslidertabber .tabbernav').html(chaine)
    console.log('Suppression des espaces insécables effectuée')
}
//????????????????????????????????????????????????

/*Spécial:Communauté*/
//Pages sans liens interwikis
$('#SCWithoutLinks #SectionCommunauteModele_stock').load(
	'/wiki/Special:WithoutInterwiki?limit=1000&offset=0 #mw-content-text',
	function() {
		var randomin = $('#SCWithoutLinks #SectionCommunauteModele_stock .mw-spcontent p b').html();
		var elems = [Math.floor((Math.random() * randomin)), Math.floor((Math.random() * randomin)), Math.floor((Math.random() * randomin))];
		console.log(elems);
		var all_links = $('.mw-spcontent ol li a');
		$('#SCWithoutLinks #SectionCommunauteModele_lien1').html(all_links[elems[0]]);
		$('#SCWithoutLinks #SectionCommunauteModele_lien2').html(all_links[elems[1]]);
		$('#SCWithoutLinks #SectionCommunauteModele_lien3').html(all_links[elems[2]]);
		$('#SCWithoutLinks #SectionCommunauteModele_stock').remove();
	}
)
//Pages sans images
$('#SCWithoutImages #SectionCommunauteModele_stock').load(
	'/wiki/Special:WithoutImages?limit=1000&offset=0 #mw-content-text',
	function() {
		var randomin = $('#SCWithoutImages #SectionCommunauteModele_stock .mw-spcontent p b').html();
		var elems = [Math.floor((Math.random() * randomin)), Math.floor((Math.random() * randomin)), Math.floor((Math.random() * randomin))];
		console.log(elems);
		var all_links = $('.mw-spcontent ol li a');
		$('#SCWithoutImages #SectionCommunauteModele_lien1').html(all_links[elems[0]]);
		$('#SCWithoutImages #SectionCommunauteModele_lien2').html(all_links[elems[1]]);
		$('#SCWithoutImages #SectionCommunauteModele_lien3').html(all_links[elems[2]]);
		$('#SCWithoutImages #SectionCommunauteModele_stock').remove();
	}
)


/* Scripts importés */
importArticles({
    type: 'script',
    articles: [
        //'u:c:MediaWiki:Snow.js',  Fait tomber des flocons sur la page
        "Mediawiki:Wikia.js/Demi-dieu.js",
    ]
});