/**
 * Minieditor Autocomplete (MiniComplete)
 *
 * Adds autocomplete to certain form elements.
 * - Special:Upload description
 * - Message Wall comments
 * - Blog comments
 * - Special:Forum posts
 *
 * @author Cqm <cqm.fwd@gmail.com>
 * @version 0.0.5.1
 * @license GPLv3 <http://www.gnu.org/licenses/gpl-3.0.html>
 *
 * Jshint warning messages: <https://github.com/jshint/jshint/blob/master/src/messages.js>
 *
 * For documentation and licensing of jquery.textareahelper
 * see <https://github.com/Codecademy/textarea-helper>
 * 
 * @todo Use Colors library to style options to fit into each wiki
 *       <http://dev.wikia.com/wiki/Colors>
 *       or use wgSassParams when I get time
 */

/*global
    mediaWiki:true
*/

/*jshint
    bitwise:true, camelcase:true, curly:true, eqeqeq:true, es3:false,
    forin:true, immed:true, indent:4, latedef:true, newcap:true,
    noarg:true, noempty:true, nonew:true, plusplus:true, quotmark:single,
    undef:true, unused:true, strict:true, trailing:true,
    
    browser:true, jquery:true,
     
    onevar:true
*/

// disable indent warning
/*jshint -W015 */
;( function ( document, $, mw ) {
/*jshint +W015 */

    'use strict';
    
    // create jquery.textareahelper module
    // @todo move this into function when I'm feeling particularly active
    // non jquery plugin - <http://stackoverflow.com/questions/16212871/get-the-offset-position-of-the-caret-in-a-textarea-in-pixels>
    // (first answer)
    mw.loader.implement( 'jquery.textareahelper', [ 'http://camtest.wikia.com/index.php?title=MediaWiki:TextareaHelper.js&action=raw&ctype=text/javascript' ], {}, {} );

    var miniComplete = {

        /**
         * Loading function
         */
        init: function () {
            
            console.log( 'miniComplete.init loaded');

            var selector = false,
                config = mw.config.get( [
                    'wgCanonicalSpecialPageName',
                    'wgNamespaceNumber'
                ] ),
                css;
                
            if ( $( '#minicomplete-options' ).length ) {
                return;
            }

            // disable !! warnings (convert to boolean)
            // because this is a bit prettier than a staggered if statement
            /*jshint -W018 */
            switch ( true ) {
            // Special:Upload
            case !!( config.wgCanonicalSpecialPageName === 'Upload' ):
                selector = '#wpUploadDescription';
                break;
            // Article and Blog comments
            case !!( $( '#WikiaArticleComments' ).length ):
            // Message wall comments
            case !!( config.wgNamespaceNumber === 1200 ):
            // Special:Forum posts (Thread namespace)
            case !!( config.wgNamespaceNumber === 1201 ):
            // Special:Forum posts (Board namespace)
            case !!( config.wgNamespaceNumber === 2000 ):
                selector = '.wikiaEditor';
                break;
            }
            /*jshint +W018 */

            if ( !selector ) {
                return;
            }

            // add css for options elements
            css = [
                '#minicomplete-options{display:none;position:absolute;}',
                '#minicomplete-list{}',
                '.minicomplete-choose{}'
            ];

            mw.util.addCSS(
                css.join( '' )
            );
            
            // create options container
            $( 'body' ).append(
                $( '<div>' )
                .attr( {
                    id: 'minicomplete-options'
                } ).append(
                    $( '<ul>' )
                    .attr( {
                        id: 'minicomplete-list'
                    } )
                )
            );

            $( selector ).on( 'input', function () {
                // hide minicomplete-options
                miniComplete.findTerm( this );
            } );

        },

        /**
         * Gets caret position for detecting search term and inserting autocomplete term.
         * @source <http://blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/>
         * 
         * @param elem {string} Id of textarea to get caret position of.
         * @return {number} Caret position in string.
         *                  If browser does not support caret position methods
         *                  returns 0 to prevent syntax errors
         */
        getCaretPos: function ( selector ) {

            var elem = document.getElementById( selector ),
                caretPos = 0,
                sel;

            // IE9 support
            // may need to exclude IE10 from this
            // Earlier versions of IE aren't supported so don't worry about them
            if ( document.selection ) {
                elem.focus ();
                sel = document.selection.createRange();
                sel.moveStart( 'character', -elem.value.length );
                caretPos = sel.text.length;

            // Normal browsers
            } else if ( elem.selectionStart || elem.selectionStart === '0' ) {
                caretPos = elem.selectionStart;
            }

            return ( caretPos );

        },

        /**
         * Counts back from caret position looking for unclosed {{ or [[
         *
         * @param elem {jquery object} Element to look for search term within
         */
        findTerm: function ( elem ) {

                // for use in getCaretPos
            var textarea = $( elem ).attr( 'id' ),
                // text to search for
                searchText = $( elem ).val().substring( 0, miniComplete.getCaretPos( textarea ) ),
                // for separating search term
                linkCheck = searchText.lastIndexOf( '[['),
                templateCheck = searchText.lastIndexOf( '{{' ),
                // disallows certain characters in serach terms
                // based on $wgLegalTitleChars <http://www.mediawiki.org/wiki/Manual:$wgLegalTitleChars>
                // and to prevent searches for terms that don't need it
                // such as those with pipes as they signal template params or link display changes
                // or if the user is closing the link/template themselves
                illegalChars = /[\{\}\[\]\|#<>%\+\?\\]/,
                term;

            // searchText will be empty if the browser does not support getCaretPos
            // which will probably cause errors/confusion
            // so stop here if that's the case
            if ( !searchText.length ) {
                return;
            }

            if ( linkCheck > -1 ) {

                if ( linkCheck < searchText.lastIndexOf( ']]' ) ) {
                    return;
                }

                // lastIndexOf measures from just before it starts
                // so add 2 to check the term length
                // to make sure we're just selecting the search term
                if ( ( searchText.length - ( linkCheck + 2 ) ) >= 0 ) {

                    term = searchText.substring( linkCheck + 2 );

                    if ( term.match( illegalChars ) ) {
                        return;
                    }

                    // prevent searches for empty strings
                    if ( !term.length ) {
                        return;
                    }

                    console.log( term );
                    miniComplete.getSuggestions( term, 0 );

                }

            }

            if ( templateCheck > -1 ) {

                if ( templateCheck < searchText.lastIndexOf( '}}' ) ) {
                    return;
                }

                // lastIndexOf measures from just before it starts
                // so add 2 to check the term length
                // to make sure we're just selecting the search term
                if ( ( searchText.length - ( templateCheck + 2 ) ) > 0 ) {

                    term = searchText.substring( templateCheck + 2 );

                    if ( term.match( illegalChars ) ) {
                        return;
                    }

                    // prevent searches for empty strings
                    if ( !term.length ) {
                        return;
                    }

                    console.log( term );
                    miniComplete.getSuggestions( term, 10 );

                }

            }

        },

        /**
         * Queries mw api for possible suggestions
         *
         * @link <https://www.mediawiki.org/wiki/API:Allpages> Allpages API docs
         * @param term {string} Page title to search for
         * @param ns {integer} Namespace to search in
         */
        getSuggestions: function ( term, ns ) {

            var query = {
                    action: 'query',
                    list: 'allpages',
                    aplimit: '5',
                    apfilterredir: 'nonredirects',
                    apnamespace: ns,
                    apprefix: term
                },
                termSplit,
                namespaceId,
                title;

            // fix for when the namespace is preceeded by a :
            // in a template transclusion
            if ( term.indexOf( ':' ) === 0 && ns === 10 ) {
                term = term.substring( 1 );
            }
            
            if ( term.indexOf( ':' ) > -1 ) {

                termSplit = term.split( ':' );
                title = termSplit[1];

                // make sure there's only the namespace and the page title
                if ( termSplit.length > 2 ) {
                    return;
                }

                namespaceId = mw.config.get( 'wgNamespaceIds' )[
                    // wgNamespaceIds uses underscores and lower case
                    termSplit[0].replace( / /g, '_' )
                                .toLowerCase()
                ];

                if ( namespaceId ) {
                    query.apnamespace = namespaceId;
                    query.apprefix = title;
                }

            }

            ( new mw.Api() ).get( query )
                            .done( function ( data ) {

                                // no suggestions
                                if ( !data.query.allpages.length ) {
                                    return;
                                }

                                miniComplete.showSuggestions( data.query.allpages );

                            } )
                            .error( function ( error ) {
                                console.log( 'API error: (', error );
                            } );

        },

        /**
         * Inserts list of options to select from
         * 
         * @param result {array} Result from API
         * @todo Hide options if Esc key is pressed
         * @link <http://jsfiddle.net/5KqmF/112/> Example
         */
        showSuggestions: function ( result ) {

            var i,
                options = [];

            for ( i = 0; i < result.length; i += 1 ) {
                options.push( '<li class="minicomplete-choose">' + result[i].title + '</li>' );
            }

            console.log( result, options );

            // append options to container
            $( '#minicomplete-list' ).html(
                options.join( '' )
            );
            
            // position option list
            
            // check if too close to top/bottom/sides of the screen
            
            // show option list
            $( '#minicomplete-options' ).css( 'display', 'block' );
            
            // add onclick handler for inserting the option
            $( '.minicomplete-choose' ).on( 'click', function () {
                // miniComplete.insertComplete( this );
                console.log( $( this ).text() );
            } );
        
        },

        /**
         * Inserts selected suggestion
         * 
         * @param elem {jquery object}
         */
        insertComplete: function ( elem ) {
            
            var text = $( elem ).text();

            console.log( text );
            
        }

    };

    // lazy load dependencies and run miniComplete.init as a callback
    // @todo remove dependencies to allow loading on .ready()
    mw.loader.using( [ 'mediawiki.api', 'mediawiki.util', 'jquery.textareahelper' ], miniComplete.init );

}( document, jQuery, mediaWiki ) );