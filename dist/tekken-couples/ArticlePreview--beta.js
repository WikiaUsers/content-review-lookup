/**
 * ArticlePreview
 * Version: 2.0
 * 
 * Author: Ultimate Dark Carnage
 * Other attribution: HumansCanWinElves
 * 
 * This script allows a user to see a preview of an article by hovering
 * a local link and go to a page by clicking on that link.
 **/
( function( window, $, mw ) { 
	"use strict";

	// Sets the configuration object to an empty object if it does not exist
	window.articlePreview = window.articlePreview || { };

	// URL variables for the current page
	const urlVars = new URLSearchParams( location.search );

	// If the user prefers not to show the article preview, prevent running
	if ( urlVars.get( "nopreview" ) || window.articlePreview.disabled ) return;

	// Function to escape regular expressions
	function escapeRegExp( string ) { 
		return string.replace( /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&' );
	}

	// Decodes the URL and converts underscores to spaces
	function decodeURL( string ) { 
		return decodeURIComponent( string.replace( /_/g, " " ) );
	}

	// Creates a spinner constructor
	function Spinner( size ) {
		// Set the size to an object if the size is a number
		if ( typeof size !== "object" ) { 
			if ( !isNaN( size ) && isFinite( size ) ) { 
				size = { width: Number( size ), height: Number( size ) };
			} else { 
				throw new TypeError( "The value must either be an object or a finite number." );
			}
		}

		// The current spinner instance
		const sp = this;

		// The spinner element
		const spinner = document.createElementNS( "http://www.w3.org/2000/svg", "svg" );
		spinner.classList.add( "wds-spinner", "wds-spinner__block" );

		const spinnerAttr = Object.freeze( { 
			width: size.width,
			height: size.height,
			viewBox: [ 0, 0, 66, 66 ].join( " " ),
			xmlns: "http://www.w3.org/2000/svg"
		} );

		Object.getOwnPropertyNames( spinnerAttr )
			.forEach( function( property ) { 
				const value = spinnerAttr[ property ];
				spinner.setAttribute( property, value );
			} );

		// The grouping element
		const g = document.createElementNS( "http://www.w3.org/2000/svg", "g" );
		g.setAttribute( "transform", "translate(33, 33)" );

		// The circle element
		const c = document.createElementNS( "http://www.w3.org/2000/svg", "circle" );
		c.classList.add( "wds-spinner__stroke" );

		const cAttr = Object.freeze( { 
			fill: "none",
			r: 30,
			"stroke-width": 2,
			"stroke-dasharray": 188.49555921538757,
			"stroke-dashoffset": 188.49555921538757,
			"stroke-linecap": "round"
		} );

		Object.getOwnPropertyNames( cAttr )
			.forEach( function( property ) { 
				const value = cAttr[ property ];
				c.setAttribute( property, value );
			} );
		
		// Creates the spinner element
		g.append( c );
		spinner.append( g );

		// Returns the actual element
		sp.el = function( ) { 
			return spinner;
		};

		// Returns the outer html
		sp.html = function( ) { 
			return spinner.outerHTML;
		};
	}

	// Creates a script loader constructor
	function Loader( resources, callback, thisArg ) { 
		// Sets the current instance in a variable
		const al = this;
		
		// If there are less than three arguments, set the context to the current instance
		if ( arguments.length < 3 ) thisArg = this;

		// An array of loaded scripts
		al.loadedScripts = [ ];

		// An array of MediaWiki modules
		al.modules = resources.MODULES || [ ];

		// An object of scripts to load
		al.scripts = resources.SCRIPTS || { };

		// An array of stylesheets to load
		al.stylesheets = resources.STYLESHEETS || [ ];

		// Initializes the loader
		al.init = function( ) { 
			if ( Array.isArray( al.modules ) && al.modules.length ) { 
				return mw.loader
					.using( al.modules )
					.then( al.loadScripts.bind( al ) );
			}

			al.loadScripts( );
		};

		// Loads all scripts and stylesheets if they are not loaded
		al.loadScripts = function( ) { 
			if ( Array.isArray( al.stylesheets ) && al.stylesheets.length ) { 
				importArticles( { type: "style", articles: al.stylesheets } );
			}

			const promises = Promise.all( 
				Object
					.getOwnPropertyNames( al.scripts )
					.map( function( name ) { 
						const script = al.scripts[ name ];

						if ( window.dev[ name ] ) { 
							al.loadedScripts.push( script );
							return Promise.resolve( );
						}

						return new Promise( function( resolve, reject ) { 
							importArticle( { 
								type: "script",
								article: script
							} ).then( function( ) { 
								al.loadedScripts.push( script );
							} ).then( resolve )[ "catch" ]( reject );
						} );
					} )
			);

			return promises.then( function( ) { 
				al.loaded = true;
				return callback.apply( thisArg, al );
			} );
		};

		return al;
	}

	// Creates a new vector
	function Vector( x, y ) { 
		x = ( isNaN( x ) || !isFinite( x ) ) ? 0 : x;
		y = ( isNaN( y ) || !isFinite( y ) ) ? 0 : y;
		
		this.x = x;
		this.y = y;
		
		this.copy = function( ) { 
			return new Vector( x, y );
		};

		this.add = function( v ) { 
			return Vector.add( this, v );
		};

		this.subtract = function( v ) { 
			return Vector.add( this, v );
		};

		this.multiply = function( scalar ) { 
			return Vector.multiply( this, scalar );
		};

		this.divide = function( scalar ) { 
			return Vector.divide( this, scalar );
		};

		return this;
	}
	
	// Static methods for the vector constructor
	Vector.add = function( vx, vy ) { 
		const ax = vx.x + vy.x, ay = vx.y + vy.y;
		return new Vector( ax, ay );
	};
	
	Vector.subtract = function( vx, vy ) { 
		const ax = vx.x - vy.x, ay = vx.y - vy.y;
		return new Vector( ax, ay );
	};
	
	Vector.multiply = function( v, scalar ) { 
		const ax = v.x * scalar, ay = v.y * scalar;
		return new Vector( ax, ay );
	};
	
	Vector.divide = function( v, scalar ) { 
		const ax = v.x / scalar, ay = v.y / scalar;
		return new Vector( ax, ay );
	};
	
	function ArticlePreview( options ) { 
		// If there are no arguments, set the options to an empty object
		options = arguments.length === 0 ? { } : options;

		// Setting the current instance to a variable
		const ap = this;
		
		// The current script version
		ap.VERSION = "2.0";
		
		// The current script name
		ap.NAME = "ArticlePreview";
		
		// MediaWiki configuration variables
		ap.MW = mw.config.get( [
			"wgServer",
			"wgPageName",
			"wgNamespaceNumber",
			"wgArticlePath",
			"wgFormattedNamespaces"
		] );
		
		// The current script target
		ap.TARGET = document.querySelector( "#WikiaMainContent" ) ||
			document.querySelector( "#mw-content-text" );
		
		// The current mouse vector
		ap.VECTOR = new Vector( );

		// Checks if the mouse is hovering over a local link
		ap.HOVER = false;

		// Determines whether the article preview allows caching
		ap.ALLOW_CACHE = false;

		// The loading class name
		ap.LOADING_CLASS = "article-preview__loading";

		// Determines whether the preview is loading
		ap.LOADING = false;

		// The cache object
		ap.CACHE = { };

		// Determines whether the preview is in the DOM
		ap.IN_DOM = false;

		// The image used when no image is found
		ap.DEFAULT_IMAGE = "";

		// Determines whether to show infoboxes
		ap.INFOBOX = false;

		// Determines whether to show the table of contents
		ap.TOC = false;

		// Determines whether to generate the whole page
		ap.WHOLE_PAGE = false;

		// Determines whether the preview allows an image
		ap.NO_IMAGE = false;

		// Determines whether red links should be allowed
		ap.ALLOW_NEW = false;

		// The maximum text length
		ap.MAXIMUM_TEXT_LENGTH = 1024;

		// Default spinner height
		ap.SPINNER_SIZE = 64;

		// Default configuration options
		ap.DEFAULTS = Object.freeze( { 
			ignoreActions: [ ],
			ignoreImages: [ ],
			ignorePages: [ mw.config.get( "wgPageName" ).split( "_" ).join( " " ) ],
			ignoreURLs: [ ],
			ignoreParents: [ ],
			ignoreSelectors: [ ],
			ignoreNamespaces: [ ],
			infobox: ap.INFOBOX,
			toc: ap.TOC,
			wholePage: ap.WHOLE_PAGE,
			cache: ap.ALLOW_CACHE,
			allowNew: ap.ALLOW_NEW,
			noImage: ap.NO_IMAGE,
			defaultImage: ap.DEFAULT_IMAGE,
			target: ap.TARGET,
			maxTextLength: ap.MAXIMUM_TEXT_LENGTH
		} );

		// An array of scripts to load
		ap.SCRIPTS = Object.freeze( { 
			"i18n": "u:dev:MediaWiki:I18n-js/code.js",
			"wds": "u:dev:MediaWiki:WDSIcons/code.js",
			"dorui": "u:dev:MediaWiki:Dorui.js",
			"colors": "u:dev:MediaWiki:Colors/code.js"
		} );

		// An array of stylesheets to load
		ap.STYLESHEETS = Object.freeze( [
			// "u:dev:MediaWiki:ArticlePreview/beta.css"
		] );

		// An array of MediaWiki modules to load
		ap.MODULES = Object.freeze( [ 
			"mediawiki.api",
			"mediawiki.Title",
			"mediawiki.Uri"
		] );

		// The setters object
		ap.SETTERS = Object.freeze( { 
			ignoreActions: function( value ) { 
				if ( Array.isArray( value ) ) { 
					return value.forEach( function( v ) { 
						if ( v === undefined || v === null ) return;
						ap.PATTERNS.IGNORE_ACTIONS.push( v );
					} );
				}

				ap.PATTERNS.IGNORE_ACTIONS.push( value );
			},
			ignoreImages: function( value ) { 
				if ( Array.isArray( value ) ) { 
					return value.forEach( function( v ) { 
						if ( v === undefined || v === null ) return;
						ap.PATTERNS.IGNORE_IMAGES.push( v );
					} );
				}

				ap.PATTERNS.IGNORE_IMAGES.push( value );
			},
			ignorePages: function( value ) { 
				if ( Array.isArray( value ) ) { 
					return value.forEach( function( v ) { 
						if ( v === undefined || v === null ) return;
						ap.PATTERNS.IGNORE_PAGES.push( v );
					} );
				}

				ap.PATTERNS.IGNORE_PAGES.push( value );
			},
			ignoreSelectors: function( value ) { 
				if ( Array.isArray( value ) ) { 
					return value.forEach( function( v ) { 
						if ( v === undefined || v === null ) return;
						ap.PATTERNS.IGNORE_SELECTORS.push( v );
					} );
				}

				ap.PATTERNS.IGNORE_SELECTORS.push( value );
			},
			ignoreNamespaces: function( value ) { 
				if ( Array.isArray( value ) ) { 
					return value.forEach( function( v ) { 
						if ( v === undefined || v === null ) return;
						ap.PATTERNS.IGNORE_NAMESPACES.push( v );
					} );
				}

				ap.PATTERNS.IGNORE_NAMESPACES.push( value );
			},
			ignoreParents: function( value ) { 
				if ( Array.isArray( value ) ) { 
					return value.forEach( function( v ) { 
						if ( v === undefined || v === null ) return;
						ap.PATTERNS.IGNORE_PARENTS.push( v );
					} );
				}

				ap.PATTERNS.IGNORE_PARENTS.push( value );
			},
			ignoreURLs: function( value ) { 
				if ( Array.isArray( value ) ) { 
					return value.forEach( function( v ) { 
						if ( v === undefined || v === null ) return;
						ap.PATTERNS.IGNORE_URLS.push( v );
					} );
				}

				ap.PATTERNS.IGNORE_URLS.push( value );
			},
			maxTextLength: function( value ) { 
				if ( isNaN( value ) || !isFinite( value ) ) { 
					ap.MAXIMUM_TEXT_LENGTH = 1024;
					return;
				}

				ap.MAXIMUM_TEXT_LENGTH = Math.max( 250, Math.min( value, 1200 ) );
			},
			onlyinclude: function( value ) { 
				if ( Array.isArray( value ) ) { 
					return value.forEach( function( v ) { 
						if ( v === undefined || v === null ) return;
						ap.PATTERNS.ONLYINCLUDE.push( v );
					} );
				}

				ap.PATTERNS.ONLYINCLUDE.push( value );
			},
			prep: function( value ) { 
				if ( Array.isArray( value ) ) { 
					return value.forEach( function( v ) { 
						if ( v === undefined || v === null ) return;
						ap.PATTERNS.PREP.push( v );
					} );
				}

				ap.PATTERNS.PREP.push( value );
			},
			infobox: "INFOBOX",
			toc: "TOC",
			allowNew: "ALLOW_NEW",
			wholePage: "WHOLE_PAGE",
			cache: "ALLOW_CACHE",
			noImage: "NO_IMAGE",
			defaultImage: "DEFAULT_IMAGE",
			target: "TARGET"
		} );

		// The configuration object
		ap.CONFIG = { };

		// An object of regular expression patterns
		ap.PATTERNS = { 
			IGNORE_SELECTORS: [ 
				".free",
				".toc a",
				".wikia-button",
				".wds-button",
				".wikia-button a",
				".wds-button a",
				".wikia-menu-button a",
				".new",
				".wds-list a"
			],
			IGNORE_ACTIONS: [ "edit" ],
			IGNORE_PARENTS: [ ".nopreview" ],
			IGNORE_PAGES: [ /Special\:(?:User)(?:Logout)/ ],
			IGNORE_IMAGES: [ ],
			IGNORE_URLS: [ window.location.href ],
			IGNORE_NAMESPACES: [ ],
			ONLYINCLUDE: [ ],
			PREP: [ /<script>[\s\S]*?<\/script>/igm, /<ref>[\s\S]*?<\/ref>/igm, /<p.*\>\n*(?:<br.*\s*\/?>|)\n*<\/p>/gim ],
			IMAGE_URI: /\.(?:(?:wikia|fandom)\.com|wikia\.(?:org|nocookie\.net))$/,
			FANDOM_URI: /\.(?:(?:wikia|fandom)\.com|wikia\.org)$/,
			WIKI_TITLE: /^\/wiki\/([^?&]+).*$/,
			INDEX_TITLE: /^\/index\.php\?(?:.+&|)title=([^?&]+).*$/,
		};

		// Sets all configuration object
		ap.setOptions = function( opts ) { 
			Object
				.getOwnPropertyNames( ap.DEFAULTS )
				.forEach( function( key ) { 
					const value = ap.DEFAULTS[ key ];

					ap.CONFIG[ key ] = typeof opts[ key ] !== "undefined" ?
						opts[ key ] : value;
				} );
			
			ap.initOptions( );
		};

		// Initializes all configurations
		ap.initOptions = function( ) { 
			Object
				.getOwnPropertyNames( ap.CONFIG )
				.forEach( function( key ) { 
					const setter = ap.SETTERS[ key ];

					if ( Function.prototype.isPrototypeOf( Object( setter ) ) ) { 
						return setter.call( ap, ap.CONFIG[ key ] );
					}

					ap[ setter ] = ap.CONFIG[ key ];
				} );
		};

		// The function to initialize the script
		ap.init = function( ) { 
			// Dorui (UI) object
			ap.ui = window.dev.dorui;
			
			// Colors object
			ap.colors = window.dev.colors;
			
			// WDSIcons object
			ap.wds = window.dev.wds;
			
			// Creates the user interface
			ap.createUI( );
		};

		ap.createUI = function( ) { 
			// The preview actions
			ap.ACTIONS = ap.ui.div( { 
				"class": "article-preview__actions"
			} );

			// The preview content wrapper
			ap.CONTENT = ap.ui.div( { 
				"class": "article-preview__content"
			} );

			// The main preview wrapper
			ap.WRAPPER = ap.ui.div( { 
				"class": "article-preview__body",
				"children": [ ap.CONTENT, ap.ACTIONS ]
			} );

			// The main preview container
			ap.CONTAINER = ap.ui.section( { 
				"class": "article-preview",
				"child": ap.WRAPPER
			} );

			// The spinner element
			ap.SPINNER = ( new Spinner( ap.SPINNER_SIZE ) ).el( );
			ap.SPINNER.classList.add( "article-preview__spinner" );

			// When the i18n messages are loaded, continue
			ap.loadMessages( ap.load );
		};

		// Loads all messages for the script
		ap.loadMessages = function( callback ) { 
			mw
				.hook( "dev.i18n" )
				.add( function( i18no ) { 
					// I18n object
					ap.i18no = i18no;

					i18no
						.loadMessages( ap.NAME )
						.then( callback );
				} );
		};

		// Loads the script
		ap.load = function( i18n ) { 
			// Sets the current message instance
			ap.i18n = i18n;

			// The main api object
			ap.API = new mw.Api( );

			// An object of conditions for showing the preview
			ap.CONDITIONS = Object.freeze( { 
				ELEMENT: { 
					type: HTMLElement,
					dispatch: function( element ) { 
						const whitelistedTagNames = Object.freeze( [ 
							"a",
							"area"
						] );
						
						if ( !whitelistedTagNames.includes( element.tagName.toLowerCase( ) ) ) { 
							return false;
						}

						const ignoreSelectors = ap.PATTERNS.IGNORE_SELECTORS.every( function( selector ) { 
							const elementsFromSelector = ap.TARGET.querySelectorAll( selector );
							const inSelector = Array.from( elementsFromSelector ).includes( element );

							return inSelector === false;
						} );
						
						if ( !ignoreSelectors ) return false;
						
						return ap.PATTERNS.IGNORE_PARENTS.every( function( selector ) { 
							return element.closest( selector ) === null;
						} );
					}
				},
				PAGE: { 
					type: String,
					dispatch: function( page ) { 
						if ( page === "" ) return false;

						const title = new mw.Title( page );

						const ignoreNamespaces = ap.PATTERNS.IGNORE_NAMESPACES.every( function( value ) { 
							if ( !isNaN( value ) && isFinite( value ) ) { 
								return title.namespace === value;
							}

							if ( RegExp.prototype.isPrototypeOf( Object( value ) ) ) { 
								const namespacePrefix = title.getNamespacePrefix( );
								const namespace = namespacePrefix.split( ":" )[ 0 ];
								const trueNamespace = namespace === "" ? "Main" : namespace;

								const namespaceKey = "namespace-" + trueNamespace.toLowerCase( );

								const parsedNamespace = ap.msg( namespaceKey ).escape( );

								if ( !ap.msg( namespaceKey ).exists ) return true;

								return !value.test( parsedNamespace );
							}

							if ( typeof namespace === "number" ) { 
								return title.namespace !== value;
							}

							return String( title.getNamespacePrefix( ).split( ":" )[ 0 ] ) !== value;
						} );

						if ( !ignoreNamespaces ) return false;

						return ap.PATTERNS.IGNORE_PAGES.every( function( value ) { 
							if ( RegExp.prototype.isPrototypeOf( Object( value ) ) ) { 
								return !value.test( page );
							}

							return String( value ) !== page;
						} );
					}
				},
				URL: { 
					type: mw.Uri,
					dispatch: function( url ) { 
						if ( !ap.PATTERNS.FANDOM_URI.test( url.host ) ) return false;

						return ap.PATTERNS.IGNORE_URLS.every( function( value ) { 
							if ( RegExp.prototype.isPrototypeOf( Object( value ) ) ) { 
								return !value.test( String( url ) );
							}

							return String( value ) !== String( url );
						} );
					}
				}
			} );

			// Fetches all links
			ap.LINKS = ap.TARGET.querySelectorAll( "a, area" );

			// Create a shorthand message function
			ap.msg = function( name ) { 
				function getInstance( args ) { 
					args.unshift( name );
					return ap.i18n.msg.apply( ap.i18n, args );
				}

				return Object.freeze( { 
					parse: function( ) { 
						const msg = getInstance( Array.from( arguments ) );
						return msg.parse( );
					},
					escape: function( ) { 
						const msg = getInstance( Array.from( arguments ) );
						return msg.escape( );
					},
					plain: function( ) { 
						const msg = getInstance( Array.from( arguments ) );
						return msg.plain( );
					},
					encode: function( ) { 
						const msg = getInstance( Array.from( arguments ) );
						const plain = msg.plain( );
						return encodeURIComponent( plain );
					},
					decode: function( ) { 
						const msg = getInstance( Array.from( arguments ) );
						const plain = msg.plain( );
						return decodeURIComponent( plain );
					},
					exists: ap.i18n.msg( name ).exists
				} );
			};

			// Checks the image source
			ap.checkImageSrc = function( src ) { 
				if ( !src ) return false;
				try { 
					const url = new mw.Uri( src );
					return ap.PATTERNS.IMAGE_URI.test( url.host );
				} catch( e ) { 
					return false;
				}
			};

			// Sets the current theme
			ap.setTheme = function( ) { 
				function createCSSVarProp( name, value ) { 
					const key = "--article-preview__" + name;
					return [ key, value ].join( ": " );
				}

				const rootCSS = ":root { $css }";

				const css = Object
					.getOwnPropertyNames( ap.THEME )
					.map( function( property ) { 
						const value = ap.THEME[ property ];
						
						if ( Function.prototype.isPrototypeOf( value ) ) { 
							return createCSSVarProp( property, value.call( ap, property ) );
						}

						return createCSSVarProp( property, value );
					} )
					.join( ";" );
				
				const result = rootCSS.replace( /\$css/i, css );
			};
			
			// Matches the value type
			ap.matchesType = function( type, value ) { 
				const isString = typeof type === "string";
				
				return isString ? typeof value === type :
					type.prototype.isPrototypeOf( Object( value ) );
			};

			// Creates a checker for an object
			ap.check = function( checker, value ) { 
				return ap.matchesType( checker.type, value ) ?
					checker.dispatch( value ) : false;
			}; 

			// Checks the URL for an element
			ap.checkURL = function( url ) { 
				return ap.check( ap.CONDITIONS.URL, url );
			};

			// Checks the <a> element
			ap.checkElement = function( element ) { 
				return ap.check( ap.CONDITIONS.ELEMENT, element );
			};

			// Checks if a page can show the preview
			ap.checkPage = function( page ) { 
				return ap.check( ap.CONDITIONS.PAGE, page );
			};

			ap.LINKS.forEach( ap.checkLink );
		};

		// Checks the current link
		ap.checkLink = function( element ) { 
			// Step 1. Checks if an element can show the preview
			const isAllowed = ap.checkElement( element );

			// If the element does not pass the test, skip;
			if ( !isAllowed ) return;
			
			// Step 2. Creates the URL object for the link
			const url = new mw.Uri( element.href );

			// If the link does not pass the test, skip;
			if ( !ap.checkURL( url ) ) return;

			// Step 3. Fetches the page name
			const page = decodeURL( ap.PATTERNS.INDEX_TITLE.test( url.path ) ?
				ap.PATTERNS.INDEX_TITLE.exec( url.path )[ 1 ] : 
				( ap.PATTERNS.WIKI_TITLE.test( url.path ) ? 
					ap.PATTERNS.WIKI_TITLE.exec( url.path )[ 1 ] : 
					"" ) );

			// If the page name is blank, undefined, or does not
			// pass the test, stop here.
			if ( page === "" || !ap.checkPage( page ) ) return;

			// The parsed page name
			const parsedPage = decodeURIComponent( page )
				.split( "_" )
				.join( " " );
			
			// Sets the page name to a data attribute
			element.dataset.pageName = parsedPage;

			// Creates an event listener when the mouse is hovering over the link
			element.addEventListener( "mouseover", ap.showPreview.bind( ap, { 
				element: element,
				page: parsedPage,
				url: url
			} ) );

			// Creates an event listener when the mouse leaves the link
			element.addEventListener( "mouseout", ap.hidePreview.bind( ap, {
				// element: element, 
				page: parsedPage
			} ) );
		};

		ap.showPreview = function( opts ) { 
			// Sets the hover state to true
			ap.HOVER = true;

			// Sets the loading state to true
			ap.LOADING = true;

			// Adds the loading class to the container
			ap.CONTAINER.classList.add( ap.LOADING_CLASS );

			// Adds the spinner to the wrapper
			ap.CONTENT.append( ap.SPINNER );

			// The current element
			const element = opts.element;

			// The current element's client rect object
			const rect = element.getBoundingClientRect( );

			// Sets the actual coordinates to a vector
			ap.VECTOR.x = ( rect.left + window.pageXOffset );
			ap.VECTOR.y = ( rect.top + window.pageYOffset ) + ( rect.height + 2 );

			// The current page name
			const currentPage = opts.page;

			// The current URL
			const url = opts.url;

			// Generates information for the article preview
			ap.generateInfo( currentPage )
				.then( ap.generateElement.bind( ap, url ) );
		};

		ap.generateInfo = function( page ) { 
			if ( ap.ALLOW_CACHE && ap.CACHE.hasOwnProperty( page ) ) { 
				return new Promise( function( resolve ) { 
					resolve( ap.CACHE[ page ] );
				} );
			}

			const params = { 
				action: "parse",
				page: page,
				prop: "images|text",
				format: "json",
				disablepp: true,
				redirects: true
			};

			if ( ap.WHOLE_PAGE ) params.section = 0;

			return ap.API.get( params );
		};

		ap.process = function( text ) { 
			const temp = ap.ui.div( { 
				html: text
			} );

			if ( !Array.isArray( ap.PATTERNS.PREP ) ) return "";

			if ( Array.isArray( ap.PATTERNS.ONLYINCLUDE ) ) { 
				text = ap.PATTERNS
					.ONLYINCLUDE
					.map( function( value ) { 
						const elements = temp.querySelectorAll( value );
						if ( !elements ) return false;

						return Array
							.from( elements )
							.map( function( element ) { 
								temp.removeChild( element );
								return element.outerHTML;
							} ).join( "" );
					} )
					.filter( Boolean )
					.join( "" ) || text;
			}

			text = ap.PATTERNS
				.PREP
				.reduce( function( value, pattern ) { 
					return value.replace( pattern, "" );
				}, text );
			
			return text;
		};

		ap.generateElement = function( url, data ) { 
			if ( !data.parse ) { 
				ap.PATTERNS.IGNORE_URLS.push( url.path );
				return;
			}

			if ( ap.ALLOW_CACHE && !ap.CACHE.hasOwnProperty( data.parse.title ) ) { 
				ap.CACHE[ data.parse.title ] = data;
			}

			const image = data.parse.images
				.map( function( value ) { 
					return ap.checkImageSrc( value ) ? false : value;
				} )
				.filter( Boolean )[ 0 ];
			
			const text = data.parse.text[ "*" ];

			if ( !image && !text ) { 
				ap.PATTERNS.IGNORE_URLS.push( url.path );
				return;
			}

			const temp = ap.ui.div( { 
				html: ap.process( text )
			} );

			const selectorsToRemove = [ ".notice", "table" ];

			if ( !ap.INFOBOX ) selectorsToRemove.push( ".infobox", "aside.portable-infobox" );

			if ( !ap.TOC ) selectorsToRemove.push( ".toc" );

			const elementsToRemove = temp.querySelectorAll( selectorsToRemove.join( ", " ) );

			elementsToRemove.forEach( function( target ) { 
				target.remove( );
			} );

			const result = temp.innerHTML;

			// Set loading state to false
			ap.LOADING = false;

			// Removes the spinner from the preview's content area
			ap.CONTENT.removeChild( ap.SPINNER );

			// The preview text area
			const previewText = ap.ui.div( { 
				"class": "article-preview__text",
				html: result
			} );

			// Inserts the preview text to its content
			ap.CONTENT.insertAdjacentElement( "beforeend", previewText );

			if ( ap.NO_IMAGE ) return ap.processPreview( url );

			// The preview's imagee
			const previewImage = ap.ui.img( { 
				"class": "article-preview__image"
			} );

			// The preview's image container
			const imageContainer = ap.ui.div( { 
				"class": "article-preview__image-container",
				child: previewImage
			} );

			// Appends the image to its content area
			ap.CONTENT.insertAdjacentElement( "afterbegin", imageContainer );

			if ( !image ) return ap.processImage( previewImage, url, { 
				useDefaultImage: true
			} );

			return ap.generateImage( image )
				.then( ap.processImage.bind( ap, previewImage, url ) );
		};

		ap.generateImage = function( image ) { 
			const params = Object.freeze( { 
				action: "query",
				redirects: true,
				titles: "File:" + image.trim( ),
				iiprop: "url",
				prop: "imageinfo",
				format: "json",
				indexpageids: true
			} );

			return ap.API.get( params );
		};

		ap.getImageOrientation = function( image ) { 
			const height = image.naturalHeight || image.height;
			const width = image.naturalWidth || image.width;

			const aspectRatio = width / height;

			if ( aspectRatio < 1 ) return "portrait";

			if ( aspectRatio > 1 ) return "landscape";

			return "square";
		};

		ap.processImage = function( previewImage, url, data ) { 
			if ( data.useDefaultImage ) { 
				previewImage.src = ap.DEFAULT_IMAGE;
				return ap.processPreview( url );
			}

			const query = data.query, pageid = query.pageids[ 0 ], page = query.pages[ pageid ];

			if ( query.redirects ) { 
				const redirect = query.redirects[ 0 ].to;
				const redirectTitle = redirect.replace( /^File:/i, "" );

				return ap.generateImage( redirectTitle )
					.then( ap.processImage.bind( ap, previewImage, url ) );
			}

			const imageinfo = page.imageinfo;

			if ( imageinfo.length ) { 
				previewImage.src = imageinfo[ 0 ].url;
			} else { 
				previewImage.src = ap.DEFAULT_IMAGE;
			}

			const imageOrientation = ap.getImageOrientation( previewImage );
			ap.CONTAINER.dataset.orientation = imageOrientation;

			if ( imageOrientation === "portrait" ) ap.CONTAINER.style.height = Math.max( previewImage.naturalHeight || 0, previewImage.height || 0 ) + "px";

			return ap.processPreview( url );
		};

		ap.processPreview = function( url ) { 
			// Changes the positioning of the article preview
			ap.CONTAINER.style.top = ap.VECTOR.y + "px";
			ap.CONTAINER.style.left = ap.VECTOR.x + "px";

			// Creates the element if it is not on the DOM
			if ( !ap.IN_DOM ) { 
				// Append the container to its target
				ap.TARGET.append( ap.CONTAINER );

				// The preview is in the DOM. Set the state to true.
				ap.IN_DOM = true;
			}

			// Adds a class name to show the preview
			ap.CONTAINER.classList.add( "show" );

			// Create preview actions
			ap.createActions( url );
		};

		ap.createActions = function( url ) { 
			
		};

		ap.hidePreview = function( ) { 
			if ( !ap.HOVER ) return;

			// Sets the hover state to false
			ap.HOVER = false;

			// Empties the content area
			ap.CONTENT.innerHTML = "";

			// Hides the article preview
			ap.CONTAINER.classList.remove( "show" );
		};

		// Sets all configuration options
		ap.setOptions( options );

		// Create a loader to initialize the script
		ap.LOADER = new Loader( { 
			SCRIPTS: ap.SCRIPTS,
			MODULES: ap.MODULES,
			STYLESHEETS: ap.STYLESHEETS
		}, ap.init, ap );

		// Initializes the script loader
		ap.LOADER.init( );

		// Fires the ready hook
		mw.hook( "articlePreview.ready" ).fire( this );
	}

	window.ArticlePreview = ArticlePreview;
	window.ap = new ArticlePreview( window.articlePreview );
} )( window, jQuery, mediaWiki );