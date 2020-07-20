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
    browser:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
    immed:true, indent:4, jquery:true, latedef:true, newcap:true,
    noarg:true, noempty:true, nonew:true, onevar:true, plusplus:true,
    quotmark:single, strict:true, trailing:true, undef:true, unused:true
*/

/*global mediaWiki:true */

;( function ( window, document, $, mw ) {

    'use strict';

    var preloads = {

        /**
         * Generic load function
         */
        init: function () {

            var check;

            if ( $ ( '#temp-preload' ).length ) {
                return;
            }


            if ( mw.config.get( 'wgAction' ) === 'edit' || mw.config.get( 'wgAction' ) === 'submit' ) {

                // RTE needs to load before it can be interacted with
                // Originally this listened for events when the editor was ready
                // but it didn't work properly !00#5 of the time, so we're using
                // the poor man's method for checking the templates module has loaded
                if ( mw.config.get( 'skin' ) === 'oasis' && $( 'body.rte' ).length ) {
                    check = window.setInterval( function () {
                        if ( $( '.cke_toolbar_templates' ).length ) {
                            window.clearInterval( check );
                            preloads.loadPreloads();
                        }
                    }, 100 );
                    

                } else {
                    preloads.loadPreloads();
                }

            }

        },

        /**
         * Gets list of preload templates from Template:Stdpreloads
         */
        loadPreloads: function () {

            $.get( mw.config.get( 'wgScript' ), { title: 'Template:Stdpreloads', action: 'raw', ctype: 'text/plain' }, function ( data ) {

                var templates = data.split( '\n' ),
                    i,
                    value,
                    options = '<option>(Browse template preloads)</option>';

                for ( i = 1; i < templates.length; i += 1 ) {

                    switch ( 0 ) {
                    case templates[i].indexOf( '--' ):
                        value = templates[i].substring( 2 )
                                            .trim();
                        options += '<option value="Template:' + value.replace( / /g, '_' ) + '/preload">&nbsp;&nbsp;' + value + '</option>';
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

                preloads.insertModule( options );

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
                        break;
                    case 'monobook':
                        return '';
                        break;
                    }
                },
                module = $( '<div>' )
                .attr( {
                    'id': 'temp-preload'
                } )
                .append(
                    $( '<div>' )
                    .attr( {
                        id: 'std-preload'
                    } )
                    .append(
                        'Standard preloads:',
                        br(),
                        $( '<select>' )
                        .attr( {
                            id: 'std-preload-list'
                        } )
                       .html( list )
                       .change( function () {
                            var page = $( this ).val();

                            if ( page === '(Browse template preloads)' ) {
                                return;
                            }

                            preloads.insertPreload( page );
                        } )
                    ),
                    $( '<div>' )
                    .attr( {
                        id: 'cust-preload'
                    } )
                    .append(
                        'Custom preload pagename:',
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
                            value: 'Insert'
                        } )
                        .click( function () {

                            var input = $( '#cust-preload-input' )
                            .val()
                            .trim()
                            .replace( / /g, '_' );

                            preloads.insertPreload( input );

                        } )
                    )
                );

            if ( mw.config.get( 'skin' ) === 'oasis' ) {
                $( '.module_templates > .module_content > .cke_toolbar_templates' ).prepend( module );
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

    $( preloads.init );

}( this, document, jQuery, mediaWiki ) );

// </nowiki>