/*
 * Warframe Wiki community notice
 *
 * Displays a neutral notice informing visitors that the community
 * has discussed the future of this wiki.
 *
 * This script does not redirect users, promote another wiki,
 * modify wiki content, collect data, or alter Fandom functionality.
 */

(function () {
    'use strict';

    /*
     * Ne rien faire si MediaWiki n'est pas disponible.
     */
    if (typeof mw === 'undefined') {
        return;
    }

    /*
     * Ne montrer le bandeau que sur la page principale.
     *
     * La Forking Policy autorise la référence à une discussion
     * concernant un éventuel fork depuis la page principale,
     * sous réserve d'utiliser le mécanisme prévu par Fandom.
     *
     * 0 = espace de noms principal.
     */
    if (mw.config.get('wgNamespaceNumber') !== 0) {
        return;
    }

    /*
     * Évite les doublons.
     */
    if (document.querySelector('.migration-banner')) {
        return;
    }

    /*
     * Conteneur principal de l'article.
     */
    var content = document.querySelector('#mw-content-text');

    if (!content) {
        return;
    }

    /*
     * URL de la discussion communautaire sur Fandom.
     *
     * IMPORTANT :
     * Cette URL doit pointer vers la discussion Fandom concernant
     * l'avenir du wiki, et non vers le wiki externe.
     */
    var DISCUSSION_URL = 'https://warframe.fandom.com/fr/wiki/Blog_utilisateur:Yazuh/Migration_vers_Weird_Gloop';

    /*
     * Création du bandeau.
     *
     * Aucun HTML externe n'est injecté.
     */
    var banner = document.createElement('div');

    banner.className = 'migration-banner';

    /*
     * Titre.
     */
    var title = document.createElement('div');

    title.className = 'migration-banner__title';
    title.textContent = 'ℹ️ Information concernant le wiki';

    /*
     * Texte.
     */
    var text = document.createElement('div');

    text.className = 'migration-banner__text';
    text.textContent =
        "L'équipe du wiki FR WARFRAME a discuté de l'avenir de ce wiki FANDOM et de son évolution. Pour un compte rendu complet sur ces changements, consultez le post notifiant des détails.";

    /*
     * Lien vers la discussion Fandom.
     *
     * Aucun lien vers un wiki externe n'est fourni.
     */
    var link = document.createElement('a');

    link.className = 'migration-banner__link';
    link.href = DISCUSSION_URL;
    link.textContent = 'Consulter le compte-rendu';

    /*
     * Construction du bandeau.
     */
    banner.appendChild(title);
    banner.appendChild(text);
    banner.appendChild(link);

    /*
     * Insérer le bandeau au début du contenu.
     */
    content.insertBefore(banner, content.firstChild);

})();