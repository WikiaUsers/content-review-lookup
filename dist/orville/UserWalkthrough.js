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

    // Yes, I know it can be done with i18n-js...
    var i18n = {
        'en': {
            'railmodule-header': 'Contributions',
            'railmodule-description': 'Wikis like this one depend on explorers like you to thrive.',
            'railmodule-edit': 'Not sure how to help? We\'ll show you.',
            'railmodule-hints': 'Explore all the parts of a Fandom page',

            'hint-.wds-global-navigation__content-bar-left': 'Discover the rest of the Fandom network of communities, news, stories, and video.',
            'hint-.wds-global-navigation__search-toggle': 'Search this community for articles.',
            'hint-.wds-global-navigation__user-menu': 'Access to your account, preferences, and profile.',
            'hint-#onSiteNotificationsDropdown': 'Announcements and notifications from communities you have visited.',
            'hint-#notificationsEntryPoint': 'Conversations and replies.',
            'hint-.wds-community-header__wordmark': 'Go directly to this community\'s main page.',
            'hint-.wds-community-header__wiki-buttons': 'Add new articles, images, video, and see other editing tools.',
            'hint-.wds-community-header__local-navigation': 'Travel to the most important areas of the community.',
            'hint-.page-header__contribution-buttons': 'Edit and modify the current page, or share it.',
            'hint-.page-header__categories-links': 'Find other pages similar to this one.',
            'hint-.activity-module': 'See recent additions to the community.',
            'hint-.community-page-rail-module': 'Find out how you can help contribute to the community.',
            'hint-#recirculation-rail': 'See articles that are popular on this community.',
            
            'intromw-intro': 'Welcome to the world of wiki editing! Let\'s show you around the editor panels.',
            'intromw-#editarea': 'This is the main text area. What you will see here is the text that makes up the page, marked-up in a format called <a href="https://community.fandom.com/wiki/Help:Wikitext" target="_blank">wikitext</a>.',
            'intromw-#EditPageTabs': 'These two tabs switch between a more visual view and the \'source\' wikitext. If the code gets very complex, this won\'t be shown.',
            'intromw-#EditPageToolbar': 'This toolbar lets you add wikitext to enhance the plain text in the panel. Hovering over each button will tell you what it inserts.',
            'intromw-.module_insert': 'These buttons add bigger blocks to the page — like images, infoboxes, and video.',
            'intromw-.module_categories': 'This lists the categories the page is included in.',
            'intromw-.module_templates': 'This toolkit lets you add templates (re-usable snippets of code) to the page.',
            'intromw-#wpSummaryLabel': 'Make sure you enter a brief summary of the changes you make, so that other editors can understand what you did.',
            'intromw-#wpPreviewMobile': 'See here a preview of how the page will look on mobile, which is how most readers will see it.',
            'intromw-#wpPreview': 'See here a preview of how that wikitext looks as a full, desktop page.',
            'intromw-#wpDiff': 'Want to see what you added or changed? <strong>Show changes</strong> will show the original and your version side by side with the differences.',
            'intromw-#wpSave': 'All done? <strong>Publish</strong> will save the page and make your changes live.',

            'introve-intro': 'Welcome to the world of wiki editing! Let\'s show you around the editor panels.',
            'introve-.mw-body-content': 'This is the main content area. This shows approximately what a published page will look like.',
            'introve-.ve-init-mw-viewPageTarget-toolbar>.oo-ui-toolbar-bar>.oo-ui-toolbar-tools': 'This toolbar lets you change the text formatting in the panel, or add new elements like images, lists, templates, or infoboxes. Hovering over each button will tell you what it inserts or modifies.',
            'introve-.oo-ui-listToolGroup': 'This menu shows advanced options for the page, including the Source Editor',
            'introve-.ve-ui-toolbar-saveButton': 'All done? <strong>Save page</strong> will publish your changes live.'
        }
    };

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
            'wgUserLanguage',
            'wgNamespaceNumber',
            'wgVisualEditorPreferred'
        ] ),
        init: function() {
            if ( this.config.wgNamespaceNumber === 0 ) {
                importArticle( { type: 'style', article: 'MediaWiki:Walkthrough.css' } );
                if ( this.config.wgAction === 'view' ) {
                    this.addRailModule();
                    if ( mw.util.getParamValue( 'veaction' ) === 'edit' && mw.util.getParamValue( 'walkthrough' ) == 1 ) {
                        this.addVEHandler();
                    }
                } else if ( this.config.wgAction === 'edit' && mw.util.getParamValue( 'walkthrough' ) == 1 ) {
                    this.startIntroMW();
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
                importArticle( { type: 'style', article: 'MediaWiki:IntroJs.css' } );
                importArticle( { type: 'script', article: 'MediaWiki:Intro.js' } );
            } );
        },
        i18n: function( key ) {
            var lang = this.config.wgUserLanguage;
            return i18n[lang] && i18n[lang][key] ? i18n[lang][key] : i18n['en'][key] ? i18n['en'][key] : '<' + key + '>';
        },
        track: tracker.buildTrackingFunction( {
            trackingMethod: 'analytics'
        } ),
        addRailModule: function() {
            var self = this;

            this.track( {
                category: this.config.wgVisualEditorPreferred ? TRACKING_CATEGORIES.WALKTHROUGH_VE : TRACKING_CATEGORIES.WALKTHROUGH_MW,
                action: tracker.ACTIONS.IMPRESSION,
            } );

            $( mustache.render(
                '<section class="rail-module" id="userwalkthrough-module">' +
                    '<div>' +
                        '<h2>{{header}}</h2>' +
                        '<p>{{description}}</p>' +
                        '<a href="{{editHref}}" class="button" id="userwalkthrough-editor">{{editText}}</a>' +
                    '</div>' +
                    '<a href="#" class="button" id="userwalkthrough-hints">{{hintsText}}</a>' +
                '</section>',
                {
                    header: this.i18n( 'railmodule-header' ),
                    description: this.i18n( 'railmodule-description' ),
                    editHref: mw.util.getUrl( this.config.wgPageName, this.config.wgVisualEditorPreferred ? { veaction: 'edit', walkthrough: 1 } : { action: 'edit', walkthrough: 1 } ),
                    editText: this.i18n( 'railmodule-edit' ),
                    hintsText: this.i18n( 'railmodule-hints' )
                }
            ) ).prependTo( '#WikiaRail' );

            $( '#userwalkthrough-hints' ).on( 'click', $.proxy( this.addHints, this ) );
            $( '#userwalkthrough-editor' ).on( 'click', function( e ) {
                self.track( {
                    category: self.config.wgVisualEditorPreferred ? TRACKING_CATEGORIES.WALKTHROUGH_VE : TRACKING_CATEGORIES.WALKTHROUGH_MW,
                    action: tracker.ACTIONS.CLICK_LINK_BUTTON,
                } );

                if ( self.config.wgVisualEditorPreferred ) {
                    e.preventDefault();
                    self.addVEHandler();
                    $( '#ca-ve-edit' ).trigger( 'click', e );
                }
            } );
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
                            hint: self.i18n( 'hint-' + e ),
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
                    { intro: self.i18n( 'intromw-intro' ) }
                ];
                UserWalkthroughStepsMW.forEach( function( e ) {
                    var element = document.querySelector( e.element );
                    if ( element ) {
                        steps.push( Object.assign( {}, e, {
                            element: element,
                            intro: self.i18n( 'intromw-' + e.element )
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

                var steps = [
                    {
                        element: document.querySelector( '.ve-init-target' ),
                        intro: self.i18n( 'introve-intro' ),
                        scrollTo: 'tooltip'
                    }
                ];
                UserWalkthroughStepsVE.forEach( function( e ) {
                    var element = document.querySelector( e.element );
                    if ( element ) {
                        steps.push( Object.assign( {}, e, {
                            element: element,
                            intro: self.i18n( 'introve-' + e.element )
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
                $( '#userwalkthrough-editor' ).remove();
            } );
        }
    };

    UserWalkthrough.init();
} );