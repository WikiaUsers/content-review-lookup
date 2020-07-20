require( [
    'jquery',
    'mw',
    'wikia.window',
    'wikia.tracker'
], function( $, mw, window, tracker ) {
    if ( window.NewsModuleLoaded ) {
        return;
    }
    window.NewsModuleLoaded = true;

    var NewsModule = {
        CACHE_TTL: 3600000, // 1 hour
        NOTIFICATION_TTL: 1209600000, // 14 days
        apiConfig: {
            en: {
                url: 'https://community.fandom.com/',
                blog: 'Category:Staff_blogs'
            },
            de: {
                url: 'https://community.fandom.com/de/',
                blog: 'Category:News',
                tu: 'Category:Technische_Updates'
            },
            pl: {
                url: 'https://spolecznosc.fandom.com/',
                blog: 'Category:Fandom_News'
            }
        },
        config: mw.config.get( [
            'wgContentLangauge',
            'wgServer',
            'wgScriptPath',
            'wgUserGroups',
            'wgUserId',
            'wgUserLanguage'
        ] ),
        loading: 4,
        preload: function() {
            if ( !(--this.loading) ) {
                window.dev.i18n.overrides.NewsModule = {
                    "rail-header": "New on Fandom",
                    "rail-header-blog": "Latest Blog",
                    "rail-header-tu": "Latest Technical Update",
                    "rail-header-cbi": "Community Bullet-In",
                    "settings-title": "Settings",
                    "settings-description": "Notify me about:",
                    "settings-toggle-blog": "Blogs",
                    "settings-toggle-tu": "Techincal Updates",
                    "settings-toggle-cbi": "Community Bullet-Ins",
                    "settings-language": "News language",
                    "settings-ok": "OK",
                    "lang-en": "English (en)",
                    "lang-de": "Deutsch (de)",
                    "lang-pl": "Polski (pl)",
                    "notification-tooltip": "New on Fandom"
                };
                window.dev.i18n.loadMessages( 'NewsModule' ).done( this.init.bind( this ) );
            }
        },
        init: function( i18n ) {
            if ( !window.NewsModuleOverride && !/sysop|bureacrat|helper|staff/.test( this.config.wgUserGroups ) ) {
                return;
            }

            this.api = new mw.Api();
            this.i18n = i18n;
            this.settings = this.getSettings();
            this.sourceURL = this.config.wgServer.replace( /^.+\/\//g, '' ) + this.config.wgScriptPath;

            var self = this;
            $.when(
                this.fetchLatestBlog(),
                this.fetchLatestTU(),
                this.fetchLatestCBI()
            ).done( function( blog, tu, cbi ) {
                if ( !blog.title && !tu.title && !cbi.message ) {
                    return;
                }

                if ( localStorage.getItem( 'NewsModule-railCollapsed' ) ) {
                    self.renderNotificationButton( blog, tu, cbi );
                } else {
                    self.renderRailModule( blog, tu, cbi );
                }
            } );
        },
        track: function( obj ) {
            if ( mw.util.getParamValue( 'debug' ) == 1 ) {
                alert( 'Category: NewsModule\nAction: ' + obj.action + '\nLabel: ' + obj.label );
            }
            this._track( obj );
        },
        _track: tracker.buildTrackingFunction( {
            category: 'NewsModule',
            trackingMethod: 'analytics'
        } ),
        getSettings: function() {
            var out = {
                blog: true,
                tu: true,
                cbi: true,
                lang: this.config.wgUserLanguage
            };

            try {
                Object.assign( out, JSON.parse( localStorage.getItem( 'NewsModule-config' ) || '{}' ) );
            } catch( e ) {
            }

            out.lang = Object.keys( this.apiConfig ).indexOf( out.lang ) !== -1 ? out.lang : 'en';
            out.api = this.apiConfig[out.lang];
            return out;
        },
        fetchLatestBlog: function() {
            var deferred = new $.Deferred();

            var cache = localStorage.getItem( 'NewsModule-cache-blog' );
            if ( cache ) {
                try {
                    cache = JSON.parse( cache );
                    if ( cache.expire > Date.now() && cache.lang == this.settings.lang ) {
                        console.log( 'BLOG FROM CACHE', cache );
                        return deferred.resolve( cache );
                    }
                } catch(e) {}
            }

            var self = this;
            $.ajax( {
                type: 'GET',
                url: this.settings.api.url + 'api.php',
                data: {
                    action: 'query',
                    list: 'categorymembers',
                    cmtitle: this.settings.api.blog,
                    cmprop: 'ids|title|timestamp',
                    cmtype: 'page',
                    cmnamespace: 500,
                    cmsort: 'timestamp',
                    cmdir: 'desc',
                    cmend: new Date( Date.now() - this.NOTIFICATION_TTL ).toISOString(),
                    cmlimit: 1,
                    format: 'json'
                },
                dataType: 'jsonp'
            } ).done( function( r ) {
                var out = !r.error && r.query.categorymembers.length ? r.query.categorymembers[0] : {};
                out.expire = Date.now() + self.CACHE_TTL;
                out.lang = self.settings.lang;
                out.impressions = 0;

                if ( !cache || out.lang !== cache.lang || out.pageid !== cache.pageid ) {
                    if ( self.settings.blog ) {
                        localStorage.removeItem( 'NewsModule-railCollapsed' );
                    } else {
                        localStorage.setItem( 'NewsModule-notificationBlip', true );
                    }
                } else if ( cache && self.settings.lang === cache.lang && out.pageid === cache.pageid ) {
                    out.impressions = cache.impressions;
                }

                deferred.resolve( out );
                localStorage.setItem( 'NewsModule-cache-blog', JSON.stringify( out ) );
            } );

            return deferred;
        },
        fetchLatestTU: function() {
            var deferred = new $.Deferred();

            var cache = localStorage.getItem( 'NewsModule-cache-tu' );
            if ( cache ) {
                try {
                    cache = JSON.parse( cache );
                    if ( cache.expire > Date.now() && cache.lang == this.settings.lang ) {
                        console.log( 'TU FROM CACHE', cache );
                        return deferred.resolve( cache );
                    }
                } catch(e) {}
            }

            var self = this;
            $.ajax( {
                type: 'GET',
                url: this.settings.api.url + 'api.php',
                data: {
                    action: 'query',
                    list: 'categorymembers',
                    cmtitle: this.settings.api.tu,
                    cmprop: 'ids|title|timestamp',
                    cmtype: 'page',
                    cmnamespace: 500,
                    cmsort: 'timestamp',
                    cmdir: 'desc',
                    cmend: new Date( Date.now() - this.NOTIFICATION_TTL ).toISOString(),
                    cmlimit: 1,
                    format: 'json'
                },
                dataType: 'jsonp'
            } ).done( function( r ) {
                var out = !r.error && r.query.categorymembers.length ? r.query.categorymembers[0] : {};
                out.expire = Date.now() + self.CACHE_TTL;
                out.lang = self.settings.lang;
                out.impressions = 0;

                if ( !cache || out.lang !== cache.lang || out.pageid !== cache.pageid ) {
                    if ( self.settings.tu ) {
                        localStorage.removeItem( 'NewsModule-railCollapsed' );
                    } else {
                        localStorage.setItem( 'NewsModule-notificationBlip', true );
                    }
                } else if ( cache && self.settings.lang === cache.lang && out.pageid === cache.pageid ) {
                    out.impressions = cache.impressions;
                }

                deferred.resolve( out );
                localStorage.setItem( 'NewsModule-cache-tu', JSON.stringify( out ) );
            } );

            return deferred;
        },
        fetchLatestCBI: function() {
            var deferred = new $.Deferred();

            var cache = localStorage.getItem( 'NewsModule-cache-cbi' );
            if ( cache ) {
                try {
                    cache = JSON.parse( cache );
                    if ( cache.expire > Date.now() && cache.lang == this.settings.lang ) {
                        console.log( 'CBI FROM CACHE', cache );
                        return deferred.resolve( cache );
                    }
                } catch(e) {}
            }

            var self = this;
            this.api.get( {
                action: 'query',
                meta: 'allmessages',
                ammessages: 'NewsModule-CBI.json',
            } ).done( function( r ) {
                try {
                    if ( r.error || r.query.allmessages[0].hasOwnProperty( 'missing' ) ) {
                        throw new exception();
                    }

                    var cbi = JSON.parse( r.query.allmessages[0]['*'] );

                    if ( cbi.expire && new Date( cbi.expire ).getTime() < Date.now() ) {
                        console.log( 'CBI TOO OLD', new Date( cbi.expire ), cbi );
                        throw new exception();
                    }

                    mw.messages.set( 'NewsModule-CBI', cbi.message );
                    cbi.message = mw.message( 'NewsModule-CBI' ).parse().replace( /'''(.*?)'''/, '<b>$1</b>' ).replace( /''(.*?)''/, '<i>$1</i>' );
                    cbi.expire = Date.now() + self.CACHE_TTL;
                    cbi.lang = self.settings.lang;
                    cbi.impressions = 0;

                    if ( !cache || self.settings.lang !== cache.lang || out.id !== cache.id ) {
                        if ( self.settings.cbi ) {
                            localStorage.removeItem( 'NewsModule-railCollapsed' );
                        } else {
                            localStorage.setItem( 'NewsModule-notificationBlip', true );
                        }
                    } else if ( cache && self.settings.lang === cache.lang && out.id === cache.id ) {
                        cbi.impressions = cache.impressions;
                    }

                    deferred.resolve( cbi );
                    localStorage.setItem( 'NewsModule-cache-cbi', JSON.stringify( cbi ) );
                } catch( e ) {
                    var out = {
                        id: null,
                        message: null,
                        expire: Date.now() + self.CACHE_TTL,
                        lang: self.settings.lang
                    };
                    deferred.resolve( out );
                    localStorage.setItem( 'NewsModule-cache-cbi', JSON.stringify( out ) );
                }
            } );

            return deferred;
        },
        trackImpressions: function( visible, blog, tu, cbi ) {
            var type = visible ? 'module' : 'button';
            var level = visible ? 2 : 1;

            if ( blog.title && blog.impressions < level ) {
                this.track( {
                    action: tracker.ACTIONS.IMPRESSION,
                    label: [ type, 'blog', blog.lang, blog.title.replace( /,/g, '' ), this.sourceURL ].join( '|' )
                } );
                blog.impressions = level;
                localStorage.setItem( 'NewsModule-cache-blog', JSON.stringify( blog ) );
            }
            if ( tu.title && tu.impressions < level ) {
                this.track( {
                    action: tracker.ACTIONS.IMPRESSION,
                    label: [ type, 'tu', tu.lang, tu.title.replace( /,/g, '' ), this.sourceURL ].join( '|' )
                } );
                tu.impressions = level;
                localStorage.setItem( 'NewsModule-cache-tu', JSON.stringify( tu ) );
            }
            if ( cbi.message && cbi.impressions < level ) {
                this.track( {
                    action: tracker.ACTIONS.IMPRESSION,
                    label: [ type, 'cbi', cbi.lang, cbi.id, this.sourceURL ].join( '|' )
                } );
                cbi.impressions = level;
                localStorage.setItem( 'NewsModule-cache-cbi', JSON.stringify( cbi ) );
            }
        },
        trackDismiss: function( markasread, blog, tu, cbi ) {
            var type = markasread ? 'markasread' : 'collapse';
            var level = 3;
            var self = this;

            if ( blog.title && blog.impressions < level ) {
                this.api.get( {
                    action: 'query',
                    list: 'allpages',
                    apprefix: blog.title.replace( /^[^:]+:/, '' ) + '/@comment-' + this.config.wgUserId + '-',
                    apnamespace: 501,
                    aplimit: 1
                } ).done( function( r ) {
                    self.track( {
                        action: tracker.ACTIONS.CLICK,
                        label: [ 'dismiss', type, 'blog', blog.lang, blog.title.replace( /,/g, '' ), self.sourceURL, !r.error && r.query.allpages.length ].join( '|' )
                    } );
                    blog.impressions = level;
                    localStorage.setItem( 'NewsModule-cache-blog', JSON.stringify( blog ) );
                } );
            }
            if ( tu.title && tu.impressions < level ) {
                this.api.get( {
                    action: 'query',
                    list: 'allpages',
                    apprefix: tu.title.replace( /^[^:]+:/, '' ) + '/@comment-' + this.config.wgUserId + '-',
                    apnamespace: 501,
                    aplimit: 1
                } ).done( function( r ) {
                    self.track( {
                        action: tracker.ACTIONS.CLICK,
                        label: [ 'dismiss', type, 'tu', tu.lang, tu.title.replace( /,/g, '' ), self.sourceURL, !r.error && r.query.allpages.length ].join( '|' )
                    } );
                    tu.impressions = level;
                    localStorage.setItem( 'NewsModule-cache-tu', JSON.stringify( tu ) );
                } );
            }
            if ( cbi.message && cbi.impressions < level ) {
                this.track( {
                    action: tracker.ACTIONS.CLICK,
                    label: [ 'dismiss', type, 'cbi', cbi.lang, cbi.id, this.sourceURL ].join( '|' )
                } );
                cbi.impressions = level;
                localStorage.setItem( 'NewsModule-cache-cbi', JSON.stringify( cbi ) );
            }
        },
        launchSettings: function() {
            var self = this;
            function changeLang() {
                var value = document.getElementById( 'newsmodule-lang' );
                value.innerText = self.i18n.msg( 'lang-' + this.dataset.lang ).plain();
                value.dataset.lang = this.dataset.lang;
            }

            var dialog = window.dev.ui( {
                type: 'div',
                attr: {
                    id: 'newsmodule-settings'
                },
                classes: ['wds-dialog__curtain', 'dashboardDialog'],
                children: [{
                    type: 'div',
                    classes: ['wds-dialog__wrapper'],
                    children: [{
                        type: 'div',
                        classes: ['wds-dialog__title'],
                        text: this.i18n.msg( 'settings-title' ).plain()
                    }, {
                        type: 'div',
                        classes: ['wds-dialog__content'],
                        children: [ {
                            type: 'p',
                            text: this.i18n.msg( 'settings-description' ).plain()
                        }, {
                            type: 'div',
                            children: [ 'blog', 'tu', 'cbi' ].map( function( e ) {
                                return {
                                    type: 'div',
                                    children: [ {
                                        type: 'input',
                                        attr: {
                                            id: 'newsmodule-' + e,
                                            type: 'checkbox'
                                        },
                                        classes: [ 'wds-toggle__input' ],
                                        checked: self.settings[e]
                                    }, {
                                        type: 'label',
                                        attr: {
                                            'for': 'newsmodule-' + e
                                        },
                                        classes: [ 'wds-toggle__label' ],
                                        text: self.i18n.msg( 'settings-toggle-' + e ).plain()
                                    } ]
                                }
                            } ),
                        }, {
                            type: 'div',
                            children: [ {
                                type: 'label',
                                text: this.i18n.msg( 'settings-language' ).plain() + ': '
                            }, {
                                type: 'div',
                                classes: [ 'wds-dropdown' ],
                                children: [ {
                                    type: 'div',
                                    classes: [ 'wds-dropdown__toggle' ],
                                    children: [
                                        {
                                            type: 'span',
                                            attr: {
                                                id: 'newsmodule-lang'
                                            },
                                            data: {
                                                lang: this.settings.lang
                                            },
                                            text: this.i18n.msg( 'lang-' + this.settings.lang ).plain()
                                        },
                                        window.dev.wds.icon( 'dropdown-tiny' )
                                    ]
                                }, {
                                    type: 'div',
                                    classes: [ 'wds-dropdown__content' ],
                                    children: [ {
                                        type: 'ul',
                                        classes: [ 'wds-list' ],
                                        children: Object.keys( this.apiConfig ).map( function( e ) {
                                            return {
                                                type: 'li',
                                                data: {
                                                    lang: e
                                                },
                                                text: self.i18n.msg( 'lang-' + e ).plain(),
                                                events: {
                                                    click: changeLang
                                                }
                                            };
                                        } )
                                    } ]
                                } ]
                            } ]
                        } ]
                    }, {
                        type: 'div',
                        classes: ['wds-dialog__actions'],
                        children: [{
                            type: 'a',
                            classes: ['wds-button', 'wds-is-text', 'wds-dialog__actions-button'],
                            text: this.i18n.msg( 'settings-ok' ).plain(),
                            events: {
                                click: function() {
                                    var newSettings = {
                                        blog: document.getElementById( 'newsmodule-blog' ).checked === true,
                                        tu: document.getElementById( 'newsmodule-tu' ).checked === true,
                                        cbi: document.getElementById( 'newsmodule-cbi' ).checked === true,
                                        lang: document.getElementById( 'newsmodule-lang' ).dataset.lang
                                    };

                                    if (
                                        newSettings.blog !== self.settings.blog ||
                                        newSettings.tu !== self.settings.tu ||
                                        newSettings.cbi !== self.settings.cbi ||
                                        newSettings.lang !== self.settings.lang
                                    ) {
                                        self.track( {
                                            action: tracker.ACTIONS.SUBMIT,
                                            label: [
                                                'settings',
                                                self.settings.blog, newSettings.blog,
                                                self.settings.tu, newSettings.tu,
                                                self.settings.cbi, newSettings.cbi,
                                                self.settings.lang, newSettings.lang
                                            ].join( '|' )
                                        } );
                                    }

                                    localStorage.setItem( 'NewsModule-config', JSON.stringify( newSettings ) );
                                    self.settings = self.getSettings();
                                    dialog.remove();
                                    self.track( {
                                        action: tracker.ACTIONS.CLOSE,
                                        label: 'settings'
                                    } )
                                }
                            }
                        } ]
                    } ]
                } ]
            } );

            document.body.appendChild( dialog );

            return dialog;
        },
        renderNotificationButton: function( blog, tu, cbi ) {
            if ( document.getElementById( 'newsmodule-headerbutton' ) ) {
                return;
            }

            if ( localStorage.getItem( 'NewsModule-notificationBlip' ) ) {
                this.trackImpressions( false, blog, tu, cbi );
            }

            var self = this;
            var button = window.dev.ui( {
                type: 'a',
                attr : {
                    id: 'newsmodule-headerbutton',
                    title: this.i18n.msg( 'notification-tooltip' ).plain()
                },
                classes: localStorage.getItem( 'NewsModule-notificationBlip' ) ? [ 'wds-button', 'wds-is-secondary', 'newsmodule-notificationblip' ] : [ 'wds-button', 'wds-is-secondary' ],
                children: [
                    window.dev.wds.icon( 'bell-small' )
                ],
                events: {
                    click: function() {
                        self.track( {
                            action: tracker.ACTIONS.CLICK,
                            label: 'headerbutton',
                            value: localStorage.getItem( 'NewsModule-notificationBlip' ) ? 1 : 0
                        } );

                        self.renderRailModule( blog, tu, cbi );
                        button.classList.remove( 'newsmodule-notificationblip' );
                    }
                }
            } );

            $( '.wds-community-header__wiki-buttons' ).prepend( button );
            this.track( {
                action: tracker.ACTIONS.IMPRESSION,
                label: 'headerbutton',
                value: localStorage.getItem( 'NewsModule-notificationBlip' ) ? 1 : 0
            } );
            return button;
        },
        renderRailModule: function( blog, tu, cbi ) {
            if ( document.getElementById( 'newsmodule' ) ) {
                return;
            }

            localStorage.removeItem( 'NewsModule-notificationBlip' );
            localStorage.removeItem( 'NewsModule-railCollapsed' );

            this.trackImpressions( true, blog, tu, cbi );

            var self = this;
            var module = window.dev.ui( {
                type: 'section',
                attr: {
                    id: 'newsmodule'
                },
                classes: [ 'rail-module' ],
                children: [ {
                    type: 'h2',
                    classes: [ 'has-icon' ],
                    children: [ window.dev.wds.icon( 'bell-small' ), {
                        type: 'span',
                        text: this.i18n.msg( 'rail-header' ).plain()
                    }, {
                        type: 'div',
                        classes: [ 'collapse-toggle' ],
                        children: [ window.dev.wds.icon( 'close-small' ) ],
                        events: {
                            click: function() {
                                self.track( {
                                    action: tracker.ACTIONS.CLICK,
                                    label: 'collapse'
                                } );

                                localStorage.setItem( 'NewsModule-railCollapsed', true );
                                self.trackDismiss( false, blog, tu, cbi );
                                self.renderNotificationButton( blog, tu, cbi );
                                module.remove();
                            }
                        }
                    } ]
                }, {
                    type: 'div',
                    children: [ {
                        type: 'h3',
                        text: this.i18n.msg( 'rail-header-blog' ).plain()
                    }, {
                        type: 'div',
                        children: [ {
                            type: 'a',
                            attr: {
                                href: this.settings.api.url + 'wiki/' + mw.util.wikiUrlencode( blog.title ),
                                target: '_blank'
                            },
                            text: blog.title ? blog.title.match( /[^:]*?\/(.+)/ )[1] : '',
                            events: {
                                click: function() {
                                    self.track( {
                                        action: tracker.ACTIONS.CLICK,
                                        label: [ 'blog', blog.lang, blog.title.replace( /,/g, '' ), self.sourceURL ].join( '|' )
                                    } );
                                }
                            }
                        }, {
                            type: 'span',
                            text: new Date( blog.timestamp ).toLocaleDateString()
                        } ]
                    } ],
                    condition: blog.title
                }, {
                    type: 'div',
                    children: [ {
                        type: 'h3',
                        text: this.i18n.msg( 'rail-header-tu' ).plain(),
                    }, {
                        type: 'div',
                        children: [ {
                            type: 'a',
                            attr: {
                                href: this.settings.api.url + 'wiki/' + mw.util.wikiUrlencode( tu.title ),
                                target: '_blank'
                            },
                            text: tu.title ? tu.title.match( /[^:]*?\/(.+)/ )[1] : '',
                            events: {
                                click: function() {
                                    self.track( {
                                        action: tracker.ACTIONS.CLICK,
                                        label: [ 'tu', tu.lang, tu.title.replace( /,/g, '' ), self.sourceURL ].join( '|' )
                                    } );
                                }
                            }
                        }, {
                            type: 'span',
                            text: new Date( tu.timestamp ).toLocaleDateString()
                        } ]
                    } ],
                    condition: tu.title
                }, {
                    type: 'div',
                    attr: {
                        id: 'newsmodule-item-cbi'
                    },
                    data: {
                        id: cbi.id
                    },
                    children: [ {
                        type: 'h3',
                        text: this.i18n.msg( 'rail-header-cbi' ).plain(),
                    }, {
                        type: 'p',
                        html: cbi.message
                    } ],
                    condition: cbi.message
                }, {
                    type: 'div',
                    attr: {
                        id: 'newsmodule-actions'
                    },
                    children: [ {
                        type: 'a',
                        classes: [ 'wds-button', 'wds-is-text' ],
                        children: [
                            window.dev.wds.icon( 'gear-small' ),
                            {
                                type: 'span',
                                text: 'Settings'
                            }
                        ],
                        events: {
                            click: function() {
                                self.launchSettings();
                            }
                        }
                    }, {
                        type: 'a',
                        classes: [ 'wds-button', 'wds-is-text' ],
                        children: [
                            window.dev.wds.icon( 'checkmark-small' ),
                            {
                                type: 'span',
                                text: 'Mark as read'
                            }
                        ],
                        events: {
                            click: function() {
                                self.track( {
                                    action: tracker.ACTIONS.CLICK,
                                    label: 'markasread'
                                } );
                                localStorage.setItem( 'NewsModule-railCollapsed', true );
                                self.trackDismiss( true, blog, tu, cbi );
                                self.renderNotificationButton( blog, tu, cbi );
                                module.remove();
                            }
                        }
                    } ]
                } ]
            } );

            document.getElementById( 'WikiaRail' ).prepend( module );

            var ecbi = document.getElementById( 'newsmodule-item-cbi' );
            if ( ecbi ) {
                ecbi.querySelectorAll( 'a' ).forEach( function( e ) {
                    e.onclick = function() {
                        self.track( {
                            action: tracker.ACTIONS.CLICK,
                            label: [ 'cbi', ecbi.id, self.sourceURL, this.href ].join( '|' )
                        } );
                    };
                } );
            }

            this.track( {
                action: tracker.ACTIONS.IMPRESSION,
                label: 'railmodule'
            } );
            return module;
        }
    };

    mw.hook( 'dev.i18n' ).add( NewsModule.preload.bind( NewsModule ) );
    mw.hook( 'dev.ui' ).add( NewsModule.preload.bind( NewsModule ) );
    mw.hook( 'dev.wds' ).add( NewsModule.preload.bind( NewsModule ) );
    mw.loader.using( [ 'mediawiki.api', 'mediawiki.util' ] ).done( NewsModule.preload.bind( NewsModule ) );

    importArticles( {
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:UI-js/code.js',
            'u:dev:MediaWiki:WDSIcons/code.js',
        ]
    }, {
        type: 'style',
        article: 'u:luq:MediaWiki:NewsModule.css'
    } );
} );