/* Any JavaScript here will be loaded for all users on every page load. */

/* Trascription intégrale du wiki http://runescape.wikia.com/wiki/RuneScape_Wiki  * Adapté pour la version française.
 */


/**
 * Switch Infobox -- Allows multiple infoboxes to be seamlessly switched.
 * Required template: http://runescape.wikia.com/wiki/Template:Switch_infobox
 * Required stylesheet: http://runescape.wikia.com/wiki/User:Matthew2602/SwitchInfobox.css
 * 
 * Original: http://runescape.wikia.com/wiki/User:-Matt/SwitchInfobox.js
 */
 
// Fixes a weird bug with the MW parser that adds lots of empty parapgraphs
$( '.switch-infobox > p, .switch-infobox-triggers > p' ).each( function() {
    if ( $( this ).children( 'br' ).length ) {
        $( this ).remove();
    } else {
        $( this ).replaceWith( this.innerHTML );
    }
} );
 
// Appends the switch triggers to every item
$( '.switch-infobox' ).each( function() {
        // The switch triggers
        var triggers = $( this ).children( '.switch-infobox-triggers' );
 
        $( this ).children( '.item' ).find( 'caption' ).append( triggers );
} );
 
// Does the actual switching
$( '.switch-infobox' ).find( '.switch-infobox-triggers' ).children( '.trigger' ).click( function() {
    // The parent .switch-infobox of the clicked trigger
    var parentSwitchInfobox = $( this ).parents( '.switch-infobox' );
    // Hides items showing
    parentSwitchInfobox.children( '.item.showing' ).removeClass( 'showing' );
    // Show the relevant item
    parentSwitchInfobox.children( '.item[data-id="' + this.getAttribute( 'data-id' ) + '"]' ).addClass( 'showing' );
} );
 
// Finishes loading and makes switch infoboxes functional
$( '.switch-infobox.loading' ).removeClass( 'loading' );
 
//Debug
console.log('Initialised switch infoboxes', $( '.switch-infobox' ).length);