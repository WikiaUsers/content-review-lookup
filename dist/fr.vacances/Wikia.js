/* Auteur : Louky
 * 
 * [[MediaWiki:Wikia.js]] est un dérivé de [[MediaWiki:Common.js]]. Il fait tourner le wiki avec des codes JavaScript.
 * 
 * Il sera utilisé prochainement.
 */
/*
 * Onglet Info
 *
 * Permet d'aller sur la page d'information de la page visité.
 *
 */

$('.page-header__contribution-buttons .wds-list').append(
    $('<li/>').append(
        $('<a/>', {
            'href': PRA.wg.wgScriptPath + '/fr/wiki/' + encodeURIComponent(mw.config.get('wgPageName').replace(/ /g, "_")) + '?action=info',
            'title': 'Informations sur la page',
            'html': 'Informations sur la page'
        })
    )
);