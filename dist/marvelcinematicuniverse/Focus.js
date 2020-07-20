/*
 
Based on v2 - by Luqgreg
 
Changes by CzechOut and MarkvA 
at the behest of TVM Vertical heads.
 
Those changes are fairly minor, yet specific enough to this wiki
that it probably makes sense to fork away from the true v2 on
Dev Wiki, given time constraints inherent in launch of Jessica Jones S3.
 
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
 
    var api;
 
    function communityPageModule( id, options ) {
        return new $.Deferred( function( deferred ) {
            require( [
                'communitypage.templates.mustache'
            ], function ( templates ) {
                deferred.resolve( $( mustache.render( templates.cardModule, options ) ).attr( 'id', id.replace( /\W+/g, '_' ) ) );
            } );
        } );
    }
 
    function FocusCategory( data ) {
        this.title = data[0];
        this.cardTitle = data[1];
        this.focusArticle = data[2] || null;
        this.modal = null;
    }
 
    FocusCategory.prototype.getMembers = function( cmcontinue ) {
        var self = this;
        return new $.Deferred( function( deferred ) {
            api.get( {
                action: 'query',
                list: 'categorymembers',
                cmtitle: 'Category:' + self.title,
                cmtype: 'page',
                cmlimit: 'max',
                cmcontinue: cmcontinue
            } ).done( function ( r, s ) {
                if ( s !== 'success' || !r.query ) {
                    deferred.resolve( [] );
                    return;
                }
 
                var out = [];
 
                r.query.categorymembers.forEach( function( e ) {
                    out.push( {
                        link: {
                            editlink: mw.util.getUrl( e.title ),
                            text: e.title
                        }
                    } );
                } );
 
                if ( r['query-continue'] ) {
                    self.getMembers( r['query-continue'].categorymembers.cmcontinue ).done( function( out2 ) {
                        deferred.resolve( out.concat( out2 ) );
                    } );
                } else {
                    deferred.resolve( out );
                }
            } );
        } );
    };
 
    // TODO: If all articles are retreived here, store date and use it in getMembers()
    FocusCategory.prototype.getFeaturedMembers = function() {
        var self = this;
        return new $.Deferred( function( deferred ) {
            api.get( {
                action: 'query',
                format: 'json',
                prop: 'revisions',
                generator: 'categorymembers',
                rvprop: 'timestamp',
                gcmtitle: 'Category:' + self.title,
                gcmtype: 'page',
                gcmlimit: 'max'
            } ).done( function ( r, s ) {
                var out = [];
 
                if ( s === 'success' && r.query ) {
                    Object.values( r.query.pages ).sort( function( a, b ) {
                        return new Date( a.revisions[0].timestamp ) - new Date( b.revisions[0].timestamp );
                    } ).slice( 0, 3 ).forEach( function( e ) {
                        out.push( {
                            link: {
                                editlink: mw.util.getUrl( e.title ),
                                text: e.title
                            }
                        } );
                    } );
                }
 
                deferred.resolve( out );
            } );
        } );
    };
 
    FocusCategory.prototype.createCommunityPageCard = function() {
        var self = this;
        self.getFeaturedMembers().done( function ( fmembers ) {
            communityPageModule( 'focus-' + self.title, {
                title: self.cardTitle,
                icon: 'other',
                pages: fmembers,
                fulllistlink: mw.util.getUrl( 'Category:' + self.title ),
                cardModules: {
                    messages: {
                        fulllist: mw.message( 'communitypage-full-list' ).plain()
                    }
                }
            } ).done( function( $module ) {
                $module.appendTo( '.community-page-cards-module-block' ).find( 'a.community-page-card-module-full-list-link' ).on( 'click', function( e ) {
                    e.preventDefault();
                    if ( !self.modal ) {
                        self.createFocusModal();
                    } else {
                        self.showFocusModal();
                    }
                } );
            } );
        } );
    };
 
    FocusCategory.prototype.createRailModule = function() {
        var self = this;
		
        var track = Wikia.Tracker.buildTrackingFunction( {
            category: 'focus-module',
            action: Wikia.Tracker.ACTIONS.CLICK,
            trackingMethod: 'analytics'
        } );
		
        $( '.community-page-rail-module' ).append(
            $( '<div>', {
                class: 'content',
                id: 'focus-widget-' + self.title.replace( /\W+/g, '_')
            } ).append(
                $( '<div>', {
                    class:'icon'
                } ),
                $( '<div>', {
                    class: 'description',
                    html: 'Want to earn a super cool Jessica Jones badge? Just make your first edit on a <a href="' + mw.util.getUrl( 'Category:' + self.title ) + '">' + self.cardTitle + '</a> page!' // TODO: i18n
                } ),
                $( '<a>', {
                    class: 'wds-button wds-is-secondary',
                    href: mw.util.getUrl( 'Special:Community' ) + '#focus-' + self.title.replace( /\W+/g, '_' ),
                    text: 'Earn the Badge'
                } ).on( 'click', function( e ) {
                    e.preventDefault();
					
                    track( {
                        browserEvent: e,
                        label: 'focus-module-cta'
                    } );
					
                    if ( !self.modal ) {
                        self.createFocusModal();
                    } else {
                        self.showFocusModal();
                    }
                } )
            )
        );
    };
 
    FocusCategory.prototype.getFocusArticleData = function() {
        var self = this;
        return new $.Deferred( function( deferred ) {
            var out = {
                subtitle: '',
                sections: []
            };
            if ( !self.focusArticle ) {
                deferred.resolve( out );
                return;
            }
 
            api.get( {
                action: 'parse',
                page: self.focusArticle,
                props: [ 'sections', 'text' ]
            } ).done( function( r, s ) {
                if ( s !== 'success' || !r.parse ) {
                    deferred.resolve( out );
                    return;
                }
 
                var subtitle = r.parse.text['*'].match( /<p [^>]*id="focus-modal-subtitle"[^>]*>(.*?)<\/p>/ );
                if ( subtitle && subtitle[1] ) {
                    out.subtitle = subtitle[1];
                }
 
                var deferreds = [];
                r.parse.sections.forEach( function( e ) {
                    deferreds.push(
                        api.get( {
                            action: 'parse',
                            page: self.focusArticle,
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
    };
 
    // TODO: throbber
    FocusCategory.prototype.createFocusModal = function() {
        var self = this;
        $.when(
            self.getMembers(),
            self.getFocusArticleData(),
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
 
            self.modal = new window.dev.modal.Modal( {
                id: 'focus-modal-' + self.title.replace( /\W+/g, '_' ),
                classes: 'CommunityPageModalDialog',
                title: mustache.render(
                    '<h3>{{title}}</h3>{{{subtitle}}}' +
                    '<ul class="reset modal-nav">' +
                    '{{#tabs}}' +
                        '<li>' +
                            '<a class="modal-tab-link{{#active}} active{{/active}}" data-tabtoggle="{{id}}" href="#">{{title}} {{#count}}<span id="allCount">({{count}})</span>{{/count}}</a>' +
                        '</li>' +
                    '{{/tabs}}' +
                    '</ul>',
                    {
                        title: self.cardTitle,
                        subtitle: data.subtitle,
                        tabs: data.sections
                    }
                ),
                isHTML: true,
                content: mustache.render(
                    '{{#tabs}}' +
                        '<div class="contributors-module contributors-module-modal" data-tabid="{{id}}"{{^active}} style="display:none"{{/active}}>' +
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
 
            self.modal.create().done( $.proxy( self.showFocusModal, self ) );
        } );
    };
 
    FocusCategory.prototype.showFocusModal = function() {
        var self = this;
        self.modal._modal.$content.addClass( 'contributors-module contributors-module-modal' );
        self.modal._modal.$element.find( '.modal-tab-link' ).on( 'click', function() {
            var $this = $( this );
            if ( $this.hasClass( 'active' ) ) {
                return;
            }
 
            var tab = self.modal._modal.$element.find( '.modal-tab-link.active' ).removeClass( 'active' ).data( 'tabtoggle' );
            self.modal._modal.$content.find( '.contributors-module[data-tabid="' + tab + '"]' ).css( 'display', 'none' );
 
            $this.addClass( 'active' );
            self.modal._modal.$content.find( '.contributors-module[data-tabid="' + $this.data( 'tabtoggle' ) + '"]' ).css( 'display', '' );
        } );
        self.modal.show();
    };
 
    function focusModules() {
        api = new mw.Api();
        api.get( {
            action: 'query',
            meta: 'allmessages',
            ammessages: 'Custom-Focus|communitypage-full-list'
        } ).done( function ( r, s ) {
            if ( s !== 'success' || !r.query || !r.query.allmessages[0]['*'] ) {
                return;
            }
 
            mw.messages.set( 'communitypage-full-list', r.query.allmessages[1]['*'] );
 
            var categories = {};
            r.query.allmessages[0]['*'].split( '\n' ).forEach( function( e ) {
                var category = e.split( '|' );
                if ( category.length !== 2 && category.length !== 3 ) {
                    return;
                }
 
                categories['Category:' + category[0]] = new FocusCategory( category );
            } );
 
            api.get( {
                action: 'query',
                prop: 'categoryinfo',
                titles: Object.keys( categories ).join( '|' )
            } ).done( function( r, s ) {
                if ( s !== 'success' || !r.query ) {
                    return;
                }
 
                Object.values( r.query.pages ).forEach( function( e ) {
                    if ( !e.hasOwnProperty( 'missing' ) ) {
                        var category = categories[e.title];
                        if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Community' ) {
                            category.createCommunityPageCard();
                        } else {
                            var $wikiaRail = $( '#WikiaRail' );
                            if ( $wikiaRail.length ) {
                                if ( $wikiaRail.hasClass( 'loaded' ) ) {
                                    category.createRailModule();
                                } else {
                                    $wikiaRail.on( 'afterLoad.rail', $.proxy( category.createRailModule, category ) );
                                }
                            }
                        }
                    }
                } );
            } )
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