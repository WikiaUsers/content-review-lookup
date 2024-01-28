;( function() {
	'use strict';

	window.dev = window.dev || {};
	window.dev.thankyou = window.dev.thankyou || {
		maxDays: window.tyMaxDays || 3652,
		mode: window.tyMode || 'latest',
		position: window.tyPosition || -1
	}
	if ( window.dev.thankyou.enabled ) {
		return;
	}
	window.dev.thankyou.enabled = true;

	var config = mw.config.get( [
		'wgAction',
		'wgArticleId',
		'wgNamespaceNumber',
		'wgPageName',
		'wgUserName'
	] );

	if ( !config.wgUserName || config.wgAction !== 'view' || config.wgNamespaceNumber !== 0 || config.wgArticleId === 0 ) {
		return;
	}

	var options = window.dev.thankyou;

	var api;
	var i18n;

	function initialize( CustomTools ) {
		queryUsers()
			.then( filterUsers )
			.then( loadAvatars )
			.then( function () {
				CustomTools( {
					classes: 'thankyou__button',
					i18n: 'ThankYou',
					icon: 'heart',
					placement: 'page-tools-left',
					position: options.position,
					text: 'thankyou-tooltip'
				} );
			} )
			.then( findSelector.bind( undefined, '.thankyou__button' ) )
			.then( buttonHandler );
	}

	function isThanksEnabled() {
		var promise = $.Deferred();

		api.get( {
			action: 'query',
			format: 'json',
			formatversion: 2,
			meta: 'siteinfo',
			siprop: 'extensions'
		} ).then( function ( result ) {
			var extensions = result.query.extensions;
			var thanks = extensions.find( function ( item ) {
				return item.name === 'Thanks';
			} );
			promise.resolve( thanks );
		} );

		return promise;
	}

	function fetchOptions() {
		var promise = $.Deferred();

		api.get( {
			action: 'query',
			format: 'json',
			formatversion: 2,
			maxage: 1200,
			prop: 'revisions',
			rvprop: 'content',
			smaxage: 1200,
			titles: 'MediaWiki:Custom-ThankYou.json'
		} ).then( function ( result ) {
			var page = result.query.pages[ 0 ];
			if ( !page.missing ) {
				var settings = JSON.parse( page.revisions[ 0 ].content );
				if ( settings.maxDays ) {
					options.maxDays = settings.maxDays;
				}
				if ( settings.mode ) {
					options.mode = settings.mode;
				}
				if ( settings.position ) {
					options.position = settings.position;
				}
			}
		} );

		return promise;
	}
	
	function queryUsers() {
		var promise = $.Deferred();

		api.get( {
			action: 'query',
			format: 'json',
			formatversion: 2,
			maxage: 1100,
			prop: 'revisions',
			rvlimit: 100,
			rvprop: [ 'ids', 'user', 'userid', 'size', 'timestamp' ].join( '|' ),
			smaxage: 1100,
			titles: config.wgPageName,
		} ).then( function ( result ) {
			var revisions = result.query.pages[ 0 ].revisions;
			var users = [];
			var ipRegex = /^\d+\.\d+\.\d+\.\d+$/;

			if ( options.mode === '' ) {

			} else { // default to "latest"
				for ( var i = 0; i < revisions.length; i++ ) {
					if ( users.length >= 50 ) break;
					var revision = revisions[ i ];
					if ( revision.user.match( ipRegex ) ) {
						continue;
					}
					var alreadyStored = users.find( function ( item ) { return item.user === revision.user; } );
					if ( !alreadyStored ) {
						users.push( revision );
					}
				}
			}

			options.editorsCount = users.length;
			promise.resolve( users );
		} );

		return promise;
	}

	function filterUsers( users ) {
		var promise = $.Deferred();

		var usernames = users.map( function ( item ) {
			return item.user;
		} );
		api.get( {
			action: 'query',
			format: 'json',
			formatversion: 2,
			list: 'users',
			maxage: 600,
			smaxage: 600,
			usprop: 'blockinfo|groups',
			ususers: usernames.join( '|' )
		} ).then( function ( result ) {
			var items = result.query.users.filter( function ( item ) {
				var exists = !item.invalid && !item.missing;
				var notBlocked = !item.blockid;
				var notBot = !item.groups.find( function ( group ) {
					return group === 'bot' || group === 'bot-global';
				} );
				return exists && notBlocked && notBot;
			} ).map( function ( item ) { return item.name; } );

			var list = [];
			for ( var i = 0; i < users.length; i++ ) {
				var user = users[ i ].user;
				var stored = items.find( function ( item ) { return item === user; } );
				if ( stored ) {
					list.push( users[ i ] );
				}
				if ( list.length >= 5 ) {
					break;
				}
			}

			promise.resolve( list );
		} );

		return promise;
	}

	function loadAvatars( users ) {
		var promise = $.Deferred();

		function fetchAvatar( user ) {
			return $.ajax( 'https://services.fandom.com/user-attribute/user/' + user.userid + '/attr/avatar', {
				error: function() {
					user.avatar = 'https://static.wikia.nocookie.net/cc4b265a-0b26-4f7c-a26c-926fc735e433/thumbnail/width/50/height/50';
				},
				success: function ( result ) {
					user.avatar = result.value;
					if ( user.avatar.match( /\/[0-9a-f-]+$/ ) ) {
						user.avatar = user.avatar + '/thumbnail/width/50/height/50';
					}
				}
			} );
		}

		var requests = fetchAvatar( users[ 0 ] );
		for ( var i = 1; i < users.length; i++ ) {
			var fn = fetchAvatar.bind( undefined, users[ i ] );
			requests.then( fn );
		}

		requests.then( function () {
			options.users = users;
			promise.resolve( users );
		} );

		return promise;
	}
	
	function buttonHandler( button ) {
		// it was already loaded by CustomTools for the tooltip message... is it hacky? absolutely
		var i18n = window.dev.i18n._cache.ThankYou;

		var content = document.createElement( 'div' );
		content.classList.add( 'thankyou__container' );

		var description = document.createElement( 'div' );
		description.classList.add( 'thankyou__description' );
		description.innerText = i18n.msg( 'thankyou-description', options.editorsCount ).plain();
		content.append( description );

		var avatars = document.createElement( 'div' );
		avatars.classList.add( 'thankyou__users' );
		content.append( avatars );

		var action = document.createElement( 'div' );
		action.classList.add( 'thankyou__action' );
		content.append( action );

		var text = document.createElement( 'p' );
		text.classList.add( 'thankyou__text' );
		action.append( text );

		var thanksButton = document.createElement( 'button' );
		thanksButton.classList.add( 'wds-button' );
		thanksButton.disabled = true;
		thanksButton.innerText = i18n.msg( 'thankyou-thank-user' ).plain();
		action.append( thanksButton );

		for ( var i = 0; i < options.users.length; i++ ) {
			var item = options.users[ i ];
			var avatar = document.createElement( 'img' );
			avatar.classList.add( 'thankyou__avatar' );
			avatar.title = item.user;
			avatar.src = item.avatar;
			avatar.width = 30;
			avatar.dataset.revid = item.revid;
			avatar.dataset.timestamp = item.timestamp;
			avatar.dataset.user = item.user;
			avatar.dataset.userid = item.userid;

			avatars.append( avatar );

			avatar.addEventListener( 'mouseenter', function () {
				text.innerText = i18n.msg( 'thankyou-user', this.dataset.user ).plain();
				if ( thanksButton.disabled && thanksButton.dataset.revid ) {
					thanksButton.innerText = i18n.msg( 'thankyou-thank-user' ).plain();
				}

				var isTooOld = Date.now() - new Date( this.dataset.timestamp ).getTime() > 1000 * 60 * 60 * 24 * options.maxDays;
				var isYourself = this.dataset.user === config.wgUserName;
				thanksButton.disabled = this.dataset.thanked || isYourself || isTooOld;
				thanksButton.dataset.revid = this.dataset.revid;
				thanksButton.dataset.user = this.dataset.user;

				if ( isYourself ) {
					text.innerText = i18n.msg( 'thankyou-yourself' ).plain();
				} else if ( isTooOld ) {
					text.innerText = i18n.msg( 'thankyou-too-old' ).plain();
				}
			} );
		}

		button.addEventListener( 'click', function () {
			var box = document.querySelector( '#tooltip-thankyou-wrapper' );
			if ( box ) {
				box.remove();
				return;
			}

			// suddenly, jQuery
			var tooltip = $( '<div>', {
				class: 'wds-tooltip is-right',
				css: {
					left: ( $( this ).offset().left + 50 ) + 'px',
					top: ( $( this ).offset().top - $( document ).scrollTop() + 20 ) + 'px',
					'z-index': 999
				},
				id: 'tooltip-thankyou-wrapper',
				html: content
			} ).appendTo( 'body' );
		} );

		thanksButton.addEventListener( 'click', function thanksUser() {
			var button = this;
			this.disabled = true;
			var revid = button.dataset.revid;
			var user = button.dataset.user;
			var avatar = document.querySelector( '.thankyou__avatar[data-user="' + user + '"]' );
			if ( avatar ) {
				avatar.dataset.thanked = true;
			}
			button.innerText = i18n.msg( 'thankyou-sent', user ).plain();

			var text = document.querySelector( '.thankyou__text' );

			api.postWithToken( 'csrf', {
				action: 'thank',
				rev: revid,
				source: 'dev-thankyou'
			} ).then( function() {
				text.innerText = i18n.msg( 'thankyou-success', user ).plain();
			} ).catch( function() {
				text.innerText = i18n.msg( 'thankyou-fail', user ).plain();
			} );
		} );
	}
	
	function findSelector( selector ) {
		var promise = $.Deferred();
		var interval = setInterval( function() {
			var $element = document.querySelector( selector );
			if ( $element ) {
				clearInterval( interval );
				promise.resolve( $element );
			}
		}, 300);
		return promise;

	}

	mw.hook( 'dev.ct' ).add( function ( CustomTools ) {
		api = new mw.Api();

		isThanksEnabled()
			.then( function ( enabled ) {
				if ( enabled ) {
					initialize( CustomTools );
				}
			} );
	} );

	importArticle( {
		type: 'script',
		articles: [
			'u:dev:MediaWiki:CustomTools.js'
		]
	} );
	importArticle( {
		type: 'style',
		article: 'u:pvzcc:MediaWiki:ThankYou.css'
	} );
} )();