// Ceci est la page de test pour le JavaScript
/**
 * @author Ninofr
 * @description Ce code JavaScript permet de supprimer toutes les informations sur les tomes dans les titres du sommaire
 * @example
Scolarité
	Niveau Deux[GDCP2]
// Donnera
Scolarité
	Niveau Deux
 */
var LISTE = document.getElementById('toc');
var content = String(LISTE.innerHTML);
content = content
    .replace(
      /(?:<sup>)?\[(?:(?:GDCP\d)|(?:GDCP8\.5)|(?:RDK)|(?:UCD)|(?:IDF)|(?:TPI))[^\]]*\]?(?:<\/sup>)?/g,
      ''
    )
    .replace(
      /\[(?:(?:GDCP\d)|(?:GDCP8.5)|(?:RDK)|(?:UCD)|(?:IDF)|(?:TPI))\]/g,
      ''
    );
document.getElementById('toc').innerHTML = content;