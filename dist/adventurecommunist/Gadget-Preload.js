/** <nowiki>
 * Replaces FANDOM's template preloads with a customisable dropdown list.
 * Appends dropdown list to Monobook's edit summary area.
 * Also adds an input for a custom template preload.
 *
 * @author Sikon  (Wookieepedia)
 * @author Grunny (Wookieepedia)
 * @author Cqm (rswiki)
 *
 * @todo Add different pages for different namespaces, such as file, template, etc.
 */

( function ( $, mw ) {

    'use strict';

    var conf = mw.config.get( [
            'skin',
            'wgAction',
        ] ),

        self = {

        /**
         * Generic load function
         */
        init: function () {

            var check;

            if ( $ ( '#temp-preload' ).length ) {
                return;
            }


            if ( ['edit', 'submit'].indexOf( conf.wgAction ) > -1 ) {

                // RTE needs to load before it can be interacted with
                // Originally this listened for events when the editor was ready
                // but it didn't work properly, so we're using the poor man's method
                // for checking rte has loaded
                if ( conf.skin === 'oasis' && $( 'body.rte' ).length ) {
                    check = window.setInterval( function () {
                        if ( $( '.cke_toolbar_templates' ).length ) {
                            window.clearInterval( check );
                            self.loadPreloads();
                        }
                    }, 100 );
                    

                } else {
                    self.loadPreloads();
                }

            }

        },

        /**
         * Gets list of preload templates from Template:Stdpreloads
         */
        loadPreloads: function () {

            $.get( mw.util.wikiScript(), { title: 'Template:Stdpreloads', action: 'raw', ctype: 'text/plain' }, function ( data ) {

                var templates = data.split( '\n' ),
                    i,
                    value,
                    options = '<option value="(browse)">(Browse template preloads)</option>';

                for ( i = 1; i < templates.length; i += 1 ) {

                    switch ( 0 ) {
                    case templates[i].indexOf( '--' ):
                        value = templates[i].substring( 2 )
                                            .trim();
                        options += mw.html.element('option', { value: 'Template:' + value.replace( / /g, '_' ) + '/preload' }, '  ' + value);
                        break;
                    // ignore lines starting with // so we can use comments
                    case templates[i].indexOf( '//' ):
                    // ignore empty lines
                    case templates[i].length:
                        break;
                    default:
                        value = templates[i].trim();
                        options += mw.html.element('option', { value: '', disabled: true }, value);
                        break;
                    }

                }

                self.insertModule( options );

            });

        },

        /**
         * Inserts the template module
         *
         * @param list - html string of option tags to be appended to dropdown
         */
        insertModule: function ( list ) {

            var br = function () {
                    switch ( conf.skin ) {
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
                        'Standard preloads:',
                        br(),
                        $( '<select>' )
                        .attr( {
                            id: 'std-preload-list'
                        } )
                       .html( list )
                       .change( function () {
                            var page = $( this ).val();

                            if ( page === '(browse)' ) {
                                return;
                            }

                            self.insertPreload( page );
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

                            self.insertPreload( input );

                        } )
                    )
                );

            if ( conf.skin === 'oasis' ) {
                $( '.cke_toolbar_templates' ).prepend( module );
            } else if ( conf.skin === 'monobook' ) {
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
            $.get( mw.util.wikiScript(), { title: page, action: 'raw', ctype: 'text/plain' }, function ( data ) {

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

    $( self.init );

}( jQuery, mediaWiki ) );