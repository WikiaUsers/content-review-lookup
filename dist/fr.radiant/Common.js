/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

var pageName = mw.config.get('wgPageName');

/************************************************************************/
// Pour tous les balises "IntegrationInstagram", intégrer un embed selon leur username
var elementsII = document.getElementsByClassName("IntegrationInstagram");
for (var e=0; e<elementsII.length; e++){
	var username = elementsII[e].getAttribute("data-username");
    $(elementsII[e]).append('<iframe src="https://www.instagram.com/'+username+'/embed" width=100% height=820 frameborder="0" allowfullscreen="allowfullscreen"></iframe>');
}

// Pour tous les balises "IntegrationTiktok", intégrer un embed selon leur username
var elementsIT = document.getElementsByClassName("IntegrationTiktok");
for (var e=0; e<elementsIT.length; e++){
	var username = elementsIT[e].getAttribute("data-username");
    $(elementsIT[e]).append('<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@'+username+'" data-unique-id="'+username+'" data-embed-type="creator" style="max-width: 780px; min-width: 288px;" > <section> <a target="_blank" href="https://www.tiktok.com/@'+username+'?refer=creator_embed">@'+username+'</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>');
}

/************************************************************************/
// Pour les images dans le carrousel des images récentes de la colonne de droite, ajouter un blur/flou pour éviter tous spoils
function addBlurInCarousel(){
    var elementRimg = document.getElementsByClassName("recentImage__image");
	for (var e=0; e<elementRimg.length; e++)
		elementRimg[e].classList.add("spoilManga");
}
/************************************************************************/
// Ajout fonction qui permet d'integrer les sondages (https://www.radiant.fandom.com/fr/f?catId=3100000000000000032) sur la page d'accueil
//
// NB : Réutilisation et transformation du code de "MediaWiki:DiscussionsActivity.js" pour cette utilisation spécifique !
//
function integrationLastPolls() {
	"use strict";
	
	if (window.IntegrationLastPolls) return;
	window.IntegrationLastPolls = true;

	const mwConfig = mw.config.get([
		"wgEnableDiscussions",
		"wgPageName",
		"wgScriptPath",
	]);

	if (!mwConfig.wgEnableDiscussions) return;

	const perf = {};
	perf.started = performance.now();

	/* API */
	function callApi(parameters, callback) {
		const url     = mwConfig.wgScriptPath + "/wikia.php" + parameters;
		const request = new XMLHttpRequest();
		request.open("GET", url);
		request.setRequestHeader('Accept', 'application/hal+json');
		request.withCredentials = true;
		request.timeout = 10000;
		request.onloadend = function() {
			callback(request);
		};
		request.send();
	}
	// Appel de l'API pour récupérer les posts
	var messagePromise;
	messagePromise = new Promise(function(resolve, reject) {
		const parameters = "?controller=DiscussionPost&containerType=FORUM&method=getPosts&limit=100";
		callApi(parameters, resolve);
	});
	
	// Prend l'élément pour ajouter les sondages à l'intérieur
	const contentElement = document.getElementById("SondageAccueil");
	contentElement.textContent = "";
	perf.pageCleared = performance.now();
	
	messagePromise.then(function(request) {
	switch (request.status) {
		case 200:
			perf.apiResponded = performance.now();
			const postsData = JSON.parse(request.responseText)._embedded["doc:posts"];
			perf.jsonParsed = performance.now();
			
			const fragment = document.createDocumentFragment();
			var nbPoll = 0;
			// Pour chaque posts, et jusqu'à 3 sondages
			for (var i = 0; i < postsData.length && nbPoll < 3; ++i) {
				const post = postsData[i];
				// Ne prendre que ceux qui sont des sondages 
				if (!post.poll)  continue;
				nbPoll += 1;
				
				// Ajouter une balise HTML avec comme attribut son IDentifiant (pour DiscussionsPollEmbed.js)
				const poll = document.createElement("div");
				poll.setAttribute("class","discussions-poll");
				poll.setAttribute("data-thread-id", post.threadId);
			
				fragment.appendChild(poll);
				fragment.appendChild(document.createElement("br"));
			}
			// Puis mettre les balises dans la page
			contentElement.appendChild(fragment);
			perf.postsRendered = performance.now();
			
			// Et enfin, integrer les sondages
			window.importArticles({
				type: 'script',
				article: 'u:dev:MediaWiki:DiscussionsPollEmbed.js'
			});
			perf.PoolEmbed = performance.now();
			break;
			
		case 0:
			console.log("integrationLastPolls cannot connect to server");
			break;
		default:
			console.log("integrationLastPolls encountered an error of HTTP " + request.status);
			break;
		}
	});
}

/************************************************************************/
// Partie pour l'ajout de fonction qui permet de choisir ses préférences pour les spoilers :
// Elle ajoute un bouton dans la barre d'outils qui permet de switcher entre 3 options
// Ces options enlèvent ou remettent des valeurs dans l'attribut "class", qui avec le CSS, ajoute du flou/blur sur les éléments (protège des spoils)
$(function() {
	var SPOIL_CACHE_KEY = 're-spoilselector';

	function changeClassList(classActuel, classNew) {
		var elements = document.getElementsByClassName(classActuel);
		for (i = elements.length-1; i>=0; i--){
		    elements[i].classList.add(classNew);
		    elements[i].classList.remove(classActuel);
		}
	}
	
	// Fonction permettant de modifier la classList (donc changer le flou/blur) selon la préférence
	function updateSpoil(pref) {
		var classActuel;
		var classNew;
		
		switch (pref) {
			// Si "anime" => enlever rien + remettre le flou sur les balises "spoilAnime"
			case 'anime':
				changeClassList("Animespoil","spoilAnime"); // Remettre
				break;
			// Si "manga" => enlever le flou sur les balises "spoilAnime" + remettre le flou sur les balises "spoilManga"
			case 'manga':
				changeClassList("spoilAnime","Animespoil"); // Enlever
				changeClassList("Mangaspoil","spoilManga"); // Remettre
				break;
			// Si "desac" => enlever le flou sur toutes les balises + remettre rien
			case 'desac':
			default:
				changeClassList("spoilAnime","Animespoil"); // Enlever
				changeClassList("spoilManga","Mangaspoil"); // Enlever
		}
	}
	
	// Fonction permettant d'ajouter un bouton dans le menu en haut à droite de la page pour choisir ses préférences
	function setDropdownHtml(pref){
		var title = "Spoilers : ";
		var toolbarIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" fill="currentColor" viewBox="-4 6 25 1">';
		var shield = '<path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>';
		
		switch (pref) {
			case 'desac':
				title += "[désactivé]";
				toolbarIcon += '<path fill-rule="evenodd" d="M1.093 3.093c-.465 4.275.885 7.46 2.513 9.589a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.32 11.32 0 0 0 1.733-1.525l-.745-.745a10.27 10.27 0 0 1-1.578 1.392c-.346.244-.652.42-.893.533-.12.057-.218.095-.293.118a.55.55 0 0 1-.101.025.615.615 0 0 1-.1-.025 2.348 2.348 0 0 1-.294-.118 6.141 6.141 0 0 1-.893-.533 10.725 10.725 0 0 1-2.287-2.233C3.053 10.228 1.879 7.594 2.06 4.06l-.967-.967zM3.98 1.98l-.852-.852A58.935 58.935 0 0 1 5.072.559C6.157.266 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.483 3.626-.332 6.491-1.551 8.616l-.77-.77c1.042-1.915 1.72-4.469 1.29-7.702a.48.48 0 0 0-.33-.39c-.65-.213-1.75-.56-2.836-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524a49.7 49.7 0 0 0-1.357.39zm9.666 12.374-13-13 .708-.708 13 13-.707.707z"/>';
				break;
			case 'manga':
				title += "[dernier arc]";
				toolbarIcon += shield +'<path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/>';
				break;
			case 'anime':
			default:
				title += "[animeonly]";
				toolbarIcon += shield +'<path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>';
		}
		toolbarIcon += '</svg>';
		
		// Set dropdown to nav
		var CONTENT_ID = 'wiki-tools__spoiler-switch';
		$('.'+CONTENT_ID).remove();
		var $dropdown = $("<div>").attr("id","SwitchSpoil").attr("title",title).addClass("wds-button wds-is-secondary "+CONTENT_ID).attr("style","padding-right: 0px; padding-top: 0px; padding-bottom: 0px; padding-left: 0px;");
		var $toggle = $("<a>").addClass("wds-dropdown__toggle")
							  .on('click', function(){	// Alterner entre "Anime", "Manga" ou "Désactiver"
									// Alterne entre les 3 options
									switch (window.switchSpoil) {
										case 'anime':
											window.switchSpoil = "manga";
											break;
										case 'manga':
											window.switchSpoil = "desac";
											break;
										case 'desac':
										default:
											window.switchSpoil = "anime";
									}
									// Sauvegarde la préférence pour les prochaines sessions
									localStorage.setItem(SPOIL_CACHE_KEY, window.switchSpoil);
									// Mise à jour de la page avec la nouvelle préférence
									updateSpoil(window.switchSpoil);
									// Mise à jour de l'icône du bouton dans le menu
									setDropdownHtml(window.switchSpoil);
							}).html(toolbarIcon).appendTo($dropdown);
		
		$(".wiki-tools > .wds-button:not([class*='hsw-']):last-of-type").after($dropdown);
	}
	
	// Lors du chargement de la page
	if (!window.switchSpoil){
		// Initialisation du la variable selon la préférence (ou par défaut "anime")
	    window.switchSpoil = localStorage.getItem(SPOIL_CACHE_KEY) || "anime";
		// Update le menu
		setDropdownHtml(window.switchSpoil);
		// Update des images si paramètre custom (donc autre que par défaut)
		if (window.switchSpoil != "anime")
			updateSpoil(window.switchSpoil);
	}
}());

/************************************************************************/
// Partie pour customiser la barre latérale droite en ajoutant d'une image aléatoire en fond :
$(function () {
	// Tableau d'images de personnages de Radiant (provenant du site de la NHK, et d'une archive du site de l'animé Radiant)
    var imageArray = [
        'url("https://www.nhk.or.jp/anime/radiant/2nd/assets/images/art/rizerotte.png")',
        'url("https://www.nhk.or.jp/anime/radiant/2nd/assets/images/art/mieri.png")',
        'url("https://www.nhk.or.jp/anime/radiant/2nd/assets/images/art/seto.png")',
        'url("https://web.archive.org/web/20210503042349im_/https://anime-radiant.com/_wp/wp-content/themes/radiant/img/chara_main_aruma.png")',
        'url("https://web.archive.org/web/20210503042349im_/https://anime-radiant.com/_wp/wp-content/themes/radiant/img/chara_main_bobly.png")',
        'url("https://web.archive.org/web/20210503042349im_/https://anime-radiant.com/_wp/wp-content/themes/radiant/img/chara_main_doku.png")',
        'url("https://web.archive.org/web/20210503042349im_/https://anime-radiant.com/_wp/wp-content/themes/radiant/img/chara_main_drag.png")',
        'url("https://web.archive.org/web/20210503042349im_/https://anime-radiant.com/_wp/wp-content/themes/radiant/img/chara_main_grim.png")',
        'url("https://web.archive.org/web/20210503042349im_/https://anime-radiant.com/_wp/wp-content/themes/radiant/img/chara_main_majesty.png")',
        'url("https://web.archive.org/web/20210503042349im_/https://anime-radiant.com/_wp/wp-content/themes/radiant/img/chara_main_meri.png")',
        'url("https://web.archive.org/web/20210503042349im_/https://anime-radiant.com/_wp/wp-content/themes/radiant/img/chara_main_seto.png")',
        'url("https://web.archive.org/web/20210503042349im_/https://anime-radiant.com/_wp/wp-content/themes/radiant/img/chara_seto0.png")'
    ];

    var index = Math.round(Math.random() * (imageArray.length - 1));
    $('.page__right-rail').css("background-image", imageArray[index]);
});
/************************************************************************/
// S'execute si c'est sur la page d'accueil (ou les modèles qui composent la page d'accueil)
if(pageName === "Wiki_Radiant" || pageName === "Modèle:Sondage")
	integrationLastPolls();
	
setTimeout(addBlurInCarousel, 1500); // Le temps que la page ait eu le temps de charger