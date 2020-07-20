/*
v2.4 - by Luqgreg
<nowiki>
*/

require( [
    'wikia.window',
    'jquery',
    'mw',
    'wikia.loader',
    'wikia.mustache',
    'wikia.throbber',
    'wikia.ui.factory'
], function ( window, $, mw, loader, mustache, throbber, uiFactory ) {
    if ( window.CommunityFocusModulesLoaded ) {
        return;
    }
    window.CommunityFocusModulesLoaded = true;

    var api,
        config = mw.config.get( [
            'wgCanonicalSpecialPageName',
            'wgFormattedNamespaces',
            'wgNamespaceIds'
        ] ),
        nsCategoryPrefix = config.wgFormattedNamespaces[config.wgNamespaceIds.category] + ':',
        nsSpecialPrefix = config.wgFormattedNamespaces[config.wgNamespaceIds.special] + ':';

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
        this.title = data.title;
        this.cardTitle = data.cardTitle || data.title;
        this.cardDescription = data.cardDescription;
        this.focusArticle = data.focusArticle;
        this.railDescription = data.railDescription || 'We need more $1 info!';
        this.railButton = data.railButton || 'Help add it';

        this.modal = null;
        this.members = null;
    }

    FocusCategory.prototype.getUrl = function() {
        return mw.util.getUrl( this.title );
    };

    FocusCategory.prototype.getMembers = function( gcmcontinue ) {
        var self = this;
        function internalGetMembers( deferred ) {
            if ( self.members && !gcmcontinue ) {
                deferred.resolve( self.members );
            }

            api.get( {
                action: 'query',
                prop: 'revisions',
                generator: 'categorymembers',
                rvprop: 'timestamp',
                gcmtitle: nsCategoryPrefix + self.title,
                gcmtype: 'page',
                gcmlimit: 'max',
                gcmcontinue: gcmcontinue,
                list: 'categorymembers',
                cmtitle: nsCategoryPrefix + self.title,
                cmtype: 'subcat',
                cmprop: 'title',
                cmlimit: 'max'
            } ).done( function ( r, s ) {
                if ( s !== 'success' || !r.query ) {
                    deferred.resolve( [] );
                    return;
                }

                var out = [];

                if ( r.query.pages ) {
                    Object.values( r.query.pages ).forEach( function( e ) {
                        var date = new Date( e.revisions[0].timestamp );
                        out.push( {
                            id: e.pageid,
                            link: {
                                editlink: mw.util.getUrl( e.title ),
                                text: e.title
                            },
                            timestamp: date.getTime(),
                            timeAgo: $.timeago( date ),
                            exists: true
                        } );
                    } );
                }

                $.when(
                    new $.Deferred( function( deferred ) {
                        if ( r['query-continue'] ) {
                            self.getMembers( r['query-continue'].categorymembers.gcmcontinue ).done( function( members ) {
                                out = out.concat( members );
                                deferred.resolve();
                            } );
                        } else {
                            deferred.resolve();
                        }
                    } ),
                    new $.Deferred( function( deferred ) {
                        subdeferreds = [];
                        r.query.categorymembers.forEach( function( e ) {
                            subdeferreds.push(
                                new FocusCategory( { title: e.title.replace( nsCategoryPrefix, '' ) } ).getMembers().done( function( members ) {
                                    out = out.concat( members );
                                } )
                            );
                        } );

                        $.when.apply( undefined, subdeferreds ).done( deferred.resolve );
                    } )
                ).done( function() {
                    self.members = out.sort( function( a, b ) {
                        return a.timestamp - b.timestamp;
                    } ).filter( function( e, i, a ) {
                        return i+1 == a.length || e.id !== a[i+1].id;
                    } );
                    deferred.resolve( self.members );
                } );
            } );
        }

        if ( gcmcontinue ) {
            return new $.Deferred( internalGetMembers );
        }

        if ( !self.__getMembersDeferred ) {
            self.__getMembersDeferred = new $.Deferred( internalGetMembers ).done( function() {
                self.__getMembersDeferred = undefined;
            } );
        }

        return self.__getMembersDeferred;
    };

    FocusCategory.prototype.getFeaturedMembers = function() {
        var self = this;
        return new $.Deferred( function( deferred ) {
            self.getMembers().done( function ( members ) {
                deferred.resolve( members.slice( 0, 3 ) );
            } );
        } );
    };

    FocusCategory.prototype.createCommunityPageCard = function( modal ) {
        var self = this;

        function internalCreateCommunityPageCard( fmembers ) {
            if ( ( !fmembers || !fmembers.length ) && !self.cardDescription ) {
                return;
            }

            communityPageModule( 'focus-' + self.title, {
                title: self.cardTitle,
                icon: 'other',
                pages: fmembers,
                description: self.cardDescription,
                fulllistlink: self.getUrl(),
                cardModules: {
                    messages: {
                        fulllist: mw.message( 'communitypage-full-list' ).plain()
                    }
                }
            } ).done( function( $module ) {
                $module.appendTo( '.community-page-cards-module-block' );
                var $fulllist = $module.find( 'a.community-page-card-module-full-list-link' );

                if ( modal ) {
                    $fulllist.on( 'click', $.proxy( self.triggerFocusModal, self, 'modal-from-card' ) );
                } else {
                    $fulllist.on( 'click', function( e ) {
                        ga( 'send', 'event', {
                            eventCategory: 'focus-module',
                            eventAction: 'from-maintenance-card',
                            eventLabel: e.target.href,
                            transport: 'beacon'
                        } );
                    } );
                }

                $module.find( '.community-page-card-module-article-data > a' ).on( 'click', function( e ) {
                    ga( 'send', 'event', {
                        eventCategory: 'focus-module',
                        eventAction: 'article-link-from-card',
                        eventLabel: e.target.href,
                        transport: 'beacon'
                    } );
                } );
            } );
        }

        if ( self.cardDescription ) {
            internalCreateCommunityPageCard();
        } else {
            self.getFeaturedMembers().done( internalCreateCommunityPageCard );
        }
    };

    FocusCategory.prototype.createRailModule = function() {
        var self = this, fakemsg = new mw.Map();
        fakemsg.set( 'd', self.railDescription );

        $( '.community-page-rail-module' ).append(
            $( '<div>', {
                class: 'content',
                id: 'focus-widget-' + self.title.replace( /\W+/g, '_')
            } ).append(
                $( '<div>', {
                    class: 'description',
                    html: new mw.Message( fakemsg, 'd', [ '<a href="' + self.getUrl() + '">' + self.cardTitle + '</a>' ] ).parse()
                } ),
                $( '<a>', {
                    class: 'wds-button wds-is-secondary',
                    href: mw.util.getUrl( 'Special:Community' ) + '#focus-' + self.title.replace( /\W+/g, '_' ),
                    text: self.railButton
                } ).on( 'click', $.proxy( self.triggerFocusModal, self, 'rail-module-cta-button' ) )
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

                var subdeferreds = [];
                r.parse.sections.forEach( function( e ) {
                    subdeferreds.push(
                        new $.Deferred( function( subdeferred ) {
                            $.when(
                                api.get( {
                                    action: 'parse',
                                    page: self.focusArticle,
                                    props: 'links',
                                    section: e.number
                                } ),
                                self.getMembers()
                            ).done( function( r2, members ) {
                                if ( r2[1] !== 'success' || !r2[0].parse ) {
                                    subdeferred.resolve();
                                    return;
                                }

                                var pages = [],
                                    missingdates = {},
                                    lastedited = false;

                                r2[0].parse.links.forEach( function( e ) {
                                    if ( e.hasOwnProperty( 'exists' ) ) {
                                        var m = members.find( function( e2 ) {
                                            return e['*'] === e2.link.text;
                                        } );

                                        lastedited = true;
                                        if ( m ) {
                                            pages.push( m );
                                            return;
                                        } else {
                                            missingdates[e['*']] = pages.length;
                                        }
                                    }

                                    pages.push( {
                                        link: {
                                            editlink: mw.util.getUrl( e['*'] ),
                                            text: e['*']
                                        },
                                        exists: e.hasOwnProperty( 'exists' ),
                                        timestamp: undefined,
                                        timeAgo: undefined,
                                    } );
                                } );

                                new $.Deferred( function( subsubdeferred ) {
                                    var missingdatesKeys = Object.keys( missingdates );
                                    if ( !missingdatesKeys.length ) {
                                        subsubdeferred.resolve();
                                        return;
                                    }

                                    api.get( {
                                        action: 'query',
                                        prop: 'revisions',
                                        rvprop: 'timestamp',
                                        titles: missingdatesKeys.join( '|' )
                                    } ).done( function( r3, s3 ) {
                                        if ( s3 === 'success' && r3.query ) {
                                            Object.values( r3.query.pages ).forEach( function( e ) {
                                                var date = new Date( e.revisions[0].timestamp ),
                                                    entry = pages[missingdates[e.title]];

                                                entry.timestamp = date.getTime();
                                                entry.timeAgo = $.timeago( date );
                                            } );
                                        }

                                        subsubdeferred.resolve();
                                    } );
                                } ).done( function() {
                                    if ( pages.length ) {
                                        pages.sort( function( a, b ) {
                                            if ( a.exists && !b.exists ) { return 1; }
                                            if ( !a.exists && b.exists ) { return -1; }
                                            return a.timestamp - b.timestamp;
                                        } );
                                        out.sections[e.number] = {
                                            id: e.anchor,
                                            title: e.line,
                                            count: pages.length,
                                            items: pages,
                                            lastedited: lastedited
                                        };
                                    }

                                    subdeferred.resolve();
                                } );
                            } )
                        } )
                    );
                } );
                $.when.apply( undefined, subdeferreds ).then( function() {
                    deferred.resolve( out );
                } );
            } );
        } );
    };

    FocusCategory.prototype.triggerFocusModal = function( a, e ) {
        e.preventDefault();

        ga( 'send', 'event', {
            eventCategory: 'focus-module',
            eventAction: a,
            eventLabel: nsCategoryPrefix + this.title
        } );

        if ( !this.modal ) {
            this.createFocusModal();
        } else {
            $( document.body ).append( this.modal.$blackout );
            this.showFocusModal();
        }
    }

    FocusCategory.prototype.createFocusModal = function() {
        var self = this;

        $.when(
            new $.Deferred( function( deferred ) {
                uiFactory.init( 'modal' ).done( function( uiModal ) {
                    uiModal.createComponent( { vars: {
                        id: 'focus-modal-' + self.title.replace( /\W+/g, '_' ),
                        classes: [ 'CommunityPageModalDialog' ],
                        content: '<div class="throbber-placeholder"></div>',
                        title: self.cardTitle,
                        size: 'medium'
                    } }, function( modal ) {
                        throbber.show( $( '.throbber-placeholder' ) );
                        modal.show();
                        deferred.resolve( modal );
                    } );
                } )
            } ),
            self.getMembers(),
            self.getFocusArticleData(),
            loader( {
                type: loader.SCSS,
                resources: [
                    '/extensions/wikia/CommunityPage/styles/components/_contributors-module.scss',
                    '/extensions/wikia/CommunityPage/styles/components/_modal.scss'
                ]
            } )
        ).done( function( modal, pages, data ) {
            self.modal = modal;
            data.sections.unshift( {
                id: 'all',
                title: 'All',
                count: pages.length,
                items: pages,
                active: true,
                lastedited: true
            } );

            var $header = self.modal.$element.children( 'header' );

            $header.html(
                mustache.render(
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
                ), true
            ).prepend( self.modal.$close );

            self.modal.$content.html(
                mustache.render(
                    '{{#tabs}}' +
                        '<div class="contributors-module contributors-module-modal" data-tabid="{{id}}"{{^active}} style="display:none"{{/active}}>' +
                            '{{#lastedited}}<div class="community-page-all-contributors-legend">' + mw.message( 'listusers-edited' ).escaped() + '</div>{{/lastedited}}' +
                            '<ul class="reset top-contributors">' +
                            '{{#items}}' +
                                '<li class="community-page-contributors-list-item">' +
                                    '<a class="community-page-contributor-details{{^exists}} new{{/exists}}" href="{{link.editlink}}">{{link.text}}</a>' +
                                    '{{#timeAgo}}<div class="community-page-details">{{timeAgo}}</div>{{/timeAgo}}' +
                                '</li>' +
                            '{{/items}}' +
                            '</ul>' +
                        '</div>' +
                    '{{/tabs}}',
                    {
                        tabs: data.sections
                    }
                )
            );

            self.showFocusModal();
        } );
    };

    FocusCategory.prototype.showFocusModal = function() {
        var self = this;

        self.modal.$content.addClass( 'contributors-module contributors-module-modal' );
        self.modal.$element.find( '.modal-tab-link' ).on( 'click', function() {
            var $this = $( this );
            if ( $this.hasClass( 'active' ) ) {
                return;
            }

            var tab = self.modal.$element.find( '.modal-tab-link.active' ).removeClass( 'active' ).data( 'tabtoggle' );
            self.modal.$content.find( '.contributors-module[data-tabid="' + tab + '"]' ).css( 'display', 'none' );

            $this.addClass( 'active' );
            self.modal.$content.find( '.contributors-module[data-tabid="' + $this.data( 'tabtoggle' ) + '"]' ).css( 'display', '' );
        } );
        self.modal.$content.find( '.community-page-contributor-details' ).on( 'click', function( e ) {
            ga( 'send', 'event', {
                eventCategory: 'focus-module',
                eventAction: 'article-link-from-modal',
                eventLabel: e.target.href,
                transport: 'beacon'
            } );
        } );
        self.modal.show();
    };

    function FocusQuerypage( data ) {
        FocusCategory.call( this, data );
    }

    FocusQuerypage.prototype = Object.create( FocusCategory.prototype );

    FocusQuerypage.prototype.getUrl = function() {
        return mw.util.getUrl( nsSpecialPrefix + this.title );
    }

    FocusQuerypage.prototype.getMembers = function() {
        var self = this;
        return new $.Deferred( function( deferred ) {
            if ( self.members ) {
                deferred.resolve( self.members );
            }

            api.get( {
                action: 'query',
                list: 'querypage',
                qppage: self.title,
                qplimit: 3
            } ).done( function ( r, s ) {
                if ( s !== 'success' || !r.query || !r.query.querypage ) {
                    deferred.resolve( [] );
                    return;
                }

                self.members = [];

                r.query.querypage.results.forEach( function( e ) {
                    self.members.push( {
                        link: {
                            editlink: mw.util.getUrl( e.title ),
                            text: e.title
                        },
                        exists: true
                    } );
                } );

                deferred.resolve( self.members );
            } );
        } );
    }

    function focusModules() {
        api = new mw.Api();

        api.get( {
            action: 'query',
            meta: 'allmessages',
            ammessages: 'Custom-Focus|Custom-Maintenance|communitypage-full-list|listusers-edited'
        } ).done( function ( r, s ) {
            if ( s !== 'success' || !r.query ) {
                return;
            }

            mw.messages.set( {
                'communitypage-full-list': r.query.allmessages[2]['*'],
                'listusers-edited': r.query.allmessages[3]['*']
            } );

            // Custom-Focus
            if ( r.query.allmessages[0]['*'] ) {
                var categories = {},
                    lines = r.query.allmessages[0]['*'].split( '\n' );

                for ( var i = 0; i < lines.length; ++i ) {
                    var e = lines[i];

                    if ( e.startsWith( '*' ) ) {
                        var category = {
                            title: e.replace( /^\*\s*/, '' )
                        };
                        for ( ++i; i < lines.length && lines[i].startsWith( '**' ); ++i ) {
                            var line = lines[i].replace( /^\*\*\s*/, '' ).split( '|' );
                            if ( line.length >= 2 ) {
                                category[line.shift().trim()] = line.join( '|' ).trim();
                            }
                        }

                        if ( i < lines.length - 1 ) {
                            --i;
                        }

                        categories[nsCategoryPrefix + category.title] = new FocusCategory( category );
                    } else {
                        // old config format
                        var line = e.split( '|' );
                        if ( line.length !== 2 && line.length !== 3 ) {
                            continue;
                        }

                        line[0] = line[0].trim();

                        categories[nsCategoryPrefix + line[0]] = new FocusCategory( {
                            title: line[0],
                            cardTitle: line[1] ? line[1].trim() : undefined,
                            focusArticle: line[2] ? line[2].trim() : undefined
                        } );
                    }
                }

                var $wikiaRail = $( '#WikiaRail' );
                api.get( {
                    action: 'query',
                    prop: 'categoryinfo',
                    titles: Object.keys( categories ).join( '|' )
                } ).done( function( r, s ) {
                    if ( s !== 'success' || !r.query ) {
                        return;
                    }

                    Object.values( r.query.pages ).forEach( function( e ) {
                        if ( e.hasOwnProperty( 'categoryinfo' ) ) {
                            var categoryTitle = e.title;
                            if ( r.query.normalized ) {
                                var normalized = r.query.normalized.find( function( e2 ) {
                                    return e2.to === e.title;
                                } );
                                if ( normalized ) {
                                    categoryTitle = normalized.from;
                                }
                            }
                            var category = categories[categoryTitle];

                            if ( config.wgCanonicalSpecialPageName === 'Community' ) {
                                category.createCommunityPageCard( true );
                            } else {
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
                } );
            }

            // Custom-Maintenance
            if ( r.query.allmessages[1]['*'] && config.wgCanonicalSpecialPageName === 'Community' ) {
                var categories2 = {},
                    querypages = [],
                    lines = r.query.allmessages[1]['*'].split( '\n' ),
                    categoryRegExp = new RegExp( '^(?:' + nsCategoryPrefix + '|Category):' ),
                    querypageRegExp = new RegExp( '^(?:' + nsSpecialPrefix + '|Special):' );

                for ( var i = 0; i < lines.length; ++i ) {
                    var e = lines[i];

                    var line = e.split( '|' );
                    if ( line.length !== 2 && line.length !== 3 ) {
                        continue;
                    }

                    line[0] = line[0].trim();

                    if ( categoryRegExp.test( line[0] ) ) {
                        categories2[line[0]] = new FocusCategory( {
                            title: line[0].replace( categoryRegExp, '' ),
                            cardTitle: line[1] ? line[1].trim() : undefined,
                            cardDescription: line[2] ? line[2].trim() : undefined
                        } );
                    } else if ( querypageRegExp.test( line[0] ) ) {
                        querypages.push(
                            new FocusQuerypage( {
                                title: line[0].replace( querypageRegExp, '' ),
                                cardTitle: line[1] ? line[1].trim() : undefined,
                                cardDescription: line[2] ? line[2].trim() : undefined
                            } )
                        );
                    }
                }

                categories2Keys = Object.keys( categories2 );
                if ( categories2Keys.length ) {
                    api.get( {
                        action: 'query',
                        prop: 'categoryinfo',
                        titles: categories2Keys.join( '|' )
                    } ).done( function( r, s ) {
                        if ( s !== 'success' || !r.query ) {
                            return;
                        }

                        Object.values( r.query.pages ).forEach( function( e ) {
                            if ( e.hasOwnProperty( 'categoryinfo' ) ) {
                                var categoryTitle = e.title;
                                if ( r.query.normalized ) {
                                    var normalized = r.query.normalized.find( function( e2 ) {
                                        return e2.to === e.title;
                                    } );
                                    if ( normalized ) {
                                        categoryTitle = normalized.from;
                                    }
                                }

                                categories2[categoryTitle].createCommunityPageCard();
                            }
                        } );
                    } );
                }

                querypages.forEach( function( e ) {
                    e.createCommunityPageCard();
                } );
            }
        } );
    }

    mw.loader.using( [ 'mediawiki.api', 'mediawiki.util' ] ).done( focusModules );
} );