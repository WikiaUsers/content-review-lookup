/**
 * AddEditSection0
 *
 * Permet d'éditer la première section d'une page (en-tête)
 *
 * Auteur : ??
 * Contributeurs : Pabix, Zelda, IAlex
 * Dernière révision : 6 mars 2012
 * {{:Projet:JavaScript/Script|EditZeroth}}
 */

$( document ).ready( function() {
    if ( mw.config.get( 'wgNamespaceNumber' ) >= 0 ) {
        var $editPortlet = $( '#ca-edit' );
        if ( $editPortlet.length == 0 ) {
            // Pas d'onglet pour modifier la page
            return;
        }

        var encodedPageName = encodeURIComponent( mw.config.get( 'wgPageName' ) ).replace(/%20/g, '_').replace(/%3A/g, ':').replace(/%2F/g, '/');
        var portletLink = mw.util.addPortletLink(
            'p-cactions',
            mw.config.get( 'wgScript' ) + '?title=' + encodedPageName + '&action=edit&section=0',
            'En-tête',
            'ca-edit-0',
            "Modifier l'en-tête de la page",
            '',
            '#ca-history'
        );
        var $editZeroPortlet = $( portletLink );

        if ( $editPortlet.hasClass( 'istalk' ) ) {
            $editZeroPortlet.addClass( 'istalk' );
        } else {
            $editPortlet.addClass( 'istalk' );
        }

        if ( $editPortlet.hasClass( 'selected' ) ) {
            if ( mw.util.getParamValue( 'section' ) == '0' ) {
                $editPortlet.removeClass( 'selected' );
                $editZeroPortlet.addClass( 'selected' );
            }
        }
    }
});