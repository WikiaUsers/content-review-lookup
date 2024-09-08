/*
 * OngletPurge
 *
 * Onglet permettant de réaliser une purge du cache
 *
 * Auteur : ??
 * Dernière révision : 7 juin 2007
 * [[Catégorie:MediaWiki:Fonction Monobook en JavaScript]]
 */

function OngletPurge() {
        if (wgNamespaceNumber >= 0 && !document.getElementById('toolbar')) {
                addPortletLink('p-cactions', wgScriptPath + '/index.php?title=' + wgPageName + '&action=purge', 'purgar', 'ca-purge', 'purgar a página', 'p');
 }
}

addOnloadHook(OngletPurge);