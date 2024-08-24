/*
 * Auberge_Inconnu
 * 
 * Ajout de liens dans la barre de navigation vers l'Auberge et l'Inconnu
 * 
 * Auteur : ??
 * Date de dernière révision : 3 novembre 2006
 * {{:Projet:JavaScript/Script|AubergeInconnu}}
 */
// <source lang=javascript>//<pre><nowiki>
function Auberge_Inconnu() {
	var a = document.getElementById("p-navigation");
	if (a) {
		b = a.getElementsByTagName("ul");
		if(b.length > 0) {
			b[0].innerHTML = b[0].innerHTML + '<li><a style="display: inline" id="n-auberge" title="Aigles_et_Lys:L'Auberge" href="'+wgScript+'?title=Aigles_et_Lys:L'Auberge&action=purge">Auberge</a>, <a style="display: inline" id="n-auberge" title="Inconnu" href="'+wgArticlePath.split('$1').join('Aigles_et_Lys:Inconnu') + '">Inconnu</a></li>'
		}
	}
}
addOnloadHook(Auberge_Inconnu);

//</nowiki></pre></source>