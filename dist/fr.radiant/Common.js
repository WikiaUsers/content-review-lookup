/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

// Fonction permettant de récupérer les posts et de les écrires
function setPostInsta(url){
	// recup le flux. Utilisation de feedrapp pour contourner le "NetworkError"
	fetch("http://www.feedrapp.info?callback=?&q="+url)
	.then(function(response) {
		return response.text();
	})
	.then(function(str) {
			return new window.DOMParser().parseFromString(str, "text/html");
	})
	.then(function(data) {
		//console.log(data);
		var items = data.children[0].children[1].children;
		var rss = document.getElementById("RSSinsta");
		var nb = 0;
		
		// Pour chaque items
		for (var idx in items) {
			var post = items[idx];
			console.log(post);
			
			// Vérifie s'il est un post
			// Ou s'il existe déjà, ne rien faire (dans le cas d'un F5)
			if (post.tagName != "LI" || document.getElementById(nb))
				continue;
			
			var rsselmt = document.getElementById("template").cloneNode(true);
			rsselmt.setAttribute("id", nb);
			
			// Prendre le contenu
			//	  Nettoie les chaines de caractères 
			var textPost = post.textContent.replace(/^(\\n\s*)+/, "").replace(/(\\n *)+/g, "<br/>").replace(/[0-9]+k.*ago/g, "");
			
			var titre   = textPost.split("<br/>")[0];
			var descr   = textPost.replace(titre, "").replace(/^<br\/>/, "");
			var img_src = post.outerHTML.split('<img src="')[1].split('" alt="')[0].replaceAll("\\&quot;",'"');
			console.log(titre + "\n--\n" + descr + "\n--\n" + img_src);
			
			// et l'écrire
			rsselmt["children"]['0'].textContent = titre;
			var tbody = rsselmt["children"]['1'];
			tbody["children"]['0'].innerHTML = descr;
			
			// Et inserer l'image
			var parent_img = tbody["children"]['1']["children"]['0'];
			var img = document.createElement("img");
			img.src = "https://politepol.com/bindlr/s/cdn1" + img_src.split('://cdn1')[1];
			img.height = "200"; // width = auto
			parent_img.appendChild(img);

			//console.log(rsselmt);
			rss.appendChild(rsselmt);
			nb++;
			// Au bout de 5 posts, se stopper
			if (nb >= 5)
				break;
		}
	})
	.catch(function(error) {
		console.log(error.message);
	});
}

/************************************************************************/
/************************************************************************/
/************************************************************************/

// Flux RSS des post instagram 
if(mw.config.get('wgPageName') === "Wiki_Radiant" || mw.config.get('wgPageName') === "Modèle:RéseauxSociaux"){
	setPostInsta("https://feedfry.com/rss/11ed4b9b314017748566b34b9cc01499");
}