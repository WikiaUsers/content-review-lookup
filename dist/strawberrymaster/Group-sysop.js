/** <nowiki>
 * Any JavaScript here will be loaded for sysops only
 */

/*global importArticles:true */
 
/*jshint bitwise:true, browser:true, camelcase:true, curly:true, devel:false,
         eqeqeq:true, es3:false, forin:true, immed:true, jquery:true,
         latedef:true, newcap:true, noarg:true, noempty:true, nonew:true,
         onevar:true, plusplus:true, quotmark:single, undef:true, unused:true,
         strict:true, trailing:true
*/

;( function ( $, mw, sm ) {

    'use strict';

        /**
         * Cache mw.config variables
         */
    var conf = mw.config.get( [
            'wgCanonicalSpecialPageName',
            'wgPageName',
            'wgTitle'
        ] ),

        /**
         * Pages to load Update CSS button on
         * for Less script
         */
        lessPages = [
            'MediaWiki:Custom-Common.less',
            'MediaWiki:Common.css',
            'MediaWiki:Custom-Wikia.less',
            'MediaWiki:Wikia.css',
        ],

        includes = {
        /**
         * LESS support
         */
        less: {
            conditional: ( lessPages.indexOf( conf.wgPageName ) > -1 ),
            scripts: 'u:dev:Less/code.2.js',
            exec: function () {
                // for config docs see <http://dev.wikia.com/wiki/Less>
                window.lessOpts = window.lessOpts || [];

                window.lessOpts.push( {
                    target: 'MediaWiki:Common.css',
                    source: 'MediaWiki:Custom-Common.less',
                    load: [
                        'MediaWiki:Common.css',
                        'MediaWiki:Custom-Common.less'
                    ],
                    header: 'MediaWiki:Custom-Css-header/common'
                } );

                window.lessOpts.push( {
                    target: 'MediaWiki:Wikia.css/test.css',
                    source: 'MediaWiki:Custom-Wikia.less',
                    load: [
                        'MediaWiki:Wikia.css',
                        'MediaWiki:Custom-Wikia.less'
                    ],
                    header: 'MediaWiki:Custom-Css-header/wikia'
                } );
            }
        },

        /**
         * Unhecks redirects when moving files
         */
        uncheckFileRedirects: {
            conditional: (
                mw.util.getParamValue( 'wpLeaveRedirect' ) === null &&
                conf.wgCanonicalSpecialPageName === 'Movepage' &&
                ( /File/ ).test( conf.wgTitle )
            ),
            exec: function () {
                $( '#wpLeaveRedirect' ).removeAttr( 'checked' );
            }
        },
    };

    var scripts = [],
        loaded = [];

    function init() {
        $.each( includes, function ( k, v ) {
            var check = $.isFunction( v.conditional ) ? v.conditional() : v.conditional;

            if ( check ) {
                // used for tracking which includes are loading
                loaded.push( 'sysop.' + k );

                if ( v.scripts ) {
                    scripts = scripts.concat( v.scripts );
                }

                if ( v.exec ) {
                    v.exec();
                }
            }
        } );

        sm.loaded = ( sm.loaded || [] ).concat( loaded );

        importArticles( {
            type: 'script',
            articles: scripts
        } );
    }

    $( init );


}( this.jQuery, this.mediaWiki, this.smwiki = this.smswiki || {} ) );