/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

var pageName = mw.config.get('wgPageName')

/************************************************************************/

// S'execute si c'est sur la page d'accueil (ou les modèles qui composent la page d'accueil)
if(pageName === "Wiki_Radiant" || pageName === "Modèle:RéseauxSociaux"){
	// Permet d'intéger le compte Insta de Tony Valente
	$("#IntegrationInstagram").append('<iframe src="https://www.instagram.com/tonytonyvalente/embed" width=100% height=820 frameborder="0" allowfullscreen="allowfullscreen"></iframe>')
	
	// Permet d'intéger le compte Tiktok de Tony Valente
	$("#IntegrationTiktok").append('<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tonyvalenteofficial" data-unique-id="tonyvalenteofficial" data-embed-type="creator" style="max-width: 780px; min-width: 288px;" > <section> <a target="_blank" href="https://www.tiktok.com/@tonyvalenteofficial?refer=creator_embed">@tonyvalenteofficial</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>')
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
				poll.setAttribute("data-thread-id", post.threadId)
			
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