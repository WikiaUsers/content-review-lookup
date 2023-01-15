/*
v2 (awaiting cleanup) - by Luqgreg
*/
 
require( [
    'wikia.window',
    'jquery',
    'mw',
    'wikia.loader',
    'wikia.mustache'
], function ( window, $, mw, loader, mustache ) {
    if ( window.CommunityFocusModulesLoaded ) {
        return;
    }
    window.CommunityFocusModulesLoaded = true;
 
    var modals = {};
 
    function communityPageModule( id, options ) {
        var deferred = $.Deferred( function( deferred ) {
            require( [
                'communitypage.templates.mustache'
            ], function ( templates ) {
                deferred.resolve( $( mustache.render( templates.cardModule, options ) ).attr( 'id', id ) );
            } );
        } );
 
        return deferred;
    }
 
    function getCategoryMembers( category, cmcontinue ) {
        var deferred = $.Deferred( function( deferred ) {
            new mw.Api().get( {
                action: 'query',
                list: 'categorymembers',
                cmtitle: 'Category:' + category,
                cmtype: 'page',
                cmlimit: 500,
                cmcontinue: cmcontinue
            } ).done( function ( r, s ) {
                if ( s !== 'success' || !r.query ) {
                    return [];
                }
 
                var pages = [];
 
                r.query.categorymembers.forEach( function( e ) {
                    pages.push( {
                        link: {
                            editlink: mw.util.getUrl( e.title ),
                            text: e.title
                        }
                    } );
                } );
 
                if ( r['query-continue'] ) {
                    getCategoryMembers( category, r['query-continue'].categorymembers.cmcontinue ).done( function( pages2 ) {
                        deferred.resolve( pages.concat( pages2 ) );
                    } )
                } else {
                    deferred.resolve( pages );
                }
            } );
        } );
 
        return deferred;
    }
 
    function getFocusArticleData( article ) {
        return new $.Deferred( function( deferred ) {
            var api = new mw.Api();
            var out = {
                subtitle: '',
                sections: []
            }
 
            api.get( {
                action: 'parse',
                page: article,
                props: [ 'sections', 'text' ]
            } ).done( function( r, s ) {
                var subtitle = r.parse.text['*'].match( /<p [^>]*id="focus-modal-subtitle"[^>]*>(.*?)<\/p>/ );
                if ( subtitle && subtitle[1] ) {
                    out.subtitle = subtitle[1];
                }
 
                var deferreds = [];
                r.parse.sections.forEach( function( e ) {
                    deferreds.push(
                        api.get( {
                            action: 'parse',
                            page: article,
                            props: 'links',
                            section: e.number
                        } ).done( function( r2, s2 ) {
                            var pages = [];
 
                            r2.parse.links.forEach( function( e ) {
                                pages.push( {
                                    link: {
                                        editlink: mw.util.getUrl( e['*'] ),
                                        text: e['*']
                                    }
                                } );
                            } );
 
                            out.sections[e.number] = {
                                id: e.anchor,
                                title: e.line,
                                count: pages.length,
                                items: pages
                            };
                        } )
                    );
                } );
                $.when.apply( undefined, deferreds ).done( function() {
                    deferred.resolve( out );
                } );
            } );
        } );
    }
 
    function focusRailModule( e ) {
        $( '.community-page-rail-module' ).append(
            $( '<div>', { class: 'content' } ).append(
                $( '<div>', {
                    class: 'description',
                    html: 'We need more <a href="' + mw.util.getUrl( 'Category:' + e.data[0] ) + '">' + e.data[1] + '</a> info!' // TODO: i18n
                } ),
                $( '<a>', {
                    class: 'wds-button wds-is-secondary',
                    href: mw.util.getUrl( 'Special:Community' ) + '#focus-' + encodeURIComponent( e.data[0] ),
                    text: 'Help add it'
                } ).on( 'click', function( e2 ) {
                    e2.preventDefault();
                    if ( !modals[e.data[0]] ) {
                        createFocusModal( e.data );
                    } else {
                        showFocusModal( modals[e.data[0]] );
                    }
                } )
            )
        );
    }
 
    // TODO: throbber
    function createFocusModal( category ) {
        $.when(
            getCategoryMembers( category[0] ),
            getFocusArticleData( category[2] ),
            loader( {
                type: loader.SCSS,
                resources: [
                    '/extensions/wikia/CommunityPage/styles/components/_contributors-module.scss',
                    '/extensions/wikia/CommunityPage/styles/components/_modal.scss'
                ]
            } )
        ).done( function( pages, data ) {
            data.sections.unshift( {
                id: 'all',
                title: 'All',
                count: pages.length,
                items: pages,
                active: true
            } );
 
            modals[category[0]] = new window.dev.modal.Modal( {
                id: 'focus-modal-' + category[0],
                classes: 'CommunityPageModalDialog',
                title: mustache.render(
                    '<h3>{{title}}</h3>{{subtitle}}' +
                    '<ul class="reset modal-nav">' +
                    '{{#tabs}}' +
                        '<li>' +
                            '<a class="modal-tab-link{{#active}} active{{/active}}" data-tabtoggle="{{id}}" href="#">{{title}} {{#count}}<span id="allCount">({{count}})</span>{{/count}}</a>' +
                        '</li>' +
                    '{{/tabs}}' +
                    '</ul>',
                    {
                        title: category[1],
                        subtitle: data.subtitle,
                        tabs: data.sections
                    }
                ),
                isHTML: true,
                content: mustache.render(
                    '{{#tabs}}' +
                        '<div class="contributors-module contributors-module-modal" data-tabid="{{id}}"{{^active}} style="display:none"{{/active}}>' +
                            '<!--div class="community-page-all-contributors-legend">Last edited</div-->' +
                            '<ul class="reset top-contributors">' +
                            '{{#items}}' +
                                '<li class="community-page-contributors-list-item">' +
                                    '<a class="community-page-contributor-details" href="{{link.editlink}}">{{link.text}}</a>' +
                                '</li>' +
                            '{{/items}}' +
                            '</ul>' +
                        '</div>' +
                    '{{/tabs}}',
                    {
                        tabs: data.sections
                    }
                )
            } );
 
            modals[category[0]].create().done( showFocusModal );
        } );
    }
 
    function showFocusModal( modal ) {
        modal._modal.$content.addClass( 'contributors-module contributors-module-modal' );
        modal._modal.$element.find( '.modal-tab-link' ).on( 'click', function() {
            var $this = $( this );
            if ( $this.hasClass( 'active' ) ) {
                return;
            }
 
            var tab = modal._modal.$element.find( '.modal-tab-link.active' ).removeClass( 'active' ).data( 'tabtoggle' )
            modal._modal.$content.find( '.contributors-module[data-tabid="' + tab + '"]' ).css( 'display', 'none' );
 
            $this.addClass( 'active' )
            modal._modal.$content.find( '.contributors-module[data-tabid="' + $this.data( 'tabtoggle' ) + '"]' ).css( 'display', '' );
        } );
        modal.show();
    }
 
    function focusModules() {
        var api = new mw.Api();
        api.get( {
            action: 'query',
            meta: 'allmessages',
            ammessages: 'Custom-Focus|communitypage-full-list'
        } ).done( function ( r, s ) {
            if ( s !== 'success' || !r.query || !r.query.allmessages[0]['*'] ) {
                return;
            }
 
            var categories = r.query.allmessages[0]['*'].split( '\n' );
            var fulllist = r.query.allmessages[1]['*'];
 
            categories.forEach( function( e ) {
                var category = e.split( "|" );
                if ( category.length !== 3 ) {
                    return;
                }
 
                if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Community' ) {
                    api.get( {
                        action: 'query',
                        list: 'categorymembers',
                        cmtitle: 'Category:' + category[0],
                        cmtype: 'page',
                        cmlimit: 3
                    } ).done( function ( r, s ) {
                        if ( s !== 'success' || !r.query ) {
                            return;
                        }
 
                        var cardpages = [];
 
                        r.query.categorymembers.forEach( function( e ) {
                            cardpages.push( {
                                link: {
                                    editlink: mw.util.getUrl( e.title ),
                                    text: e.title
                                }
                            } );
                        } );
 
                        communityPageModule( 'focus-' + category[0], {
                            title: category[1],
                            icon: 'other',
                            pages: cardpages,
                            fulllistlink: mw.util.getUrl( 'Category:' + category[0] ),
                            cardModules: {
                                messages: {
                                    fulllist: fulllist
                                }
                            }
                        } ).done( function( $module ) {
                            $module.appendTo( '.community-page-cards-module-block' ).find( 'a.community-page-card-module-full-list-link' ).on( 'click', function( e ) {
                                e.preventDefault();
                                if ( !modals[category[0]] ) {
                                    createFocusModal( category );
                                } else {
                                    showFocusModal( modals[category[0]] );
                                }
                            } );
                        } );
                    } );
                } else {
                    var $wikiaRail = $( '#WikiaRail' );
                    if ( $wikiaRail.length ) {
                        if ( $wikiaRail.hasClass( 'loaded' ) ) {
                            focusRailModule( { data: category } );
                        } else {
                            $wikiaRail.on( 'afterLoad.rail', focusRailModule, category );
                        }
                    }
                }
            } );
        } );
    }
 
    $.when(
        new $.Deferred( function( deferred ) {
            if ( window.dev && window.dev.modal ) {
                deferred.resolve();
            } else {
                mw.hook( 'dev.modal' ).add( function() {
                    deferred.resolve();
                } );
                importArticle( { type: 'script', article: 'u:dev:MediaWiki:Modal.js' } );
            }
        } ),
        mw.loader.using( [ 'mediawiki.api', 'mediawiki.util' ] )
    ).done( focusModules );
} );