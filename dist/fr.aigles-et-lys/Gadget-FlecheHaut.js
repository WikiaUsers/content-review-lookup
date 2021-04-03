/* {{:Projet:JavaScript/Script|FlecheHaut}} */
 
/*
 * Ajoute à chaque titre de section un lien de retour en haut de page
 * Auteur : Marc Mongenet
 * Mise à jour mediawiki 1.19 : Lgd
 * Dernière révision : 6 mars 2012
 */

var topLink = function ($) {
  $('#content h2, #content h3, #content h4, #content h5, #content h6').append('<a class="noprint" href="#" title="Haut de page"> ↑</a>');
}
$(document).ready(topLink);