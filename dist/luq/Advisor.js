require( [
    'jquery',
    'mw',
    require.optional( 'wikia.tracker' ),
    'wikia.window',
    'BannerNotification',
    require.optional( 'ext.wikia.design-system.loading-spinner' )
], function( $, mw, tracker, window, banner, spinner ) {
    if ( window.AdvisorLoaded ) {
    	return;
    }
    window.AdvisorLoaded = true;

    var Advisor = {
        config: mw.config.get( [
            'wgCityId',
            'wgContentLanguage',
            'wgUserId',
            'wgUserName'
        ] ),
        loading: 4,
        preload: function() {
            if ( !(--this.loading) ) {
                window.dev.i18n.loadMessages('u:luq:MediaWiki:Custom-Advisor/i18n.json').then(this.init.bind(this));
            }
        },
        init: function( i18n ) {
            if ( this.config.wgUserId === null ) {
                return;
            }

            this.api = new mw.Api();
            this.i18n = i18n;

            var self = this;
            $( '.advisorCardPlaceholder' ).each( function() {
                self.buildAdvisorCard( this );
            } );
            $( '.joinAdvisorProgram' ).on( 'click', this.launchWizard.bind( this ) );
        },
        track: tracker.buildTrackingFunction( {
            category: 'advisor',
            trackingMethod: 'analytics'
        } ),
        buildAdvisorCard: function( placeholder ) {
            var self = this;
            placeholder.parentNode.replaceChild(
                window.dev.ui( {
                    type: 'div',
                    classes: ['dash-box', 'advisorCard'],
                    children: [ {
                        type: 'header',
                        classes: ['top'],
                        children: [ {
                            type: 'b',
                            classes: ['type'],
                            text: self.i18n.msg( 'card-select-type' ).plain()
                        }, {
                            type: 'div',
                            classes: ['dashHeader'],
                            text: self.i18n.msg( 'card-select-title' ).plain()
                        } ],
                    }, {
                        type: 'p',
                        text: self.i18n.msg( 'card-select-description' ).plain()
                    }, {
                        type: 'footer',
                        children: [ {
                            type: 'a',
                            classes: ['wds-button', 'joinAdvisorProgram'],
                            children: [
                                window.dev.wds.icon( 'avatar-small' ),
                                {
                                    type: 'span',
                                    text: self.i18n.msg( 'card-select-action' ).plain()
                                }
                            ],
                            events: {
                                click: function() {
                                    self.track( {
                                        action: tracker.ACTIONS.CLICK,
                                        label: 'welcome-card'
                                    } );
                                }
                            }
                        } ]
                    } ]
                } ),
                placeholder
            );

            this.track( {
                action: tracker.ACTIONS.IMPRESSIONS,
                label: 'welcome-card'
            } );
        },
        createWizard: function( placeholder, reload, choose, advisors ) {
            var self = this;
            var alreadyChecked = false;
            function advisorSelectItem( user ) {
                var id = 'advisor-' + ( user ? user.id : 'none' );
                var checked = !alreadyChecked && ( !user || ( self.advisor && self.advisor.id === user.id ) );
                alreadyChecked = alreadyChecked || checked;

                return {
                    type: 'label',
                    attr: {
                        'for': id
                    },
                    children: [{
                        type: 'input',
                        attr: Object.assign( {
                            type: 'radio',
                            name: 'advisor',
                            id: id,
                            value: user ? user.id : ''
                        }, checked ? { checked: '' } : {} )
                    }, {
                        type: 'div',
                        classes: ['wds-avatar'],
                        children: [{
                            type: 'img',
                            classes: ['wds-avatar__image'],
                            attr: {
                                src: user ? user.avatar : ''
                            },
                            condition: user
                        }]
                    }, {
                        type: 'span',
                        children: [{
                            type: user ? '#text' : 'i',
                            text: user ? user.name : self.i18n.msg( 'dialog-select-none' ).plain()
                        }, {
                            type: 'small',
                            text: self.i18n.msg( 'dialog-select-globaladvisor' ).plain(),
                            condition: user && user.global
                        }]
                    }, {
                        type: 'a',
                        classes: ['wds-button', 'wds-is-text'],
                        attr: {
                            href: user ? 'https://community.fandom.com/wiki/User:' + mw.util.wikiUrlencode( user.name ) : ''
                        },
                        text: 'User page',
                        events: {
                            click: function() {
                                self.track( {
                                    action: tracker.ACTIONS.CLICK,
                                    label: 'select-dialog-userpage'
                                } );
                                self.launchContactAdvisor( user );
                            }
                        },
                        condition: user
                    }, {
                        type: 'a',
                        classes: ['wds-button', 'wds-is-text'],
                        text: 'Message',
                        events: {
                            click: function() {
                                self.track( {
                                    action: tracker.ACTIONS.CLICK,
                                    label: 'select-dialog-contact'
                                } );
                                self.launchContactAdvisor( user );
                            }
                        },
                        condition: user
                    }]
                };
            }

            var tab = choose ? 1 : 0;
            function switchTabs() {
                var $this = $( this );
                if ( $this.hasClass( 'is-active' ) ) {
                    return;
                }

                tab = $this.data( 'id' );
                self.track( {
                    action: tracker.ACTIONS.CLICK,
                    label: 'select-dialog-switch',
                    value: tab
                } );

                $this.parent().find( '.switcher-button.is-active' ).removeClass( 'is-active' );
                $this.parent().parent().parent().find( '.wds-dialog__content:not( .is-hidden )' ).addClass( 'is-hidden' );
                $this.parent().parent().parent().find( '.wds-dialog__content[data-id=' + $this.data( 'id' ) + ']' ).removeClass( 'is-hidden' );
                $this.addClass( 'is-active' );
            }

            var advisorList = [];
            advisors.forEach( function( e ) {
                advisorList.push( advisorSelectItem( e ) );
            } );
            advisorList.push( advisorSelectItem() );

            var dialog = window.dev.ui( {
                type: 'div',
                classes: ['wds-dialog__curtain', 'dashboardDialog'],
                attr: {
                    id: 'advisorSelectDialog'
                },
                children: [{
                    type: 'div',
                    classes: ['wds-dialog__wrapper'],
                    children: [{
                        type: 'div',
                        classes: ['wds-dialog__title'],
                        text: self.i18n.msg( 'dialog-select-title' ).plain()
                    }, {
                        type: 'div',
                        classes: choose ? ['wds-dialog__content', 'is-hidden'] : ['wds-dialog__content'],
                        text: self.i18n.msg( 'dialog-select-info' ).plain(),
                        data: {
                            id: 0
                        }
                    }, {
                        type: 'div',
                        classes: choose ? ['wds-dialog__content'] : ['wds-dialog__content', 'is-hidden'],
                        children: [{
                            type: 'div',
                            classes: ['advisorSelect-header'],
                            text: self.i18n.msg( 'dialog-select-header' ).plain()
                        }, {
                            type: 'div',
                            classes: ['advisorSelect'],
                            children: advisorList
                        }],
                        data: {
                            id: 1
                        }
                    }, {
                        type: 'div',
                        classes: ['wds-dialog__actions'],
                        children: [{
                            type: 'div',
                            classes: ['switcher'],
                            children: [{
                                type: 'div',
                                classes: choose ? ['switcher-button'] : ['switcher-button', 'is-active'],
                                text: self.i18n.msg( 'dialog-select-tab-info' ).plain(),
                                data: {
                                    id: 0
                                },
                                events: {
                                    click: switchTabs
                                }
                            }, {
                                type: 'div',
                                classes: choose ? ['switcher-button', 'is-active'] : ['switcher-button'],
                                text: self.i18n.msg( 'dialog-select-tab-choose' ).plain(),
                                data: {
                                    id: 1
                                },
                                events: {
                                    click: switchTabs
                                }
                            }]
                        }, {
                            type: 'a',
                            classes: ['wds-button', 'wds-is-text', 'wds-dialog__actions-button'],
                            text: self.i18n.msg( 'dialog-cancel' ).plain(),
                            events: {
                                click: function() {
                                    self.track( {
                                        action: tracker.ACTIONS.CLOSE,
                                        label: 'select-dialog'
                                    } );
                                    dialog.remove();
                                }
                            }
                        }, {
                            type: 'a',
                            classes: ['wds-button', 'wds-dialog__actions-button'],
                            text: self.i18n.msg( 'dialog-select-action' ).plain(),
                            events: {
                                click: function() {
                                    if ( tab === 0 ) {
                                        switchTabs.call( dialog.querySelector( 'div.switcher-button[data-id="1"]' ) );
                                        return;
                                    }

                                    var id = dialog.querySelector( 'input[type=radio]:checked' ).value;
                                    this.disabled = true;
                                    var newAdvisor = advisors.find( function( e ) {
                                        return e.id == id;
                                    } );
                                    self.setAdvisor( newAdvisor )
                                        .done( function() {
                                            new banner( 'Your advisor assignment has been updated.', 'confirm' ).show();
                                            self.track( {
                                                action: tracker.ACTIONS.SUBMIT,
                                                label: 'select-dialog-' + ( newAdvisor ? self.advisor ? 'changed' : 'assigned' : 'removed' )
                                            } );
                                            self.advisor = newAdvisor;
                                            dialog.remove();

                                            if ( reload ) {
                                                window.location.reload();
                                            }
                                        } )
                                        .fail( function() {
                                            self.track( {
                                                action: tracker.ACTIONS.CLOSE,
                                                label: 'select-dialog'
                                            } );
                                            dialog.remove();
                                        } );
                                }
                            }
                        }]
                    }]
                }]
            } );

            this.track( {
                action: tracker.ACTIONS.OPEN,
                label: 'select-dialog'
            } );
            placeholder.parentNode.replaceChild( dialog, placeholder );
            return dialog;
        },
        launchWizard: function( reload ) {
            var placeholder = window.dev.ui( {
                type: 'div',
                classes: ['wds-dialog__curtain', 'dashboardDialog'],
                children: [{
                    type: 'div',
                    classes: ['wds-dialog__wrapper'],
                    children: [ {
                        type: 'div',
                        classes: ['wds-dialog__content'],
                        html: spinner ? new spinner( 38, 2 ).html.replace( 'wds-block', 'wds-spinner__block' ).replace( 'wds-path', 'wds-spinner__stroke' ) : ''
                    } ]
                } ]
            } );
            document.body.appendChild( placeholder );

            $.when(
                this.getAdvisor(),
                this.getAvailableAdvisors()
            ).done( this.createWizard.bind( this, placeholder, reload ) );
        },
        launchContactAdvisor: function( advisor ) {
            var self = this;
            var dialog = window.dev.ui( {
                type: 'div',
                classes: ['wds-dialog__curtain', 'dashboardDialog'],
                attr: {
                    id: 'advisorContactDialog'
                },
                children: [{
                    type: 'div',
                    classes: ['wds-dialog__wrapper'],
                    children: [{
                        type: 'div',
                        classes: ['wds-dialog__title'],
                        text: self.i18n.msg( 'dialog-contact-title' ).plain()
                    }, {
                        type: 'div',
                        classes: ['wds-dialog__content'],
                        children: [{
                            type: 'b',
                            text: self.i18n.msg( 'dialog-contact-header' ).plain()
                        }, {
                            type: 'div',
                            classes: ['wds-textarea'],
                            children: [{
                                type: 'span',
                                classes: ['wds-textarea__hint'],
                                text: self.i18n.msg( 'dialog-contact-form-title-label' ).plain()
                            }, {
                                type: 'div',
                                classes: ['wds-textarea__field-wrapper'],
                                children: [{
                                    type: 'textarea',
                                    classes: ['wds-textarea__field'],
                                    attr: {
                                        id: 'advisorContact-title',
                                        placeholder: self.i18n.msg( 'dialog-contact-form-title-placeholder' ).plain(),
                                        maxlength: 100,
                                        rows: 1,
                                        required: ''
                                    }
                                }]
                            }]
                        }, {
                            type: 'div',
                            classes: ['wds-textarea'],
                            children: [{
                                type: 'span',
                                classes: ['wds-textarea__hint'],
                                text: self.i18n.msg( 'dialog-contact-form-body-label' ).plain()
                            }, {
                                type: 'div',
                                classes: ['wds-textarea__field-wrapper'],
                                children: [{
                                    type: 'textarea',
                                    classes: ['wds-textarea__field'],
                                    attr: {
                                        id: 'advisorContact-body',
                                        placeholder: self.i18n.msg( 'dialog-contact-form-body-placeholder' ).plain(),
                                        maxlength: 1000,
                                        rows: 6,
                                        required: ''
                                    }
                                }]
                            }]
                        }]
                    }, {
                        type: 'div',
                        classes: ['wds-dialog__actions'],
                        children: [{
                            type: 'a',
                            classes: ['wds-button', 'wds-is-text', 'wds-dialog__actions-button'],
                            text: self.i18n.msg( 'dialog-cancel' ).plain(),
                            events: {
                                click: function() {
                                    self.track( {
                                        action: tracker.ACTIONS.CLOSE,
                                        label: 'contact-dialog'
                                    } );
                                    dialog.remove();
                                }
                            }
                        }, {
                            type: 'a',
                            classes: ['wds-button', 'wds-dialog__actions-button'],
                            children: [
                                window.dev.wds.icon( 'message-small' ),
                                {
                                    type: 'span',
                                    text: self.i18n.msg( 'dialog-contact-action' ).plain()
                                }
                            ],
                            events: {
                                click: function() {
                                    this.disabled = true;
                                    self.postToDiscussions( {
                                        title: document.getElementById( 'advisorContact-title' ).value,
                                        body: document.getElementById( 'advisorContact-body' ).value,
                                        mention: advisor
                                    } ).done( function( post ) {
                                        new banner( '<a href="/f/p/' + post.id + '">' + self.i18n.msg( 'dialog-contact-success' ).plain() + '</a>', 'confirm' ).show();
                                        self.track( {
                                            action: tracker.ACTIONS.SUBMIT,
                                            label: 'contact-dialog'
                                        } );
                                        dialog.remove();
                                    } );
                                }
                            }
                        }]
                    }]
                }]
            } );

            this.track( {
                action: tracker.ACTIONS.OPEN,
                label: 'contact-dialog'
            } );
            document.body.appendChild( dialog );
            return dialog;
        },
        setAdvisor: function( advisor ) {
            if ( ( !advisor && !this.advisor ) || ( advisor && this.advisor && advisor.id === this.advisor.id ) ) {
                return new $.Deferred().reject();
            }

            var self = this;
            return $.when(
                this.api.post( {
                    action: 'edit',
                    title: 'User:' + mw.util.wikiUrlencode( this.config.wgUserName ) + '/advisor',
                    text: advisor ? advisor.name : '',
                    token: mw.user.tokens.get( 'editToken' )
                } ),
                advisor ? this.postToDiscussions( {
                    title: self.i18n.msg( 'post-select-title' ).plain() + this.config.wgUserName,
                    body: self.i18n.msg( 'post-select-body' ).plain(),
                    mention: advisor
                } ) : new $.Deferred().resolve()
            );
        },
        getUserIdsAndAvatars: function( names ) {
            var deferred = new $.Deferred();
            if ( typeof names === 'string' ) {
                names = [ names ];
            }

            this.api.get( {
                action: 'query',
                list: 'users',
                ususers: names.join( '|' )
            } ).done( function( r ) {
                if ( r.error || !r.query.users.length ) {
                    deferred.resolve( [] );
                    return;
                }

                var out = [];
                var ids = [];
                r.query.users.forEach( function( e ) {
                    out.push( {
                        id: e.userid,
                        name: e.name,
                        avatar: null
                    } );
                    ids.push( e.userid );
                } );

                $.ajax( {
                    type: 'GET',
                    url: '/api/v1/User/Details',
                    data: {
                        ids: ids.join( ',' )
                    },
                    dataType: 'json'
                } ).done( function( r ) {
                    if ( r.exception || !r.items.length ) {
                        deferred.resolve( out );
                        return;
                    }

                    r.items.forEach( function( e, i ) {
                        out[i].avatar = e.avatar;
                    } );
                    deferred.resolve( out );
                } );
            } );

            return deferred;
        },
        getAdvisor: function() {
            var deferred = new $.Deferred();
            var self = this;

            if ( this.advisor ) {
                deferred.resolve( this.advisor );
                return deferred;
            }

            this.api.get( {
                action: 'query',
                titles: 'User:' + mw.util.wikiUrlencode( this.config.wgUserName ) + '/advisor',
                prop: 'revisions',
                rvprop: 'content',
                rvlimit: 1
            } ).done( function( r ) {
                if ( r.error ) {
                    deferred.resolve( null );
                    return;
                }

                var page = Object.values( r.query.pages )[0];
                if ( page.hasOwnProperty( 'missing' ) || page.revisions[0]['*'] === '' ) {
                    deferred.resolve( null );
                    return;
                }

                self.getUserIdsAndAvatars( page.revisions[0]['*'] ).done( function( advisor ) {
                    if ( !advisor.length ) {
                        advisor = null;
                    }
                    self.advisor = advisor[0];
                    deferred.resolve( self.advisor );
                } );
            } );

            return deferred;
        },
        getAvailableAdvisors: function() {
            var deferred = new $.Deferred();
            var self = this;

            if ( this.availableAdvisors ) {
                deferred.resolve( this.availableAdvisors );
                return deferred;
            }

            $.when(
                new $.Deferred( function( sudeferred ) {
                    self.api.get( {
                        action: 'query',
                        meta: 'allmessages',
                        ammessages: 'Custom-Advisors'
                    } ).done( function( r ) {
                        if ( r.error || r.query.allmessages[0].hasOwnProperty( 'missing' ) ) {
                            sudeferred.resolve( [] );
                            return;
                        }

                        self.getUserIdsAndAvatars( r.query.allmessages[0]['*'].split( '\n' ) ).done( function( advisors ) {
                            sudeferred.resolve( advisors );
                        } );
                    } )
                } ),
                new $.Deferred( function( sudeferred ) {
                    $.ajax( {
                        url: 'https://community.fandom.com/api.php',
                        data: {
                            action: 'query',
                            meta: 'allmessages',
                            ammessages: 'Advisors.json',
                            format: 'json'
                        },
                        dataType: 'jsonp'
                    } ).done( function( r ) {
                        try {
                            if ( r.error || r.query.allmessages[0].hasOwnProperty( 'missing' ) ) {
                                throw new exception();
                            }

                            var advisors = JSON.parse( r.query.allmessages[0]['*'] );
                            var names = [];
                            advisors.forEach( function( e ) {
                                if ( e.lang instanceof Array && e.lang.indexOf( self.config.wgContentLanguage ) === -1 ) {
                                    return;
                                }

                                names.push( e.name );
                            } );

                            self.getUserIdsAndAvatars( names ).done( function( advisors ) {
                                sudeferred.resolve( advisors );
                            } );
                        } catch( e ) {
                            sudeferred.resolve( [] );
                            return;
                        }
                    } );
                } )
            ).done( function( local, global ) {
                function shuffleArray( array ) {
                    for ( var i = 0; i < array.length - 1; ++i ) {
                        var j = Math.floor( Math.random() * ( array.length - i ) + i );
                        var temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }

                    return array;
                }

                self.availableAdvisors = shuffleArray( local );
                shuffleArray( global ).forEach( function( e ) {
                    if (
                        local.find( function( l ) {
                            return e.id === l.id
                        } )
                    ) {
                        return;
                    }

                    e.global = true;
                    self.availableAdvisors.push( e );
                } );
                deferred.resolve( self.availableAdvisors );
            } );

            return deferred;
        },
        postToDiscussions: function( options ) {
            var deferred = new $.Deferred();
            var data = {
                title: options.title || '',
                body: options.body || '',
                siteId: this.config.wgCityId,
                forumId: this.config.wgCityId
            };

            if ( options.mention ) {
                data.attachments = {
                    atMentions: [ { id: options.mention.id } ]
                };
                data.jsonModel = JSON.stringify( {
                    type: 'doc',
                    content: [ {
                        type: 'pharagraph',
                        content: [ {
                            type: 'text',
                            marks: [ {
                                type: 'mention',
                                attrs: {
                                    userId: options.mention.id,
                                    userName: options.mention.name
                                }
                            } ],
                            text: '@' + options.mention.name
                        }, {
                            type: 'text',
                            text: ' ' + data.body
                        } ]
                    } ]
                } );
                data.body = '@' + options.mention.name + ' ' + data.body;
            }

            var self = this;
            $.when(
                this.api.get( {
                    action: 'query',
                    meta: 'allmessages',
                    ammessages: 'Custom-Advisors-board'
                } ),
                $.ajax( {
                    type: 'GET',
                    url: 'https://services.fandom.com/discussion/' + this.config.wgCityId + '/forums/',
                    dataType: 'json',
                } )
            ).done( function( r1, r2 ) {
                var board = self.config.wgCityId;

                try {
                    if ( !r1[0].error && !r1[0].query.allmessages[0].hasOwnProperty( 'missing' ) ) {
                        var temp = r1[0].query.allmessages[0]['*'];
                        var boards = r2[0]._embedded['doc:forum'];
                        for ( var i = 0; i < boards.length; ++i ) {
                            if ( boards[i].id == temp ) {
                                board = temp;
                                data.forumId = board;
                                break;
                            }
                        }
                    }
                } catch( e ) {
                }

                $.ajax( {
                    type: 'POST',
                    url: 'https://services.fandom.com/discussion/' + self.config.wgCityId + '/forums/' + board + '/threads',
                    data: JSON.stringify( data ),
                    contentType: 'application/json',
                    dataType: 'json',
                    xhrFields: {
                        withCredentials: true
                    }
                } ).done( deferred.resolve );
            } );

            return deferred;
        },
        addDashboardCard: function() {
            var self = this;
            this.getAdvisor().done( function( advisor ) {
                var card = null;
                if ( advisor ) {
                    card = new Dashboard.ProfileCard( {
                        id: 'dashboardCommunity-advisor',
                        title: advisor.name,
                        description: self.i18n.msg( 'card-contact-description' ).plain(),
                        avatar: advisor.avatar,
                        track: false,
                        action: {
                            text: self.i18n.msg( 'card-contact-action' ).plain(),
                            handler: function() {
                                self.track( {
                                    action: tracker.ACTIONS.CLICK,
                                    label: 'dashboardcard-contact'
                                } );
                                self.launchContactAdvisor( advisor );
                            }
                        }
                    } );
                } else {
                    card = new Dashboard.ContributeCard( {
                        id: 'dashboardCommunity-noadvisor',
                        title: self.i18n.msg( 'card-select-title' ).plain(),
                        type: self.i18n.msg( 'card-select-type' ).plain(),
                        description: self.i18n.msg( 'card-select-description' ).plain(),
                        track: false,
                        action: {
                            text: self.i18n.msg( 'card-select-action' ).plain(),
                            handler: function() {
                                self.track( {
                                    action: tracker.ACTIONS.CLICK,
                                    label: 'dashboardcard-select'
                                } );
                                self.launchWizard( true );
                            }
                        }
                    } );
                }

                $( '#dashboardCommunity > .boxes' ).append( card.render() );
                self.track( {
                    action: tracker.ACTIONS.IMPRESSION,
                    label: advisor ? 'dashboardcard-contact' : 'dashboardcard-select'
                } );
            } );
        }
    };

    mw.hook( 'dev.i18n' ) .add( Advisor.preload.bind( Advisor ) );
    mw.hook( 'dev.ui' ) .add( Advisor.preload.bind( Advisor ) );
    mw.hook( 'dev.wds' ) .add( Advisor.preload.bind( Advisor ) );
    mw.loader.using( [ 'mediawiki.api', 'mediawiki.util' ] ).done( Advisor.preload.bind( Advisor ) );
    mw.hook( 'Dashboard.ui' ).add( Advisor.addDashboardCard.bind( Advisor ) );

    importArticles( {
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:UI-js/code.js',
            'u:dev:MediaWiki:WDSIcons/code.js',
        ]
    }, {
        type: 'style',
        articles: [
            'u:dev:MediaWiki:Dashboard.css',
            'u:luq:MediaWiki:Advisor.css',
        ]
    } );
} )