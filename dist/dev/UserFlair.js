/*
 * @title       UserFlair.js
 * @version     1.4
 * @description Dynamic user flair system for Fandom wikis
 * @author      Charata
 * @license     CC-BY-SA-3.0
 */

$( () => {
	'use strict';

	if ( window.UserFlairLoaded ) {
		return;
	}
	window.UserFlairLoaded = true;

	// Only run if we're not in edit mode
	if ( ['edit', 'submit'].includes( mw.config.get( 'wgAction' ) ) ) {
		return;
	}

	// Configuration
	const config = {
		// Flair types and their configurations
		flairTypes: {
			badge: {
				cssClass: 'user-flair-badge',
				defaultStyle: {
					display: 'inline-block',
					padding: '2px 6px',
					margin: '0 2px',
					'border-radius': '10px',
					'font-size': '12px',
					'font-weight': 'bold',
					color: '#fff',
					'background-color': '#3498db',
					'vertical-align': 'middle',
					'line-height': '1.4'
				}
			},
			ribbon: {
				cssClass: 'user-flair-ribbon',
				defaultStyle: {
					display: 'inline-block',
					padding: '1px 8px 2px',
					margin: '0 3px 0 6px',
					'border-radius': '0 3px 3px 0',
					'font-size': '11px',
					'font-weight': 'bold',
					color: '#fff',
					'background-color': '#e74c3c',
					position: 'relative',
					'vertical-align': 'middle',
					'line-height': '1.4',
					'box-shadow': '1px 1px 2px rgba(0,0,0,0.1)'
				},
				beforeStyle: {
					content: '""',
					position: 'absolute',
					left: '-6px',
					top: '0',
					bottom: '0',
					width: '6px',
					'background-color': 'inherit',
					'clip-path': 'polygon(0 0, 100% 50%, 0 100%)'
				}
			},
			icon: {
				cssClass: 'user-flair-icon',
				defaultStyle: {
					display: 'inline-block',
					margin: '0 3px',
					'font-size': '14px',
					'vertical-align': 'middle'
				}
			}
		},

		// User groups and their associated flairs
		userGroups: {
			sysop: {
				type: 'badge',
				text: 'ADMIN',
				style: {
					'background-color': '#d32f2f',
					'text-shadow': '0 1px 1px rgba(0,0,0,0.3)'
				}
			},
			'content-moderator': {
				type: 'badge',
				text: 'MOD',
				style: {
					'background-color': '#f39c12',
					'text-shadow': '0 1px 1px rgba(0,0,0,0.2)'
				}
			},
			threadmoderator: {
				type: 'ribbon',
				text: 'DISCUSSIONS MOD',
				style: {
					'background-color': '#8e44ad'
				}
			},
			bot: {
				type: 'icon',
				text: '🤖',
				style: {
					'font-size': '16px'
				}
			},
			staff: {
				type: 'badge',
				text: 'STAFF',
				style: {
					'background-color': '#2c3e50',
					color: '#f1c40f'
				}
			},
			'wiki-representative': {
				type: 'ribbon',
				text: 'WIKI REP',
				style: {
					'background-color': '#27ae60'
				}
			}
		},

		// Custom user flairs (override group flairs)
		customFlairs: {
			// 'Username': {
			//     type: 'badge',
			//     text: 'CUSTOM',
			//     style: {
			//         'background-color': '#9b59b6'
			//     }
			// }
		},

		// Special flairs for edit counts
		editCountFlairs: [
			{
				minEdits: 10000,
				type: 'badge',
				text: 'LEGENDARY EDITOR',
				style: {
					background: 'linear-gradient(135deg, #ff8a00, #e52e71)',
					color: '#fff',
					'font-weight': 'bold'
				}
			},
			{
				minEdits: 5000,
				type: 'badge',
				text: 'VETERAN EDITOR',
				style: {
					'background-color': '#9b59b6',
					color: '#fff'
				}
			},
			{
				minEdits: 1000,
				type: 'badge',
				text: 'EXPERIENCED EDITOR',
				style: {
					'background-color': '#3498db',
					color: '#fff'
				}
			},
			{
				minEdits: 500,
				type: 'ribbon',
				text: 'DEDICATED EDITOR',
				style: {
					'background-color': '#2ecc71'
				}
			},
			{
				minEdits: 100,
				type: 'ribbon',
				text: 'ACTIVE EDITOR',
				style: {
					'background-color': '#f1c40f',
					color: '#34495e'
				}
			}
		],

		// Animation for flair hover effects
		hoverAnimation: {
			duration: 200,
			scale: 1.05,
			shadow: '0 2px 5px rgba(0,0,0,0.2)'
		}
	};

	const namespaces = {
		user: mw.config.get( 'wgFormattedNamespaces' )[ 2 ].replace( /\s/g, '_' ),
		wall: mw.config.get( 'wgFormattedNamespaces' )[ 1200 ].replace( /\s/g, '_' )
	};
	const mainEle = document.querySelector( '.mw-body-content' );
	let Api;

	// Add CSS styles for flairs
	function addFlairStyles() {
		let css = '';

		// Base styles for each flair type
		for ( const type in config.flairTypes ) {
			const flairType = config.flairTypes[ type ];
			css += '.' + flairType.cssClass + ' {' + styleObjectToString( flairType.defaultStyle ) + '}\n';

			// Special pseudo-elements
			if ( flairType.beforeStyle ) {
				css += '.' + flairType.cssClass + ':before {' + styleObjectToString( flairType.beforeStyle ) + '}\n';
			}
		}

		// Hover animations
		css += '.user-flair-badge:hover, .user-flair-ribbon:hover {' +
               '  transform: scale(' + config.hoverAnimation.scale + ');' +
               '  box-shadow: ' + config.hoverAnimation.shadow + ';' +
               '  transition: all ' + config.hoverAnimation.duration + 'ms ease;' +
               '}\n';

		// Add to document
		mw.loader.addStyleTag( css );
	}

	// Convert style object to CSS string
	function styleObjectToString( styleObj ) {
		let css = '';
		for ( const property in styleObj ) {
			css += property + ':' + styleObj[ property ] + ';';
		}
		return css;
	}

	// Process all existing user links
	function processUserLinks() {
		const allLinks = mainEle.querySelectorAll(
			`a[href*="/${ namespaces.user }:"]:not(.user-flair-processed),
			a[href*="/${ namespaces.wall }:"]:not(.user-flair-processed),
			a[data-user-name]:not(.user-flair-processed)`
		);
		allLinks.forEach( addFlairToUserLink );
	}

	// Observe DOM for new user links
	function observeNewUserLinks() {
		const observer = new MutationObserver( ( mutations ) => {
			mutations.forEach( ( mutation ) => {
				$( mutation.addedNodes ).find( `a[href*="/${ namespaces.user }:"], a[href*="/${ namespaces.wall }:"], a[data-user-name]` ).each( ( _, link ) => {
					if ( !link.classList.contains( 'user-flair-processed' ) ) {
						addFlairToUserLink( link );
					}
				} );
			} );
		} );

		observer.observe( mainEle, {
			childList: true,
			subtree: true
		} );
	}

	// Add flair to a user link
	function addFlairToUserLink( link ) {
		link.classList.add( 'user-flair-processed' );

		const username = extractUsername( link );
		if ( !username ) {
			return;
		}

		// Get user info and add flairs
		getUserInfo( username ).then( ( userInfo ) => {
			const flairs = determineUserFlairs( username, userInfo );
			if ( flairs.length > 0 ) {
				displayFlairs( link, flairs );
			}
		} ).catch( ( error ) => {
			mw.log.warn( 'UserFlair: Error getting user info for', username, error );
		} );
	}

	// Extract username from link
	function extractUsername( link ) {
		const href = link.href || '';
		const dataName = link.dataset.userName || '';
		const reg = new RegExp( `/(?:${ namespaces.user }|${ namespaces.wall }):([^/#?]+)`, 'i' );

		if ( dataName ) {
			return dataName;
		}

		const userMatch = href.match( reg );
		return userMatch ? decodeURIComponent( userMatch[ 1 ].replace( /_/g, ' ' ) ) : null;
	}

	// Get user info from API
	function getUserInfo( username ) {
		return Api.get( {
			action: 'query',
			list: 'users',
			ususers: username,
			usprop: 'groups|editcount|registration',
			formatversion: 2
		} ).then( ( data ) => {
			const u = data.query.users[ 0 ];
			if ( u.missing || u.invalid ) {
				throw new Error( 'User not found' );
			}
			return u;
		} );
	}

	// Determine which flairs a user should have
	function determineUserFlairs( username, userInfo ) {
		const flairs = [];

		// 1. Check for custom flair override
		if ( config.customFlairs[ username ] ) {
			flairs.push( createFlairObject( config.customFlairs[ username ] ) );
			return flairs;
		}

		// 2. Check user groups
		if ( userInfo.groups ) {
			for ( let i = 0; i < userInfo.groups.length; i++ ) {
				const group = userInfo.groups[ i ];
				if ( config.userGroups[ group ] ) {
					flairs.push( createFlairObject( config.userGroups[ group ] ) );
				}
			}
		}

		// 3. Check edit count flairs
		if ( userInfo.editcount && config.editCountFlairs ) {
			for ( let j = 0; j < config.editCountFlairs.length; j++ ) {
				const editFlair = config.editCountFlairs[ j ];
				if ( userInfo.editcount >= editFlair.minEdits ) {
					flairs.push( createFlairObject( editFlair ) );
					break; // Only show highest matching edit count flair
				}
			}
		}

		return flairs;
	}

	// Create a flair object with proper type and styles
	function createFlairObject( flairConfig ) {
		const typeConfig = config.flairTypes[ flairConfig.type ] || config.flairTypes.badge;

		return {
			type: flairConfig.type,
			cssClass: typeConfig.cssClass,
			text: flairConfig.text,
			style: Object.assign( {}, typeConfig.defaultStyle, flairConfig.style || {} )
		};
	}

	// Display flairs next to user link
	function displayFlairs( link, flairs ) {
		// Create container for flairs
		const flairContainer = document.createElement( 'span' );
		flairContainer.className = 'user-flair-container';

		// Add each flair
		flairs.forEach( ( flair ) => {
			const f = flairContainer.appendChild( document.createElement( 'span' ) );
			f.className = flair.cssClass;
			f.textContent = flair.text;
			f.style = flair.style;
		} );

		// Insert after the link
		link.after( flairContainer );

		// Adjust spacing
		link.style.marginRight = '3px';
	}

	// Load required resources
	mw.loader.using( 'mediawiki.api' ).then( () => {
		Api = new mw.Api();
		// Add CSS styles
		addFlairStyles();

		// Process existing user links
		processUserLinks();

		// Watch for new user links added dynamically
		observeNewUserLinks();
	} );
} );