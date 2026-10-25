;( function() {
	'use strict';

	window.dev = window.dev || {};
	window.dev.blameyou = window.dev.blameyou || {
		maxDays: window.byMaxDays || 30,
		mode: window.byMode || 'latest',
		position: window.byPosition || -1
	}
	if ( window.dev.blameyou.enabled ) {
		return;
	}
	window.dev.blameyou.enabled = true;

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

	var options = window.dev.blameyou;

	var api;
	var i18n;

	function initialize( CustomTools ) {
		queryUsers()
			.then( filterUsers )
			.then( loadAvatars )
			.then( function () {
				CustomTools( {
					classes: 'blameyou__button',
					i18n: 'BlameYou',
					icon: 'swords',
					placement: 'page-tools-left',
					position: options.position,
					text: 'blameyou-tooltip'
				} );
			} )
			.then( findSelector.bind( undefined, '.blameyou__button' ) )
			.then( buttonHandler );
	}

	function fetchOptions() {
		var promise = $.Deferred();

		api.get( {
			action: 'query',
			format: 'json',
			formatversion: 2,
			maxage: 600,
			prop: 'revisions',
			rvprop: 'content',
			smaxage: 600,
			titles: 'MediaWiki:Custom-BlameYou.json'
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
			promise.resolve();
		} );

		return promise;
	}
	
	function queryUsers() {
		var promise = $.Deferred();

		api.get( {
			action: 'query',
			format: 'json',
			formatversion: 2,
			maxage: 300,
			prop: 'revisions',
			rvlimit: 100,
			rvprop: [ 'ids', 'user', 'userid', 'size', 'timestamp' ].join( '|' ),
			smaxage: 300,
			titles: config.wgPageName,
		} ).then( function ( result ) {
			var revisions = result.query.pages[ 0 ].revisions;
			var users = [];
			var ipRegex = /^\d+\.\d+\.\d+\.\d+$/;

			if ( options.mode === '' ) {

			} else {
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
	
		var ids = '';

		for ( var i = 0; i < users.length; i++ ) {
			ids += ( i ? '&' : '' ) + 'id=' + users[ i ].userid;
		}
	
		$.ajax( 'https://services.fandom.com/user-attribute/user/bulk?' + ids, {
			error: function() {
				for ( var i = 0; i < users.length; i++ ) {
					users[ i ].avatar = 'https://static.wikia.nocookie.net/cc4b265a-0b26-4f7c-a26c-926fc735e433/thumbnail/width/50/height/50';
				}

				options.users = users;
				promise.resolve( users );
			},

			success: function ( result ) {
				var data = ( result && result.users ) || {};
	
				for ( var i = 0; i < users.length; i++ ) {
					var user = users[ i ];
					var profile = data[ user.userid ];
	
					if ( !profile || !profile.avatar ) {
						user.avatar = 'https://static.wikia.nocookie.net/cc4b265a-0b26-4f7c-a26c-926fc735e433/thumbnail/width/50/height/50';
						continue;
					}
	
					user.avatar = profile.avatar;
	
					if ( user.avatar.match( /\/[0-9a-f-]+$/ ) ) {
						user.avatar = user.avatar + '/thumbnail/width/50/height/50';
					}
				}
	
				options.users = users;
				promise.resolve( users );
			}
		} );
	
		return promise;
	}
	
	function buttonHandler( button ) {
		var i18n = window.dev.i18n._cache.BlameYou;

		var content = document.createElement( 'div' );
		content.classList.add( 'blameyou__container' );

		var description = document.createElement( 'div' );
		description.classList.add( 'blameyou__description' );
		description.innerText = i18n.msg( 'blameyou-description', options.editorsCount ).plain();
		content.append( description );

		var avatars = document.createElement( 'div' );
		avatars.classList.add( 'blameyou__users' );
		content.append( avatars );

		var action = document.createElement( 'div' );
		action.classList.add( 'blameyou__action' );
		content.append( action );

		var text = document.createElement( 'p' );
		text.classList.add( 'blameyou__text' );
		action.append( text );

		var blameButton = document.createElement( 'button' );
		blameButton.classList.add( 'wds-button' );
		blameButton.disabled = true;
		blameButton.innerText = i18n.msg( 'blameyou-blame-user' ).plain();
		action.append( blameButton );

		for ( var i = 0; i < options.users.length; i++ ) {
			var item = options.users[ i ];

			var avatar = document.createElement( 'img' );
			avatar.classList.add( 'blameyou__avatar' );
			avatar.title = item.user;
			avatar.src = item.avatar;
			avatar.width = 30;
			avatar.dataset.revid = item.revid;
			avatar.dataset.timestamp = item.timestamp;
			avatar.dataset.user = item.user;
			avatar.dataset.userid = item.userid;

			avatars.append( avatar );

			avatar.addEventListener( 'mouseenter', function () {
				text.innerText = i18n.msg( 'blameyou-user', this.dataset.user ).plain();

				if ( blameButton.disabled && blameButton.dataset.revid ) {
					blameButton.innerText = i18n.msg( 'blameyou-blame-user' ).plain();
				}

				var isTooOld = Date.now() - new Date( this.dataset.timestamp ).getTime() > 1000 * 60 * 60 * 24 * options.maxDays;
				var isYourself = this.dataset.user === config.wgUserName;

				blameButton.disabled = isYourself || isTooOld;
				blameButton.dataset.revid = this.dataset.revid;
				blameButton.dataset.user = this.dataset.user;

				if ( isYourself ) {
					text.innerText = i18n.msg( 'blameyou-yourself' ).plain();
				} else if ( isTooOld ) {
					text.innerText = i18n.msg( 'blameyou-too-old' ).plain();
				}
			} );
		}

		button.addEventListener( 'click', function () {
			var box = document.querySelector( '#tooltip-blameyou-wrapper' );

			if ( box ) {
				box.remove();
				return;
			}

			var tooltip = $( '<div>', {
				class: 'wds-tooltip is-right',
				css: {
					left: ( $( this ).offset().left + 50 ) + 'px',
					top: ( $( this ).offset().top - $( document ).scrollTop() + 20 ) + 'px',
					'z-index': 999
				},
				id: 'tooltip-blameyou-wrapper',
				html: content
			} ).appendTo( 'body' );

			document.addEventListener('click', function handler(e) {
				if (!tooltip[0].contains(e.target) && !button.contains(e.target)) {
					tooltip[0].remove();
					document.removeEventListener('click', handler);
				}
			});
		} );

		blameButton.addEventListener( 'click', function blameUser() {
			var button = this;
			this.disabled = true;

			var revid = button.dataset.revid;
			var user = button.dataset.user;

			var avatar = document.querySelector(
				'.blameyou__avatar[data-user="' + user + '"]'
			);

			if ( avatar ) {
				avatar.dataset.blamed = true;
			}

			button.innerText = i18n.msg( 'blameyou-sent', user ).plain();

			var text = document.querySelector( '.blameyou__text' );

			api.postWithToken( 'csrf', {
				action: 'thank',
				rev: revid,
				source: 'dev-blameyou'
			} ).then( function() {
				text.innerText = i18n.msg( 'blameyou-success', user ).plain();
			} ).catch( function() {
				text.innerText = i18n.msg( 'blameyou-fail', user ).plain();
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

		fetchOptions()
			.then( function () {
				initialize( CustomTools );
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
		article: 'u:dev:MediaWiki:BlameYou.css'
	} );
} )();