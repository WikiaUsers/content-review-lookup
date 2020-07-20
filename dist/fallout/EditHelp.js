// see [[User:Mazn/EditHelp]] for information about this code <div style="font-size: 90%; tab-size: 4; -moz-tab-size: 4; -o-tab-size: 4;"><source lang="javascript">

/**
 * Copyright (C) 2016 Mazn
 * https://fallout.wikia.com/wiki/User:Mazn
 *
 * module dev.editHelp
 * version: 0.1.3
 *
 * Detailed information about what editHelp is, what it does and how
 * far it has been developed, can be found at:
 * http://fallout.wikia.com/wiki/User:Mazn/EditHelp
 *
 * The documentation in the code below is still a bit lacking tbh
 *
 * tested with:
 * - MediaWiki 1.19
 * - jQuery 1.8.2
 *
 * dependencies:
 * - mediawiki.api
 * - jquery.textSelection
 * - dev.colors
 *
 * conformance:
 * - JSHint with "wikimedia" preset:
 *   https://github.com/wikimedia/mediawiki/blob/master/.jshintrc
 * - JSCS with built-in "wikimedia" preset
 */

/* globals jQuery: false, mediaWiki: false */

/**
 * Polyfill for:
 *     Array.prototype.findIndex
 * source:
 *     https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
 * compressed with UglifyJS2:
 *     https://github.com/mishoo/UglifyJS2
 */
/* jscs: disable */
/* jshint ignore:start */
Array.prototype.findIndex||(Array.prototype.findIndex=function(r){if(null===this)throw new TypeError('Array.prototype.findIndex called on null or undefined');if('function'!=typeof r)throw new TypeError('predicate must be a function');for(var n,t=Object(this),e=t.length>>>0,o=arguments[1],i=0;e>i;i++)if(n=t[i],r.call(o,n,i,t))return i;return-1});
/* jshint ignore:end */
/* jscs: enable */

( window.dev = window.dev || {} ).editHelp = {
	i18n: {
		en: {
			noTemplateSelected: '(select here or in edit pane)',
			noParamSelected: '(select here or in edit pane)',
			noDocumentation: 'No documentation available',
			unknownParam: 'No documentation available',
			docNotLoaded: 'Documentation could not be loaded'
		}
	}
};

// start module dev.editHelp
( function ( $, mw, editHelp ) {

	'use strict';

	// not an edit page, nothing to do here
	if ( !/[?&]action=edit/.test( window.location.search ) ) {
		return;
	}

	/**
	 * no IE8 support
	 *
	 * (AFAIK adding polyfills for these would be enough to make this entire
	 * script IE 8 compatible though. Everything else *should* run fine.)
	 */
	if (
		!Array.prototype.map     ||
		!Array.prototype.forEach ||
		!Array.prototype.filter  ||
		!Array.prototype.every   ||
		!Object.keys
	) {
		return;
	}

	var // timeout for API requests (ms)
		API_TIMEOUT = 3000,

		// debounce for keyup- and click-events of the textarea (ms)
		DEBOUNCE_TIME = 250,

		// name under which data is cached in localStorage
		TEMPLATES_CACHE_NAME = 'editHelp.cache',
		// 60 min * 60 sec * 1000 ms = 1 hour
		TEMPLATES_CACHE_TIME = 3600000,

		// prefix for all console output - including errors
		DEBUG_PREFIX = '[dev.editHelp] ',
		// debugMode is stored in localStorage under this name
		DEBUG_STORAGE = 'editHelp.debugMode',

		/**
		 * DO NOT CHANGE THESE!
		 * They've only been made constants to stand out
		 * NOT TO BE EDITABLE!
		 */
		NONE_SELECTED = -1,
		NO_SUCH_ENTRY = -2,

		debug, valve, model, view, controller,

		/**
		 * This is defer will be resolved when
		 * and if everything is successfully loaded
		 */
		master = $.Deferred(),

		i18n = $.extend(
			editHelp.i18n.en,
			editHelp.i18n[ mw.config.get( 'wgContentLanguage' ) ] || {}
		);

	/**
	 * get a deeply nested object property
	 * examples:
	 *   walk( response, [ 'query-continue', 'categorymembers', 'cmcontinue' ] )
	 *   walk( window, [ 'WikiaEditor', 'getInstance()', 'getEditbox()' ] )
	 */
	function walk( obj, props ) {
		var walker = obj;
		return props.every( function ( p ) {
			var method = false;
			p = String( p );
			if ( p.substr( -2 ) === '()' ) {
				method = p.substr( 0, p.length - 2 );
			}
			return Boolean(
				walker = method ?
					$.isFunction( walker[ method ] ) && walker[ method ]() :
					walker[ p ]
			);
		} ) && walker;
	}

	/**
	 * This is an attempt to detect the editor and attach events to its
	 * mode changes. Nukapedia uses only the source mode, so this is
	 * overkill for now.
	 */
	function initEditor() {
		var defer = $.Deferred(),
			module = '#EditPage .module_templates .module_content',
			WE = walk( window, [ 'WikiaEditor', 'getInstance()' ] ),
			RTE = false,
			editor = {
				getEditbox: function () {
					return WE.getEditbox();
				},
				onSource: function ( handler ) {
					if ( RTE ) {
						if ( WE.mode === 'source' ) {
							handler();
						}
						RTE.on( 'sourceModeReady', handler );
					} else {
						handler();
					}
					return this;
				},
				onWysiwyg: function ( handler ) {
					if ( RTE ) {
						if ( WE.mode === 'wysiwyg' ) {
							handler();
						}
						RTE.on( 'wysiwygModeReady', handler );
					}
					return this;
				}
			};
		// seems unlikely but hey
		if ( !WE ) {
			defer.reject( 'could not find WikiaEditor' );
		// if this true, this code is running from the browser console
		} else if ( WE.ready ) {
			// again: don't trust code you haven't written too much
			if ( !$( module ).length ) {
				defer.reject( 'could not find sidebar module' );
			} else {
				RTE = walk( window, [ 'RTE', 'getInstance()' ] );
				defer.resolve( editor );
			}
		// again: unlikely
		} else if ( !window.GlobalTriggers ) {
			defer.reject( 'could not find GlobalTriggers' );
		} else {
			window.GlobalTriggers
			.on( 'WikiaEditorReady', function () {
				// again: unlikely
				if ( !$( module ).length ) {
					defer.reject( 'could not find sidebar module' );
				// if this is true, the WYSIWYG editor is enabled
				} else if ( window.CKEDITOR ) {
					window.CKEDITOR
					.on( 'instanceReady', function () {
						RTE = walk( window, [ 'RTE', 'getInstance()' ] );
						if ( RTE ) {
							defer.resolve( editor );
						} else {
							defer.reject( 'could not find RTE' );
						}
					} );
				// source mode only
				} else {
					defer.resolve( editor );
				}
			} );
		}
		return defer;
	}

	debug = ( function () {
		var debugMode = Boolean( $.storage.get( DEBUG_STORAGE ) ),
			logNormal = window.console && window.console.log,
			logError = logNormal && window.console.error;
		return {
			getMode: function () {
				return debugMode;
			},
			setMode: function ( mode ) {
				debugMode = Boolean( mode );
				if ( debugMode ) {
					$.storage.set( DEBUG_STORAGE, true );
				} else {
					$.storage.del( DEBUG_STORAGE );
				}
			},
			log: logNormal ? function ( source ) {
				if ( !debugMode ) { return; }
				var args = $.makeArray( arguments );
				if ( typeof args[ 0 ] === 'string' ) {
					args[ 0 ] = DEBUG_PREFIX + source;
					if ( args.length === 1 ) {
						args[ 0 ] += ': ';
					}
				}
				logNormal.apply( window.console, args );
			} : function () {},
			error: logNormal ? function ( source ) {
				return function () {
					logError.apply(
						window.console,
						[ DEBUG_PREFIX + source + ' failed: ' ]
						.concat(
							$.makeArray( arguments )
						)
					);
				};
			} : function () {}
		};
	}() );

	/**
	 * I wrote my own debounce function because it needed to be
	 * lockable in case of asynchronous events. Or to put it differently:
	 * This debounce function has a fixed internal and a variable
	 * external timer. The external timer takes precedence.
	 */
	valve = ( function () {
		var timer, defer,
			locked = false,
			last = 0;
		return {
			lock: function () {
				locked = true;
			},
			unlock: function () {
				locked = false;
				if ( defer ) {
					defer();
				}
			},
			debounce: function ( fn, context ) {
				return function () {
					var execute, elapsed,
						args = arguments;
					elapsed = Date.now() - last;
					context = context || this;
					execute = function () {
						if ( locked ) {
							window.clearTimeout( timer );
							defer = execute;
						} else {
							last = Date.now();
							defer = false;
							fn.apply( context, args );
						}
					};
					if ( !locked && elapsed < DEBOUNCE_TIME ) {
						window.clearTimeout( timer );
						timer = window.setTimeout( execute, DEBOUNCE_TIME - elapsed );
					} else {
						execute();
					}
				};
			}
		};
	}() );

	model = ( function () {

		var	api, templateCache, docCache, State;

		/**
		 * normalization of template names
		 * also removes "Template:" prefix since it's just dead weight
		 * (this function might be too simplistic...)
		 */
		function normalize( name ) {
			name = decodeURIComponent( name ).replace( /_/, ' ' );
			name = /^Template:/i.test( name ) ? name.substr( 9 ) : name;
			return $.ucFirst( name );
		}

		/**
		 * checks whether two arrays represent the same set
		 * note: both arrays must be sorted beforehand
		 *   and all members must be unique
		 */
		function equalSet( a, b ) {
			var keys = {};
			if ( a.length !== b.length ) { return false; }
			a.forEach( function ( val ) {
				keys[ val ] = true;
			} );
			return b.every( function ( val ) {
				return keys[ val ];
			} );
		}

		/**
		 * This builds a cache of all template pages that are known to have
		 * documentation. They should all be in Category:Template_documentation
		 * (because that category is added in Template:Documentation) and they
		 * all should follow the naming convention templateName+"/doc".
		 * The latter is unfortunately only true 95% of the time, but I could
		 * not think of a solution to this problem. The query results are cached
		 * in the client under the name TEMPLATES_CACHE_NAME for an hour.
		 */
		templateCache = ( function () {

			var cache = {};

			function CacheBuilder( cache ) {
				this.cache = cache;
				this.defer = $.Deferred()
				.fail( debug.error( 'building template list' ) );
			}

			$.extend( CacheBuilder.prototype, {
				load: function () {
					this.request( false );
					return this.defer.promise();
				},
				walkTemplates: function ( i ) {
					var p = this.pages[ i ],
						title = p.title.substr( 9 );
					if ( title.substr( -4 ) === '/doc' ) {
						this.cache[ title.substr( 0, title.length - 4 ) ] = true;
					}
				},
				request: function ( cmcontinue ) {
					var query = {
						action: 'query',
						list: 'categorymembers',
						cmtitle: 'Category:Template documentation',
						cmprop: 'title',
						cmnamespace: 10,
						cmlimit: 500
					};
					if ( cmcontinue ) {
						query.cmcontinue = cmcontinue;
					}
					debug.log( 'api query', query );
					api.get( query )
					.done( $.proxy( this.processResponse, this ) )
					.fail( this.defer.reject );
				},
				processResponse: function ( response ) {
					var cmcontinue;
					debug.log( 'api response', response );
					this.pages = walk( response, [ 'query', 'categorymembers' ] );
					if ( this.pages ) {
						// The results are mostly - but not quite exclusively -
						// template documentation pages. Now we'll filter out the
						// rest *and* build the cache in the process
						Object.keys( this.pages ).forEach( this.walkTemplates, this );
						if ( response[ 'query-continue' ] ) {
							cmcontinue = walk( response, [ 'query-continue', 'categorymembers', 'cmcontinue' ] );
							// there were more than 500 results, so go into
							// recursion to get the rest
							if ( cmcontinue ) {
								this.request( cmcontinue );
							}
						} else {
							$.storage.set( TEMPLATES_CACHE_NAME, {
								timestamp: Date.now(),
								templates: Object.keys( this.cache )
							} );
							debug.log( 'template cache', cache );
							this.defer.resolve();
						}
					} else {
						this.defer.reject( 'couldn\'t parse template list: ', response );
					}
				}
			} );

			return {
				get: function ( name ) {
					return cache[ name ];
				},
				lookup: function ( templates ) {
					return templates.filter( this.get );
				},
				getDocumented: function () {
					return Object.keys( cache ).sort();
				},
				populate: function () {
					var builder, stored = $.storage.get( TEMPLATES_CACHE_NAME );
					if ( stored && stored.timestamp + TEMPLATES_CACHE_TIME < Date.now() ) {
						$.storage.del( TEMPLATES_CACHE_NAME );
						stored = false;
					}
					if ( stored ) {
						stored.templates.forEach( function ( template ) {
							cache[ template ] = true;
						} );
						debug.log( 'template cache', cache );
						return $.Deferred().resolve();
					} else {
						builder = new CacheBuilder( cache );
						return builder.load();
					}
				}
			};
		}() );

		/**
		 * This builds a cache of template documentations in memory - not in
		 * localStorage. The rendered versions of the docs are requested via
		 * the API and parsed. This is possible because Nukapedia's
		 * Template:Docparam makes heir structure surprisingly regular and easy
		 * to translate. Template:Docparam could do with some minor improvements
		 * and should probably be accompanied by one or two more helper
		 * templates, but still: Template:Docparam is ingenious.
		 * Kudos to its creator!
		 */
		docCache = ( function () {

			var cache = {};

			function Doc( name, data ) {
				var $doc = $( '<div>' + data + '</div>' )
					.find( '.va-documentation-content' ),
					$usage = $doc.find( '#Usage' ).parent().next(),
					$p = $doc.children( 'p ' ),
					doc = this;
				this.title =  name;
				// The template description is a bit difficult to detect. This
				// can only be corrected by introducing a {{Docdescription}}
				// template or somesuch. Currently the descriptions are informal
				// and cannot be parsed reliably.
				this.desc = $p.eq( 0 ).html().trim();
				if ( !this.desc || /^<br(?: \/)?>$/i.test( this.desc ) ) {
					this.desc = $p.eq( 1 ).html().trim() || '&nbsp;';
				}
				this.usage = {
					instructions: $usage.html().trim(),
					copypaste: $usage.next( 'pre' ).eq( 0 ).text().trim()
				};
				this.params = [];
				$doc.find( '.va-docparam' )
				.each( function () {
					var m, $ul, $this = $( this ),
						$desc = $this.next( '.va-docparam-desc' ),
						$default = $this.find( '.va-docparam-default' ),
						param = {
							fullTitle: $this.find( '.va-docparam-params' ).text().trim(),
							// type is: "required", "semi-required" or "optional"
							type: $this.find( '.va-docparam-icon span' ).eq( 0 ).text().trim()
						};
					// the parameter's value if none is specified
					if ( $default.length ) {
						param[ 'default' ] = $default.text().trim();
						if ( ( m = param[ 'default' ].match( /"(.+)"/ ) ) ) {
							param[ 'default' ] = m[ 1 ];
						}
					}
					// Some parameters have predefined values. Unfortunately
					// Template:Docparam provides no structure for listing them
					// so the following depends on dumb luck and duct tape.
					if ( ( $ul = $desc.find( 'ul' ) ).length ) {
						param.choice = {};
						$ul.find( 'li' )
						.each( function () {
							var parts = $( this ).text().trim().split( ':' );
							param.choice[ parts[ 0 ] ] = parts[ 1 ] || '';
						} );
						$ul.add( $ul.prev() ).remove();
					}
					param.desc = $desc.html().trim();
					doc.params.push( param );
				} );
				this.parseParamTitles();
			}

			Doc.paramNumericCompare = function ( a, b ) {
				if ( a.ranged ) {
					if ( b.ranged ) {
						return a.max < b.min ? -1 : ( a.min > b.max ? 1 : 0 );
					}
					return a.max < b.index ? -1 : ( a.min > b.index ? 1 : 0 );
				} else {
					if ( b.ranged ) {
						return a.index < b.min ? -1 : ( a.index > b.max ? 1 : 0 );
					}
					return a.index - b.index;
				}
			};

			Doc.paramCompare = function ( a, b ) {
				// Unnamed parameters will be sorted before named parameters
				// Unnamed parameters are sorted numerically and named parameters
				// are sorted alphabetically.
				if ( a.named ) {
					if ( b.named ) {
						return a.title < b.title ? -1 : ( a.title > b.title ? 1 : 0 );
					} else {
						return 1;
					}
				} else {
					if ( b.named ) {
						return -1;
					} else {
						return Doc.paramNumericCompare( a, b );
					}
				}
			};

			$.extend( Doc.prototype, {
				/**
				 * Template:Docparam allows for a lot of expressivenes in the
				 * "name" parameter. Every instance of Template:Docparam may
				 * apply to not just one but several parameters:
				 *
				 *     "parameter1, parameter2"
				 *         description applys to both parameters
				 *     "<unnamed 1> or parameter1"
				 *         The two parameters specify the same value
				 *         and are thus mutually exclusive. This is (meant to be)
				 *         used for parameters that can be specified by
				 *         order *and* by name
				 *     "parameter1 up to parameter 10"
				 *         Range of parameters starting with the first
				 *         up to the second. The first one may or may not have
				 *         a number attached to it.
				 *
				 * Combinations of the three notations are possible if rare.
				 *
				 * Additionally the documentation for Template:Docparam suggests
				 * a very specific format for unnamed parameters: "<unnamed N>"
				 * The template itself does not enforce this format but all
				 * the documentation I've seen stick to it.
				 *
				 * Note: This function doesn't evaluate "or". The link between
				 * named and unnamed parameters is lost.
				 */
				parseParamTitles: function () {
					var raw = this.params;
					this.unnamedParamMax = 0;
					this.params = [];
					raw.forEach( function ( param ) {
						this.original = param;
						param.fullTitle.split( / or |, / )
						.forEach( this.createParams, this );
					}, this );
					delete this.original;
					this.params.sort( Doc.paramCompare );
				},
				createParams: function ( namePart ) {
					var m, upTo;
					if ( ( m = namePart.match( /^<unnamed (\d+)> up to <unnamed (\d+)>$/ ) ) ) {
						this.createUnnamedRanged( m[ 1 ], m[ 2 ] );
					} else if ( ( upTo = namePart.split( ' up to ' ) ).length === 2 && ( m = upTo[ 1 ].match( /(\D*)(\d+)(.*)/ ) ) ) {
						this.createNamedRanged( upTo[ 0 ], m[ 1 ], m[ 2 ], m[ 3 ] );
					} else if ( ( m = namePart.match( /^<unnamed (\d+)>$/ ) ) ) {
						this.createUnnamed( m[ 1 ], namePart );
					} else {
						this.createNamed( namePart );
					}
				},
				createUnnamedRanged: function ( index1, index2 ) {
					var min = Number( index1 ),
						max = Number( index2 ),
						title = '<unnamed ' + index1 + ' to ' + index2 + '>';
					if ( max > this.unnamedParamMax ) {
						this.unnamedParamMax = max;
					}
					this.params.push(
						$.extend( {}, this.original, {
							title: title,
							min: min, max: max,
							named: false,
							ranged: true
						} )
					);
				},
				createNamedRanged: function ( name1, name2before, name2index, name2after ) {
					var m, param;
					param = {
						title: name2before + name2after,
						max: Number( name2index ),
						named: true,
						ranged: true
					};
					// the first named indexed parameter may not actually have
					// an index - example: "image desc up to image5 desc"
					if ( ( m = name1.match( /(\d+)/ ) ) ) {
						param.min = Number( m[ 1 ] );
					} else {
						param.min = 1;
						param.firstUnindexed = true;
					}
					this.params.push(
						$.extend( {}, this.original, param )
					);
				},
				createUnnamed: function ( index, title ) {
					index = Number( index );
					if ( index > this.unnamedParamMax ) {
						this.unnamedParamMax = index;
					}
					this.params.push(
						$.extend( {}, this.original, {
							title: title,
							index: index,
							named: false,
							ranged: false
						} )
					);
				},
				createNamed: function ( title ) {
					this.params.push(
						$.extend( {}, this.original, {
							title: title,
							named: true,
							ranged: false
						} )
					);
				}
			} );

			docCache = {
				load: function ( name ) {
					var query, doc, defer = $.Deferred();
					if ( cache[ name ] ) {
						defer.resolve( cache[ name ] );
					} else {
						query = {
							action: 'query',
							prop: 'revisions',
							format: 'json',
							rvprop: 'content',
							rvparse: 1,
							titles: 'Template:' + name
						};
						// debounce until request is completed
						valve.lock();
						view.showThrobber();
						debug.log( 'api query', query );
						api.get( query )
						.always( valve.unlock )
						.done( function ( response ) {
							var id, walker = walk( response, [ 'query', 'pages' ] );
							debug.log( 'api response', response );
							if ( walker ) {
								id = Object.keys( walker )[ 0 ];
								walker = walk( walker, [ id, 'revisions', 0, '*' ] );
							}
							if ( walker ) {
								doc = new Doc( name, walker );
								cache[ name ] = doc;
								defer.resolve( doc );
							} else {
								defer.reject( 'unexpected API response: ', response );
							}
						} )
						.fail( debug.error( 'loading documentation' ) );
					}
					return defer.promise();
				}
			};

			return docCache;
		}() );

		/**
		 * The model maintains an internal state of the widget. Every time the
		 * model receive input from the controller or the view, a new state is
		 * created that is initially 100% identical to the current one. Then
		 * the changes are applied one by one and the state is applied with
		 * State.prototype.apply. That forwards the new state to the model
		 * and replaces the current state with the new one.
		 *
		 * The State structure may seem a little overengineered but it helped
		 * me greatly while debugging, so it should stay.
		 *
		 * These are the properties:
		 *
		 * doc
		 *     This is the Doc object for the currently active template.
		 *     It contains the documentation of the template itself as well as
		 *     the names and descriptions of all of its parameters.
		 *     The Doc object is requested via docCache.load() which may - or
		 *     may not if it was previously requested - be an asynchronous
		 *     operation.
		 *
		 * templates
		 *     The list of templates the controller found in the document.
		 *     This list is checked against the list in the templateCache
		 *     to make sure it contains only documented templates. Some templates
		 *     may not have documentation after all - or none this script can
		 *     find. And since all of this is live while editing, we're also
		 *     dealing with incomplete and misspelled template names.
		 *
		 * templateName
		 *     This is the name of the currently active template as reported
		 *     by the controller. The model tests this name against the
		 *     templateCache. The name may be:
		 *     1.) a string or
		 *     2.) false if the caret does not rest on a template
		 *     The templateName is resolved to a templateIndex before forwarding
		 *     the state to the view.
		 *
		 * templateIndex
		 *     This is either the array index of the template in "templates" or
		 *     one of the special values NONE_SELECTED or NO_SUCH_ENTRY.
		 *     Only the view may report a templateIndex directly. The controller
		 *     may only report the "templateName" which gets resolved to this.
		 *
		 *     NONE_SELECTED means there's no template under the caret or the
		 *         user hasn't picked one from the widget.
		 *     NO_SUCH_ENTRY means there's no documentation for the template
		 *         name under the caret. Only the controller may report values
		 *         that resolve to NO_SUCH_ENTRY.
		 *
		 * paramName
		 *     This is the parameter name as reported by the controller that
		 *     will be checked against the templateCache.
		 *     Only the the controller may report a paramName.
		 *     The view may only report a valid paramIndex.
		 *     The paramName may be:
		 *     1.) a string in case of named parameters
		 *     2.) a number in case of indexed parameters or
		 *     3.) false if the caret does not rest on a parameter
		 *     The results are tested against the "doc" which contains the active
		 *     template's parameter documentation. This value gets resolved to
		 *     a "paramIndex"
		 *
		 * paramIndex
		 *     This either the index to the doc.params array that holds the
		 *     parameter documentation or NONE_SELECTED or NO_SUCH_ENTRY.
		 *
		 *     NONE_SELECTED means there's no parameter under the caret or the
		 *         user hasn't picked one from the widget.
		 *     NO_SUCH_ENTRY means there's no documentation for the parameter
		 *         name under the caret. Only the controller may report values
		 *         that resolve to NO_SUCH_ENTRY.
		 *
		 * error
		 *     If either the templateIndex or the paramIndex (it can never be
		 *     both) is set to NO_SUCH_ENTRY, an error message must be added.
		 *     The view decides what to do with it...
		 *
		 * modified.templates
		 * modified.template
		 * modified.param
		 *     These three values denote which values have changed since the last
		 *     time the state was changed and/or which need to be acted on.
		 *     Having these values around helps avoid superfluous work for the
		 *     view and also helped a LOT during debugging.
		 *
		 * empty
		 *     If this value is true the controller couldn't find any templates
		 */
		State = ( function ()  {

			function State( props ) {
				$.extend( this, State.now || {}, props || {} );
			}

			State.now = new State( {
				doc: false,
				templates: [],
				templateIndex: NONE_SELECTED,
				paramIndex:    NONE_SELECTED,
				modified: {
					template:  false,
					templates: false,
					param:     false
				}
			} );

			State.onlyUnique = function ( value, index, self ) {
				return $.inArray( value, self ) === index;
			};

			State.empty = function ( index ) {
				return index === NONE_SELECTED || index === NO_SUCH_ENTRY;
			};

			$.extend( State.prototype, {
				setDoc: function ( doc ) {
					this.doc = doc;
					return this;
				},
				setError: function ( error ) {
					this.error = error;
					return this;
				},
				setTemplates: function ( templates ) {
					this.templates = templateCache.lookup(
						templates
						.map( normalize )
						.filter( State.onlyUnique )
						.sort()
					);
					this.modified.templates = !equalSet( this.templates, State.now.templates );
					return this;
				},
				setTemplateName: function ( templateName ) {
					var index;
					if ( templateName ) {
						this.templateName = normalize( templateName );
						index = $.inArray( this.templateName, this.templates );
						this.setTemplateIndex( index > -1 ? index : NO_SUCH_ENTRY );
					} else {
						this.setTemplateIndex( NONE_SELECTED );
					}
					return this;
				},
				setTemplateIndex: function ( index ) {
					this.templateIndex = index;
					if ( this.templateIndex === NO_SUCH_ENTRY ) {
						this.error = i18n.noDocumentation;
						this.modified.template = true;
					} else {
						this.modified.template = this.templateIndex !== State.now.templateIndex;
					}
					return this;
				},
				findUnnamed: function ( param ) {
					return !param.named && (
						param.ranged ?
							param.min <= this.paramName && param.max >= this.paramName :
							param.index === this.paramName
						);
				},
				findNamed: function ( param ) {
					return param.named && param.title === this.paramName;
				},
				setParamName: function ( paramName ) {
					var index = false;
					this.paramName = paramName;
					if ( paramName === false ) {
						index = NONE_SELECTED;
					} else if ( typeof paramName === 'number' ) {
						index = this.doc.params.findIndex( this.findUnnamed, this );
						index = index === -1 ? NO_SUCH_ENTRY : index;
					} else if ( typeof paramName === 'string' ) {
						this.paramName = this.paramName.replace( /\d+/, '' );
						index = this.doc.params.findIndex( this.findNamed, this );
						index = index === -1 ? NO_SUCH_ENTRY : index;
					}
					this.setParamIndex( index );
					return this;
				},
				setParamIndex: function ( index ) {
					this.paramIndex = index;
					if ( this.paramIndex === NO_SUCH_ENTRY ) {
						this.error = i18n.unknownParam;
					}
					if ( !State.empty( this.templateIndex ) ) {
						this.modified.param =
							this.modified.template ||
							this.paramIndex !== State.now.paramIndex ||
							this.paramIndex === NO_SUCH_ENTRY;
					}
					return this;
				},
				setEmpty: function () {
					$.extend( this, {
						empty: true,
						templates: [],
						templateIndex: NONE_SELECTED,
						paramIndex:    NONE_SELECTED,
						modified: {
							template:  false,
							templates: false,
							param:     false
						}
					} );
					return this;
				},
				apply: function () {
					debug.log( 'state', this );
					view.setState( this );
					delete this.templateName;
					delete this.paramName;
					delete this.error;
					delete this.empty;
					this.modified = {
						template:  false,
						templates: false,
						param:     false
					};
					State.now = this;
				}
			} );

			return State;
		}() );

		return {
			// only the view may call this
			setTemplate: function ( index ) {
				var state = new State();
				state.setTemplateIndex( index );
				if ( state.modified.template ) {
					state.setParamIndex( NONE_SELECTED );
					if ( State.empty( state.templateIndex ) ) {
						state.apply();
					} else {
						docCache.load( state.templates[ index ] )
						.done( function ( doc ) {
							state.setDoc( doc )
							.apply();
						} )
						.fail( debug.error( 'model.setTemplate' ) )
						.fail( function () {
							state.setError( i18n.docNotLoaded )
							.setParamIndex( NONE_SELECTED )
							.apply();
						} );
					}
				}
			},
			// only the view may call this
			setParam: function ( index ) {
				var state = new State();
				if ( state.doc ) {
					state.setParamIndex( index )
					.apply();
				}
			},
			// only the controller may call this
			setState: function ( results ) {
				var state = new State();
				if ( !results.templates.length ) {
					state.setEmpty()
					.apply();
				}
				state.setTemplates( results.templates )
				.setTemplateName( results.templateName );
				if ( state.modified.templates && !state.modified.template ) {
					state.setTemplateIndex( NONE_SELECTED )
					.setParamIndex( NONE_SELECTED )
					.apply();
				} else if ( state.modified.template ) {
					if ( State.empty( state.templateIndex ) ) {
						state.setParamIndex( NONE_SELECTED )
						.apply();
					} else {
						docCache.load( state.templateName )
						.done( function ( doc ) {
							state.setDoc( doc )
							.setParamName( results.paramName )
							.apply();
						} )
						.fail( debug.error( 'model.setState' ) )
						.fail( function () {
							state.setError( i18n.docNotLoaded )
							.apply();
						} );
					}
				} else {
					state.setParamName( results.paramName ).apply();
				}
			},
			// all of the following (excepty prepare) are introspection functions
			// and not strictly needed.
			getTemplates: function () {
				return State.now.templates.map( function ( val ) { return val; } );
			},
			getTemplate: function () {
				switch ( State.now.templateIndex ) {
					case NONE_SELECTED:
					case NO_SUCH_ENTRY:
						return State.now.templateIndex;
					default:
						return State.now.templates[ State.now.templateIndex ];
				}
			},
			getParam: function () {
				switch ( State.now.paramIndex ) {
					case NONE_SELECTED:
					case NO_SUCH_ENTRY:
						return State.now.paramIndex;
					default:
						// in case this function is called while the doc is loading
						if ( !State.now.doc ) {
							return NONE_SELECTED;
						}
						return State.now.doc.params[ State.now.paramIndex ].title;
				}
			},
			getDocumented: function () {
				return templateCache.getDocumented();
			},
			prepare: function () {
				api = new mw.Api( { timeout: API_TIMEOUT } );
				return templateCache.populate()
				.fail( debug.error( 'model.prepare' ) );
			}
		};
	}() );

	view = ( function () {

		var html,
			path = mw.config.get( 'wgArticlePath' ),
			esc = mw.html.escape,
			enc = mw.util.wikiUrlencode;

		function createDocPane() {

			var colors = window.dev.colors,
				bright = $( 'body' ).hasClass( 'page-bright' ),
				page = colors.parse( colors.wikia.page );

			colors.css( '#doc { box-sizing: border-box; color: $content; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; font-variant: normal; font-weight: normal; margin-top: 10px; line-height: 15px; width: 260px; } #doc .doc-caption { display: inline-block; margin-right: 5px; text-align: right; vertical-align: text-top; width: 65px; } #doc .doc-section { margin: 8px 0; } #doc .doc-title { background: $titleBack; background: -moz-linear-gradient(top, $titleBack 0%, $titleBack 30%, $titleGradient 100%); background: -webkit-linear-gradient(top, $titleBack 0%, $titleBack 30%, $titleGradient 100%); background: linear-gradient(to bottom, $titleBack 0%, $titleBack 30%, $titleGradient 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="$titleBack", endColorstr="$titleGradient", GradientType=0 ); border: 1px solid $border; padding: 2px 6px 1px; word-break: keep-all; } #doc .doc-title .right { float: right; } #doc .doc-desc { background-color: $page; border: 1px solid $border; padding: 2px 6px 1px; } #doc.template-error .doc-template .doc-desc, #doc.param-error .doc-param .doc-desc, #doc select[disabled] { background-color: $noDoc; } #doc .doc-desc table { border-top: 1px solid $border; margin-top: 3px; } #doc .doc-desc td { padding: 0; vertical-align: top; } #doc .doc-desc td:first-child { padding-right: 6px; } #doc select { border: 1px solid $border; color: $content; outline: medium none; } body.rte_wysiwyg #doc, #doc.init .doc-section, #doc.empty .doc-section, #doc.loading .doc-details, #doc.loading .doc-param, #doc.template-error .doc-template .doc-title, #doc.template-error .doc-param, #doc.template-empty .doc-details, #doc.template-empty .doc-param, #doc.param-error .doc-param .doc-title, #doc.param-empty .doc-param.doc-details { display: none; } #doc .doc-loading { background: transparent url("https://images.wikia.nocookie.net/common/skins/common/images/ajax.gif") no-repeat scroll center center; display: none; margin-top: 8px; } #doc.init .doc-loading, #doc.loading .doc-loading { display: block; }', {
				content: $( '.module_content' ).css( 'color' ),
				titleBack: page.lighten( bright ? -5 : 5 ).hex(),
				titleGradient: colors.parse(
						$( '.module > h3' ).css( 'background-color' )
					).lighten( bright ? -10 : 10 ).hex(),
				noDoc: page.lighten( bright ? -10 : 10 ).hex()
			} );

			$( '#EditPage .module_templates .module_content' )
			.append( '<div id="doc" class="init">' +
				'<div class="doc-section doc-template doc-header">' +
					'<div class="doc-caption">Template:</div>' +
					'<select>' +
						'<option value="-1">' + i18n.noTemplateSelected + '</option>' +
					'</select>' +
				'</div>' +
				'<div class="doc-loading">&nbsp;</div>' +
				'<div class="doc-section doc-template doc-details">' +
					'<div class="doc-title">&nbsp;</div>' +
					'<div class="doc-desc">&nbsp;</div>' +
				'</div>' +
				'<div class="doc-section doc-param doc-header">' +
					'<div class="doc-caption">Parameter:</div>' +
					'<select></select>' +
				'</div>' +
				'<div class="doc-section doc-param doc-details">' +
					'<div class="doc-title">&nbsp;</div>' +
					'<div class="doc-desc">&nbsp;</div>' +
				'</div>' +
			'</div>' );
		}

		function attachRoutines() {
			var select;

			function formatLink( text, href, title, cssClass ) {
				var a = '<a href="' + href + '" title="' + esc( title ) + '"';
				if ( cssClass ) {
					a += ' class="' + cssClass + '"';
				}
				return a + ' target="_blank">' + esc( text ) + '</a>';
			}

			function formatPage( pageName ) {
				return path.replace( /\$1/, enc( pageName ) );
			}

			function option( value, index ) {
				var text = value.title ? value.title : value;
				return '<option value="' + index + '">' + esc( text ) + '</option>';
			}

			function options( opts, noneText ) {
				return option( noneText, NONE_SELECTED ) + opts.map( option ).join( '' );
			}

			html = {
				$doc: $( '#doc' ),
				setClass: function ( docClass ) {
					if ( docClass ) {
						this.$doc.attr( 'class', docClass );
					} else if ( docClass === false ) {
						this.$doc.removeAttr( 'class' );
					}
				},
				template: {
					$select:  $( '#doc .doc-template.doc-header select' ),
					$title:   $( '#doc .doc-template.doc-details .doc-title' ),
					$desc:    $( '#doc .doc-template.doc-details .doc-desc' ),
					setTitle: function ( title ) {
						var	page = 'Template:' + title,
							href = formatPage( page );
						this.$title.html(
							formatLink( page, href, page ) + ' (' +
							formatLink( 'edit', href + '?action=edit', 'edit template' ) + ')' +
							formatLink( '?', formatPage( 'Help:Templates' ), 'more about templates', 'right' )
						);
					},
					setDesc: function ( desc ) {
						this.$desc.html( desc )
						.find( 'a' ).attr( 'target', '_blank' );
					},
					options: function ( templates ) {
						this.$select
						.html( options( templates, i18n.noTemplateSelected ) )
						.prop( 'disabled', templates.length === 0 );
					}
				},
				param: {
					$select:  $( '#doc .doc-param.doc-header select' ),
					$title:   $( '#doc .doc-param.doc-details .doc-title' ),
					$desc:    $( '#doc .doc-param.doc-details .doc-desc' ),
					setTitle: function ( param ) {
						var title = esc( param.fullTitle )
						.replace( / or /g, ' <i>or</i> ' )
						.replace( / up to /g, ' <i>up to</i> ' );
						title += ' [' + esc( param.type ) + ']';
						if ( param[ 'default' ] ) {
							title += ' [default: <i>' + esc( param[ 'default' ] ) + '</i>]';
						}
						this.$title.html( title );
					},
					setDesc: function ( param ) {
						var desc = param.desc;
						if ( param.choice ) {
							desc += ' Possible value(s): <br><table>';
							Object.keys( param.choice ).forEach( function ( i ) {
								desc += '<tr><td><i>' + i + '</i></td><td>' +
									param.choice[ i ] + '</td></tr>';
							} );
							desc += '</table>';
						}
						this.$desc.html( desc )
						.find( 'a' ).attr( 'target', '_blank' );
					},
					options: function ( params ) {
						this.$select
						.html( options( params, i18n.noParamSelected ) )
						.prop( 'disabled', params.length === 0 );
					}
				}
			};

			select = function ( toSelect ) {
				var $opts, val = this.val();
				if ( toSelect !== val ) {
					$opts = this.find( 'option' );
					$opts.eq( val + 1      ).prop( 'selected', false );
					$opts.eq( toSelect + 1 ).prop( 'selected', true   );
				}
			};

			html.template.$select.select = select;
			html.param.$select.select = select;

			html.template.$select
			.change( function () {
				model.setTemplate( Number( $( this ).val() ) );
			} );

			html.param.$select
			.change( function () {
				model.setParam( Number( $( this ).val() ) );
			} );
		}

		return {
			setState: function ( state ) {
				var param, index,
					docClass = state.empty ? 'empty' : null;
				if ( state.modified.templates ) {
					html.template.options( state.templates );
					docClass = 'template-empty';
				}
				if ( state.modified.template ) {
					index = state.templateIndex;
					switch ( state.templateIndex ) {
						case NO_SUCH_ENTRY:
							html.template.$desc.html( state.error );
							index = NONE_SELECTED;
							docClass = 'template-error';
							break;
						case NONE_SELECTED:
							docClass = 'template-empty';
							break;
						default:
							html.template.setTitle( state.doc.title );
							html.template.setDesc( state.doc.desc );
							html.param.options( state.doc.params );
							docClass = 'param-empty';
					}
					html.template.$select.select( index );
				}
				if ( state.modified.param ) {
					index = state.paramIndex;
					switch ( state.paramIndex ) {
						case NO_SUCH_ENTRY:
							html.param.$desc.html( state.error );
							index = NONE_SELECTED;
							docClass = 'param-error';
							break;
						case NONE_SELECTED:
							docClass = 'param-empty';
							break;
						default:
							param = state.doc.params[ state.paramIndex ];
							html.param.setTitle( param );
							html.param.setDesc( param );
							docClass = false;
					}
					html.param.$select.select( index );
				}
				html.setClass( docClass );
			},
			showThrobber: function () {
				html.setClass( 'loading' );
			},
			prepare: function () {
				createDocPane();
				attachRoutines();
			}
		};
	}() );

	controller = ( function () {

		var controller, Tokenizer, current;

		Tokenizer = ( function () {

			var T_OPEN, T_CLOSE, T_TEMPLATE, T_PIPE, T_PARAM,
				T_ASSIGN, T_TEXT, T_LINK;

			function Tokenizer( text, caret ) {
				this[ debug.getMode() ? 'setVerbose' : 'setTerse' ]();
				this.text = text;
				this.caret = caret;
				this.openers = [];
				this.results = {
					templates: [],
					templateName: false,
					paramName: false
				};
				this.tokenizeBraces();
				this.extractData();
			}

			Tokenizer.sortByLevel = function ( a, b ) {
				return a.level > b.level ? -1 : ( a.level < b.level ? 1 : 0 );
			};

			$.extend( Tokenizer.prototype, {
				setTerse: function () {
					T_OPEN     = 1;
					T_CLOSE    = 2;
					T_TEMPLATE = 3;
					T_PIPE     = 4;
					T_PARAM    = 5;
					T_ASSIGN   = 6;
					T_TEXT     = 7;
					T_LINK     = 8;
				},
				setVerbose: function () {
					T_OPEN     =  'open';
					T_CLOSE    =  'close';
					T_TEMPLATE =  'template';
					T_PIPE     =  'pipe';
					T_PARAM    =  'param';
					T_ASSIGN   =  'assign';
					T_TEXT     =  'text';
					T_LINK     =  'link';
				},
				log: function () {
					if ( debug.getMode() ) {
						this.firstToLast( function ( walker ) {
							debug.log( 'token: ', walker );
						} );
					}
				},
				changeType: function ( token, type ) {
					if ( token.prev && token.prev.type === type ) {
						token.prev.text += token.text;
						if ( token.next ) {
							token.prev.next = token.next;
							token.next.prev = token.prev;
						} else {
							this.last = token.prev;
							delete token.prev.next;
						}
					} else {
						token.type = type;
					}
					if ( token.next && token.next.type === type ) {
						this.changeType( token.next, type );
					}
				},
				append: function ( text, type ) {
					var token = { text: text, type: type };
					if ( !this.first ) {
						this.first = token;
						this.last = token;
					} else {
						this.last.next = token;
						token.prev = this.last;
						this.last = token;
					}
					return token;
				},
				lastToFirst: function ( fn ) {
					var walker = this.last;
					while ( walker && !fn.call( this, walker ) ) {
						walker = walker.prev;
					}
				},
				firstToLast: function ( fn ) {
					var walker = this.first;
					while ( walker && !fn.call( this, walker ) ) {
						walker = walker.next;
					}
				},
				walkFromTo: function ( from, to, fn ) {
					var walker = from;
					while ( walker !== to ) {
						fn.call( this, walker );
						walker = walker.next;
					}
				},
				splitDelimCapture: function ( text, regex ) {
					var s,
						result = [];
					while ( ( s = regex.exec( text ) ) ) {
						if ( s.index > 0 ) {
							result.push( text.substr( 0, s.index ) );
							text = text.substring( s.index );
						}
						result.push( text.substr( 0, s[ 0 ].length ) );
						text = text.substring( s[ 0 ].length );
					}
					if ( text.length ) {
						result.push( text );
					}
					return result;
				},
				tokenizeBraces: function () {
					var level = 0;
					this.splitDelimCapture( this.text, /\{{2}|\}{2}/ )
					.forEach( function ( text ) {
						var open, close;
						switch ( text ) {
							case '{{':
								open = this.append( '{{', T_OPEN );
								open.level = ++level;
								break;
							case '}}':
								close = this.append( '}}', T_CLOSE );
								close.level = level--;
								this.lastToFirst( function ( walker ) {
									if ( walker.type === T_OPEN && walker.level === close.level ) {
										walker.match = close;
										close.match = walker;
										return true;
									}
									return false;
								} );
								break;
							default:
								this.append( text, T_TEXT );
						}
					}, this );
					// build quick jump list of T_OPEN tokens and T_TEXT tokens
					// also: clean up unclosed {{, unopened }} and empty {{}}
					this.firstToLast( function ( walker ) {
						if ( walker.type === T_OPEN ) {
							if ( walker.match === undefined ) {
								delete walker.level;
								this.changeType( walker, T_TEXT );
							} else if ( walker.next && walker.next.type === T_CLOSE ) {
								delete walker.level;
								delete walker.match;
								delete walker.next.level;
								delete walker.next.match;
								this.changeType( walker, T_TEXT );
								this.changeType( walker.next, T_TEXT );
							} else {
								if ( this.minLevel === undefined || walker.level < this.minLevel ) {
									this.minLevel = walker.level;
								}
								this.openers.push( walker );
							}
						} else if ( walker.type === T_CLOSE && walker.match === undefined ) {
							delete walker.level;
							this.changeType( walker, T_TEXT );
						}
					} );
					this.tokenizePipes();
				},
				tokenizePipes: function () {
					if ( this.openers.length ) {
						this.openers.sort( Tokenizer.sortByLevel );
						this.openers.forEach( this.tokenizeTextInTemplates, this );
					}
				},
				splitToken: function ( token, regex, type ) {
					var next, m;
					if ( token.type === T_TEXT && ( m = regex.exec( token.text ) ) ) {
						if ( m[ 0 ].length === token.text.length ) {
							token.type = type;
						} else if ( m.index === 0 ) {
							next = token.next;
							token.next = {
								text: token.text.substr( m[ 0 ].length ),
								type: token.type,
								prev: token,
								next: token.next
							};
							next.prev = token.next;
							this.splitToken( token.next, regex, type );
							token.text = m[ 0 ];
							token.type = type;
						} else {
							next = token.next;
							token.next = {
								text: token.text.substr( m.index, m[ 0 ].length ),
								type: type,
								prev: token,
								next: token.next
							};
							if ( token.text.length > m.index + m[ 0 ].length ) {
								token.next.next = {
									text: token.text.substr( m.index + m[ 0 ].length ),
									type: token.type,
									prev: token.next,
									next: token.next.next
								};
								next.prev = token.next.next;
								this.splitToken( token.next.next, regex, type );
							} else {
								next.prev = token.next;
								this.splitToken( token.next, regex, type );
							}
							token.text = token.text.substr( 0, m.index );
						}
					}
				},
				walkTemplate: function ( open, fn ) {
					this.walkFromTo( open.next, open.match, function ( walker ) {
						if ( !walker.opener ) {
							walker.opener = open;
						}
						if ( walker.opener === open ) {
							fn.call( this, walker );
						}
					} );
				},
				findLinks: function ( token ) {
					var opening = /\[{2}/.test( token.text ),
						closing = /\]{2}/.test( token.text );
					if ( opening && !closing ) {
						// incomplete: skip if no closing ]] found in following tokens
						this.splitToken( token, /\[{2}/, T_LINK );
					} else if ( closing && !opening ) {
						// incomplete: skip if no opening [[ found in preceding tokens
						this.splitToken( token, /\]{2}/, T_LINK );
					} else {
						this.splitToken( token, /\[{2}[^\[\]]+\]{2}/, T_LINK );
					}
				},
				tokenizeTextInTemplates: function ( open ) {
					var contents = [],
						pipes = [],
						count = 1;
					this.walkTemplate( open, function ( walker ) {
						if ( walker.type === T_TEXT ) {
							contents.push( walker );
						}
					} );
					contents.forEach( this.findLinks, this );
					this.walkTemplate( open, function ( walker ) {
						if ( walker.type === T_TEXT ) {
							this.splitToken( walker, /\|/, T_PIPE );
						}
						if ( walker.type === T_PIPE ) {
							pipes.push( walker );
						}
					} );
					open.next.type = T_TEMPLATE;
					this.walkTemplate( open, function ( walker ) {
						if ( walker.type === T_TEXT ) {
							this.splitToken( walker, /=/, T_ASSIGN );
							if ( walker.next.type === T_ASSIGN ) {
								walker.type = T_PARAM;
							}
						}
					} );
					pipes.forEach( function ( pipe ) {
						if ( pipe.next.type !== T_PARAM ) {
							pipe.index = count++;
						}
					} );
				},
				findTemplateAndParam: function ( caretToken ) {
					var walker,
						template = false;
					if ( !caretToken.opener && !caretToken.match ) {
						return;
					} else if ( caretToken.type === T_OPEN ) {
						template = caretToken.next;
					} else if ( caretToken.type === T_CLOSE ) {
						template = caretToken.match.next;
					} else {
						template = caretToken.opener.next;
						if ( caretToken.type !== T_TEMPLATE ) {
							walker = caretToken;
							while ( walker !== caretToken.opener ) {
								if ( walker.opener === caretToken.opener && walker.type === T_PIPE ) {
									break;
								}
								walker = walker.prev;
							}
							this.results.paramName = walker.index || walker.next.text.trim();
						}
					}
					this.results.templateName = template && template.text.trim();
				},
				extractData: function () {
					var count = 0;
					this.openers.forEach( function ( open ) {
						var t = open.next.text.trim();
						if ( t.length ) {
							this.results.templates.push( t );
						}
					}, this );
					this.firstToLast( function ( walker ) {
						count += walker.text.length;
						if ( count >= this.caret ) {
							this.findTemplateAndParam( walker );
							debug.log( 'caret', walker );
							return true;
						}
						return false;
					} );
				}
			} );

			return Tokenizer;
		}() );

		controller = {
			logTokens: function () {
				if ( current && debug.getMode() ) {
					current.log();
				}
			},
			prepare: function () {
				initEditor()
				.done( function ( editor ) {
					var update = valve.debounce( function () {
						var box = editor.getEditbox(),
							caret = box.textSelection( 'getCaretPosition' );
						current = new Tokenizer( box.val(), caret );
						debug.log( 'input', current.results );
						model.setState( current.results );
					} );
					editor
					.onSource( function () {
						editor.getEditbox()
						.on( 'keyup.editHelp click.editHelp', update );
						update();
					} )
					.onWysiwyg( function () {
						editor.getEditbox()
						.off( 'keyup.editHelp click.editHelp' );
					} );
				} );
			}
		};

		return controller;
	}() );

	$.extend( editHelp, {
		load: function () {
			return master.promise();
		},
		setDebugMode: function ( mode ) {
			debug.setMode( mode );
		}
	} );

	$( function () {
		var promise,
			error = debug.error( 'start' );
		if ( $( '#doc' ).length ) {
			error( 'already loaded' );
		} else {
			try {
				if ( mw.loader.getState( 'dev.colors' ) === null ) {
					mw.loader.implement( 'dev.colors', [
						'/load.php?mode=articles&articles=u%3Adev%3AColors%2Fcode.js&only=scripts'
					], {}, {} );
				}
				promise = mw.loader.using( [
					'mediawiki.api', 'jquery.textSelection', 'dev.colors'
				] );
			} catch ( e ) {
				promise = $.Deferred().reject( e.message );
			}
			$.when( initEditor(), promise )
			.done( function () {
				model.prepare()
				.done( function () {
					view.prepare();
					controller.prepare();
					master.resolve( {
						getTemplates: function () {
							return model.getTemplates();
						},
						getTemplate: function () {
							return model.getTemplate();
						},
						getParam: function () {
							return model.getParam();
						},
						getDocumented: function () {
							return model.getDocumented();
						},
						clearDocumented: function () {
							$.storage.del( TEMPLATES_CACHE_NAME );
						},
						logTokens: function () {
							controller.logTokens();
						}
					} );
					debug.log( 'ready' );
				} );
			} )
			.fail( error );
		}
	} );
}( jQuery, mediaWiki, window.dev.editHelp ) );
// end module dev.editHelp

// </source></div> __NOWYSIWYG__