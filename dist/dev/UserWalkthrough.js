require( [
    'wikia.window',
    'jquery',
    'mw',
    'wikia.mustache',
    'wikia.tracker'
], function ( window, $, mw, mustache, tracker ) {
    if ( window.userWalkthroughLoaded ) {
        return;
    }
    window.userWalkthroughLoaded = true;

    var UserWalkthroughHints = [
        '.wds-global-navigation__content-bar-left',
        '.wds-global-navigation__search-toggle',
        '.wds-global-navigation__user-menu',
        '#onSiteNotificationsDropdown',
        '#notificationsEntryPoint',
        '.wds-community-header__wordmark',
        '.wds-community-header__wiki-buttons',
        '.wds-community-header__local-navigation',
        '.page-header__contribution-buttons',
        '.page-header__categories-links',
        '.activity-module',
        '.community-page-rail-module',
        '#recirculation-rail'
    ];

    var UserWalkthroughStepsMW = [
        { element: '#editarea' },
        { element: '#EditPageTabs', position: 'bottom' },
        { element: '#EditPageToolbar', position: 'bottom' },
        { element: '.module_insert', position: 'left' },
        { element: '.module_categories', position: 'right' },
        { element: '.module_templates', position: 'right' },
        { element: '#wpSummaryLabel', position: 'left' },
        { element: '#wpPreviewMobile', position: 'bottom' },
        { element: '#wpPreview', position: 'bottom' },
        { element: '#wpDiff', position: 'bottom' },
        { element: '#wpSave' }
    ];

    var UserWalkthroughStepsVE = [
        { element: '.mw-body-content', scrollTo: 'tooltip', position: 'top' },
        { element: '.ve-init-mw-viewPageTarget-toolbar>.oo-ui-toolbar-bar>.oo-ui-toolbar-tools',  position: 'bottom' },
        { element: '.oo-ui-listToolGroup', position: 'bottom' },
        { element: '.ve-ui-toolbar-saveButton', position: 'bottom' }
    ];

    var TRACKING_CATEGORIES = {
        HINTS: 'user-hints',
        WALKTHROUGH_MW: 'user-walkthrough--MW',
        WALKTHROUGH_VE: 'user-walkthrough--VE'
    };

    var UserWalkthrough = {
        config: mw.config.get( [
            'wgAction',
            'wgPageName',
            'wgUserId',
            'wgUserLanguage',
            'wgNamespaceNumber',
            'wgVisualEditorPreferred'
        ] ),
        load: function() {
            if (
                this.config.wgNamespaceNumber !== 0 ||
                ( this.config.wgAction !== 'view' && !( this.config.wgAction === 'edit' && mw.util.getParamValue( 'walkthrough' ) == 1 ) )
            ) {
                return;
            }

            importArticle( { type: 'style', article: 'u:dev:MediaWiki:UserWalkthrough.css' } );

            var self = this;
            mw.hook( 'dev.i18n' ).add( function( i18n ) {
                i18n.loadMessages( 'UserWalkthrough' ).done( $.proxy( self.init, self ) );
            } );
            if ( !window.dev || !window.dev.i18n ) {
                importArticle( { type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' } );
            }
        },
        init: function( i18n ) {
            this.i18n = i18n;

            if ( this.config.wgAction === 'view' ) {
                this.addEntryPoints();
                if ( mw.util.getParamValue( 'veaction' ) === 'edit' && mw.util.getParamValue( 'walkthrough' ) == 1 ) {
                    this.addVEHandler();
                }
            } else if ( this.config.wgAction === 'edit' && mw.util.getParamValue( 'walkthrough' ) == 1 ) {
                var we = WikiaEditor.getInstance();
                if ( we.ui.uiReadyFired ) {
                    this.startIntroMW();
                } else {
                    we.on( 'uiReady', $.proxy( this.startIntroMW, this ) );
                }
            }
        },
        getIntroJs: function() {
            var self = this;
            return new $.Deferred( function( deferred ) {
                if ( typeof window.introJs === 'function' && !self.introJs ) {
                    self.introJs = window.introJs();
                }
                if ( self.introJs ) {
                    deferred.resolve( self.introJs );
                    return;
                }

                mw.hook( 'introjs.loaded' ).add( function() {
                    self.introJs = window.introJs();
                    deferred.resolve( self.introJs );
                } );
                importArticle( { type: 'script', article: 'u:dev:MediaWiki:UserWalkthrough.js/intro.js' } );
            } ).done( function( intro ) {
                intro.setOptions( {
                    prevLabel: self.i18n.msg( 'tooltip-prev' ).parse(),
                    nextLabel: self.i18n.msg( 'tooltip-next' ).parse(),
                    skipLabel: self.i18n.msg( 'tooltip-skip' ).parse(),
                    doneLabel: self.i18n.msg( 'tooltip-done' ).parse(),
                    hintButtonLabel: self.i18n.msg( 'tooltip-hintconfirm' ).parse()
                } );
            } );
        },
        track: tracker.buildTrackingFunction( {
            trackingMethod: 'analytics'
        } ),
        isNewUser: function() {
            var self = this;
            return new $.Deferred( function( deferred ) {
                if ( self.config.wgUserId === null ) {
                    deferred.resolve( true );
                    return;
                }

                var cache = localStorage.getItem( 'UserWalkthrough-newUser' );
                if ( cache === false || ( cache !== null && Date.now() - parseInt( cache ) < 900000 ) ) { // 15 minutes
                    deferred.resolve( cache !== false );
                    return;
                }

                new mw.Api().get( {
                    action: 'query',
                    meta: 'userinfo',
                    uiprop: 'editcount'
                } ).done( function( r ) {
                    var newUser = r.error || r.query.userinfo.editcount < 25;
                    deferred.resolve( newUser );
                    localStorage.setItem( 'UserWalkthrough-newUser', newUser ? Date.now() : false );
                } );
            } );
        },
        addEntryPoints: function() {
            $rail = $( '#WikiaRail' );
            if ( !$rail.length ) {
                return;
            }

            this.addDropdownButton();
            this.isNewUser().done( $.proxy( this.addRailModule, this ) );
        },
        addRailModule: function( newUser ) {
            if ( newUser ) {
                this.track( {
                    category: this.config.wgVisualEditorPreferred ? TRACKING_CATEGORIES.WALKTHROUGH_VE : TRACKING_CATEGORIES.WALKTHROUGH_MW,
                    action: tracker.ACTIONS.IMPRESSION,
                } );
            }

            this.track( {
                category: TRACKING_CATEGORIES.HINT,
                action: tracker.ACTIONS.IMPRESSION,
            } );

            $module = $( mustache.render(
                '<section class="rail-module" id="userwalkthrough-module">' +
                    '{{#newUser}}' +
                        '<div>' +
                            '<h2>{{header}}</h2>' +
                            '<p>{{description}}</p>' +
                            '<a href="{{editHref}}" class="wds-button" id="userwalkthrough-editor">{{editText}}</a>' +
                        '</div>' +
                    '{{/newUser}}' +
                '</section>' +
                '<div class="rail-module">' +
                    '<a href="#" class="wds-button" id="userwalkthrough-hints">{{hintsText}}</a>' +
                '</div>', {
                    newUser: newUser,
                    header: this.i18n.msg( 'railmodule-header' ).parse(),
                    description: this.i18n.msg( 'railmodule-description' ).parse(),
                    editHref: mw.util.getUrl( this.config.wgPageName, this.config.wgVisualEditorPreferred ? { veaction: 'edit', walkthrough: 1 } : { action: 'edit', walkthrough: 1 } ),
                    editText: this.i18n.msg( 'railmodule-edit' ).parse(),
                    hintsText: this.i18n.msg( 'railmodule-hints' ).parse()
                }
            ) );

            $ad = $( '#top-right-boxad-wrapper' );
            if ( $ad.length ) {
                $module.insertAfter( $ad );
            } else {
                $module.prependTo( $rail );
            }

            $( '#userwalkthrough-hints' ).on( 'click', $.proxy( this.addHints, this ) );
            $( '#userwalkthrough-editor' ).on( 'click', $.proxy( this.startIntro, this ) );
        },
        addDropdownButton: function() {
            $('.page-header__contribution-buttons .wds-list' ).append(
                $( '<li>' ).append(
                    $( '<a>', {
                        id: 'userwalkthrough-introdropdown',
                        href: mw.util.getUrl( this.config.wgPageName, this.config.wgVisualEditorPreferred ? { veaction: 'edit', walkthrough: 1 } : { action: 'edit', walkthrough: 1 } ),
                        html: this.i18n.msg( 'dropdown-walkthrough' ).parse()
                    } ).on( 'click', $.proxy( this.startIntro, this ) )
                )
            );
        },
        startIntro: function( e ) {
            this.track( {
                category: this.config.wgVisualEditorPreferred ? TRACKING_CATEGORIES.WALKTHROUGH_VE : TRACKING_CATEGORIES.WALKTHROUGH_MW,
                action: e.target.id === 'userwalkthrough-introdropdown' ? tracker.ACTIONS.OPEN : tracker.ACTIONS.CLICK_LINK_BUTTON,
            } );

            if ( this.config.wgVisualEditorPreferred ) {
                e.preventDefault();
                this.addVEHandler();
                $( '#ca-ve-edit' ).trigger( 'click', e );
            }
        },
        addVEHandler: function() {
            var self = this;
            var veHandler = function() {
                self.startIntroVE();
                mw.hook( 've.activationComplete' ).remove( veHandler );
            };
            mw.hook( 've.activationComplete' ).add( veHandler );
        },
        addHints: function() {
            var self = this;

            this.getIntroJs().done( function( intro ) {
                var hints = [];
                UserWalkthroughHints.forEach( function( e ) {
                    var element = document.querySelector( e );
                    if ( element ) {
                        hints.push( {
                            element: element,
                            hint: self.i18n.msg( 'hint-' + e ).parse(),
                            hintPosition: 'top-middle'
                        } );
                    }
                } );

                intro.setOptions( { hints: hints } );

                intro.onhintclick( function() {
                    self.track( {
                        category: TRACKING_CATEGORIES.HINTS,
                        action: tracker.ACTIONS.OPEN
                    } );
                } );

                intro.onhintclose( function() {
                    self.track( {
                        category: TRACKING_CATEGORIES.HINTS,
                        action: tracker.ACTIONS.CLOSE
                    } );
                } );

                intro.addHints();
                intro.showHints();

                self.track( {
                    category: TRACKING_CATEGORIES.HINTS,
                    action: tracker.ACTIONS.CLICK_LINK_BUTTON,
                } );
            } );
        },
        addIntroTracking: function( intro, category ) {
            var self = this;

            this.track( {
                category: category,
                action: tracker.ACTIONS.FLOW_START
            } );

            intro.onchange( function() {
                self.track( {
                    category: category,
                    action: tracker.ACTIONS.FLOW_MID_STEP
                } );
            } );

            intro.oncomplete( function() {
                self.track( {
                    category: category,
                    action: tracker.ACTIONS.FLOW_END
                } );
                self.completed = true;
            } );

            intro.onexit( function() {
                $( document.body ).removeClass( 'user-walkthrough' );
                if ( !self.completed ) {
                    self.track( {
                        category: category,
                        action: tracker.ACTIONS.CLOSE
                    } );
                }
                self.completed = false;
            } );

            $( document.body ).addClass( 'user-walkthrough' );
        },
        startIntroMW: function() {
            var self = this;

            this.getIntroJs().done( function( intro ) {
                var steps = [
                    { intro: self.i18n.msg( 'intromw-intro' ).parse() }
                ];
                $( '.editpage-sourcewidemode-on' ).addClass( 'editpage-sourcewidemode-off' ).removeClass( 'editpage-sourcewidemode-on' );
                UserWalkthroughStepsMW.forEach( function( e ) {
                    var element = document.querySelector( e.element );
                    if ( element && $( element ).is( ':visible' ) ) {
                        steps.push( Object.assign( {}, e, {
                            element: element,
                            intro: self.i18n.msg( 'intromw-' + e.element ).parse().replace( /<a href="/g, '<a target="_blank" href="' )
                        } ) );
                    }
                } );

                intro.setOptions( {
                    steps: steps,
                    disableInteraction: true
                } );
                self.addIntroTracking( intro, TRACKING_CATEGORIES.WALKTHROUGH_MW );
                intro.start();
            } );
        },
        startIntroVE: function() {
            var self = this;

            this.getIntroJs().done( function( intro ) {
                intro.hideHints();
                intro.exit();

                var steps = [
                    {
                        element: document.querySelector( '.ve-init-target' ),
                        intro: self.i18n.msg( 'introve-intro' ).parse(),
                        scrollTo: 'tooltip'
                    }
                ];
                UserWalkthroughStepsVE.forEach( function( e ) {
                    var element = document.querySelector( e.element );
                    if ( element && $( element ).is( ':visible' ) ) {
                        steps.push( Object.assign( {}, e, {
                            element: element,
                            intro: self.i18n.msg( 'introve-' + e.element ).parse().replace( /<a href="/g, '<a target="_blank" href="' )
                        } ) );
                    }
                } );

                intro.setOptions( {
                    steps: steps,
                    disableInteraction: true
                } );

                mw.hook( 've.deactivate' ).add( function() {
                    intro.exit();
                } );

                intro.start();
                self.addIntroTracking( intro, TRACKING_CATEGORIES.WALKTHROUGH_VE );
                $( '#userwalkthrough-editor,#userwalkthrough-introdropdown' ).remove();
            } );
        }
    };
    UserWalkthrough.load();
} );