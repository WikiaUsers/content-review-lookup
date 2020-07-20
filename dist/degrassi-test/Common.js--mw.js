/*
 * Core MediaWiki JavaScript Library
 */
 
// Attach to window and globally alias
window.mw = window.mediaWiki = new ( function( $ ) {
 
	/* Private Members */
 
	/**
	 * @var object List of messages that have been requested to be loaded.
	 */
	var messageQueue = {};
 
	/* Object constructors */
 
	/**
	 * Map
	 *
	 * Creates an object that can be read from or written to from prototype functions
	 * that allow both single and multiple variables at once.
	 *
	 * @param global boolean Whether to store the values in the global window
	 *  object or a exclusively in the object property 'values'.
	 * @return Map
	 */
	function Map( global ) {
		this.values = ( global === true ) ? window : {};
		return this;
	}
 
	Map.prototype = {
		/**
		 * Get the value of one or multiple a keys.
		 *
		 * If called with no arguments, all values will be returned.
		 *
		 * @param selection mixed String key or array of keys to get values for.
		 * @param fallback mixed Value to use in case key(s) do not exist (optional).
		 * @return mixed If selection was a string returns the value or null,
		 *  If selection was an array, returns an object of key/values (value is null if not found),
		 *  If selection was not passed or invalid, will return the 'values' object member (be careful as
		 *  objects are always passed by reference in JavaScript!).
		 * @return Values as a string or object, null if invalid/inexistant.
		 */
		get: function( selection, fallback ) {
			if ( $.isArray( selection ) ) {
				selection = $.makeArray( selection );
				var results = {};
				for ( var i = 0; i < selection.length; i++ ) {
					results[selection[i]] = this.get( selection[i], fallback );
				}
				return results;
			} else if ( typeof selection === 'string' ) {
				if ( this.values[selection] === undefined ) {
					if ( fallback !== undefined ) {
						return fallback;
					}
					return null;
				}
				return this.values[selection];
			}
			if ( selection === undefined ) {
				return this.values;
			} else {
				return null; // invalid selection key
			}
		},
 
		/**
		 * Sets one or multiple key/value pairs.
		 *
		 * @param selection mixed String key or array of keys to set values for.
		 * @param value mixed Value to set (optional, only in use when key is a string)
		 * @return bool This returns true on success, false on failure.
		 */
		set: function( selection, value ) {
			if ( $.isPlainObject( selection ) ) {
				for ( var s in selection ) {
					this.values[s] = selection[s];
				}
				return true;
			} else if ( typeof selection === 'string' && value !== undefined ) {
				this.values[selection] = value;
				return true;
			}
			return false;
		},
 
		/**
		 * Checks if one or multiple keys exist.
		 *
		 * @param selection mixed String key or array of keys to check
		 * @return boolean Existence of key(s)
		 */
		exists: function( selection ) {
			if ( typeof selection === 'object' ) {
				for ( var s = 0; s < selection.length; s++ ) {
					if ( !( selection[s] in this.values ) ) {
						return false;
					}
				}
				return true;
			} else {
				return selection in this.values;
			}
		}
	};
 
	/**
	 * Message
	 *
	 * Object constructor for messages,
	 * similar to the Message class in MediaWiki PHP.
	 *
	 * @param map Map Instance of mw.Map
	 * @param key String
	 * @param parameters Array
	 * @return Message
	 */
	function Message( map, key, parameters ) {
		this.format = 'plain';
		this.map = map;
		this.key = key;
		this.parameters = parameters === undefined ? [] : $.makeArray( parameters );
		return this;
	}
 
	Message.prototype = {
		/**
		 * Appends (does not replace) parameters for replacement to the .parameters property.
		 *
		 * @param parameters Array
		 * @return Message
		 */
		params: function( parameters ) {
			for ( var i = 0; i < parameters.length; i++ ) {
				this.parameters.push( parameters[i] );
			}
			return this;
		},
 
		/**
		 * Converts message object to it's string form based on the state of format.
		 *
		 * @return string Message as a string in the current form or <key> if key does not exist.
		 */
		toString: function() {
 
			if ( !this.map.exists( this.key ) ) {
				// Use <key> as text if key does not exist
				if ( this.format !== 'plain' ) {
					// format 'escape' and 'parse' need to have the brackets and key html escaped
					return mw.html.escape( '<' + this.key + '>' );
				}
				return '<' + this.key + '>';
			}
			var	text = this.map.get( this.key ),
				parameters = this.parameters;
 
			text = text.replace( /\$(\d+)/g, function( string, match ) {
				var index = parseInt( match, 10 ) - 1;
				return index in parameters ? parameters[index] : '$' + match;
			} );
 
			if ( this.format === 'plain' ) {
				return text;
			}
			if ( this.format === 'escaped' ) {
				// According to Message.php this needs {{-transformation, which is
				// still todo
				return mw.html.escape( text );
			}
 
			/* This should be fixed up when we have a parser
			if ( this.format === 'parse' && 'language' in mw ) {
				text = mw.language.parse( text );
			}
			*/
			return text;
		},
 
		/**
		 * Changes format to parse and converts message to string
		 *
		 * @return {string} String form of parsed message
		 */
		parse: function() {
			this.format = 'parse';
			return this.toString();
		},
 
		/**
		 * Changes format to plain and converts message to string
		 *
		 * @return {string} String form of plain message
		 */
		plain: function() {
			this.format = 'plain';
			return this.toString();
		},
 
		/**
		 * Changes the format to html escaped and converts message to string
		 *
		 * @return {string} String form of html escaped message
		 */
		escaped: function() {
			this.format = 'escaped';
			return this.toString();
		},
 
		/**
		 * Checks if message exists
		 *
		 * @return {string} String form of parsed message
		 */
		exists: function() {
			return this.map.exists( this.key );
		}
	};
 
	/* Public Members */
 
	/**
	 * Dummy function which in debug mode can be replaced with a function that
	 * emulates console.log in console-less environments.
	 */
	this.log = function() { };
 
	/**
	 * @var constructor Make the Map constructor publicly available.
	 */
	this.Map = Map;
 
	/**
	 * List of configuration values
	 *
	 * Dummy placeholder. Initiated in startUp module as a new instance of mw.Map().
	 * If $wgLegacyJavaScriptGlobals is true, this Map will have its values
	 * in the global window object.
	 */
	this.config = null;
 
	/**
	 * @var object
	 *
	 * Empty object that plugins can be installed in.
	 */
	this.libs = {};
 
	/**
	 * Localization system
	 */
	this.messages = new this.Map();
 
	/* Public Methods */
 
	/**
	 * Gets a message object, similar to wfMessage()
	 *
	 * @param key string Key of message to get
	 * @param parameter_1 mixed First argument in a list of variadic arguments,
	 *  each a parameter for $N replacement in messages.
	 * @return Message
	 */
	this.message = function( key, parameter_1 /* [, parameter_2] */ ) {
		var parameters;
		// Support variadic arguments
		if ( parameter_1 !== undefined ) {
			parameters = $.makeArray( arguments );
			parameters.shift();
		} else {
			parameters = [];
		}
		return new Message( mw.messages, key, parameters );
	};
 
	/**
	 * Gets a message string, similar to wfMsg()
	 *
	 * @param key string Key of message to get
	 * @param parameters mixed First argument in a list of variadic arguments,
	 *  each a parameter for $N replacement in messages.
	 * @return String.
	 */
	this.msg = function( key, parameters ) {
		return mw.message.apply( mw.message, arguments ).toString();
	};
 
	/**
	 * Client-side module loader which integrates with the MediaWiki ResourceLoader
	 */
	this.loader = new ( function() {
 
		/* Private Members */
 
		/**
		 * Mapping of registered modules
		 *
		 * The jquery module is pre-registered, because it must have already
		 * been provided for this object to have been built, and in debug mode
		 * jquery would have been provided through a unique loader request,
		 * making it impossible to hold back registration of jquery until after
		 * mediawiki.
		 *
		 * For exact details on support for script, style and messages, look at
		 * mw.loader.implement.
		 *
		 * Format:
		 *	{
		 *		'moduleName': {
		 *			'version': ############## (unix timestamp),
		 *			'dependencies': ['required.foo', 'bar.also', ...], (or) function() {}
		 *			'group': 'somegroup', (or) null,
		 *			'source': 'local', 'someforeignwiki', (or) null
		 *			'state': 'registered', 'loading', 'loaded', 'ready', or 'error'
		 *			'script': ...,
		 *			'style': ...,
		 *			'messages': { 'key': 'value' },
		 *		}
		 *	}
		 */
		var	registry = {},
			/**
			 * Mapping of sources, keyed by source-id, values are objects.
			 * Format:
			 *	{
			 *		'sourceId': {
			 *			'loadScript': 'http://foo.bar/w/load.php'
			 *		}
			 *	}
			 */
			sources = {},
			// List of modules which will be loaded as when ready
			batch = [],
			// List of modules to be loaded
			queue = [],
			// List of callback functions waiting for modules to be ready to be called
			jobs = [],
			// Flag inidicating that document ready has occured
			ready = false,
			// Selector cache for the marker element. Use getMarker() to get/use the marker!
			$marker = null;
 
		/* Private Methods */
 
		function getMarker(){
			// Cached ?
			if ( $marker ) {
				return $marker;
			} else {
				$marker = $( 'meta[name="ResourceLoaderDynamicStyles"]' );
				if ( $marker.length ) {
					return $marker;
				}
				mw.log( 'getMarker> No <meta name="ResourceLoaderDynamicStyles"> found, inserting dynamically.' );
				$marker = $( '<meta>' ).attr( 'name', 'ResourceLoaderDynamicStyles' ).appendTo( 'head' );
				return $marker;
			}
		}
 
		function compare( a, b ) {
			if ( a.length !== b.length ) {
				return false;
			}
			for ( var i = 0; i < b.length; i++ ) {
				if ( $.isArray( a[i] ) ) {
					if ( !compare( a[i], b[i] ) ) {
						return false;
					}
				}
				if ( a[i] !== b[i] ) {
					return false;
				}
			}
			return true;
		}
 
		/**
		 * Generates an ISO8601 "basic" string from a UNIX timestamp
		 */
		function formatVersionNumber( timestamp ) {
			var	pad = function( a, b, c ) {
					return [a < 10 ? '0' + a : a, b < 10 ? '0' + b : b, c < 10 ? '0' + c : c].join( '' );
				},
				d = new Date();
			d.setTime( timestamp * 1000 );
			return [
				pad( d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate() ), 'T',
				pad( d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds() ), 'Z'
			].join( '' );
		}
 
		/**
		 * Recursively resolves dependencies and detects circular references
		 */
		function recurse( module, resolved, unresolved ) {
			if ( registry[module] === undefined ) {
				throw new Error( 'Unknown dependency: ' + module );
			}
			// Resolves dynamic loader function and replaces it with its own results
			if ( $.isFunction( registry[module].dependencies ) ) {
				registry[module].dependencies = registry[module].dependencies();
				// Ensures the module's dependencies are always in an array
				if ( typeof registry[module].dependencies !== 'object' ) {
					registry[module].dependencies = [registry[module].dependencies];
				}
			}
			// Tracks down dependencies
			for ( var n = 0; n < registry[module].dependencies.length; n++ ) {
				if ( $.inArray( registry[module].dependencies[n], resolved ) === -1 ) {
					if ( $.inArray( registry[module].dependencies[n], unresolved ) !== -1 ) {
						throw new Error(
							'Circular reference detected: ' + module +
							' -> ' + registry[module].dependencies[n]
						);
					}
					recurse( registry[module].dependencies[n], resolved, unresolved );
				}
			}
			resolved[resolved.length] = module;
			unresolved.splice( $.inArray( module, unresolved ), 1 );
		}
 
		/**
		 * Gets a list of module names that a module depends on in their proper dependency order
		 *
		 * @param module string module name or array of string module names
		 * @return list of dependencies
		 * @throws Error if circular reference is detected
		 */
		function resolve( module ) {
			// Allow calling with an array of module names
			if ( typeof module === 'object' ) {
				var modules = [];
				for ( var m = 0; m < module.length; m++ ) {
					var dependencies = resolve( module[m] );
					for ( var n = 0; n < dependencies.length; n++ ) {
						modules[modules.length] = dependencies[n];
					}
				}
				return modules;
			} else if ( typeof module === 'string' ) {
				// Undefined modules have no dependencies
				if ( !( module in registry ) ) {
					return [];
				}
				var resolved = [];
				recurse( module, resolved, [] );
				return resolved;
			}
			throw new Error( 'Invalid module argument: ' + module );
		}
 
		/**
		 * Narrows a list of module names down to those matching a specific
		 * state. Possible states are 'undefined', 'registered', 'loading',
		 * 'loaded', or 'ready'
		 *
		 * @param states string or array of strings of module states to filter by
		 * @param modules array list of module names to filter (optional, all modules
		 *  will be used by default)
		 * @return array list of filtered module names
		 */
		function filter( states, modules ) {
			// Allow states to be given as a string
			if ( typeof states === 'string' ) {
				states = [states];
			}
			// If called without a list of modules, build and use a list of all modules
			var list = [], module;
			if ( modules === undefined ) {
				modules = [];
				for ( module in registry ) {
					modules[modules.length] = module;
				}
			}
			// Build a list of modules which are in one of the specified states
			for ( var s = 0; s < states.length; s++ ) {
				for ( var m = 0; m < modules.length; m++ ) {
					if ( registry[modules[m]] === undefined ) {
						// Module does not exist
						if ( states[s] === 'undefined' ) {
							// OK, undefined
							list[list.length] = modules[m];
						}
					} else {
						// Module exists, check state
						if ( registry[modules[m]].state === states[s] ) {
							// OK, correct state
							list[list.length] = modules[m];
						}
					}
				}
			}
			return list;
		}
 
		/**
		 * Executes a loaded module, making it ready to use
		 *
		 * @param module string module name to execute
		 */
		function execute( module, callback ) {
			if ( registry[module] === undefined ) {
				throw new Error( 'Module has not been registered yet: ' + module );
			} else if ( registry[module].state === 'registered' ) {
				throw new Error( 'Module has not been requested from the server yet: ' + module );
			} else if ( registry[module].state === 'loading' ) {
				throw new Error( 'Module has not completed loading yet: ' + module );
			} else if ( registry[module].state === 'ready' ) {
				throw new Error( 'Module has already been loaded: ' + module );
			}
			// Add styles
			var style;
			if ( $.isPlainObject( registry[module].style ) ) {
				for ( var media in registry[module].style ) {
					style = registry[module].style[media];
					if ( $.isArray( style ) ) {
						for ( var i = 0; i < style.length; i++ ) {
							getMarker().before( mw.html.element( 'link', {
								'type': 'text/css',
								'media': media,
								'rel': 'stylesheet',
								'href': style[i]
							} ) );
						}
					} else if ( typeof style === 'string' ) {
						getMarker().before( mw.html.element( 'style', {
							'type': 'text/css',
							'media': media
						}, new mw.html.Cdata( style ) ) );
					}
				}
			}
			// Add localizations to message system
			if ( $.isPlainObject( registry[module].messages ) ) {
				mw.messages.set( registry[module].messages );
			}
			// Execute script
			try {
				var	script = registry[module].script,
					markModuleReady = function() {
						registry[module].state = 'ready';
						handlePending( module );
						if ( $.isFunction( callback ) ) {
							callback();
						}
					},
					nestedAddScript = function( arr, callback, i ) {
						// Recursively call addScript() in its own callback
						// for each element of arr.
						if ( i >= arr.length ) {
							// We're at the end of the array
							callback();
							return;
						}
 
						addScript( arr[i], function() {
							nestedAddScript( arr, callback, i + 1 );
						} );
					};
 
				if ( $.isArray( script ) ) {
					registry[module].state = 'loading';
					nestedAddScript( script, markModuleReady, 0 );
				} else if ( $.isFunction( script ) ) {
					script( $ );
					markModuleReady();
				}
			} catch ( e ) {
				// This needs to NOT use mw.log because these errors are common in production mode
				// and not in debug mode, such as when a symbol that should be global isn't exported
				if ( window.console && typeof window.console.log === 'function' ) {
					console.log( 'mw.loader::execute> Exception thrown by ' + module + ': ' + e.message );
				}
				registry[module].state = 'error';
				throw e;
			}
		}
 
		/**
		 * Automatically executes jobs and modules which are pending with satistifed dependencies.
		 *
		 * This is used when dependencies are satisfied, such as when a module is executed.
		 */
		function handlePending( module ) {
			try {
				// Run jobs who's dependencies have just been met
				for ( var j = 0; j < jobs.length; j++ ) {
					if ( compare(
						filter( 'ready', jobs[j].dependencies ),
						jobs[j].dependencies ) )
					{
						if ( $.isFunction( jobs[j].ready ) ) {
							jobs[j].ready();
						}
						jobs.splice( j, 1 );
						j--;
					}
				}
				// Execute modules who's dependencies have just been met
				for ( var r in registry ) {
					if ( registry[r].state === 'loaded' ) {
						if ( compare(
							filter( ['ready'], registry[r].dependencies ),
							registry[r].dependencies ) )
						{
							execute( r );
						}
					}
				}
			} catch ( e ) {
				// Run error callbacks of jobs affected by this condition
				for ( var j = 0; j < jobs.length; j++ ) {
					if ( $.inArray( module, jobs[j].dependencies ) !== -1 ) {
						if ( $.isFunction( jobs[j].error ) ) {
							jobs[j].error();
						}
						jobs.splice( j, 1 );
						j--;
					}
				}
			}
		}
 
		/**
		 * Adds a dependencies to the queue with optional callbacks to be run
		 * when the dependencies are ready or fail
		 *
		 * @param dependencies string module name or array of string module names
		 * @param ready function callback to execute when all dependencies are ready
		 * @param error function callback to execute when any dependency fails
		 */
		function request( dependencies, ready, error ) {
			// Allow calling by single module name
			if ( typeof dependencies === 'string' ) {
				dependencies = [dependencies];
				if ( dependencies[0] in registry ) {
					// Cache repetitively accessed deep level object member
					var	regItemDeps = registry[dependencies[0]].dependencies,
						// Cache to avoid looped access to length property
						regItemDepLen = regItemDeps.length;
					for ( var n = 0; n < regItemDepLen; n++ ) {
						dependencies[dependencies.length] = regItemDeps[n];
					}
				}
			}
			// Add ready and error callbacks if they were given
			if ( arguments.length > 1 ) {
				jobs[jobs.length] = {
					'dependencies': filter(
						['undefined', 'registered', 'loading', 'loaded'],
						dependencies
					),
					'ready': ready,
					'error': error
				};
			}
			// Queue up any dependencies that are undefined or registered
			dependencies = filter( ['undefined', 'registered'], dependencies );
			for ( var n = 0; n < dependencies.length; n++ ) {
				if ( $.inArray( dependencies[n], queue ) === -1 ) {
					queue[queue.length] = dependencies[n];
				}
			}
			// Work the queue
			mw.loader.work();
		}
 
		function sortQuery(o) {
			var sorted = {}, key, a = [];
			for ( key in o ) {
				if ( o.hasOwnProperty( key ) ) {
					a.push( key );
				}
			}
			a.sort();
			for ( key = 0; key < a.length; key++ ) {
				sorted[a[key]] = o[a[key]];
			}
			return sorted;
		}
 
		/**
		 * Converts a module map of the form { foo: [ 'bar', 'baz' ], bar: [ 'baz, 'quux' ] }
		 * to a query string of the form foo.bar,baz|bar.baz,quux
		 */
		function buildModulesString( moduleMap ) {
			var arr = [], p;
			for ( var prefix in moduleMap ) {
				p = prefix === '' ? '' : prefix + '.';
				arr.push( p + moduleMap[prefix].join( ',' ) );
			}
			return arr.join( '|' );
		}
 
		/**
		 * Adds a script tag to the body, either using document.write or low-level DOM manipulation,
		 * depending on whether document-ready has occured yet.
		 *
		 * @param src String: URL to script, will be used as the src attribute in the script tag
		 * @param callback Function: Optional callback which will be run when the script is done
		 */
		function addScript( src, callback ) {
			var done = false, script;
			if ( ready ) {
				// jQuery's getScript method is NOT better than doing this the old-fashioned way
				// because jQuery will eval the script's code, and errors will not have sane
				// line numbers.
				script = document.createElement( 'script' );
				script.setAttribute( 'src', src );
				script.setAttribute( 'type', 'text/javascript' );
				if ( $.isFunction( callback ) ) {
					// Attach handlers for all browsers -- this is based on jQuery.ajax
					script.onload = script.onreadystatechange = function() {
 
						if (
							!done
							&& (
								!script.readyState
								|| /loaded|complete/.test( script.readyState )
							)
						) {
 
							done = true;
 
							// Handle memory leak in IE
							script.onload = script.onreadystatechange = null;
 
							callback();
 
							if ( script.parentNode ) {
								script.parentNode.removeChild( script );
							}
 
							// Dereference the script
							script = undefined;
						}
					};
				}
				document.body.appendChild( script );
			} else {
				document.write( mw.html.element(
					'script', { 'type': 'text/javascript', 'src': src }, ''
				) );
				if ( $.isFunction( callback ) ) {
					// Document.write is synchronous, so this is called when it's done
					callback();
				}
			}
		}
 
		/**
		 * Asynchronously append a script tag to the end of the body
		 * that invokes load.php
		 * @param moduleMap {Object}: Module map, see buildModulesString()
		 * @param currReqBase {Object}: Object with other parameters (other than 'modules') to use in the request
		 * @param sourceLoadScript {String}: URL of load.php
		 */
		function doRequest( moduleMap, currReqBase, sourceLoadScript ) {
			var request = $.extend(
				{ 'modules': buildModulesString( moduleMap ) },
				currReqBase
			);
			request = sortQuery( request );
			// Asynchronously append a script tag to the end of the body
			// Append &* to avoid triggering the IE6 extension check
			addScript( sourceLoadScript + '?' + $.param( request ) + '&*' );
		}
 
		/* Public Methods */
 
		/**
		 * Requests dependencies from server, loading and executing when things when ready.
		 */
		this.work = function() {
				// Build a list of request parameters common to all requests.
			var	reqBase = {
					skin: mw.config.get( 'skin' ),
					lang: mw.config.get( 'wgUserLanguage' ),
					debug: mw.config.get( 'debug' )
				},
				// Split module batch by source and by group.
				splits = {},
				maxQueryLength = mw.config.get( 'wgResourceLoaderMaxQueryLength', -1 );
 
			// Appends a list of modules from the queue to the batch
			for ( var q = 0; q < queue.length; q++ ) {
				// Only request modules which are undefined or registered
				if ( !( queue[q] in registry ) || registry[queue[q]].state === 'registered' ) {
					// Prevent duplicate entries
					if ( $.inArray( queue[q], batch ) === -1 ) {
						batch[batch.length] = queue[q];
						// Mark registered modules as loading
						if ( queue[q] in registry ) {
							registry[queue[q]].state = 'loading';
						}
					}
				}
			}
			// Early exit if there's nothing to load...
			if ( !batch.length ) {
				return;
			}
 
			// The queue has been processed into the batch, clear up the queue.
			queue = [];
 
			// Always order modules alphabetically to help reduce cache
			// misses for otherwise identical content.
			batch.sort();
 
			// Split batch by source and by group.
			for ( var b = 0; b < batch.length; b++ ) {
				var	bSource = registry[batch[b]].source,
					bGroup = registry[batch[b]].group;
				if ( !( bSource in splits ) ) {
					splits[bSource] = {};
				}
				if ( !( bGroup in splits[bSource] ) ) {
					splits[bSource][bGroup] = [];
				}
				var bSourceGroup = splits[bSource][bGroup];
				bSourceGroup[bSourceGroup.length] = batch[b];
			}
 
			// Clear the batch - this MUST happen before we append any
			// script elements to the body or it's possible that a script
			// will be locally cached, instantly load, and work the batch
			// again, all before we've cleared it causing each request to
			// include modules which are already loaded.
			batch = [];
 
			var source, group, modules, maxVersion, sourceLoadScript;
 
			for ( source in splits ) {
 
				sourceLoadScript = sources[source].loadScript;
 
				for ( group in splits[source] ) {
 
					// Cache access to currently selected list of
					// modules for this group from this source.
					modules = splits[source][group];
 
					// Calculate the highest timestamp
					maxVersion = 0;
					for ( var g = 0; g < modules.length; g++ ) {
						if ( registry[modules[g]].version > maxVersion ) {
							maxVersion = registry[modules[g]].version;
						}
					}
 
					var	currReqBase = $.extend( { 'version': formatVersionNumber( maxVersion ) }, reqBase ),
						currReqBaseLength = $.param( currReqBase ).length,
						moduleMap = {},
						// We may need to split up the request to honor the query string length limit,
						// so build it piece by piece.
						l = currReqBaseLength + 9; // '&modules='.length == 9
 
					moduleMap = {}; // { prefix: [ suffixes ] }
 
					for ( var i = 0; i < modules.length; i++ ) {
							// Determine how many bytes this module would add to the query string
						var	lastDotIndex = modules[i].lastIndexOf( '.' ),
							// Note that these substr() calls work even if lastDotIndex == -1
							prefix = modules[i].substr( 0, lastDotIndex ),
							suffix = modules[i].substr( lastDotIndex + 1 ),
							bytesAdded = prefix in moduleMap
								? suffix.length + 3 // '%2C'.length == 3
								: modules[i].length + 3; // '%7C'.length == 3
 
						// If the request would become too long, create a new one,
						// but don't create empty requests
						if ( maxQueryLength > 0 && !$.isEmptyObject( moduleMap ) && l + bytesAdded > maxQueryLength ) {
							// This request would become too long, create a new one
							// and fire off the old one
							doRequest( moduleMap, currReqBase, sourceLoadScript );
							moduleMap = {};
							l = currReqBaseLength + 9;
						}
						if ( !( prefix in moduleMap ) ) {
							moduleMap[prefix] = [];
						}
						moduleMap[prefix].push( suffix );
						l += bytesAdded;
					}
					// If there's anything left in moduleMap, request that too
					if ( !$.isEmptyObject( moduleMap ) ) {
						doRequest( moduleMap, currReqBase, sourceLoadScript );
					}
				}
			}
		};
 
		/**
		 * Register a source.
		 *
		 * @param id {String}: Short lowercase a-Z string representing a source, only used internally.
		 * @param props {Object}: Object containing only the loadScript property which is a url to
		 * the load.php location of the source.
		 * @return {Boolean}
		 */
		this.addSource = function( id, props ) {
			// Allow multiple additions
			if ( typeof id === 'object' ) {
				for ( var source in id ) {
					mw.loader.addSource( source, id[source] );
				}
				return true;
			}
 
			if ( sources[id] !== undefined ) {
				throw new Error( 'source already registered: ' + id );
			}
 
			sources[id] = props;
 
			return true;
		};
 
		/**
		 * Registers a module, letting the system know about it and its
		 * properties. Startup modules contain calls to this function.
		 *
		 * @param module {String}: Module name
		 * @param version {Number}: Module version number as a timestamp (falls backs to 0)
		 * @param dependencies {String|Array|Function}: One string or array of strings of module
		 *  names on which this module depends, or a function that returns that array.
		 * @param group {String}: Group which the module is in (optional, defaults to null)
		 * @param source {String}: Name of the source. Defaults to local.
		 */
		this.register = function( module, version, dependencies, group, source ) {
			// Allow multiple registration
			if ( typeof module === 'object' ) {
				for ( var m = 0; m < module.length; m++ ) {
					// module is an array of module names
					if ( typeof module[m] === 'string' ) {
						mw.loader.register( module[m] );
					// module is an array of arrays
					} else if ( typeof module[m] === 'object' ) {
						mw.loader.register.apply( mw.loader, module[m] );
					}
				}
				return;
			}
			// Validate input
			if ( typeof module !== 'string' ) {
				throw new Error( 'module must be a string, not a ' + typeof module );
			}
			if ( registry[module] !== undefined ) {
				throw new Error( 'module already implemented: ' + module );
			}
			// List the module as registered
			registry[module] = {
				'version': version !== undefined ? parseInt( version, 10 ) : 0,
				'dependencies': [],
				'group': typeof group === 'string' ? group : null,
				'source': typeof source === 'string' ? source: 'local',
				'state': 'registered'
			};
			if ( typeof dependencies === 'string' ) {
				// Allow dependencies to be given as a single module name
				registry[module].dependencies = [dependencies];
			} else if ( typeof dependencies === 'object' || $.isFunction( dependencies ) ) {
				// Allow dependencies to be given as an array of module names
				// or a function which returns an array
				registry[module].dependencies = dependencies;
			}
		};
 
		/**
		 * Implements a module, giving the system a course of action to take
		 * upon loading. Results of a request for one or more modules contain
		 * calls to this function.
		 *
		 * All arguments are required.
		 *
		 * @param module String: Name of module
		 * @param script Mixed: Function of module code or String of URL to be used as the src
		 *  attribute when adding a script element to the body
		 * @param style Object: Object of CSS strings keyed by media-type or Object of lists of URLs
		 *  keyed by media-type
		 * @param msgs Object: List of key/value pairs to be passed through mw.messages.set
		 */
		this.implement = function( module, script, style, msgs ) {
			// Validate input
			if ( typeof module !== 'string' ) {
				throw new Error( 'module must be a string, not a ' + typeof module );
			}
			if ( !$.isFunction( script ) && !$.isArray( script ) ) {
				throw new Error( 'script must be a function or an array, not a ' + typeof script );
			}
			if ( !$.isPlainObject( style ) ) {
				throw new Error( 'style must be an object, not a ' + typeof style );
			}
			if ( !$.isPlainObject( msgs ) ) {
				throw new Error( 'msgs must be an object, not a ' + typeof msgs );
			}
			// Automatically register module
			if ( registry[module] === undefined ) {
				mw.loader.register( module );
			}
			// Check for duplicate implementation
			if ( registry[module] !== undefined && registry[module].script !== undefined ) {
				throw new Error( 'module already implemented: ' + module );
			}
			// Mark module as loaded
			registry[module].state = 'loaded';
			// Attach components
			registry[module].script = script;
			registry[module].style = style;
			registry[module].messages = msgs;
			// Execute or queue callback
			if ( compare(
				filter( ['ready'], registry[module].dependencies ),
				registry[module].dependencies ) )
			{
				execute( module );
			} else {
				request( module );
			}
		};
 
		/**
		 * Executes a function as soon as one or more required modules are ready
		 *
		 * @param dependencies string or array of strings of modules names the callback
		 *  dependencies to be ready before executing
		 * @param ready function callback to execute when all dependencies are ready (optional)
		 * @param error function callback to execute when if dependencies have a errors (optional)
		 */
		this.using = function( dependencies, ready, error ) {
			var tod = typeof dependencies;
			// Validate input
			if ( tod !== 'object' && tod !== 'string' ) {
				throw new Error( 'dependencies must be a string or an array, not a ' + tod );
			}
			// Allow calling with a single dependency as a string
			if ( tod === 'string' ) {
				dependencies = [dependencies];
			}
			// Resolve entire dependency map
			dependencies = resolve( dependencies );
			// If all dependencies are met, execute ready immediately
			if ( compare( filter( ['ready'], dependencies ), dependencies ) ) {
				if ( $.isFunction( ready ) ) {
					ready();
				}
			}
			// If any dependencies have errors execute error immediately
			else if ( filter( ['error'], dependencies ).length ) {
				if ( $.isFunction( error ) ) {
					error();
				}
			}
			// Since some dependencies are not yet ready, queue up a request
			else {
				request( dependencies, ready, error );
			}
		};
 
		/**
		 * Loads an external script or one or more modules for future use
		 *
		 * @param modules mixed either the name of a module, array of modules,
		 *  or a URL of an external script or style
		 * @param type string mime-type to use if calling with a URL of an
		 *  external script or style; acceptable values are "text/css" and
		 *  "text/javascript"; if no type is provided, text/javascript is assumed.
		 */
		this.load = function( modules, type ) {
			// Validate input
			if ( typeof modules !== 'object' && typeof modules !== 'string' ) {
				throw new Error( 'modules must be a string or an array, not a ' + typeof modules );
			}
			// Allow calling with an external script or single dependency as a string
			if ( typeof modules === 'string' ) {
				// Support adding arbitrary external scripts
				if ( /^(https?:)?\/\//.test( modules ) ) {
					if ( type === 'text/css' ) {
						$( 'head' ).append( $( '<link/>', {
							rel: 'stylesheet',
							type: 'text/css',
							href: modules
						} ) );
						return true;
					} else if ( type === 'text/javascript' || type === undefined ) {
						addScript( modules );
						return true;
					}
					// Unknown type
					return false;
				}
				// Called with single module
				modules = [modules];
			}
			// Resolve entire dependency map
			modules = resolve( modules );
			// If all modules are ready, nothing dependency be done
			if ( compare( filter( ['ready'], modules ), modules ) ) {
				return true;
			}
			// If any modules have errors return false
			else if ( filter( ['error'], modules ).length ) {
				return false;
			}
			// Since some modules are not yet ready, queue up a request
			else {
				request( modules );
				return true;
			}
		};
 
		/**
		 * Changes the state of a module
		 *
		 * @param module string module name or object of module name/state pairs
		 * @param state string state name
		 */
		this.state = function( module, state ) {
			if ( typeof module === 'object' ) {
				for ( var m in module ) {
					mw.loader.state( m, module[m] );
				}
				return;
			}
			if ( !( module in registry ) ) {
				mw.loader.register( module );
			}
			registry[module].state = state;
		};
 
		/**
		 * Gets the version of a module
		 *
		 * @param module string name of module to get version for
		 */
		this.getVersion = function( module ) {
			if ( module in registry && 'version' in registry[module] ) {
				return formatVersionNumber( registry[module].version );
			}
			return null;
		};
 
		/**
		* @deprecated use mw.loader.getVersion() instead
		*/
		this.version = function() {
			return mw.loader.getVersion.apply( mw.loader, arguments );
		};
 
		/**
		 * Gets the state of a module
		 *
		 * @param module string name of module to get state for
		 */
		this.getState = function( module ) {
			if ( module in registry && 'state' in registry[module] ) {
				return registry[module].state;
			}
			return null;
		};
 
		/**
		 * Get names of all registered modules.
		 *
		 * @return {Array}
		 */
		this.getModuleNames = function() {
			var names = $.map( registry, function( i, key ) {
				return key;
			} );
			return names;
		};
 
		/**
		 * For backwards-compatibility with Squid-cached pages. Loads mw.user
		 */
		this.go = function() { mw.loader.load( 'mediawiki.user' ); };
 
		/* Cache document ready status */
 
		$(document).ready( function() { ready = true; } );
	} )();
 
	/** HTML construction helper functions */
	this.html = new ( function () {
		var escapeCallback = function( s ) {
			switch ( s ) {
				case "'":
					return '&#039;';
				case '"':
					return '&quot;';
				case '<':
					return '&lt;';
				case '>':
					return '&gt;';
				case '&':
					return '&amp;';
			}
		};
 
		/**
		 * Escape a string for HTML. Converts special characters to HTML entities.
		 * @param s The string to escape
		 */
		this.escape = function( s ) {
			return s.replace( /['"<>&]/g, escapeCallback );
		};
 
		/**
		 * Wrapper object for raw HTML passed to mw.html.element().
		 */
		this.Raw = function( value ) {
			this.value = value;
		};
 
		/**
		 * Wrapper object for CDATA element contents passed to mw.html.element()
		 */
		this.Cdata = function( value ) {
			this.value = value;
		};
 
		/**
		 * Create an HTML element string, with safe escaping.
		 *
		 * @param name The tag name.
		 * @param attrs An object with members mapping element names to values
		 * @param contents The contents of the element. May be either:
		 *  - string: The string is escaped.
		 *  - null or undefined: The short closing form is used, e.g. <br/>.
		 *  - this.Raw: The value attribute is included without escaping.
		 *  - this.Cdata: The value attribute is included, and an exception is
		 *   thrown if it contains an illegal ETAGO delimiter.
		 *   See http://www.w3.org/TR/1999/REC-html401-19991224/appendix/notes.html#h-B.3.2
		 *
		 * Example:
		 *	var h = mw.html;
		 *	return h.element( 'div', {},
		 *		new h.Raw( h.element( 'img', {src: '<'} ) ) );
		 * Returns <div><img src="&lt;"/></div>
		 */
		this.element = function( name, attrs, contents ) {
			var v, s = '<' + name;
			for ( var attrName in attrs ) {
				v = attrs[attrName];
				// Convert name=true, to name=name
				if ( v === true ) {
					v = attrName;
				// Skip name=false
				} else if ( v === false ) {
					continue;
				}
				s += ' ' + attrName + '="' + this.escape( '' + v ) + '"';
			}
			if ( contents === undefined || contents === null ) {
				// Self close tag
				s += '/>';
				return s;
			}
			// Regular open tag
			s += '>';
			switch ( typeof contents ) {
				case 'string':
					// Escaped
					s += this.escape( contents );
					break;
				case 'number':
				case 'boolean':
					// Convert to string
					s += '' + contents;
					break;
				default:
					if ( contents instanceof this.Raw ) {
						// Raw HTML inclusion
						s += contents.value;
					} else if ( contents instanceof this.Cdata ) {
						// CDATA
						if ( /<\/[a-zA-z]/.test( contents.value ) ) {
							throw new Error( 'mw.html.element: Illegal end tag found in CDATA' );
						}
						s += contents.value;
					} else {
						throw new Error( 'mw.html.element: Invalid type of contents' );
					}
			}
			s += '</' + name + '>';
			return s;
		};
	} )();
 
	/* Extension points */
 
	this.legacy = {};
 
} )( jQuery );
 
// Alias $j to jQuery for backwards compatibility
window.$j = jQuery;
 
// Auto-register from pre-loaded startup scripts
if ( typeof startUp !== 'undefined' && jQuery.isFunction( startUp ) ) {
	startUp();
	delete startUp;
}
 
/**
 * Utilities
 */
( function( $ ) {
 
	// Local cache and alias
	var util = mw.util = {
 
		/**
		 * Initialisation
		 * (don't call before document ready)
		 */
		'init' : function() {
 
			/* Set up $.messageBox */
			$.messageBoxNew( {
				'id': 'mw-js-message',
				'parent': '#content'
			} );
 
			// Shortcut to client profile return
			var profile = $.client.profile();
 
			/* Set tooltipAccessKeyPrefix */
 
			// Opera on any platform
			if ( profile.name == 'opera' ) {
				util.tooltipAccessKeyPrefix = 'shift-esc-';
 
			// Chrome on any platform
			} else if ( profile.name == 'chrome' ) {
				// Chrome on Mac or Chrome on other platform ?
				util.tooltipAccessKeyPrefix = ( profile.platform == 'mac'
					? 'ctrl-option-' : 'alt-' );
 
			// Non-Windows Safari with webkit_version > 526
			} else if ( profile.platform !== 'win'
				&& profile.name == 'safari'
				&& profile.layoutVersion > 526 ) {
				util.tooltipAccessKeyPrefix = 'ctrl-alt-';
 
			// Safari/Konqueror on any platform, or any browser on Mac
			// (but not Safari on Windows)
			} else if ( !( profile.platform == 'win' && profile.name == 'safari' )
							&& ( profile.name == 'safari'
							|| profile.platform == 'mac'
							|| profile.name == 'konqueror' ) ) {
				util.tooltipAccessKeyPrefix = 'ctrl-';
 
			// Firefox 2.x and later
			} else if ( profile.name == 'firefox' && profile.versionBase > '1' ) {
				util.tooltipAccessKeyPrefix = 'alt-shift-';
			}
 
			/* Fill $content var */
			if ( $( '#bodyContent' ).length ) {
				// Vector, Monobook, Chick etc.
				util.$content = $( '#bodyContent' );
 
			} else if ( $( '#mw_contentholder' ).length ) {
				// Modern
				util.$content = $( '#mw_contentholder' );
 
			} else if ( $( '#article' ).length ) {
				// Standard, CologneBlue
				util.$content = $( '#article' );
 
			} else {
				// #content is present on almost all if not all skins. Most skins (the above cases)
				// have #content too, but as an outer wrapper instead of the article text container.
				// The skins that don't have an outer wrapper do have #content for everything
				// so it's a good fallback
				util.$content = $( '#content' );
			}
 
			/* Table of Contents toggle */
			var	$tocContainer = $( '#toc' ),
				$tocTitle = $( '#toctitle' ),
				$tocToggleLink = $( '#togglelink' );
			// Only add it if there is a TOC and there is no toggle added already
			if ( $tocContainer.length && $tocTitle.length && !$tocToggleLink.length ) {
				var	hideTocCookie = $.cookie( 'mw_hidetoc' );
					$tocToggleLink = $( '<a href="#" class="internal" id="togglelink"></a>' )
						.text( mw.msg( 'hidetoc' ) )
						.click( function(e){
							e.preventDefault();
							util.toggleToc( $(this) );
					} );
				$tocTitle.append( $tocToggleLink.wrap( '<span class="toctoggle"></span>' ).parent().prepend( '&nbsp;[' ).append( ']&nbsp;' ) );
 
				if ( hideTocCookie == '1' ) {
					// Cookie says user want toc hidden
					$tocToggleLink.click();
				}
			}
		},
 
		/* Main body */
 
		/**
		 * Encode the string like PHP's rawurlencode
		 *
		 * @param str string String to be encoded
		 */
		'rawurlencode' : function( str ) {
			str = ( str + '' ).toString();
			return encodeURIComponent( str )
				.replace( /!/g, '%21' ).replace( /'/g, '%27' ).replace( /\(/g, '%28' )
				.replace( /\)/g, '%29' ).replace( /\*/g, '%2A' ).replace( /~/g, '%7E' );
		},
 
		/**
		 * Encode page titles for use in a URL
		 * We want / and : to be included as literal characters in our title URLs
		 * as they otherwise fatally break the title
		 *
		 * @param str string String to be encoded
		 */
		'wikiUrlencode' : function( str ) {
			return this.rawurlencode( str )
				.replace( /%20/g, '_' ).replace( /%3A/g, ':' ).replace( /%2F/g, '/' );
		},
 
		/**
		 * Get the link to a page name (relative to wgServer)
		 *
		 * @param str string Page name to get the link for.
		 * @return string Location for a page with name of 'str' or boolean false on error.
		 */
		'wikiGetlink' : function( str ) {
			return mw.config.get( 'wgArticlePath' ).replace( '$1',
				this.wikiUrlencode( str || mw.config.get( 'wgPageName' ) ) );
		},
 
		/**
		 * Get address to a script in the wiki root.
		 * For index.php use mw.config.get( 'wgScript' )
		 *
		 * @param str string Name of script (eg. 'api'), defaults to 'index'
		 * @return string Address to script (eg. '/w/api.php' )
		 */
		'wikiScript' : function( str ) {
			return mw.config.get( 'wgScriptPath' ) + '/' + ( str || 'index' ) + mw.config.get( 'wgScriptExtension' );
		},
 
		/**
		 * Append a new style block to the head
		 *
		 * @param text string CSS to be appended
		 * @return CSSStyleSheet
		 */
		'addCSS' : function( text ) {
			var s = document.createElement( 'style' );
			s.type = 'text/css';
			s.rel = 'stylesheet';
			if ( s.styleSheet ) {
				s.styleSheet.cssText = text; // IE
			} else {
				s.appendChild( document.createTextNode( text + '' ) ); // Safari sometimes borks on null
			}
			document.getElementsByTagName('head')[0].appendChild( s );
			return s.sheet || s;
		},
 
		/**
		 * Hide/show the table of contents element
		 *
		 * @param $toggleLink jQuery A jQuery object of the toggle link.
		 * @param callback function Function to be called after the toggle is
		 * completed (including the animation) (optional)
		 * @return mixed Boolean visibility of the toc (true if it's visible)
		 * or Null if there was no table of contents.
		 */
		'toggleToc' : function( $toggleLink, callback ) {
			var $tocList = $( '#toc ul:first' );
 
			// This function shouldn't be called if there's no TOC,
			// but just in case...
			if ( $tocList.length ) {
				if ( $tocList.is( ':hidden' ) ) {
					$tocList.slideDown( 'fast', callback );
					$toggleLink.text( mw.msg( 'hidetoc' ) );
					$( '#toc' ).removeClass( 'tochidden' );
					$.cookie( 'mw_hidetoc', null, {
						expires: 30,
						path: '/'
					} );
					return true;
				} else {
					$tocList.slideUp( 'fast', callback );
					$toggleLink.text( mw.msg( 'showtoc' ) );
					$( '#toc' ).addClass( 'tochidden' );
					$.cookie( 'mw_hidetoc', '1', {
						expires: 30,
						path: '/'
					} );
					return false;
				}
			} else {
				return null;
			}
		},
 
		/**
		 * Grab the URL parameter value for the given parameter.
		 * Returns null if not found.
		 *
		 * @param param string The parameter name.
		 * @param url string URL to search through (optional)
		 * @return mixed Parameter value or null.
		 */
		'getParamValue' : function( param, url ) {
			url = url ? url : document.location.href;
			// Get last match, stop at hash
			var re = new RegExp( '^[^#]*[&?]' + $.escapeRE( param ) + '=([^&#]*)' );
			var m = re.exec( url );
			if ( m && m.length > 1 ) {
				// Beware that decodeURIComponent is not required to understand '+'
				// by spec, as encodeURIComponent does not produce it.
				return decodeURIComponent( m[1].replace( /\+/g, '%20' ) );
			}
			return null;
		},
 
		/**
		 * @var string
		 * Access key prefix. Will be re-defined based on browser/operating system
		 * detection in mw.util.init().
		 */
		'tooltipAccessKeyPrefix' : 'alt-',
 
		/**
		 * @var RegExp
		 * Regex to match accesskey tooltips.
		 */
		'tooltipAccessKeyRegexp': /\[(ctrl-)?(alt-)?(shift-)?(esc-)?(.)\]$/,
 
		/**
		 * Add the appropriate prefix to the accesskey shown in the tooltip.
		 * If the nodeList parameter is given, only those nodes are updated;
		 * otherwise, all the nodes that will probably have accesskeys by
		 * default are updated.
		 *
		 * @param nodeList {Array|jQuery} (optional) A jQuery object, or array of elements to update.
		 */
		'updateTooltipAccessKeys' : function( nodeList ) {
			var $nodes;
			if ( !nodeList ) {
 
				// Rather than scanning all links, just the elements that
				// contain the relevant links
				this.updateTooltipAccessKeys(
					$( '#column-one a, #mw-head a, #mw-panel a, #p-logo a' ) );
 
				// these are rare enough that no such optimization is needed
				this.updateTooltipAccessKeys( $( 'input' ) );
				this.updateTooltipAccessKeys( $( 'label' ) );
 
				return;
 
			} else if ( nodeList instanceof $ ) {
				$nodes = nodeList;
			} else {
				$nodes = $( nodeList );
			}
 
			$nodes.each( function ( i ) {
				var tip = $(this).attr( 'title' );
				if ( !!tip && util.tooltipAccessKeyRegexp.exec( tip ) ) {
					tip = tip.replace( util.tooltipAccessKeyRegexp,
						'[' + util.tooltipAccessKeyPrefix + "$5]" );
					$(this).attr( 'title', tip );
				}
			} );
		},
 
		/*
		 * @var jQuery
		 * A jQuery object that refers to the page-content element
		 * Populated by init().
		 */
		'$content' : null,
 
		/**
		 * Add a link to a portlet menu on the page, such as:
		 *
		 * p-cactions (Content actions), p-personal (Personal tools),
		 * p-navigation (Navigation), p-tb (Toolbox)
		 *
		 * The first three paramters are required, the others are optional and
		 * may be null. Though providing an id and tooltip is recommended.
		 *
		 * By default the new link will be added to the end of the list. To
		 * add the link before a given existing item, pass the DOM node
		 * (document.getElementById( 'foobar' )) or the jQuery-selector
		 * ( '#foobar' ) of that item.
		 *
		 * @example mw.util.addPortletLink(
		 *	 'p-tb', 'http://mediawiki.org/',
		 *	 'MediaWiki.org', 't-mworg', 'Go to MediaWiki.org ', 'm', '#t-print'
		 * )
		 *
		 * @param portlet string ID of the target portlet ( 'p-cactions' or 'p-personal' etc.)
		 * @param href string Link URL
		 * @param text string Link text
		 * @param id string ID of the new item, should be unique and preferably have
		 * the appropriate prefix ( 'ca-', 'pt-', 'n-' or 't-' )
		 * @param tooltip string Text to show when hovering over the link, without accesskey suffix
		 * @param accesskey string Access key to activate this link (one character, try
		 * to avoid conflicts. Use $( '[accesskey=x]' ).get() in the console to
		 * see if 'x' is already used.
		 * @param nextnode mixed DOM Node or jQuery-selector string of the item that the new
		 * item should be added before, should be another item in the same
		 * list, it will be ignored otherwise
		 *
		 * @return mixed The DOM Node of the added item (a ListItem or Anchor element,
		 * depending on the skin) or null if no element was added to the document.
		 */
		'addPortletLink' : function( portlet, href, text, id, tooltip, accesskey, nextnode ) {
 
			// Check if there's atleast 3 arguments to prevent a TypeError
			if ( arguments.length < 3 ) {
				return null;
			}
			// Setup the anchor tag
			var $link = $( '<a></a>' ).attr( 'href', href ).text( text );
			if ( tooltip ) {
				$link.attr( 'title', tooltip );
			}
 
			// Some skins don't have any portlets
			// just add it to the bottom of their 'sidebar' element as a fallback
			switch ( mw.config.get( 'skin' ) ) {
			case 'standard' :
			case 'cologneblue' :
				$( '#quickbar' ).append( $link.after( '<br/>' ) );
				return $link[0];
			case 'nostalgia' :
				$( '#searchform' ).before( $link).before( ' &#124; ' );
				return $link[0];
			default : // Skins like chick, modern, monobook, myskin, simple, vector...
 
				// Select the specified portlet
				var $portlet = $( '#' + portlet );
				if ( $portlet.length === 0 ) {
					return null;
				}
				// Select the first (most likely only) unordered list inside the portlet
				var $ul = $portlet.find( 'ul' );
 
				// If it didn't have an unordered list yet, create it
				if ( $ul.length === 0 ) {
					// If there's no <div> inside, append it to the portlet directly
					if ( $portlet.find( 'div:first' ).length === 0 ) {
						$portlet.append( '<ul></ul>' );
					} else {
						// otherwise if there's a div (such as div.body or div.pBody)
						// append the <ul> to last (most likely only) div
						$portlet.find( 'div' ).eq( -1 ).append( '<ul></ul>' );
					}
					// Select the created element
					$ul = $portlet.find( 'ul' ).eq( 0 );
				}
				// Just in case..
				if ( $ul.length === 0 ) {
					return null;
				}
 
				// Unhide portlet if it was hidden before
				$portlet.removeClass( 'emptyPortlet' );
 
				// Wrap the anchor tag in a list item (and a span if $portlet is a Vector tab)
				// and back up the selector to the list item
				var $item;
				if ( $portlet.hasClass( 'vectorTabs' ) ) {
					$item = $link.wrap( '<li><span></span></li>' ).parent().parent();
				} else {
					$item = $link.wrap( '<li></li>' ).parent();
				}
 
				// Implement the properties passed to the function
				if ( id ) {
					$item.attr( 'id', id );
				}
				if ( accesskey ) {
					$link.attr( 'accesskey', accesskey );
					tooltip += ' [' + accesskey + ']';
					$link.attr( 'title', tooltip );
				}
				if ( accesskey && tooltip ) {
					this.updateTooltipAccessKeys( $link );
				}
 
				// Where to put our node ?
				// - nextnode is a DOM element (before MW 1.17, in wikibits.js, this was the only option)
				if ( nextnode && nextnode.parentNode == $ul[0] ) {
					$(nextnode).before( $item );
 
				// - nextnode is a CSS selector for jQuery
				} else if ( typeof nextnode == 'string' && $ul.find( nextnode ).length !== 0 ) {
					$ul.find( nextnode ).eq( 0 ).before( $item );
 
 
				// If the jQuery selector isn't found within the <ul>,
				// or if nextnode was invalid or not passed at all,
				// then just append it at the end of the <ul> (this is the default behaviour)
				} else {
					$ul.append( $item );
				}
 
 
				return $item[0];
			}
		},
 
		/**
		 * Add a little box at the top of the screen to inform the user of
		 * something, replacing any previous message.
		 * Calling with no arguments, with an empty string or null will hide the message
		 *
		 * @param message mixed The DOM-element or HTML-string to be put inside the message box.
		 * @param className	string Used in adding a class; should be different for each call
		 * to allow CSS/JS to hide different boxes. null = no class used.
		 * @return boolean True on success, false on failure.
		 */
		'jsMessage' : function( message, className ) {
 
			if ( !arguments.length || message === '' || message === null ) {
 
				$( '#mw-js-message' ).empty().hide();
				return true; // Emptying and hiding message is intended behaviour, return true
 
			} else {
				// We special-case skin structures provided by the software. Skins that
				// choose to abandon or significantly modify our formatting can just define
				// an mw-js-message div to start with.
				var $messageDiv = $( '#mw-js-message' );
				if ( !$messageDiv.length ) {
					$messageDiv = $( '<div id="mw-js-message">' );
					if ( util.$content.parent().length ) {
						util.$content.parent().prepend( $messageDiv );
					} else {
						return false;
					}
				}
 
				if ( className ) {
					$messageDiv.prop( 'class', 'mw-js-message-' + className );
				}
 
				if ( typeof message === 'object' ) {
					$messageDiv.empty();
					$messageDiv.append( message ); // Append new content
				} else {
					$messageDiv.html( message );
				}
 
				$messageDiv.slideDown();
				return true;
			}
		},
 
		/**
		 * Validate a string as representing a valid e-mail address
		 * according to HTML5 specification. Please note the specification
		 * does not validate a domain with one character.
		 *
		 * @todo FIXME: should be moved to or replaced by a JavaScript validation module.
		 *
		 * @param mailtxt string E-mail address to be validated.
		 * @return mixed Null if mailtxt was an empty string, otherwise true/false
		 * is determined by validation.
		 */
		'validateEmail' : function( mailtxt ) {
			if( mailtxt === '' ) {
				return null;
			}
 
			/**
			 * HTML5 defines a string as valid e-mail address if it matches
			 * the ABNF:
			 *	1 * ( atext / "." ) "@" ldh-str 1*( "." ldh-str )
			 * With:
			 * - atext	: defined in RFC 5322 section 3.2.3
			 * - ldh-str : defined in RFC 1034 section 3.5
			 *
			 * (see STD 68 / RFC 5234 http://tools.ietf.org/html/std68):
			 */
 
			/**
			 * First, define the RFC 5322 'atext' which is pretty easy :
			 * atext = ALPHA / DIGIT / ; Printable US-ASCII
						 "!" / "#" /	 ; characters not including
						 "$" / "%" /	 ; specials. Used for atoms.
						 "&" / "'" /
						 "*" / "+" /
						 "-" / "/" /
						 "=" / "?" /
						 "^" / "_" /
						 "`" / "{" /
						 "|" / "}" /
						 "~"
			*/
			var	rfc5322_atext = "a-z0-9!#$%&'*+\\-/=?^_`{|}~",
 
			/**
			 * Next define the RFC 1034 'ldh-str'
			 *	<domain> ::= <subdomain> | " "
			 *	<subdomain> ::= <label> | <subdomain> "." <label>
			 *	<label> ::= <letter> [ [ <ldh-str> ] <let-dig> ]
			 *	<ldh-str> ::= <let-dig-hyp> | <let-dig-hyp> <ldh-str>
			 *	<let-dig-hyp> ::= <let-dig> | "-"
			 *	<let-dig> ::= <letter> | <digit>
			 */
				rfc1034_ldh_str = "a-z0-9\\-",
 
				HTML5_email_regexp = new RegExp(
					// start of string
					'^'
					+
					// User part which is liberal :p
					'[' + rfc5322_atext + '\\.]+'
					+
					// 'at'
					'@'
					+
					// Domain first part
					'[' + rfc1034_ldh_str + ']+'
					+
					// Optional second part and following are separated by a dot
					'(?:\\.[' + rfc1034_ldh_str + ']+)*'
					+
					// End of string
					'$',
					// RegExp is case insensitive
					'i'
				);
			return (null !== mailtxt.match( HTML5_email_regexp ) );
		},
 
		/**
		 * Note: borrows from IP::isIPv4
		 *
		 * @param address string
		 * @param allowBlock boolean
		 * @return boolean
		 */
		'isIPv4Address' : function( address, allowBlock ) {
			if ( typeof address !== 'string' ) {
				return false;
			}
			var block = allowBlock ? '(?:\\/(?:3[0-2]|[12]?\\d))?' : '';
			var RE_IP_BYTE = '(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|0?[0-9]?[0-9])';
			var RE_IP_ADD = '(?:' + RE_IP_BYTE + '\\.){3}' + RE_IP_BYTE;
			return address.search( new RegExp( '^' + RE_IP_ADD + block + '$' ) ) != -1;
		},
		/**
		 * Note: borrows from IP::isIPv6
		 *
		 * @param address string
		 * @param allowBlock boolean
		 * @return boolean
		 */
		'isIPv6Address' : function( address, allowBlock ) {
			if ( typeof address !== 'string' ) {
				return false;
			}
			var block = allowBlock ? '(?:\\/(?:12[0-8]|1[01][0-9]|[1-9]?\\d))?' : '';
			var RE_IPV6_ADD =
			'(?:' + // starts with "::" (including "::")
			':(?::|(?::' + '[0-9A-Fa-f]{1,4}' + '){1,7})' +
			'|' + // ends with "::" (except "::")
			'[0-9A-Fa-f]{1,4}' + '(?::' + '[0-9A-Fa-f]{1,4}' + '){0,6}::' +
			'|' + // contains no "::"
			'[0-9A-Fa-f]{1,4}' + '(?::' + '[0-9A-Fa-f]{1,4}' + '){7}' +
			')';
			if ( address.search( new RegExp( '^' + RE_IPV6_ADD + block + '$' ) ) != -1 ) {
				return true;
			}
			RE_IPV6_ADD = // contains one "::" in the middle (single '::' check below)
				'[0-9A-Fa-f]{1,4}' + '(?:::?' + '[0-9A-Fa-f]{1,4}' + '){1,6}';
			return address.search( new RegExp( '^' + RE_IPV6_ADD + block + '$' ) ) != -1
				&& address.search( /::/ ) != -1 && address.search( /::.*::/ ) == -1;
		}
 
	};
 
} )( jQuery );
 
/**
 * Library for simple URI parsing and manipulation.  Requires jQuery.
 *
 * Do not expect full RFC 3986 compliance. Intended to be minimal, but featureful.
 * The use cases we have in mind are constructing 'next page' or 'previous page' URLs,
 * detecting whether we need to use cross-domain proxies for an API, constructing
 * simple URL-based API calls, etc.
 *
 * Intended to compress very well if you use a JS-parsing minifier.
 *
 * Dependencies: mw, jQuery
 *
 * Example:
 *
 *     var uri = new mw.Uri( 'http://foo.com/mysite/mypage.php?quux=2' );
 *
 *     if ( uri.host == 'foo.com' ) {
 *         uri.host = 'www.foo.com';
 *         uri.extend( { bar: 1 } );
 *
 *         $( 'a#id1' ).attr( 'href', uri );
 *         // anchor with id 'id1' now links to http://foo.com/mysite/mypage.php?bar=1&quux=2
 *
 *         $( 'a#id2' ).attr( 'href', uri.clone().extend( { bar: 3, pif: 'paf' } ) );
 *         // anchor with id 'id2' now links to http://foo.com/mysite/mypage.php?bar=3&quux=2&pif=paf
 *     }
 *
 * Parsing here is regex based, so may not work on all URIs, but is good enough for most.
 *
 * Given a URI like
 * 'http://usr:pwd@www.test.com:81/dir/dir.2/index.htm?q1=0&&test1&test2=&test3=value+%28escaped%29&r=1&r=2#top':
 * The returned object will have the following properties:
 *
 *    protocol  'http'
 *    user      'usr'
 *    password  'pwd'
 *    host      'www.test.com'
 *    port      '81'
 *    path      '/dir/dir.2/index.htm'
 *    query     {
 *                  q1: 0,
 *                  test1: null,
 *                  test2: '',
 *                  test3: 'value (escaped)'
 *                  r: [1, 2]
 *              }
 *    fragment  'top'
 *
 * n.b. 'password' is not technically allowed for HTTP URIs, but it is possible with other
 * sorts of URIs.
 * You can modify the properties directly. Then use the toString() method to extract the
 * full URI string again.
 *
 * Parsing based on parseUri 1.2.2 (c) Steven Levithan <stevenlevithan.com> MIT License
 * http://stevenlevithan.com/demo/parseuri/js/
 *
 */
 
( function( $, mw ) {
 
	/**
	 * Function that's useful when constructing the URI string -- we frequently encounter the pattern of
	 * having to add something to the URI as we go, but only if it's present, and to include a character before or after if so.
	 * @param {String} to prepend, if value not empty
	 * @param {String} value to include, if not empty
	 * @param {String} to append, if value not empty
	 * @param {Boolean} raw -- if true, do not URI encode
	 * @return {String}
	 */
	function cat( pre, val, post, raw ) {
		if ( val === undefined || val === null || val === '' ) {
			return '';
		} else {
			return pre + ( raw ? val : mw.Uri.encode( val ) ) + post;
		}
	}
 
	// Regular expressions to parse many common URIs.
	var parser = {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/(?:(?:([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)?((?:[^?#\/]*\/)*[^?#]*)(?:\?([^#]*))?(?:#(.*))?/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?(?:(?:([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?((?:\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?[^?#\/]*)(?:\?([^#]*))?(?:#(.*))?/
	},
 
	// The order here matches the order of captured matches in the above parser regexes.
	properties = [
		'protocol',  // http
		'user',      // usr
		'password',  // pwd
		'host',      // www.test.com
		'port',      // 81
		'path',      // /dir/dir.2/index.htm
		'query',     // q1=0&&test1&test2=value (will become { q1: '0', test1: '', test2: 'value' } )
		'fragment'   // top
	];
 
 
	/**
	 * We use a factory to inject a document location, for relative URLs, including protocol-relative URLs.
	 * so the library is still testable & purely functional.
	 */
	mw.UriRelative = function( documentLocation ) {
 
		/**
		 * Constructs URI object. Throws error if arguments are illegal/impossible, or otherwise don't parse.
		 * @constructor
		 * @param {Object|String} URI string, or an Object with appropriate properties (especially another URI object to clone).
		 * Object must have non-blank 'protocol', 'host', and 'path' properties.
		 * @param {Object|Boolean} Object with options, or (backwards compatibility) a boolean for strictMode
		 * - strictMode {Boolean} Trigger strict mode parsing of the url. Default: false
		 * - overrideKeys {Boolean} Wether to let duplicate query parameters override eachother (true) or automagically
		 *   convert to an array (false, default).
		 */
		function Uri( uri, options ) {
			options = typeof options === 'object' ? options : { strictMode: !!options };
			options = $.extend( {
				strictMode: false,
				overrideKeys: false
			}, options );
 
			if ( uri !== undefined && uri !== null || uri !== '' ) {
				if ( typeof uri === 'string' ) {
					this._parse( uri, options );
				} else if ( typeof uri === 'object' ) {
					var _this = this;
					$.each( properties, function( i, property ) {
						_this[property] = uri[property];
					} );
					if ( this.query === undefined ) {
						this.query = {};
					}
				}
			}
 
			// protocol-relative URLs
			if ( !this.protocol ) {
				this.protocol = defaultProtocol;
			}
 
			if ( !( this.protocol && this.host && this.path ) ) {
				throw new Error( 'Bad constructor arguments' );
			}
		}
 
		/**
		 * Standard encodeURIComponent, with extra stuff to make all browsers work similarly and more compliant with RFC 3986
		 * Similar to rawurlencode from PHP and our JS library mw.util.rawurlencode, but we also replace space with a +
		 * @param {String} string
		 * @return {String} encoded for URI
		 */
		Uri.encode = function( s ) {
			return encodeURIComponent( s )
				.replace( /!/g, '%21').replace( /'/g, '%27').replace( /\(/g, '%28')
				.replace( /\)/g, '%29').replace( /\*/g, '%2A')
				.replace( /%20/g, '+' );
		};
 
		/**
		 * Standard decodeURIComponent, with '+' to space
		 * @param {String} string encoded for URI
		 * @return {String} decoded string
		 */
		Uri.decode = function( s ) {
			return decodeURIComponent( s ).replace( /\+/g, ' ' );
		};
 
		Uri.prototype = {
 
			/**
			 * Parse a string and set our properties accordingly.
			 * @param {String} URI
			 * @param {Object} options
			 * @return {Boolean} success
			 */
			_parse: function( str, options ) {
				var matches = parser[ options.strictMode ? 'strict' : 'loose' ].exec( str );
				var uri = this;
				$.each( properties, function( i, property ) {
					uri[ property ] = matches[ i+1 ];
				} );
 
				// uri.query starts out as the query string; we will parse it into key-val pairs then make
				// that object the "query" property.
				// we overwrite query in uri way to make cloning easier, it can use the same list of properties.
				var q = {};
				// using replace to iterate over a string
				if ( uri.query ) {
					uri.query.replace( /(?:^|&)([^&=]*)(?:(=)([^&]*))?/g, function ($0, $1, $2, $3) {
						if ( $1 ) {
							var k = Uri.decode( $1 );
							var v = ( $2 === '' || $2 === undefined ) ? null : Uri.decode( $3 );
 
							// If overrideKeys, always (re)set top level value.
							// If not overrideKeys but this key wasn't set before, then we set it as well.
							if ( options.overrideKeys || q[ k ] === undefined ) {
								q[ k ] = v;
 
							// Use arrays if overrideKeys is false and key was already seen before
							} else {
								// Once before, still a string, turn into an array
								if ( typeof q[ k ] === 'string' ) {
									q[ k ] = [ q[ k ] ];
								}
								// Add to the array
								if ( $.isArray( q[ k ] ) ) {
									q[ k ].push( v );
								}
							}
						}
					} );
				}
				this.query = q;
			},
 
			/**
			 * Returns user and password portion of a URI.
			 * @return {String}
			 */
			getUserInfo: function() {
				return cat( '', this.user, cat( ':', this.password, '' ) );
			},
 
			/**
			 * Gets host and port portion of a URI.
			 * @return {String}
			 */
			getHostPort: function() {
				return this.host + cat( ':', this.port, '' );
			},
 
			/**
			 * Returns the userInfo and host and port portion of the URI.
			 * In most real-world URLs, this is simply the hostname, but it is more general.
			 * @return {String}
			 */
			getAuthority: function() {
				return cat( '', this.getUserInfo(), '@' ) + this.getHostPort();
			},
 
			/**
			 * Returns the query arguments of the URL, encoded into a string
			 * Does not preserve the order of arguments passed into the URI. Does handle escaping.
			 * @return {String}
			 */
			getQueryString: function() {
				var args = [];
				$.each( this.query, function( key, val ) {
					var k = Uri.encode( key );
					var vals = val === null ? [ null ] : $.makeArray( val );
					$.each( vals, function( i, v ) {
						args.push( k + ( v === null ? '' : '=' + Uri.encode( v ) ) );
					} );
				} );
				return args.join( '&' );
			},
 
			/**
			 * Returns everything after the authority section of the URI
			 * @return {String}
			 */
			getRelativePath: function() {
				return this.path + cat( '?', this.getQueryString(), '', true ) + cat( '#', this.fragment, '' );
			},
 
			/**
			 * Gets the entire URI string. May not be precisely the same as input due to order of query arguments.
			 * @return {String} the URI string
			 */
			toString: function() {
				return this.protocol + '://' + this.getAuthority() + this.getRelativePath();
			},
 
			/**
			 * Clone this URI
			 * @return {Object} new URI object with same properties
			 */
			clone: function() {
				return new Uri( this );
			},
 
			/**
			 * Extend the query -- supply query parameters to override or add to ours
			 * @param {Object} query parameters in key-val form to override or add
			 * @return {Object} this URI object
			 */
			extend: function( parameters ) {
				$.extend( this.query, parameters );
				return this;
			}
		};
 
		var defaultProtocol = ( new Uri( documentLocation ) ).protocol;
 
		return Uri;	
	};
 
	// if we are running in a browser, inject the current document location, for relative URLs
	if ( document && document.location && document.location.href ) { 
		mw.Uri = mw.UriRelative( document.location.href );
	}
 
} )( jQuery, mediaWiki );
 
/**
 * Utility functions for jazzing up HTMLForm elements
 */
( function( $ ) {
 
/**
 * jQuery plugin to fade or snap to visible state.
 *
 * @param boolean instantToggle (optional)
 * @return jQuery
 */
$.fn.goIn = function( instantToggle ) {
	if ( instantToggle === true ) {
		return $(this).show();
	}
	return $(this).stop( true, true ).fadeIn();
};
 
/**
 * jQuery plugin to fade or snap to hiding state.
 *
 * @param boolean instantToggle (optional)
 * @return jQuery
 */
$.fn.goOut = function( instantToggle ) {
	if ( instantToggle === true ) {
		return $(this).hide();
	}
	return $(this).stop( true, true ).fadeOut();
};
 
/**
 * Bind a function to the jQuery object via live(), and also immediately trigger
 * the function on the objects with an 'instant' paramter set to true
 * @param callback function taking one paramter, which is Bool true when the event
 *     is called immediately, and the EventArgs object when triggered from an event
 */
$.fn.liveAndTestAtStart = function( callback ){
	$(this)
		.live( 'change', callback )
		.each( function( index, element ){
			callback.call( this, true );
		} );
};
 
// Document ready:
$( function() {
 
	// Animate the SelectOrOther fields, to only show the text field when
	// 'other' is selected.
	$( '.mw-htmlform-select-or-other' ).liveAndTestAtStart( function( instant ) {
		var $other = $( '#' + $(this).attr( 'id' ) + '-other' );
		$other = $other.add( $other.siblings( 'br' ) );
		if ( $(this).val() === 'other' ) {
			$other.goIn( instant );
		} else {
			$other.goOut( instant );
		}
	});
 
});
 
 
})( jQuery );
 
/**
 * Logger for MediaWiki javascript.
 * Implements the stub left by the main 'mediawiki' module.
 *
 * @author Michael Dale <mdale@wikimedia.org>
 * @author Trevor Parscal <tparscal@wikimedia.org>
 */
 
(function( $ ) {
 
	/**
	 * Logs a message to the console.
	 *
	 * In the case the browser does not have a console API, a console is created on-the-fly by appending
	 * a <div id="mw-log-console"> element to the bottom of the body and then appending this and future
	 * messages to that, instead of the console.
	 *
	 * @param {String} First in list of variadic messages to output to console.
	 */
	mw.log = function( /* logmsg, logmsg, */ ) {
		// Turn arguments into an array
		var	args = Array.prototype.slice.call( arguments ),
			// Allow log messages to use a configured prefix to identify the source window (ie. frame)
			prefix = mw.config.exists( 'mw.log.prefix' ) ? mw.config.get( 'mw.log.prefix' ) + '> ' : '';
 
		// Try to use an existing console
		if ( window.console !== undefined && $.isFunction( window.console.log ) ) {
			args.unshift( prefix );
			window.console.log.apply( window.console, args );
			return;
		}
 
		// If there is no console, use our own log box
 
			var	d = new Date(),
				// Create HH:MM:SS.MIL timestamp
				time = ( d.getHours() < 10 ? '0' + d.getHours() : d.getHours() ) +
				 ':' + ( d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes() ) +
				 ':' + ( d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds() ) +
				 '.' + ( d.getMilliseconds() < 10 ? '00' + d.getMilliseconds() : ( d.getMilliseconds() < 100 ? '0' + d.getMilliseconds() : d.getMilliseconds() ) ),
				 $log = $( '#mw-log-console' );
 
			if ( !$log.length ) {
				$log = $( '<div id="mw-log-console"></div>' ).css( {
						position: 'fixed',
						overflow: 'auto',
						zIndex: 500,
						bottom: '0px',
						left: '0px',
						right: '0px',
						height: '150px',
						backgroundColor: 'white',
						borderTop: 'solid 2px #ADADAD'
					} );
				$( 'body' )
					// Since the position is fixed, make sure we don't hide any actual content.
					// Increase padding to account for #mw-log-console.
					.css( 'paddingBottom', '+=150px' )
					.append( $log );
			}
			$log.append(
				$( '<div></div>' )
					.css( {
						borderBottom: 'solid 1px #DDDDDD',
						fontSize: 'small',
						fontFamily: 'monospace',
						whiteSpace: 'pre-wrap',
						padding: '0.125em 0.25em'
					} )
					.text( prefix + args.join( ', ' ) )
					.prepend( '<span style="float: right;">[' + time + ']</span>' )
		);
	};
 
})( jQuery );
 
/*
 * Implementation for mediaWiki.user
 */
 
(function( $ ) {
 
	/**
	 * User object
	 */
	function User() {
 
		/* Private Members */
 
		var that = this;
 
		/* Public Members */
 
		this.options = new mw.Map();
 
		this.tokens = new mw.Map();
 
		/* Public Methods */
 
		/**
		 * Generates a random user session ID (32 alpha-numeric characters).
		 *
		 * This information would potentially be stored in a cookie to identify a user during a
		 * session or series of sessions. It's uniqueness should not be depended on.
		 *
		 * @return String: Random set of 32 alpha-numeric characters
		 */
		function generateId() {
			var id = '';
			var seed = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
			for ( var i = 0, r; i < 32; i++ ) {
				r = Math.floor( Math.random() * seed.length );
				id += seed.substring( r, r + 1 );
			}
			return id;
		}
 
		/**
		 * Gets the current user's name.
		 *
		 * @return Mixed: User name string or null if users is anonymous
		 */
		this.name = function() {
			return mw.config.get( 'wgUserName' );
		};
 
		/**
		 * Checks if the current user is anonymous.
		 *
		 * @return Boolean
		 */
		this.anonymous = function() {
			return that.name() ? false : true;
		};
 
		/**
		 * Gets a random session ID automatically generated and kept in a cookie.
		 *
		 * This ID is ephemeral for everyone, staying in their browser only until they close
		 * their browser.
		 *
		 * @return String: User name or random session ID
		 */
		this.sessionId = function () {
			var sessionId = $.cookie( 'mediaWiki.user.sessionId' );
			if ( typeof sessionId == 'undefined' || sessionId === null ) {
				sessionId = generateId();
				$.cookie( 'mediaWiki.user.sessionId', sessionId, { 'expires': null, 'path': '/' } );
			}
			return sessionId;
		};
 
		/**
		 * Gets the current user's name or a random ID automatically generated and kept in a cookie.
		 *
		 * This ID is persistent for anonymous users, staying in their browser up to 1 year. The
		 * expiration time is reset each time the ID is queried, so in most cases this ID will
		 * persist until the browser's cookies are cleared or the user doesn't visit for 1 year.
		 *
		 * @return String: User name or random session ID
		 */
		this.id = function() {
			var name = that.name();
			if ( name ) {
				return name;
			}
			var id = $.cookie( 'mediaWiki.user.id' );
			if ( typeof id == 'undefined' || id === null ) {
				id = generateId();
			}
			// Set cookie if not set, or renew it if already set
			$.cookie( 'mediaWiki.user.id', id, { 'expires': 365, 'path': '/' } );
			return id;
		};
 
		/**
		 * Gets the user's bucket, placing them in one at random based on set odds if needed.
		 *
		 * @param key String: Name of bucket
		 * @param options Object: Bucket configuration options
		 * @param options.buckets Object: List of bucket-name/relative-probability pairs (required,
		 * must have at least one pair)
		 * @param options.version Number: Version of bucket test, changing this forces rebucketing
		 * (optional, default: 0)
		 * @param options.tracked Boolean: Track the event of bucketing through the API module of
		 * the ClickTracking extension (optional, default: false)
		 * @param options.expires Number: Length of time (in days) until the user gets rebucketed
		 * (optional, default: 30)
		 * @return String: Bucket name - the randomly chosen key of the options.buckets object
		 *
		 * @example
		 *     mw.user.bucket( 'test', {
		 *         'buckets': { 'ignored': 50, 'control': 25, 'test': 25 },
		 *         'version': 1,
		 *         'tracked': true,
		 *         'expires': 7
		 *     } );
		 */
		this.bucket = function( key, options ) {
			options = $.extend( {
				'buckets': {},
				'version': 0,
				'tracked': false,
				'expires': 30
			}, options || {} );
			var cookie = $.cookie( 'mediaWiki.user.bucket:' + key );
			var bucket = null;
			var version = 0;
			// Bucket information is stored as 2 integers, together as version:bucket like: "1:2"
			if ( typeof cookie === 'string' && cookie.length > 2 && cookie.indexOf( ':' ) > 0 ) {
				var parts = cookie.split( ':' );
				if ( parts.length > 1 && parts[0] == options.version ) {
					version = Number( parts[0] );
					bucket = String( parts[1] );
				}
			}
			if ( bucket === null ) {
				if ( !$.isPlainObject( options.buckets ) ) {
					throw 'Invalid buckets error. Object expected for options.buckets.';
				}
				version = Number( options.version );
				// Find range
				var	range = 0, k;
				for ( k in options.buckets ) {
					range += options.buckets[k];
				}
				// Select random value within range
				var rand = Math.random() * range;
				// Determine which bucket the value landed in
				var total = 0;
				for ( k in options.buckets ) {
					bucket = k;
					total += options.buckets[k];
					if ( total >= rand ) {
						break;
					}
				}
				if ( options.tracked ) {
					mw.loader.using( 'jquery.clickTracking', function() {
						$.trackAction(
							'mediaWiki.user.bucket:' + key + '@' + version + ':' + bucket
						);
					} );
				}
				$.cookie(
					'mediaWiki.user.bucket:' + key,
					version + ':' + bucket,
					{ 'path': '/', 'expires': Number( options.expires ) }
				);
			}
			return bucket;
		};
	}
 
	mw.user = new User();
 
})(jQuery);
 
/**
 * mediaWiki.Title
 *
 * @author Neil Kandalgaonkar, 2010
 * @author Timo Tijhof, 2011
 * @since 1.18
 *
 * Relies on: mw.config (wgFormattedNamespaces, wgNamespaceIds, wgCaseSensitiveNamespaces), mw.util.wikiGetlink
 */
( function( $ ) {
 
	/* Local space */
 
	/**
	 * Title
	 * @constructor
	 *
	 * @param title {String} Title of the page. If no second argument given,
	 * this will be searched for a namespace.
	 * @param namespace {Number} (optional) Namespace id. If given, title will be taken as-is.
	 * @return {Title} this
	 */
var	Title = function( title, namespace ) {
		this._ns = 0; // integer namespace id
		this._name = null; // name in canonical 'database' form
		this._ext = null; // extension
 
		if ( arguments.length === 2 ) {
			setNameAndExtension( this, title );
			this._ns = fixNsId( namespace );
		} else if ( arguments.length === 1 ) {
			setAll( this, title );
		}
		return this;
	},
 
	/**
	 * Strip some illegal chars: control chars, colon, less than, greater than,
	 * brackets, braces, pipe, whitespace and normal spaces. This still leaves some insanity
	 * intact, like unicode bidi chars, but it's a good start..
	 * @param s {String}
	 * @return {String}
	 */
	clean = function( s ) {
		if ( s !== undefined ) {
			return s.replace( /[\x00-\x1f\x23\x3c\x3e\x5b\x5d\x7b\x7c\x7d\x7f\s]+/g, '_' );
		}
	},
 
	/**
	 * Convert db-key to readable text.
	 * @param s {String}
	 * @return {String}
	 */
	text = function ( s ) {
		if ( s !== null && s !== undefined ) {
			return s.replace( /_/g, ' ' );
		} else {
			return '';
		}
	},
 
	/**
	 * Sanitize name.
	 */
	fixName = function( s ) {
		return clean( $.trim( s ) );
	},
 
	/**
	 * Sanitize name.
	 */
	fixExt = function( s ) {
		return clean( s );
	},
 
	/**
	 * Sanitize namespace id.
	 * @param id {Number} Namespace id.
	 * @return {Number|Boolean} The id as-is or boolean false if invalid.
	 */
	fixNsId = function( id ) {
		// wgFormattedNamespaces is an object of *string* key-vals (ie. arr["0"] not arr[0] )
		var ns = mw.config.get( 'wgFormattedNamespaces' )[id.toString()];
 
		// Check only undefined (may be false-y, such as '' (main namespace) ).
		if ( ns === undefined ) {
			return false;
		} else {
			return Number( id );
		}
	},
 
	/**
	 * Get namespace id from namespace name by any known namespace/id pair (localized, canonical or alias).
	 *
	 * @example On a German wiki this would return 6 for any of 'File', 'Datei', 'Image' or even 'Bild'.
	 * @param ns {String} Namespace name (case insensitive, leading/trailing space ignored).
	 * @return {Number|Boolean} Namespace id or boolean false if unrecognized.
	 */
	getNsIdByName = function( ns ) {
		// toLowerCase throws exception on null/undefined. Return early.
		if ( ns == null ) {
			return false;
		}
		ns = clean( $.trim( ns.toLowerCase() ) ); // Normalize
		var id = mw.config.get( 'wgNamespaceIds' )[ns];
		if ( id === undefined ) {
			mw.log( 'mw.Title: Unrecognized namespace: ' + ns );
			return false;
		}
		return fixNsId( id );
	},
 
	/**
	 * Helper to extract namespace, name and extension from a string.
	 *
	 * @param title {mw.Title}
	 * @param raw {String}
	 * @return {mw.Title}
	 */
	setAll = function( title, s ) {
		// In normal browsers the match-array contains null/undefined if there's no match,
		// IE returns an empty string.
		var	matches = s.match( /^(?:([^:]+):)?(.*?)(?:\.(\w{1,5}))?$/ ),
			ns_match = getNsIdByName( matches[1] );
 
		// Namespace must be valid, and title must be a non-empty string.
		if ( ns_match && typeof matches[2] === 'string' && matches[2] !== '' ) {
			title._ns = ns_match;
			title._name = fixName( matches[2] );
			if ( typeof matches[3] === 'string' && matches[3] !== '' ) {
				title._ext = fixExt( matches[3] );
			}
		} else {
			// Consistency with MediaWiki PHP: Unknown namespace -> fallback to main namespace.
			title._ns = 0;
			setNameAndExtension( title, s );
		}
		return title;
	},
 
	/**
	 * Helper to extract name and extension from a string.
	 *
	 * @param title {mw.Title}
	 * @param raw {String}
	 * @return {mw.Title}
	 */
	setNameAndExtension = function( title, raw ) {
		// In normal browsers the match-array contains null/undefined if there's no match,
		// IE returns an empty string.
		var matches = raw.match( /^(?:)?(.*?)(?:\.(\w{1,5}))?$/ );
 
		// Title must be a non-empty string.
		if ( typeof matches[1] === 'string' && matches[1] !== '' ) {
			title._name = fixName( matches[1] );
			if ( typeof matches[2] === 'string' && matches[2] !== '' ) {
				title._ext = fixExt( matches[2] );
			}
		} else {
			throw new Error( 'mw.Title: Could not parse title "' + raw + '"' );
		}
		return title;
	};
 
 
	/* Static space */
 
	/**
	 * Whether this title exists on the wiki.
	 * @param title {mixed} prefixed db-key name (string) or instance of Title
	 * @return {mixed} Boolean true/false if the information is available. Otherwise null.
	 */
	Title.exists = function( title ) {
		var type = $.type( title ), obj = Title.exist.pages, match;
		if ( type === 'string' ) {
			match = obj[title];
		} else if ( type === 'object' && title instanceof Title ) {
			match = obj[title.toString()];
		} else {
			throw new Error( 'mw.Title.exists: title must be a string or an instance of Title' );
		}
		if ( typeof match === 'boolean' ) {
			return match;
		}
		return null;
	};
 
	/**
	 * @var Title.exist {Object}
	 */
	Title.exist = {
		/**
		 * @var Title.exist.pages {Object} Keyed by PrefixedDb title.
		 * Boolean true value indicates page does exist.
		 */
		pages: {},
		/**
		 * @example Declare existing titles: Title.exist.set(['User:John_Doe', ...]);
		 * @example Declare titles nonexistent: Title.exist.set(['File:Foo_bar.jpg', ...], false);
		 * @param titles {String|Array} Title(s) in strict prefixedDb title form.
		 * @param state {Boolean} (optional) State of the given titles. Defaults to true.
		 * @return {Boolean}
		 */
		set: function( titles, state ) {
			titles = $.isArray( titles ) ? titles : [titles];
			state = state === undefined ? true : !!state;
			var pages = this.pages, i, len = titles.length;
			for ( i = 0; i < len; i++ ) {
				pages[ titles[i] ] = state;
			}
			return true;
		}
	};
 
	/* Public methods */
 
	var fn = {
		constructor: Title,
 
		/**
		 * Get the namespace number.
		 * @return {Number}
		 */
		getNamespaceId: function(){
			return this._ns;
		},
 
		/**
		 * Get the namespace prefix (in the content-language).
		 * In NS_MAIN this is '', otherwise namespace name plus ':'
		 * @return {String}
		 */
		getNamespacePrefix: function(){
			return mw.config.get( 'wgFormattedNamespaces' )[this._ns].replace( / /g, '_' ) + (this._ns === 0 ? '' : ':');
		},
 
		/**
		 * The name, like "Foo_bar"
		 * @return {String}
		 */
		getName: function() {
			if ( $.inArray( this._ns, mw.config.get( 'wgCaseSensitiveNamespaces' ) ) !== -1 ) {
				return this._name;
			} else {
				return $.ucFirst( this._name );
			}
		},
 
		/**
		 * The name, like "Foo bar"
		 * @return {String}
		 */
		getNameText: function() {
			return text( this.getName() );
		},
 
		/**
		 * Get full name in prefixed DB form, like File:Foo_bar.jpg,
		 * most useful for API calls, anything that must identify the "title".
		 */
		getPrefixedDb: function() {
			return this.getNamespacePrefix() + this.getMain();
		},
 
		/**
		 * Get full name in text form, like "File:Foo bar.jpg".
		 * @return {String}
		 */
		getPrefixedText: function() {
			return text( this.getPrefixedDb() );
		},
 
		/**
		 * The main title (without namespace), like "Foo_bar.jpg"
		 * @return {String}
		 */
		getMain: function() {
			return this.getName() + this.getDotExtension();
		},
 
		/**
		 * The "text" form, like "Foo bar.jpg"
		 * @return {String}
		 */
		getMainText: function() {
			return text( this.getMain() );
		},
 
		/**
		 * Get the extension (returns null if there was none)
		 * @return {String|null} extension
		 */
		getExtension: function() {
			return this._ext;
		},
 
		/**
		 * Convenience method: return string like ".jpg", or "" if no extension
		 * @return {String}
		 */
		getDotExtension: function() {
			return this._ext === null ? '' : '.' + this._ext;
		},
 
		/**
		 * Return the URL to this title
		 * @return {String}
		 */
		getUrl: function() {
			return mw.util.wikiGetlink( this.toString() );
		},
 
		/**
		 * Whether this title exists on the wiki.
		 * @return {mixed} Boolean true/false if the information is available. Otherwise null.
		 */
		exists: function() {
			return Title.exists( this );
		}
	};
 
	// Alias
	fn.toString = fn.getPrefixedDb;
	fn.toText = fn.getPrefixedText;
 
	// Assign
	Title.prototype = fn;
 
	// Expose
	mw.Title = Title;
 
})(jQuery);