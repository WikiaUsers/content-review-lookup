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

// S'execute si c'est sur la page d'accueil (ou les modèles qui composent la page d'accueil)
if(pageName === "Wiki_Radiant" || pageName === "Modèle:Sondage")
	integrationLastPolls();
	
setTimeout(addBlurInCarousel, 1500); // Le temps que la page ait eu le temps de charger