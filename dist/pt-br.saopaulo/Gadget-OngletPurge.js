/*
 * OngletPurge
 *
 * Onglet permettant de r�aliser une purge du cache
 *
 * Auteur : ??
 * Derni�re r�vision : 7 juin 2007
 * [[Cat�gorie:MediaWiki:Fonction Monobook en JavaScript]]
 */

function OngletPurge() {
        if (wgNamespaceNumber >= 0 && !document.getElementById('toolbar')) {
                addPortletLink('p-cactions', wgScriptPath + '/index.php?title=' + wgPageName + '&action=purge', 'purgar', 'ca-purge', 'purgar a p�gina', 'p');
 }
}

addOnloadHook(OngletPurge);