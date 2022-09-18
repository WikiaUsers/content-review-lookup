(function(window, $, mw, config) {
"use strict";

	// Core logic, detect user page and determine the skin and user names
	var loaderData = (function($, mw) {
		//
		// Figure out what skin we're on.
		//
		var siteSkin = mw.config.get('skin');
		if (({oasis:1, wikia:1, fandomdesktop:1})[siteSkin] === 1) {
			siteSkin = 'oasis';
		} else if (({wowwiki:1, uncyclopedia:1, monobook:1, vector:1})[siteSkin] === 1) {
			siteSkin = 'monobook';
		} else {
			if (window.console) {
				window.console.log('USERTAGS(Loader): Unsupported skin:', siteSkin);
			}
			return;
		}
	
		//
		// Grab the username (complicated) and decide if we are going to run or not.
		// NOTE: We could use mw.Title for this but it must be loaded using
		//	mw.loader.using('mediaWiki.Title') first and doesn't really give us the right tools.
		//
		var username = mw.config.get('wgTitle'),
			namespace = mw.config.get('wgNamespaceNumber') | 0;
	
		if (siteSkin === 'oasis') {
			// We need to figure out if we're on a user page or not without a DOM query
			// since we want to launch the AJAX ASAP without waiting for the DOM.
			if (({'-1':1, 2:1, 3:1, 500:1, 1200:1})[namespace] !== 1) {
				return;
			}
	
			// No masthead on edit pages
			// Message Walls are always in edit mode
			if (mw.config.get('wgAction') === 'edit' && namespace !== 1200) {
				return;
			}
	
			// MediaWiki disallows names from containing forward slashes which is very
			// useful since we need to check for subpages and forward slashes are the
			// only real way to do it.
			// (Subpages are lacking the masthead)
			if (({1200:1, 500:1, 2:1, 3:1})[namespace] === 1 && username.indexOf('/') !== -1) {
				return;
			}
	
			// Special pages need special handling...
			if (namespace === -1) {
				username = null;
				namespace = mw.config.get('wgCanonicalSpecialPageName');
				if (namespace === 'Contributions') {
					// wgPageName/wgTitle does not include the username, we need to pull
					// it directly from the window location.
					username = window.location.pathname;
	
					// Special:Contributions is dumb, here are the URL possibilities:
					// Special:Contributions = You
					// Special:Contributions/ = You
					// Special:Contributions/Username = Username
					// index.php?title=Special:Contributions = You
					// index.php?title=Special:Contributions&target= = You
					// index.php?title=Special:Contributions&target=Username = Username
					// Special:Contributions?target=Username = Username (*sigh*)
					// Special:Contributions/Username?target=OtherUser = OtherUser (*facepalm*)
	
					// Find /Username
					namespace = window.decodeURIComponent(username.substr(username.lastIndexOf('/') + 1));
					// No user name, it displays self
					namespace = (namespace !== mw.config.get('wgPageName') && namespace);
	
					// Find ?target=Username
					username = (/(?:^\?|&)target=([^&]*)/).exec(window.location.search);
					// If target is missing or has an empty string then it displays self
					username = (username && window.decodeURIComponent(username[1]));
	
					// Target param overrides the slash param
					username = username || namespace;
	
					// Canonicalise back to space instead of underscores
					username = (username && username.replace(/_/g, ' '));
				} else if (namespace === 'UserProfileActivity') {
					username = mw.config.get('profileUserName');
				} else if (namespace !== 'Following') { // Following is self only
					return; // Some other special page.
				}
				// If the username is blank then they show self.
				username = username || mw.config.get('wgUserName');
			}
		} else {
			// User, User Talk, Message Wall
			if (({2:1, 3:1, 1200:1})[namespace] !== 1) {
				return;
			}
	
			// If we're on a subpage, drop the subpage part
			username = username.match(/^[^\/]+/)[0];
		}
		// Lastly, check if this is an anon userpage
		if (mw.util.isIPv4Address(username) || mw.util.isIPv6Address(username)) {
			return;
		}
	
		// NOTE: We only get here if this IS a compatible user page
		return {
			skin: siteSkin,
			user: username
		};
	})($, mw);
	
	// Make sure the config exists and is usable
	config = ($.isPlainObject(config) && config) || {};
	
	mw.loader.using('mediawiki.util').then(function() {
	    // You can use mw.Api and mw.util.
	
		// If it's a user page then we need to expose our data to the core
		if (loaderData) {
			window.UserTagsJS = config;
			config.loader = loaderData;
		
			// Debugging hook for debugging arbitrary Wikis without having to modify
			// MediaWiki:Common.js to enable debug mode.
			if ((/(?:^\?|&)debugusertags=1(?:&|$)/i).test(window.location.search)) {
				config.debug = true;
			}
		
			// Default module configuration when one is not provided.
			// TODO: Maybe I should just force this always using $.extend()?
			//	[i.e. optout by false to disable instead of optin]
			config.modules = ($.isPlainObject(config.modules) && config.modules) || {};
			if ($.isEmptyObject(config.modules)) {
				config.modules = {
					inactive: true, // Internal defaults
					newuser: true, // Internal defaults
					autoconfirmed: true,
					mwGroups: true, // Internal defaults
					metafilter: {
						sysop: ['bureaucrat','founder'],
						bureaucrat: ['founder']
					}
				};
			}
			// Force load the blocking modules unless they are manually disabled
			// (Manual disable means manually set to false/0/etc instead of just being undefined)
			config.modules.stopblocked = config.modules.stopblocked
				|| config.modules.stopblocked === void 0;
			// Only Monobook needs this, OasisTagsModule can scrape the blocked state from
			// the DOM instead.
			config.modules.isblocked = config.modules.isblocked
				|| (config.modules.isblocked === void 0 && loaderData.skin === 'monobook');
			// Force the i18n module to load
			config.modules.i18n = true;
		}
		
		// Dependency computations for loading modules
		var importList = (function(config, alwaysOnly) {
			// These are core modules that have irregular features so need special handling
			// Most modules fit the "module.NAME.js" pattern
			var moduleMap = {
				explode: { s: 'u:dev:MediaWiki:UserTags/module.implode.js' }
			};
		
			// Look for external module requests
			// NOTE: Disabled. Needs a design review for if this is the way I want to go or not.
			/*if ($.isArray(config.externals)) {
				data = config.externals;
				for (var i = 0, len = data.length ; i < len ; ++i) {
					module = data[i] + '';
					if (alwaysOnly) {
						if (module.substr(0, 5) !== 'meta.') {
							continue;
						}
					}
					module = 'u:dev:MediaWiki:UserTags/' + module + '.js';
					if (hash[module] !== 1) {
						hash[module] = 1;
						list[list.length] = module;
					}
				}
			}*/
		
			// Check all the modules for matches in the above list.
			// Hash ensures that each one will only be imported once.
			/*jshint forin:true */
			var list = [], hash = {}, exts = config.extensions || {}, script, data, module;
			for (module in config.modules) {
				// Skip already loaded
				if (exts[module] !== void 0) { continue; }
		
				if (moduleMap.hasOwnProperty(module)) {
					data = moduleMap[module];
					if (alwaysOnly && !data.always) {
						continue;
					}
					script = data.s;
				} else if (!alwaysOnly) {
					// Attempt to load the module by name from the Dev page
					script = 'u:dev:MediaWiki:UserTags/module.' + module + '.js';
				} else {
					continue;
				}
				if (hash[script] !== 1) {
					hash[script] = 1;
					list[list.length] = script;
				}
			}
			/*jshint forin:false */
		
			// Improve caching by ensuring list always has the same order
			list.sort();
		
			// Core script (must always be last, obviously)
			if (!alwaysOnly) {
				list[list.length] = 'u:dev:MediaWiki:UserTags/core.js';
			}
			return list;
		})(config, !loaderData);
		
		// If we aren't going to load anything then we're done.
		if (!importList.length) {
			// Tidy up to reduce memory usage
			window.UserTagsJS = null; // IE8 won't let you delete stuff from the window
			try { delete window.UserTagsJS; } catch(e) { /* IE8 throws just to increase it's crapness */ }
			return;
		}
		// If we are going to load modules despite not being on a user page then we
		// need to honor the module contract by ensuring the global exists and has
		// the extensions member. Everything else is unnecessary.
		if (!loaderData) {
			window.UserTagsJS = config = {};
		}
		config.extensions = ($.isPlainObject(config.extensions) && config.extensions) || {};
		
		// Do the actual load. We also need to load the core script's dependencies from
		// ResourceLoader as well.
		var coreDeps = ['mediawiki.util'];
		mw.loader.load(coreDeps, null, true);
		
		var interval = setInterval(function () {
			if (!$('#userProfileApp').length) {
				return;
			}
			clearInterval(interval);
			
			if (config.debug !== 'noload') {
				mw.loader.using(coreDeps, function() {
					window.importArticles({ type:'script', articles: importList });
				});
			} else {
				config.imports = importList;
			}
		});
	
	});
	// Done.
})(window, jQuery, mediaWiki, window.UserTagsJS);

( function( window, $, mw ) { 
    "use strict";
    // MediaWiki configuration variables
    const conf = mw.config.get( [ 
        "wgTitle",
        "wgFormattedNamespaces",
        "wgNamespaceNumber",
        "wgUserGroups",
        "wgUserName",
        "wgServer"
    ] );
    // Creating the UCP object
    window.UCP = window.UCP || { };
    // Fetching the dev object
    window.dev = window.dev || { };
    // If this is not a message wall page, do not run
    if ( conf.wgNamespaceNumber !== 1200 || window.UCP.WallGreeting ) return;
    // Loading I18n-js if it does not exist
    if ( !window.dev.i18n ) { 
        importArticle( { 
            type : "script",
            article : "u:dev:MediaWiki:I18n-js/code.js"
        } );
    }
    // Loading WDSIcons if it does not exist
    if ( !window.dev.wds ) { 
        importArticle( { 
            type : "script",
            article : "u:dev:MediaWiki:WDSIcons/code.js"
        } );
    }
    
    var backcompatWikitext;
    
    // Creating the primary Wall Greeting object
    const WallGreeting = window.UCP.WallGreeting = { 
        target : document.querySelector( "#MessageWall" ),
        wrapper : document.createElement( "section" ),
        loaded : false,
        init : function( i18n ) {
            const ctx = this;
            mw.loader.using( "mediawiki.api" ).then( function( ) {
                ctx.i18n = i18n;
                ctx.dev = window.dev;
                ctx.check( ).then( ctx.render.bind( ctx ) );
            } );
        },
        check : function( ) { 
            const ctx = this;
            return new Promise( function( res, rej ) { 
                var interval = setInterval( function( ) { 
                    if ( document.querySelector( "#MessageWall" ) ) { 
                        clearInterval( interval );
                        res( );
                    }
                }, 1000 );
            } );
        },
        editAllowed : function( ) { 
            return new Promise( function( res, rej ) { 
                const user = conf.wgTitle;
                const isOwnWall = user === conf.wgUserName;
                const allowedGroups = Object.freeze( [ 
                    "sysop",
                    "staff",
                    "helper",
                    "soap",
                    "wiki-representative",
                    "wiki-specialist"
                ] );
                const isAllowed = allowedGroups.some( function( g ) { 
                    return conf.wgUserGroups.includes( g );
                } );
                if ( isOwnWall || isAllowed ) { 
                    res( user );
                } else {
                    rej( );
                }
            } );
        },
        render : function( ) { 
            const ajax = this.fetchGreeting( conf.wgTitle );
            const ctx = this;
            ajax.then( function( response ) { 
                if ( response.error ) { 
                    throw "API error: " + response.error;
                }

                var allMessages;
                mw.hook( "wikipage.content" ).add( function addGreeting( ) { 
                    
                    // Not displaying the greeting above a single-thread view
                    if ($(ctx.target).find(".MessageWallSingleThread").length 
                    &&  !($(ctx.target).find(".MessageWallForum").length) 
                    &&  !allMessages) {
                        $(ctx.target).find(".SingleThreadToolbar > button")[0]
                            .addEventListener ("click", function () {
                                allMessages = true;
                                addGreeting();
                            });
                        return;
                    }
                    
                    ctx.wrapper.classList.add( "MessageWallGreeting" );
                    ctx.wrapper.setAttribute( "id", "MessageWallGreeting" );
                    
                    ctx.target.insertAdjacentElement( "beforebegin", ctx.wrapper );
                    
                    const content = document.createElement( "div" );
                    ctx.wrapper.insertAdjacentElement( "beforeend", content );
            
                    content.classList.add( "MessageWallGreetingContent" );
                    content.setAttribute( "id", "MessageWallGreetingContent" );
                    
                    content.innerHTML = response.parse ? 
                        response.parse.text : "";

                    ctx.editAllowed( ).then( ctx.renderButtons.bind( ctx ) );
                    
                    // Calling the hook to allow JS-based features (such as
                    // collapsibles) on the greeting.
                    mw.hook( "wikipage.content" ).remove
                        (addGreeting);
                    mw.hook( "wikipage.content" ).fire
                        ($("#MessageWallGreetingContent"));
                } );
            } )[ "catch" ]( function( error ) { 
                throw "Uncaught error: " + error;
            } );
        },
        renderButtons : function( user ) { 
            const _this = this,
            	buttons = document.createElement( "div" ),
	        	editButton = document.createElement( "a" ),
	        	text = document.createElement( "span" ),
            	subpage = this.i18n
	                .inContentLang( )
	                .msg( 'subpage-name' )
	                .plain( ),
	        	pageName = conf.wgFormattedNamespaces[ 2 ] + ":" + user + "/" +
	        		subpage,
	        	editUrl = conf.wgServer + mw.util.getUrl( pageName, {
                    action: "edit"
                });
                
	        const oldPageName = conf.wgFormattedNamespaces[ 1202 ] + ':' + user,
	        	copyEditSummary = '([[' + oldPageName + ']]) ' +
	        		_this.i18n.inContentLang( ).msg( 'move-reason' ).plain(),
	        	fallbackEditUrl = conf.wgServer + mw.util.getUrl( pageName, {
            			action: "edit",
            			summary: copyEditSummary,
            			// not 100% but that's what we have if API edit fails
            			preload: oldPageName
            		});

            const warning = document.createElement( "div" );

            buttons.style.marginBottom = "1em";
            buttons.style.textAlign =
            	document.body.classList.contains("sitedir-rtl") ? "left"
            													: "right";
            buttons.classList.add( "MessageWallButtons" );
	        	
            if (backcompatWikitext) {
            	warning.innerHTML = this.i18n.inContentLang().msg(
            		'warning-move-page', conf.wgFormattedNamespaces[ 2 ]
            		).parse( );
            	warning.style.background = "var(--theme-alert-label, #fff)";
            	warning.style.color = "var(--theme-alert-color, #e81a3f)";
            	warning.style.textAlign = "center";
            	warning.style.border = "1px solid";
            	buttons.appendChild( warning );

	            text.classList.add( "move-button-text" );
	            text.innerText = this.i18n.msg( 'move' ).plain( );
	            
	            editButton.append( text );
	            editButton.classList.add( "wds-button", "MessageWallEditButton" );

	            editButton.setAttribute( "href", fallbackEditUrl );
                
                editButton.addEventListener("click", function(event) {
                	// return if it's any mouse button other than left
                	if (event.button) return;
                	event.preventDefault();
                	
                	( new mw.Api() ).postWithEditToken({
                		action: 'edit',
                		title: pageName,
                		text: backcompatWikitext,
                		summary: copyEditSummary,
                		createonly: true
                	}).done(function(response) {
                		if (!response.error) {
                			window.location.assign( mw.util.getUrl(pageName) );
                		} else {
                			window.location.assign( fallbackEditUrl );
                		}
                	}).fail(function() {
                		window.location.assign( fallbackEditUrl );
                	});
                });
            } else {
	            text.classList.add( "edit-button-text" );
	            text.innerText = this.i18n.msg( "edit" ).plain( );
	            
	            editButton.append( text );
	            
	            mw.hook( "dev.wds" ).add(function () {
	                editButton.prepend( _this.dev.wds.icon( "pencil-small" ) );
	            });
	            
	            editButton.classList.add( "wds-button", "MessageWallEditButton" );

	            editButton.setAttribute( "href", editUrl );
            }

            buttons.appendChild( editButton );
            this.wrapper.insertAdjacentElement( "afterbegin", buttons );
        },
        fetchGreeting : function( user ) { 
            const t = this;
            
            return new Promise( function( res, rej ) { 
                t.fetchGreetingAjax( user )
                    .done( function ( response ) { return res( response ); } )
                    [ "catch" ]( function( ) { 
                        return t.fetchGreetingBackcompat( user )
                            .then(function ( response ) {
                                res ( response );
                            }).catch( function() {
                                // Empty text, just to allow the edit button
                                res ( "" );
                            });
                    } );
            } );
        },
        fetchGreetingAjax : function( user ) { 
            const subpage = this.i18n
                .inContentLang( )
                .msg( 'subpage-name' )
                .plain( );
                
            return ( new mw.Api( ) ).get( { 
               action : "parse",
               page : conf.wgFormattedNamespaces[ 2 ] + ":" + user + "/" + subpage,
               prop : "text",
               disabletoc : true,
               formatversion : 2
            } );
        },
        fetchGreetingBackcompat : function( user ) { 
            const t = this;
            return new Promise( function( res, rej ) { 
                const ajax = t.fetchGreetingBackcompatAjax( user );
                ajax.done( function( response ) { 
                    if ( response.error ) return rej( );
                    
                    backcompatWikitext = response.parse.wikitext;

                    const content = response.parse.text;
                    
                    if ( !content ) return rej( );
                    
                    res( response );
                }).fail( rej );
            } );
        },
        fetchGreetingBackcompatAjax : function( user ) { 
            return ( new mw.Api( ) ).get( { 
               action : "parse",
               page : conf.wgFormattedNamespaces[ 1202 ] + ":" + user,
               prop : "text|wikitext",
               disabletoc : true,
               formatversion : 2
            } );
        }
    };
    
    mw.hook( "dev.i18n" ).add( function( i18no ) { 
        i18no.loadMessages( "WallGreeting" ).then( 
            WallGreeting.init.bind( WallGreeting ) 
        );
    } );
} )( this, jQuery, mediaWiki );

$(function() {
	if (window.FirstEditDate) return;
	window.FirstEditDate = true;
	
	const c = mw.config.get(['wgScriptPath', 'profileUserId']);
	var i18n;
	if (!c.profileUserId) return;

	function init() {
		$.ajax({
			method: 'get',
			url: c.wgScriptPath + '/wikia.php',
			data: {
				controller: 'UserProfile',
				method: 'getUserData',
				format: 'json',
				userId: c.profileUserId
			}
		}).done(function(r) {
			$('.user-identity-stats')
			.append($('<li>', { id: 'wr', text: i18n.msg('label').plain() + ' ' })
				.append($('<strong>', {
					text: r.userData.registration ? r.userData.registration : i18n.msg('noedit').plain()
				}))
			);
		}).fail(function(e) {
			console.error('FED says an exception:', e)
		})
	}
	
	importArticle({ type: 'script', article: 'u:dev:MediaWiki:i18n-js/code.js' })
	
	mw.hook('dev.i18n').add(function(i18np) {
		i18np.loadMessages('FirstEditDate').done(function(i18np) {
			i18n = i18np;
			i18n.useUserLang();
			var timer = setInterval(function() {
				if ($('#userProfileApp').length) {
					clearInterval(timer);
					init()
				}
			}, 1000);
		})
	})
});