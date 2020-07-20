/** <nowiki>
 * Replaces Wikia's template preloads with a customisable dropdown list.
 * Appends dropdown list to Monobook's edit summary area.
 * Also adds an input for a custom template preload.
 *
 * @author Sikon  <http://starwars.wikia.com/wiki/User:Sikon>
 * @author Grunny <http://starwars.wikia.com/wiki/User:Grunny>
 * @author Cqm    <http://runescape.wikia.com/wiki/User:Cqm>
 */

/*jshint
    camelcase:true, curly:true, eqeqeq:true, forin:true, immed:true,
    indent:4, latedef:true, newcap:true, noarg:true, noempty:true,
    nonew:true, onevar:true, plusplus:true, quotmark:single, strict:true,
    trailing:true, undef:true, unused:true
*/
 
/*global document:true, jQuery:true, mediaWiki:true, rswiki:true */

// define global objects if not already existing
( this.rswiki = this.rswiki || {} ).gadgets = this.rswiki.gadgets || {};

// used to track what scripts are loading and where
this.rswiki.scripts = this.rswiki.scripts || [];

( function ( window, document, $, mw, rswiki ) {

    'use strict';

    rswiki.gadgets.preloads = {

        /**
         * Generic load function
         */
        init: function () {

            var check;

            if ( $ ( '#temp-preload' ).length ) {
                return;
            }


            if ( mw.config.get( 'wgAction' ) === 'edit' || mw.config.get( 'wgAction' ) === 'submit' ) {

                // for checking what scripts are loaded
                rswiki.scripts.push( 'rswiki.gadgets.preloads' );

                // RTE needs to load before it can be interacted with
                // Originally this listened for events when the editor was ready
                // but it didn't work properly, so we're using the poor man's method
                // for checking rte has loaded
                if ( mw.config.get( 'skin' ) === 'oasis' && $( 'body.rte' ).length ) {
                    check = window.setInterval( function () {
                        if ( $( '.cke_toolbar_templates' ).length ) {
                            window.clearInterval( check );
                            rswiki.gadgets.preloads.loadPreloads();
                        }
                    }, 100 );
                    

                } else {
                    rswiki.gadgets.preloads.loadPreloads();
                }

            }

        },

        /**
         * Gets list of preload templates from Plantilla:Stdpreloads
         */
        loadPreloads: function () {

            $.get( mw.config.get( 'wgScript' ), { title: 'Plantilla:Stdpreloads', action: 'raw', ctype: 'text/plain' }, function ( data ) {

                var templates = data.split( '\n' ),
                    i,
                    value,
                    options = '<option value="(seleccionar)">(Selecciona una plantilla precargable)</option>';

                for ( i = 1; i < templates.length; i += 1 ) {

                    switch ( 0 ) {
                    case templates[i].indexOf( '--' ):
                        value = templates[i].substring( 2 )
                                            .trim();
                        options += '<option value="Plantilla:' + value.replace( / /g, '_' ) + '/precarga">&nbsp;&nbsp;' + value + '</option>';
                        break;
                    // ignore lines starting with // so we can use comments
                    case templates[i].indexOf( '//' ):
                    // ignore empty lines
                    case templates[i].length:
                        break;
                    default:
                        value = templates[i].trim();
                        options += '<option value="" disabled="disabled">' + value + '</option>';
                        break;
                    }

                }

                rswiki.gadgets.preloads.insertModule( options );

            });

        },

        /**
         * Inserts the template module
         *
         * @param list - html string of option tags to be appended to dropdown
         */
        insertModule: function ( list ) {

            var br = function () {
                    switch ( mw.config.get( 'skin' ) ) {
                    case 'oasis':
                        return $( '<br>' );
                    case 'monobook':
                        return '';
                    }
                },
                module = $( '<div>' )
                .attr( {
                    id: 'temp-preload'
                } )
                .append(
                    $( '<div>' )
                    .attr( {
                        id: 'std-preload'
                    } )
                    .append(
                        'Plantillas precargables:',
                        br(),
                        $( '<select>' )
                        .attr( {
                            id: 'std-preload-list'
                        } )
                       .html( list )
                       .change( function () {
                            var page = $( this ).val();

                            if ( page === '(seleccionar)' ) {
                                return;
                            }

                            rswiki.gadgets.preloads.insertPreload( page );
                        } )
                    ),
                    $( '<div>' )
                    .attr( {
                        id: 'cust-preload'
                    } )
                    .append(
                        'Precargar página personalizada:',
                        br(),
                        $( '<input>' )
                        .attr( {
                            id: 'cust-preload-input',
                            type: 'text'
                        } ),
                        $( '<input>' )
                        .attr( {
                            type: 'button',
                            id: 'cust-preload-button',
                            value: 'Insertar'
                        } )
                        .click( function () {

                            var input = $( '#cust-preload-input' )
                            .val()
                            .trim()
                            .replace( / /g, '_' );

                            rswiki.gadgets.preloads.insertPreload( input );

                        } )
                    )
                );

            if ( mw.config.get( 'skin' ) === 'oasis' ) {
                $( '.cke_toolbar_templates' ).prepend( module );
            }

            if ( mw.config.get( 'skin' ) === 'monobook' ) {
                $( '.mw-editTools' ).prepend( module );
            }

        },

        /**
         * Loads page and inserts the preload into the edit area
         *
         * @param page - page to be loaded
         * @todo  check this works in ie10
         */
        insertPreload: function ( page ) {
            $.get( mw.config.get( 'wgScript' ), { title: page, action: 'raw', ctype: 'text/plain' }, function ( data ) {

                /**
                 * Insert at cursor position modified from
                 * <http://stackoverflow.com/a/11077016/1942596>
                 */
                var textarea = $( 'body.rte' ).length ?
                    // visual editor
                    document.getElementsByClassName( 'cke_source' )[0] :
                        // source editor & monobook
                        document.getElementById( 'wpTextbox1' ),
                    sel,
                    startPos,
                    endPos;

                // IE support
                if ( document.selection ) {
                    textarea.focus();
                    sel = document.selection.createRange();
                    sel.text = data;

                // MOZILLA/NETSCAPE support
                } else if ( textarea.selectionStart || textarea.selectionStart === '0' ) {
                    startPos = textarea.selectionStart;
                    endPos = textarea.selectionEnd;
                    textarea.value = textarea.value.substring( 0, startPos ) +
                                     data +
                                     textarea.value.substring( endPos, textarea.value.length );

                // default to appending to textarea
                } else {
                    textarea.value += data;
                }

            });

        }

    };

    $( rswiki.gadgets.preloads.init );

}( this, document, jQuery, mediaWiki, rswiki ) );

/* </nowiki> */