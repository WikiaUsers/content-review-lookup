/* Portable Infobox subtheme overrides by Kopcap94
 * Permet de mettre des sous-themes pour l'infobox Livre
 * Origine : https://elderscrolls.fandom.com
 */
(function( $ ) {
    "use strict";
    var title_text;
    $( '.pi-theme-book .pi-header' ).each( function() {    
        title_text = $( this ).text();
        switch( title_text ) {
            case 'Online':
                $( this ).addClass( 'online' );
                break;
            case 'Skyrim':
                $( this ).addClass( 'skyrim' );
                break;
            case 'Dragonborn':
                $( this ).addClass( 'dragonborn' );
                break;
            case 'Dawnguard':
                $( this ).addClass( 'dawnguard' );
                break;
            case 'Oblivion':
                $( this ).addClass( 'oblivion' );
                break;
            case 'Shivering Isles':
                $( this ).addClass( 'shiveringIsles' );
                break;
            case 'Morrowind': 
                $( this ).addClass( 'morrowind' );
                break;
            case 'Daggerfall':
                $( this ).addClass( 'daggerfall' );
                break;
            case 'Bloodmoon':
                $( this ).addClass( 'bloodmoon' );
                break;
            case 'Tribunal':
                $( this ).addClass( 'tribunal' );
                break;
            default:
                return;
        }
    });
})( this.jQuery );