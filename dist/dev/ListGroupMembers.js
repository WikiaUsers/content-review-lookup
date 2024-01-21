/**
 * ListGroupMembers
 * 
 * A script that loads a list of all users in
 * canonical (and custom) user groups.
 * 
 * @author  Ultimate Dark Carnage
 * @version 1.7
 **/
( function( window, $, mw ){
	"use strict";
	if ( window._LGMLoaded ) return;
	window._LGMLoaded = true;

	// Creates a utility no-op function
	function noop( ) { }

	// Seed generator
    function seed( s ) { 
        const m = 0xffffffff;
 
        var w = ( 123456789 + s ) & m, z = ( 987654321 - s ) & m;
        return function h( ) { 
            z = ( 36969 * ( z & 65535 ) + ( z >>> 16 ) ) & m;
            w = ( 18000 * ( w & 65535 ) + ( w >>> 16 ) ) & m;
 
            var r = ( ( z << 16 ) + ( w & 65535 ) ) >>> 0;
            r /= 4294967296;
            return r;
        };
    }

	// Creating the defaults function
	function defaults( target ) { 
		const args = Array.from( arguments ).slice( 1 );
		args.forEach( function( currentObject ) { 
			const keys = currentObject === Object( currentObject ) ? 
				Object.keys( currentObject ) : [ ];
			
			keys.forEach( function( key ) { 
				if ( target[ key ] !== void 0 ) return;
				target[ key ] = currentObject[ key ];
			} );
		} );
		return target;
	}

	// Escaping RegExp characters
	function regesc( s ) {
        return s.replace( /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&" );
    }

	// Creates a new object
	function createObject( object ) { 
		return new Proxy( object , { 
			get: function( target, property ) { 
				if ( !target.hasOwnProperty( property ) ) return null;
				return target[ property ];
			}
		} );
	}

	// Creates proxy traps for the ListGroupMembers object
	const lgmTraps = Object.freeze( { 
		get: function( target, property ) { 
			return target[ property ] !== undefined ? target[ property ] : null;
		}
	} );

	// Creates the primary object
	const listGroupMembers = new Proxy( { 
		// MediaWiki configuration variables
		mwConfig: mw.config.get( ),
		// The current script name
		name: "ListGroupMembers",
		// The seed number for randomizing numbers
		seed: 0,
		// The founding date
		foundingDate: "October 18, 2004",
		// The current user group order
		order: Object.freeze( [ 
			"staff",
			"wiki-representative",
			"wiki-specialist",
			"soap",
			"global-discussions-moderator",
			"voldev",
			"bureaucrat",
			"sysop",
			"threadmoderator",
			"content-moderator",
			"rollback",
			"bot"
		] ),
		// The current user group registry
		registry: Object.freeze( { 
			GLOBAL: Object.freeze( [ 
				"staff",
				"wiki-representative",
				"wiki-specialist",
				"soap",
				"global-discussions-moderator",
				"voldev"
			] ),
			LOCAL: Object.freeze( [ 
				"bureaucrat",
				"sysop",
				"threadmoderator",
				"content-moderator",
				"rollback",
				"bot"
			] )
		} ),
		// Creates the user group aliases
		aliases: Object.freeze( { 
			"staff": [ "fandom-staff" ],
			"wiki-representative": [ "wiki-manager" ],
			"wiki-specialist": [ "content-team-member" ],
			"soap": [ "grasp", "vstf" ],
			"bureaucrat": [ "bcrat", "crat" ],
			"sysop": [ "admin" ],
			"rollback": [ "rollbacker" ],
			"threadmoderator": [ "discussions-moderator", "discussion-moderator" ]
		} ),
		// The default configuration objects for the script
		defaults: Object.freeze( { 
			// The user groups to include
			include: [ ],
			// The user groups to exclude
			exclude: [ ],
			// Determines whether the list is separated into user groups
			grouped: true,
			// Sets the default sorting algorithm
			sort: "ALPHA_ASCENDING",
			// Determines whether to show a search bar on the UI
			search: false,
			// Determines whether to use the registry
			useRegistry: false,
			// Sets the delay for loading the script
			delay: 30 * 1000,
			// Sets the view of the UI
			type: "card",
			// An array of user actions
			actions: [ ]
		} ),
		// Lists the sorting algoritms
		sort: Object.freeze( { 
			ALPHA_ASCENDING: function( a, b ) { 
				return a.name.localeCompare( b.name );
			},
			ALPHA_DESCENDING: function( a, b ) { 
				return -a.name.localeCompare( b.name );
			},
			ALPHA: "ALPHA_ASCENDING",
			ALPHA_ASC: "ALPHA_ASCENDING",
			ALPHA_DESC: "ALPHA_DESCENDING",
			REGISTRATION_ASCENDING: function( a, b ) { 
				return a.registration - b.registration;
			},
			REGISTRATION_DESCENDING: function( a, b ) { 
				return b.registration - a.registration;
			},
			REGISTRATION: "REGISTRATION_ASCENDING",
			REGISTRATION_ASC: "REGISTRATION_ASCENDING",
			REGISTRATION_DESC: "REGISTRATION_DESCENDING",
			GROUP_ASCENDING: function( a, b ) { 
				if ( this.options.grouped ) return this.sort.ALPHA_ASCENDING.apply( this, [ a, b ] );
				const aGroup = this.order.indexOf( a.group );
				const bGroup = this.order.indexOf( b.group );
				return aGroup - bGroup;
			},
			GROUP_DESCENDING: function( a, b ) { 
				if ( this.options.grouped ) return this.sort.ALPHA_ASCENDING.apply( this, [ a, b ] );
				const aGroup = this.order.indexOf( a.group );
				const bGroup = this.order.indexOf( b.group );
				return bGroup - aGroup;
			},
			GROUP: "GROUP_ASCENDING",
			GROUP_ASC: "GROUP_ASCENDING",
			GROUP_DESC: "GROUP_DESCENDING",
			RANDOM: function( ) { 
				return ( Math.random( ) - 0.5 ) * 2;
			},
			RANDOM_SEED: function( ) { 
				const seedFn = seed( this.seed++ );
				return ( seedFn( ) - 0.5 ) * 2;
			},
			DEFAULT: "ALPHA_ASCENDING"
		} ),
		// The user cache
		cache: new Map( ),
		// The user list
		users: createObject( { } ),
		// The state object
		state: createObject( { 
			resourcesLoaded: false,
			messagesLoaded: false,
			matchesPage: false,
			globalUsersLoaded: false,
			localUsersLoaded: false,
			created: false,
			// The object that determines how the UI is rendered
			renderOptions: createObject( { 
				loaded: false,
				sort: null
			} ),
			rendered: false,
			renderInterval: null,
			linkInToolbar: false
		} ),
		// Scripts and modules
		scripts: Object.freeze( { 
			i18n: "u:dev:MediaWiki:I18n-js/code.js",
			colors: "u:dev:MediaWiki:Colors/code.js",
			wds: "u:dev:MediaWiki:WDSIcons/code.js",
			dorui: "u:dev:MediaWikki:UI-js/code.js"
		} ),
		// Stylesheets
		stylesheets: Object.freeze( [ 
			"u:dev:MediaWiki:ListGroupMembers.css"
		] ),
		// MediaWiki dependencies
		dependencies: Object.freeze( [ 
			"mediawiki.util",
			"mediawiki.api",
			"mediawiki.Title"
		] ),
		// Fetches the sort function
		getSort: function( name ) { 
			if ( arguments.length === 0 ) name = this.sort.DEFAULT;
			if ( typeof name === "function" ) return name;

			const sort = $.extend( { }, this.sort );

			const finalName = String( name ).toUpperCase( );

			const sortKeys = Object.keys( sort );
			if ( !sortKeys.includes( finalName ) ) return noop;
			
			const value = sort[ finalName ];
			if ( typeof value === "function" ) return value;
			if ( typeof value !== "string" ) return noop;

			const finalSortFn = sort[ value ];
			return finalSortFn;
		},
		// Fetches the canonical user group
		getGroup: function( group ) { 
			const registry = arguments.length > 1 ? arguments[ 1 ] : this.order;
			
			const aliases = $.extend( { }, this.aliases );
			if ( !Array.isArray( registry ) ) return this.getGroupFromRegistry( group, registry );
			
			const isCanonicalGroup = registry.includes( group );
			if ( isCanonicalGroup ) return group;

			const isAlias = registry.some( function( targetGroup ) { 
				return aliases.hasOwnProperty( targetGroup ) && aliases[ targetGroup ].includes( group );
			}, this );

			if ( isAlias ) return registry.find( function( targetGroup ) { 
				return aliases[ targetGroup ].includes( group );
			} );

			return group;
		},
		// Fetches the canonical user group from the registry object
		getGroupFromRegistry: function( group, registry ) { 
			const aliases = $.extend( { }, this.aliases );

			const keys = Object.keys( registry );
			if ( keys.length === 0 ) return group;

			while ( keys.length ) { 
				const groupType = keys.shift( );
				const subRegistry = registry[ groupType ];

				if ( subRegistry.includes( group ) ) return group;
			}
				
			const aliasKeys = Object.keys( aliases );
				
			while ( aliasKeys.length ) { 
				const targetGroup = aliasKeys.shift( );
				const aliasArray = aliases[ targetGroup ];

				if ( aliasArray.includes( group ) ) return targetGroup;
			}

			return null;
		},
		// Fetches the group type
		getGroupType: function( group ) { 
			const registry = $.extend( { }, this.registry ), types = Object.keys( registry );
			return types.find( function( type ) { 
				const groups = registry[ type ];
				return groups.includes( group );
			}, this ) || "other";
		},
		// Orders all user groups
		orderGroups: function( a, b ) { 
			return this.order.indexOf( a ) - this.order.indexOf( b );
		},
		// Loads all resources
		load: function( callback ) { 
			const user = this.mwConfig.wgUserName;
			const userStylesheet = user + "/lgm.css", userScript = user + "/lgm.js";

			const importedScripts = Object.keys( this.scripts ).map( function( scriptId ) { 
				const scriptName = this.scripts[ scriptId ];
				if ( window.dev.hasOwnProperty( scriptId ) ) return Promise.resolve( window.dev[ scriptId ] );
				return importArticle( { type: "script", article: scriptName } );
			}, this ).concat( importArticle( { type: "script", article: userScript } ) );
			
			const importedStylesheets = Array.from( this.stylesheets.concat( userStylesheet ) ).map( function( stylesheet ) { 
				return importArticle( { type: "style", article: stylesheet } );
			}, this );
			
			const resources = [ mw.loader.using( this.dependencies ) ].concat( importedScripts, importedStylesheets );
			
			return Promise.all( resources ).then( callback );
		},
		// Starts the script
		start: function( ) { 
			return this.load( this.loadMessages.bind( this ) );
		},
		// Loads all messages
		loadMessages: function( ) { 
			this.state.resourcesLoaded = true;

			this.i18no = window.dev.i18n;
			this.colors = window.dev.colors;
			this.wds = window.dev.wds;
			this.ui = window.dev.dorui;

			// return this.i18no.loadMessages( this.name ).then( this.init.bind( this ) );
			return this.i18no.loadMessages( this.name ).then( this.check.bind( this ) );
		},
		// Fetches the message
		msg: function( key ) { 
			if ( !this.i18n ) return null;

			const i18n = this.i18n; 
			
			function createPlainMessage( args ) { 
				return i18n.msg.apply( i18n, args ).plain( );
			}

			return createObject( { 
				plain: function( ) { 
					const a = [ key ].concat( Array.from( arguments ) );
					return createPlainMessage( a );
				},
				escape: function( ) { 
					const a = [ key ].concat( Array.from( arguments ) );
					return i18n.msg.apply( i18n, a ).escape( );
				},
				parse: function( ) { 
					const a = [ key ].concat( Array.from( arguments ) );
					return i18n.msg.apply( i18n, a ).escape( );
				},
				encode: function( ) { 
					const a = [ key ].concat( Array.from( arguments ) );
					const msg = createPlainMessage( a );
					return encodeURIComponent( msg );
				},
				decode: function( ) { 
					const a = [ key ].concat( Array.from( arguments ) );
					const msg = createPlainMessage( a );
					return decodeURIComponent( msg );
				},
				replace: function( replacer ) { 
					const msg = createPlainMessage( [ key ] );
					return Object.keys( replacer ).reduce( function( result, key ) { 
						return result.replace( new RegExp( "\\$" + regesc( key ), "g" ), replacer[ key ] );
					}, msg );
				},
				toString: function( ) { 
					return this.plain( );
				},
				exists: i18n.msg( key ).exists
			} );
		},
		// Checks if the page is correct
		check: function( i18n ) { 
			this.i18n = i18n;
			if ( this.mwConfig.wgCanonicalNamespace.toLowerCase( ) !== "special" ) return this.generateLink( i18n );
			const isBlankPage = this.mwConfig.wgCanonicalSpecialPageName && this.mwConfig.wgCanonicalSpecialPageName.toLowerCase( ) === "blankpage";

			const titleFallback = this.name, titleExists = this.msg( "page" ).exists;
			const title = titleExists ? this.msg( "page" ).escape( ) : titleFallback;

			const pageTitle = this.mwConfig.wgTitle.split( "/" )[ Number( isBlankPage ) ];
			if ( pageTitle !== title ) return this.generateLink( );

			this.state.matchesPage = true;
			return this.init( );
		},
		// Initializes the script
		init: function( ) { 
			this.state.messagesLoaded = true;
			this.groups = Array.from( this.order );
			this.options = defaults( $.extend( { }, window.LGMOptions ), this.defaults );

			if ( Array.isArray( this.options.exclude ) && this.options.exclude.length ) { 
				this.groups = this.groups.filter( function( group ) { 
					return !this.options.exclude.some( function( excluded ) { 
						if ( excluded instanceof RegExp ) return excluded.test( group );
						return excluded === group;
					} );
				}, this );

				this.options.includes = [ ].concat( this.options.include || [ ] ).filter( function( group ) { 
					return !this.options.exclude.includes( group );
				}, this );
			}

			if ( Array.isArray( this.options.include ) && this.options.include.length ) {
				this.groups = this.groups.concat( this.options.includes ).filter( function( group ) { 
					return typeof group === "string";
				} );
			}

			this.groups = Array.from( new Set( this.groups ) )
				.map( this.getGroup, this )
				.sort( this.orderGroups.bind( this ) );
			
			if ( this.options.grouped ) { 
				if ( this.options.useRegistry ) { 
					this.users = Object.keys( this.registry ).reduce( function( target, type ) { 
						target[ type ] = this.registry[ type ].reduce( function( users, group ) { 
							users[ group ] = [ ];
							return users;
						}.bind( this ), { } );
						return target;
					}.bind( this ), { } );
				} else {
					this.users = this.groups.reduce( function( users, group ) { 
						users[ group ] = [ ];
						return users;
					}.bind( this ), { } );
				}
			}

			this.state.renderOptions.groups = this.groups;
			this.state.renderOptions.search = this.options.search;
			this.state.renderOptions.actions = this.options.actions;
			this.state.renderOptions.type = this.options.type;
			this.state.renderOptions.sort = this.getSort( this.options.sort );

			return this.create( );
		},
		// Utility function to load all global users
		loadGlobalUsers: function( groups ) { 
			const globalGroups = groups.filter( function( group ) { 
				return this.registry.GLOBAL.includes( group );
			}, this );

			return this.loadGlobalUserPage( globalGroups )
				.then( this.parseUsers.bind( this ) );
		},
		// Utility function to load the global user page
		loadGlobalUserPage: function( groups ) { 
			const params = createObject( groups.reduce( function( target, group, index ) { 
				target[ "groups[" + index + "]" ] = group;
				return target;
			}, { } ) );

			const listGlobalUsersPage = this.mwConfig.wgFormattedNamespaces[ "-1" ] + ":" + /* this.msg( "global-users" ).escape( ) */ "ListGlobalUsers";

			return $.get( mw.util.getUrl( listGlobalUsersPage, params ) );
		},
		// Utility function to load all local users
		loadLocalUsers: function( groups ) { 
			const localGroups = groups.filter( function( group ) { 
				return !this.registry.GLOBAL.includes( group );
			}, this );

			return Promise.all( localGroups.map( this.loadUsers, this ) );
		},
		// Utility function to load all users from a group
		loadUsers: function( group ) { 
			return ( new mw.Api( ) ).get( { 
				format: "json",
				action: "query",
				list: "allusers",
				augroup: group.split( "|" )[ 0 ],
				aulimit: "max"
			} ).then( this.handleUsers.bind( this, group ) );
		},
		// Utility function to load user data
		loadUserData: function( user ) { 
			return $.get( this.mwConfig.wgScriptPath + "/wikia.php", { 
				controller: "UserProfile",
				method: "getUserData",
				format: "json",
				userId: user.userid
			} ).then( this.handleUserData.bind( this, user ) );
		},
		// Utility function to parse user data
		parseUsers: function( response ) { 
			const $wrapper = $( response );
			const fetchAllUsers = $wrapper.find( ".list-global-users-members > li" )
				.map( this.parseUser.bind( this ) )
				.toArray( );

			return Promise.all( fetchAllUsers );
		},
		// Utility function to parse an individual user
		parseUser: function( index, target ) { 
			const $target = $( target );
			const $groups = $target.contents( ).filter( function( i, item ) { 
				return item.nodeType === 3 && !item.nextSibling;
			} );

			const name = $target.find( "bdi" ).text( );
			const groups = $groups.text( ).trim( )
				.slice( 1, -1 ).split( ", " )
				.filter( function( group ) { 
					return this.groups.includes( group );
				}, this )
				.sort( this.orderGroups.bind( this ) );

			const user = createObject( { name: name, group: groups[ 0 ] } );
			return this.parseUserData( user ).then( this.handleGlobalUser.bind( this, user ) );
		},
		// Utility function to parse data from a user
		parseUserData: function( user ) { 
			return ( new mw.Api( ) ).get( { 
				action: "query",
				list: "users",
				ususers: user.name,
				format: "json"
			} );
		},
		// Handles the global user
		handleGlobalUser: function( user, response ) { 
			const userObject = response.query.users[ 0 ];
			user.userid = userObject.userid;
			return this.loadUserData( user );
		},
		// Handles the user list
		handleUsers: function( group, response ) { 
			const query = response.query;
			if ( query.allusers.length >= 500 ) return [ ];

			const users = Array.from( query.allusers ).map( function( user ) { 
				return createObject( { name: user.name, group: group, userid: user.userid } );
			} );

			return Promise.all( users.map( this.loadUserData, this ) );
		},
		// Handles user data
		handleUserData: function( user, response ) {
			const userData = response.userData;

			user.registration = new Date( userData.registration || this.foundingDate );
			user.edits = parseInt( String( userData.edits ).split( "," ).join( "" ) );
			user.avatar = userData.avatar;
			user.groups = [ user.group ];

			if ( this.cache.has( user.name ) ) { 
				const target = this.cache.get( user.name );
				
				if ( this.options.grouped ) { 
					const originalGroup = target.groups[ 0 ];
					
					if ( !this.useRegistry ) { 
						const index = this.users[ originalGroup ].findIndex( function( u ) { 
							return u.name === user.name;
						} );
						this.users[ originalGroup ][ index ].groups.push( user.group );
					} else { 
						const type = this.getGroupType( originalGroup );
						const index = this.users[ type ][ originalGroup ].findIndex( function( u ) { 
							return u.name === user.name;
						} );
						this.users[ type ][ originalGroup ][ index ].groups.push( group );
					}
				} else { 
					const index = this.users.findIndex( function( u ) { 
						return u.name === user.name;
					} );

					this.users[ index ].groups.push( user.group );
					target.groups.push( user.group );
				}

				this.cache.set( user.name, target );
				return target;
			}

			if ( this.options.grouped ) { 
				const type = this.getGroupType( user.group );
				if ( this.options.useRegistry ) {
					this.users[ type ][ user.group ].push( user );
				} else this.users[ user.group ].push( user );
			} else this.users.push( user );

			this.cache.set( user.name, user );
			return user;
		},
		// Creates the list
		create: function( ) { 
			// Sets the document title to loading
			document.title = "Loading all group members...";

			// Step 1: Load all global users
			return this.loadGlobalUsers( this.groups )
				// Step 2: Load all local users
				.then( this.loadLocalUsers.bind( this, this.groups ) )
				// Step 3: Render the list
				.then( this.renderList.bind( this ) );
		},
		renderList: function( ) { 
			this.state.globalUsersLoaded = true;
			this.state.localUsersLoaded = true;
			
			this.wrapper = this.ui.div( { 
				classes: [ "list-group-members-wrapper", "lgm-wrapper" ],
				id: "lgm-wrapper",
				children: [ 
					// this.renderHeader( ),
					this.ui.section( {
						classes: [ "list-group-members-list-wrapper", "lgm-list-wrapper" ],
						id: "lgm-list-wrapper",
						child: this.renderContent( )
					} )
				]
			} );

			mw.hook( "wikipage.content" ).add( function( $content ) { 
				const el = $content.get( 0 );
				el.innerHTML = "";
				el.insertAdjacentElement( "afterbegin", this.wrapper );
			}.bind( this ) );

			this.state.created = true;
			this.state.renderInterval = setTimeout( 
				this.loadUI.bind( this ), 
				this.options.delay || 30 * 1000 
			);
		},
		loadUI: function( ) { 
			clearTimeout( this.state.renderInterval );
			
			if ( this.state.renderOptions.rendered ) return;
			this.state.renderOptions.rendered = true;
			
			const content = this.wrapper.querySelector( ".list-group-members" );
			content.classList.remove( "lgm-loading" );
			const allUsers = content.querySelectorAll( ".list-group-members-user" );
			allUsers.forEach( this.loadUserUI, this );
			
			document.title = this.msg( "doc-title" ).replace( { 
				"SITENAME": this.mwConfig.wgSiteName
			} );
		},	
		loadUserUI: function( userElement ) { 
			const username = userElement.dataset.user;
			const user = this.cache.get( username );

			const avatarElement = this.ui.img( { 
				classes: [ "list-group-members-avatar" ],
				src: user.avatar
			} );

			const avatarWrapper = userElement.querySelector( ".list-group-members-user-avatar-wrapper" );
			avatarWrapper.insertAdjacentElement( "afterbegin", avatarElement );

			const userHeading = userElement.querySelector( ".list-group-members-user-heading" );
			const userLink = this.ui.a( { 
				href: mw.util.getUrl( "User:" + user.name ),
				text: user.name
			} );
			userHeading.insertAdjacentElement( "afterbegin", userLink ); 

			const userGroup = userElement.querySelector( ".list-group-members-user-group" ); 
			userGroup.textContent = this.msg( user.group ).escape( );
			
			const content = userElement.querySelector( ".list-group-members-user-content" );
			content.insertAdjacentElement( "afterbegin", this.ui.ul( { 
				classes: [ "list-group-members-user-info", "lgm-user-info" ],
				children: [ 
					user.groups.length > 1 && this.ui.li( { 
						classes: [ "list-group-members-user-groups", "lgm-user-groups", "lgm-section" ],
						children: [ 
							this.ui.div( { 
								classes: [ "lgm-section-title" ],
								text: "Groups:"
							} ),
							this.ui.div( { 
								classes: [ "lgm-section-content" ],
								text: user.groups
									.map( this.getGroup, this )
									.join( ", " )
							} )
						]
					} ),
					this.ui.li( { 
						classes: [ "list-group-members-user-registration", "lgm-user-registration" ],
						children: [ ]
					} ),
					this.ui.li( { } )
				]
			} ) );
		},	
		renderHeader: function( ) { 
			this.search = this.renderControl( { 
				label: "Search",
				type: "text", 
				attrs: { 
					id: "lgm-search",
					classes: [ "lgm-search", "list-group-members-search" ],
					events: { 
						input: this.changeValue.bind( this )
					}
				}
			} );

			this.header = this.ui.header( { 
				classes: [ "list-group-members-header", "lgm-header" ],
				id: "lgm-header",
				child: this.ui.div( { 
					classes: [ "list-group-members-header-wrapper", "lgm-wrapper" ],
					attrs: { 
						"data-state": "search"
					},
					children: [ 
						this.search
					]
				} )
			} );

			return this.header;
		},
		changeValue: function( event ) { 
			const target = event.target;
			const tagName = event.target.tagName.toLowerCase( );

			const type = tagName === "input" ? event.target.type : tagName;
			const options = createObject( { type: type, target: target } );

			return this.changeRenderState( options );
		},
		changeRenderState: function( options ) { 
			const checkTypes = Object.freeze( [ "radio", "checkbox" ] );
			
			const isCheck = checkTypes.includes( options.type );
			const isSelect = options.type === "select";
			const target = options.target;

			const state = target.getAttribute( "data-state" );

			if ( isSelect ) { 
				const selectedIndex = target.selectedIndex;
				const options = target.options;

				const value = options[ selectedIndex ].value;
				this.state.renderOptions[ state ] = value;
			}
			
			else if ( isCheck ) this.state.renderOptions[ state ] = Boolean( target.checked );
			else this.state.renderOptions[ state ] = target.value;

			// return this.rerender( );
		},
		renderControl: function( options ) { 
			const inputTypes = Object.freeze( [ 
				"text",
				"radio",
				"checkbox",
				"email",
				"search",
				"tel",
				"url",
				"number",
				"color",
				"range",
				"datetime-local",
				"month",
				"week",
				"time",
				"date"
			] );

			const controlTypes = Object.freeze( [ 
				"select",
				"option",
				"optgroup",
				"textarea"
			] );

			const type = options.type;
			const classes = [ "lgm-form-control-el" ].concat( options.attr.classes );
			delete options.attr.classes;
			
			if ( inputTypes.includes( type ) ) return this.ui.frag( [
				options.label && options.attr.id && this.ui.label( { "for": options.attr.id, text: options.label, classes: [ "list-group-members-label", "lgm-label" ] } ),
				this.ui.input( $.extend( { type: type, classez: classes } ), options.attr )
			] );

			if ( controlTypes.includes( type ) ) return this.ui.frag( [ 
				options.label && options.attr.id && this.ui.label( { "for": options.attr.id, text: options.label, classes: [ "list-group-members-label", "lgm-label" ] } ),
				this.ui[ type ]( $.extend( { classes: classes }, options.attr ) )
			] );

			return false;
		},
		renderContent: function( ) { 
			return this.ui.nav( { 
				classes: {
					"list-group-members": true,
					"lgm-list": true,
					"lgm-loading": true,
					"lgm-grouped": this.options.grouped,
					"lgm-use-type": this.options.useRegistry
				},
				id: "lgm-list",
				attrs: { 
					"data-list-type": this.getDataListType( )
				},
				child: this.renderChild( )
			} );
		},
		getDataListType: function( ) { 
			if ( !this.options.grouped ) return "allusers";
			return this.options.useRegistry ? "type" : "grouped";
		},
		renderChild: function( ) { 
			if ( !this.options.grouped ) return this.renderAllUsers( );
			return this.options.useRegistry ? this.renderTypes( ) : this.renderGroups( );
		},
		renderAllUsers: function( ) { 
			return this.ui.ul( { 
				classes: [ "list-group-members-users", "lgm-users" ],
				id: "lgm-users",
				children: this.users
					.sort( this.state.renderOptions.sort.bind( this ) )
					.map( this.renderUser, this )
			} );
		},
		renderGroups: function( ) { 
			return this.ui.frag( Object.keys( this.users ).map( this.renderUsersByGroup, this ) );
		},
		renderUsersByGroup: function( group ) { 
			return this.users[ group ] && this.users[ group ].length && this.ui.section( { 
				classes: [ "list-group-members-group", "lgm-group" ],
				attrs: { 
					"data-group": group
				},
				children: [ 
					this.ui.header( { 
						classes: [ "list-group-members-group-header", "lgm-group-header" ],
						child: this.ui.h3( { 
							text: this.msg( group ).escape( )
						} )
					} ),
					this.ui.ul( { 
						classes: [ "list-group-members-users", "lgm-users" ],
						id: "lgm-users",
						children: this.users[ group ]
							.sort( this.state.renderOptions.sort.bind( this ) )
							.map( this.renderUser, this )
					} )
				]
			} );
		},
		renderTypes: function( ) { 
			return this.ui.frag( Object.keys( this.users ).map( this.renderUsersByType, this ) );
		},
		renderUsersByType: function( type ) { 
			return Object.keys( this.users[ type ] ).length && this.ui.div( { 
				classes: [ "list-group-members-type-section", "lgm-type-section" ],
				attrs: { 
					"data-type": type.toLowerCase( )
				},
				children: [ 
					this.ui.header( { 
						classes: [ "list-group-members-type-header", "lgm-type-header" ],
						child: this.ui.h2( { 
							text: this.msg( type ).escape( )
						} )
					} ),
					this.ui.div( { 
						classes: [ "list-group-members-type-inner", "lgm-type-inner" ],
						children: Object.keys( this.users[ type ] ).map( this.renderUsersFromType.bind( this, type ) )
					} )
				]
			} );
		},
		renderUsersFromType: function( type, group ) { 
			return this.users[ type ][ group ] && this.users[ type ][ group ].length && this.ui.section( { 
				classes: [ "list-group-members-group", "lgm-group" ],
				attrs: { 
					"data-group": group
				},
				children: [ 
					this.ui.header( { 
						classes: [ "list-group-members-group-header", "lgm-group-header" ],
						child: this.ui.h3( { 
							text: this.msg( group ).escape( )
						} )
					} ),
					this.ui.ul( { 
						classes: [ "list-group-members-users", "lgm-users" ],
						id: "lgm-users",
						children: this.users[ type ][ group ].sort( this.state.renderOptions.sort.bind( this ) ).map( this.renderUser, this )
					} )
				]
			} );
		},
		renderUser: function( user ) { 
			return this.ui.li( { 
				classes: [ "list-group-members-user", "lgm-user" ],
				attrs: { 
					"data-user-id": user.userid,
					"data-user": user.name
				},
				id: "list-group-members-user-" + user.userid,
				children: [ 
					this.ui.header( { 
						classes: [ "list-group-members-user-header", "lgm-user-header" ],
						children: [
							this.ui.div( { 
								classes: [ "list-group-members-user-avatar-wrapper", "lgm-user-avatar-wrapper" ]
							} ),
							this.ui.div( { 
								classes: [ "list-group-members-user-details", "lgm-user-details" ],
								children: [ 
									this.ui.h4( { 
										classes: [ "list-group-members-user-heading", "lgm-user-heading" ]
									} ),
									this.ui.bdi( { 
										classes: [ "list-group-members-user-group", "lgm-user-group" ]
									} )
								]
							} )
						]
					} ),
					this.ui.div( { 
						classes: [ "list-group-members-user-content" ]
					} )
				]
			} );
		},
		rerender: function( ) { },
		generateLink: function( ) { 
			this.state.messagesLoaded = true;
			const toolbar = document.querySelector( ".wikia-bar .toolbar .tools" );
			if ( !toolbar || this.state.linkInToolbar || this.state.matchesPage ) return;
			this.state.linkInToolbar = true;

			toolbar.insertAdjacentElement( "afterbegin", this.ui.li( {
				classes: [ "overflow" ],
				child: this.ui.a( { 
					href: mw.util.getUrl( this.mwConfig.wgFormattedNamespaces[ -1 ] + ":" + this.msg( "page" ).parse( ) ),
					text: this.msg( "page-title" ).escape( )
				} )
			} ) );
		}
	}, lgmTraps );

	window.LGM = listGroupMembers;
	mw.hook( "list-group-members.start" ).fire( window.LGM.start( ) );
	mw.hook( "list-group-members" ).fire( window.LGM );
} )( window, jQuery, mediaWiki );