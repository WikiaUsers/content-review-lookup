/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

// Toute les url pour récupérer le flux rss des posts insta 
var urls = ["https://bibliogram.ethibox.fr",
			 "https://bibliogram.art",
			 "https://bibliogram.snopyta.org",
			 "https://bibliogram.pussthecat.org",
			 "https://bibliogram.1d4.us",
			 "https://bibliogram.froth.zone",
			 "https://bibliogram.esmailelbob.xyz",	
			 "https://biblio.alefvanoon.xyz",
			 "https://bib.riverside.rocks",
			 "https://bib.actionsack.com",
			 "https://insta.trom.tf",
			 "https://insta.tromdienste.de",
			 "qsuiaf4jio2yaxdbj6lj...onion"];

// Fonction permettant de récupérer les posts et de les écrires
function setPostInsta(url){
	// recup le flux
	fetch(url+'/u/tonytonyvalente/rss.xml')
	.then(function(response) {
		return response.text();
	})
	.then(function(str) {
		return new window.DOMParser().parseFromString(str, "text/xml");
	})
	.then(function(data) {
		var rss = document.getElementById("RSSinsta");
		var nb = 0;

		// Pour chaque element du XML
		for (var idx in data['all']) {
			item = data['all'][idx];

			// Pour chaque poste insta
			if (item.nodeName == "item") {
				
				// S'il existe déjà, ne rien faire 
				// (donc ne s'actualise pas avec F5, mais changement de page)
				if (document.getElementById(nb))
					continue;
				var rsselmt = document.getElementById("template").cloneNode(true);
				rsselmt.setAttribute("id", nb);
				
				// Prendre le contenu
				var text = item['textContent'];
				var titre = text.split('\n')[1];
				var descr = text.split("\n")[5].split("<img")[0].split("<video")[0];
						
				// et l'écrire
				rsselmt["children"]['0'].textContent = titre;
				var tbody = rsselmt["children"]['1'];
				tbody["children"]['0'].innerHTML = descr;
	
				var parent_img = tbody["children"]['1']["children"]['0'];
				var img = document.createElement("img");
	
				// Puis extraire chaque image
				var tab = text.split('<img src="');
				if (tab.length > 1) {
					img.src = tab[1].split('"')[0];
					img.height = "200"; // width = auto
					parent_img.appendChild(img)
					for (i = 2; i < tab.length; i++) {
						var link = tab[i].split('"')[0];
						img_i = img.cloneNode(true);
						img_i.src = link;
						parent_img.appendChild(img_i);
					}
				}
	
				rss.appendChild(rsselmt);
				nb++;
				// Au bout de 5 posts, se stopper
				if (nb >= 5){
					rss_end = true;
					return;
				}
			}
		}
	});
}

/************************************************************************/
/************************************************************************/
/************************************************************************/

var rss_end = false;
// Flux RSS des post instagram 
if(mw.config.get('wgPageName') === "Wiki_Radiant" || mw.config.get('wgPageName') === "Modèle:RéseauxSociaux"){
	for(var i=0; i<urls.length; i++){
		setPostInsta(urls[i]);
		if(rss_end)
			break;
	}
}