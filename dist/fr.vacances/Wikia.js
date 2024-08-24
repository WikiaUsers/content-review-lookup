/* Auteur : Louky
 * 
 * [[MediaWiki:Wikia.js]] est un d�riv� de [[MediaWiki:Common.js]]. Il fait tourner le wiki avec des codes JavaScript.
 * 
 * Il sera utilis� prochainement.
 */
/*
 * Onglet Info
 *
 * Permet d'aller sur la page d'information de la page visit�.
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