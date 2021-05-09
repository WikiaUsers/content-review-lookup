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
	
	// If the user prefers not to show the article preview, do not run
	if ( urlVars.get( "nopreview" ) ) return;

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
	function Loader( scripts, callback, thisArg ) { 
		// Sets the current instance in a variable
		const al = this;
		
		// If there are less than three arguments, set the context to the current instance
		if ( arguments.length < 3 ) thisArg = this;
		
		// An array of loaded scripts
		al.loadedScripts = [ ];
		
		// An object that contains scripts to load
		al.scripts = scripts;
		
		// Determines whether the loader is completed
		al.loaded = false;
		
		// Initializes the loader
		al.init = function( ) { 
			mw.loader
				.using( [ "mediawiki.util", "mediawiki.Title", "mediawiki.api", "mediawiki.Uri" ] )
				.then( al.loadScripts.bind( this ) );
		};
		
		// Loads all scripts if they are not loaded
		al.loadScripts = function( ) { 
			// importArticle( { type: "style", article: "u:dev:MediaWiki:ArticlePreview.css" } );
			
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
							} ).then( resolve ).catch( reject );
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

		// The main preview container
		ap.CONTAINER = document.createElement( "section" );
		ap.CONTAINER.classList.add( "article-preview" );

		// The main preview wrapper
		ap.WRAPPER = document.createElement( "div" );
		ap.WRAPPER.classList.add( "article-preview__body" );

		// The preview overlay
		// ap.OVERLAY = document.createElement( "div" );
		// ap.OVERLAY.classList.add( "article-preview__overlay" );

		// Appends the wrapper to its container
		ap.CONTAINER.append( ap.WRAPPER );

		// Checks if the mouse is hovering over a local link
		ap.HOVER = false;

		// Determines whether the article preview allows caching
		ap.ALLOW_CACHE = false;

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

		// The maximum text length
		ap.MAXIMUM_TEXT_LENGTH = 1024;

		// Default spinner height
		ap.SPINNER_HEIGHT = 64;

		// Default configuration options
		ap.DEFAULTS = Object.freeze( { 
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

		// The setters object
		ap.SETTERS = Object.freeze( { 
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
			wholePage: "WHOLE_PAGE",
			cache: "ALLOW_CACHE",
			noImage: "NO_IMAGE",
			defaultImage: "DEFAULT_IMAGE",
			target: "TARGET"
		} );

		// The configuration object
		ap.CONFIG = { };

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

		// Sets all configuration options
		ap.setOptions = function( opts ) { 
			const keys = Object.getOwnPropertyNames( ap.DEFAULTS );

			while ( keys.length ) { 
				const key = keys.shift( );
				const value = ap.DEFAULTS[ key ];

				if ( typeof opts[ key ] !== "undefined" ) { 
					ap.CONFIG[ key ] = opts[ key ];
					continue;
				}

				ap.CONFIG[ key ] = value;
			}

			ap.initOptions( );
		};

		// Initializes all configurations
		ap.initOptions = function( ) { 
			Object
				.getOwnPropertyNames( ap.CONFIG )
				.forEach( function( key ) { 
					const setter = ap.SETTERS[ key ];

					if ( Function.prototype.isPrototypeOf( Object( setter ) ) ) { 
						return setter( ap.CONFIG[ key ] );
					}

					if ( typeof setter === "string" ) { 
						ap[ setter ] = ap.CONFIG[ key ];
					}
				} );
		};

		// The function to initialize the script
		ap.init = function( ) {
			// I18n object
			ap.i18no = window.dev.i18n;
			
			// Dorui (UI) object
			ap.ui = window.dev.dorui;
			
			// Colors object
			ap.colors = window.dev.colors;
			
			// WDSIcons object
			ap.wds = window.dev.wds;
			
			// When the i18n messages are loaded, continue
			ap.loadMessages( ap.load );
		};
		
		// Loads all messages for the script
		ap.loadMessages = function( callback ) { 
			mw
				.hook( "dev.i18n" )
				.add( function( i18no ) { 
					i18no
						.loadMessages( ap.NAME )
						.then( callback );
				} );
		};
		
		// Loads the script
		ap.load = function( i18n ) { 
			// Sets the current message instance
			ap.i18n = i18n;
			
			// Fetches all links
			const links = ap.TARGET.querySelectorAll( "a" );

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
			
			// Matches the value type
			ap.matchesType = function( type, value ) { 
				const isString = typeof type === "string";
				
				return isString ? typeof value === type :
					type.prototype.isPrototypeOf( Object( value ) );
			};
			
			// Checks the URL for an element
			ap.checkURL = function( url ) { 
				const check = ap.CONDITIONS.URL;
				
				if ( ap.matchesType( check.type, url ) ) { 
					return check.dispatch( url );
				}
				
				return false;
			};
			
			// Checks the <a> element
			ap.checkElement = function( element ) { 
				const check = ap.CONDITIONS.ELEMENT;
				
				if ( ap.matchesType( check.type, element ) ) { 
					return check.dispatch( element );
				}
				
				return false;
			};
			
			// Checks if a page can show the preview
			ap.checkPage = function( page ) { 
				const check = ap.CONDITIONS.PAGE;

				page = decodeURIComponent( page ).split( "_" ).join( " " );
				
				if ( ap.matchesType( check.type, page ) ) { 
					return check.dispatch( page );
				}
				
				return false;
			};
			
			// Checks each link
			links.forEach( ap.checkLink );
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
			const parsedPage = decodeURIComponent( page ).split( "_" ).join( " " );

			// Sets the page name to a data attribute
			element.dataset.pageName = parsedPage;

			// Creates an event listener when the mouse is hovering over the link
			element.addEventListener( "mouseover", ap.onHover.bind( ap, { 
				element: element,
				page: parsedPage,
				url: url
			} ) );

			// Creates an event listener when the mouse leaves the link
			element.addEventListener( "mouseout", ap.offHover.bind( ap, {
				element: element, 
				page: parsedPage
			} ) );
		};

		// Function to activate when hovering over a link
		ap.onHover = function( opts ) { 
			// Sets the hover state to true
			ap.HOVER = true;

			// Adds the spinner to the element
			const spinner = new Spinner( 64 );
			const spinnerEl = spinner.el( );
			spinnerEl.classList.add( "article-preview__spinner" );
			ap.WRAPPER.innerHTML = spinnerEl.outerHTML;

			// The element that is being hovered
			const element = opts.element;

			// The current client rect object
			const rect = element.getBoundingClientRect( );

			// Fetches the actual coordinates
			const x = ( rect.left + window.pageXOffset ), y = ( rect.top + window.pageYOffset ) + ( rect.height + 2 );

			// Sets the coordinates to a vector
			ap.VECTOR = new Vector( x, y );

			// The current page name
			const currentPage = opts.page;

			// The current URL
			const url = opts.url;

			// Shows the article preview
			ap.generateInfo( currentPage )
				.then( ap.generateElement.bind( ap, element, url ) );
		};

		ap.generateInfo = function( currentPage ) { 
			if ( ap.ALLOW_CACHE ) { 
				if ( ap.CACHE.hasOwnProperty( currentPage ) ) { 
					return new Promise( function( resolve, reject ) { 
						resolve( ap.CACHE[ currentPage ] );
					} );
				}
			}

			const api = new mw.Api( );

			const params = { 
				action: "parse",
				page: currentPage,
				prop: "images|text",
				format: "json",
				disablepp: true,
				redirects: true
			};

			if ( ap.WHOLE_PAGE ) { 
				params.section = 0;
			}

			return api.get( params );
		};

		ap.process = function( text ) { 
			const temp = document.createElement( "div" );
			temp.innerHTML = text;

			if ( !Array.isArray( ap.PATTERNS.PREP ) ) return "";

			if ( Array.isArray( ap.PATTERNS.ONLYINCLUDE ) ) { 
				text = ap.PATTERNS.ONLYINCLUDE
					.map( function( value ) { 
						const elements = temp.querySelectorAll( value );
						if ( !elements ) return false;

						return Array.from( elements ).map( function( element ) { 
							temp.removeChild( element );
							return element.outerHTML;
						} ).join( "" );
					} )
					.filter( Boolean )
					.join( "" ) || text;
			}

			text = ap.PATTERNS.PREP.reduce( function( value, pattern ) { 
				console.log( pattern.test( value ), value, pattern );
				value = value.replace( pattern, "" );
				return value;
			}, text );

			return text;
		};

		ap.generateElement = function( element, url, data ) { 
			if ( !data.parse ) { 
				ap.PATTERNS.IGNORE_URLS.push( url.pathname );
				return;
			}

			if ( ap.ALLOW_CACHE ) { 
				if ( !ap.CACHE.hasOwnProperty( data.parse.title ) ) { 
					ap.CACHE[ data.parse.title ] = data;
				}
			}

			const image = data.parse.images.map( function( value ) { 
				if ( ap.checkImageSrc( value ) ) return false;
				return value;
			} ).filter( Boolean )[ 0 ];

			const text = data.parse.text[ "*" ];

			if ( !image && !text ) { 
				ap.PATTERNS.IGNORE_URLS.push( url.pathname );
				return;
			}

			const temp = document.createElement( "div" );
			temp.innerHTML = ap.process( text, element.dataset.pageName );

			const selectorsToRemove = [ ".notice", "table" ];

			if ( !ap.INFOBOX ) { 
				selectorsToRemove.push( ".infobox", "aside.portable-infobox" );
			}

			if ( !ap.TOC ) { 
				selectorsToRemove.push( ".toc" );
			}

			const elementsToRemove = temp.querySelectorAll( selectorsToRemove.join( ", " ) );

			elementsToRemove.forEach( function( target ) { 
				target.remove( );
			} );

			const result = temp.innerHTML;

			ap.WRAPPER.innerHTML = "";

			const previewText = document.createElement( "div" );
			previewText.classList.add( "article-preview__text" );
			previewText.innerHTML = result;

			ap.WRAPPER.insertAdjacentElement( "beforeend", previewText );

			if ( ap.NO_IMAGE ) { 
				// Appends the overlay to its wrapper
				// ap.WRAPPER.append( ap.OVERLAY );

				return ap.processPreview( element );
			}

			const previewImage = new Image( );
			previewImage.classList.add( "article-preview__image" );
			ap.WRAPPER.insertAdjacentElement( "afterbegin", previewImage );

			// Appends the overlay to its wrapper
			// ap.WRAPPER.insertAdjacentElement( "afterbegin", ap.OVERLAY );

			if ( image ) {
				ap.generateImage( image )
					.then( ap.processImage.bind( ap, previewImage, element ) );
				return;
			} else { 
				ap.processImage( previewImage, element, { 
					useDefaultImage: true
				} );
			}
		};

		ap.generateImage = function( image ) { 
			const api = new mw.Api( );

			const params = Object.freeze( { 
				action: "query",
				redirects: true,
				titles: "File:" + image.trim( ),
				iiprop: "url",
				prop: "imageinfo",
				format: "json",
				indexpageids: true
			} );

			return api.get( params );
		};

		ap.getImageOrientation = function( image ) { 
			const height = image.naturalHeight || image.height;
			const width = image.naturalWidth || image.width;

			const aspectRatio = width / height;

			if ( aspectRatio < 1 ) return "portrait";

			if ( aspectRatio > 1 ) return "landscape";

			return "square";
		};

		ap.processImage = function( previewImage, element, data ) { 
			if ( data.useDefaultImage ) { 
				previewImage.src = ap.DEFAULT_IMAGE;
				return ap.processPreview( element );
			}

			const query = data.query;
			const pageid = query.pageids[ 0 ];
			const page = query.pages[ pageid ];

			if ( !query.redirects ) {
				const imageinfo = page.imageinfo;

				if ( imageinfo.length ) { 
					previewImage.src = imageinfo[ 0 ].url;
				} else { 
					previewImage.src = ap.DEFAULT_IMAGE;
				}

				console.log( previewImage.naturalHeight, previewImage.height );

				ap.CONTAINER.style.height = ( previewImage.naturalHeight || previewImage.height ) + "px";

				const imageOrientation = ap.getImageOrientation( previewImage );
				ap.CONTAINER.dataset.orientation = imageOrientation;

				return ap.processPreview( /* element */ );
			} else {
				const redirect = query.redirects[ 0 ].to;
				const redirectTitle = redirect.replace( /^File:/i, "" );

				ap.generateImage( redirectTitle )
					.then( ap.processImage.bind( ap, previewImage, element ) );
			}
		};

		ap.processPreview = function( /* element */ ) { 
			// Creates a client rect object for the link
			// const clientRect = element.getBoundingClientRect( );

			// Creating an offset vector
			// const offset = new Vector( -20, clientRect.height - 10 );

			// Adds the offset to its vector
			// ap.VECTOR = ap.VECTOR.add( offset );

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
		};

		// Function to initialize when the mouse leaves the link
		ap.offHover = function( /* opts, event */ ) { 
			// If the hover state is false, stop
			if ( !ap.HOVER ) return;

			// Sets the hover state to false
			ap.HOVER = false;

			// Hides the article preview and empties the element
			ap.CONTAINER.classList.remove( "show" );
			ap.WRAPPER.innerHTML = "";
		};

		// Set all configurations
		ap.setOptions( options );

		// Create a loader to initialize the script
		ap.LOADER = new Loader( ap.SCRIPTS, ap.init, ap );

		// Initializes the script
		ap.LOADER.init( );

		// Fires the ready hook
		mw.hook( "articlePreview.ready" ).fire( this );
	}

	window.ArticlePreview = ArticlePreview;
	window.ap = new ArticlePreview( window.articlePreview );
} )( window, jQuery, mediaWiki );