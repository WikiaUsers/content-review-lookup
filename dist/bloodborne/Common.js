/**
 * Any JavaScript here will be loaded for all users on every page load.
 */
 
// jshint browser: true, devel: true, jquery: true
// jshint strict: true, freeze: true, eqeqeq: true, futurehostile: true
// jshint newcap: true, noarg: true, quotmark: single, shadow: outer
// jshint latedef: true, undef: true, unused: true
/* globals mw */
 
/**
 * Initialization IIFE.
 * @returns {void}
 */
;(function () {
	'use strict';
	/**
 	 * UserTags
 	 * Setup for UserTags imported module.
 	 */
	window.UserTagsJS = {
    	modules: {},
    	tags: {
        	'bureaucrat': {
            	u: 'Old Hunter'
        	},
        	'sysop': {
            	u: 'Old Hunter'
        	},
        	'threadmoderator': {
            	u: 'Blood Minister'
        	},
        	'chatmoderator': {
            	u: 'Blood Minister'
        	},
        	'content-moderator': {
            	u: 'Hunter'
        	},
        	'autoconfirmed': {
            	u: 'Paleblood'
        	},
        	'bot': { 
            	u: 'Little One' 
        	},
        	'bot-global': { 
            	u: 'Little One' 
        	},
        	'inactive': { 
            	u: 'Blood Drunk' 
        	}
    	}
	};
	/**
 	 * Tooltips
 	 * Tooltip setup for own tooltip module.
 	 */
	window.tagList = {
    	'Old Hunter': 'Wiki Administration',
    	'Blood Minister': 'Wiki Moderator',
    	'Hunter': 'Wiki Content Moderator',
    	'Paleblood': 'Auto-confirmed User',
    	'Little One': 'Bot',
    	'Blood Drunk': 'Inactive User',
    	'Staff': 'Fandom Staff'
	};
	/**
 	 * Auto Refresh
 	 * Setup for auto-refresh imported module.
 	 */
	window.AjaxRCRefreshText = 'Auto-refresh';
	window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
	window.ajaxPages = [
    	'Special:RecentChanges',
    	'Special:WikiActivity', 
    	'Special:AllPages', 
    	'Special:UncategorizedPages'
	];
	/**
 	 * RevealAnonIP
 	 * Setup for the RevealAnonIP module
 	 * - Changes "A Fandom Contributor" to their IP address.
 	 */
	window.RevealAnonIP = {
    	permissions: ['bureaucrat', 'sysop', 'staff', 'helper']
	};
	/**
 	 * AddRailModule
 	 * Setup for AddRailModule
 	 * - Allows easy custom additions to the siderail.
 	 */
	window.AddRailModule = [
    	{
        	page: 'Template:DiscussionsRailModule',
        	prepend: true,
        	maxAge: 86400
    	}
	];
	/** 
 	 * PageEditInfo
 	 * Setup for PageEditInfo submodules.
 	 */
	/**
 	 * PageCreator
 	 * Setup for PageCreator imported module.
 	 */
	window.pageCreatorConfig = {
    	namespaces: 'all',
    	useAvatar: false,
    	useTimestamp: true,
    	useUTC: true,
    	useTimeago: true
	};
	/**
 	 * LastEdited
 	 * Setup for LastEdited imported module.
 	 */
	window.lastEdited = {
    	avatar: false,
    	avatarsize: 20,
    	size: false,
    	diff: true,
    	comment: false,
    	newpage: false,
    	time: 'timeago',
    	timezone: 'UTC',
    	lang: 'en-us',
    	namespaces: {
        	exclude: []
    	},
    	pages: []
	};
	/**
	 * Wiki scripting.
	 */
	/**
	 * Cache of fired events.
	 * @private
	 */
	var fired = new mw.Map();
	/**
	 * Hook function to be fired once page is ready.
	 */
	function ready (DOMTools) {
		if (fired.exists('DOMTools')) return;
        /**
         * Script for collapsible tables.
         */
        ;(function () {
            var tables = DOMTools.queryAll('table.collapsible');
            /**
             * Setup functions
             */
			function collapseText (table) {
                return DOMTools.hasClass(table, 'collapsed') ? 'show' : 'hide';
            }
			
			function collapseTable (e, t) {
                var $elems = $(t.querySelector('td').parentElement);
                if (t.classList.contains('collapsed')) {
                    $elems.show('fast');
                    DOMTools.removeClass(t, 'collapsed');
                    DOMTools.text(e, collapseText(t));
                } else {
                    $elems.hide('fast');
                    DOMTools.addClass(t, 'collapsed');
                    DOMTools.text(e, collapseText(t));
                }
            }
            
            function handleTable (link, table, event) {
                event.preventDefault();
                collapseTable(link, table);
            }
			
            function appendCollapseLink (table) {
                if (!table) return;
                
                var th = DOMTools.query('th', table);
                
                if (!th) return;
                
                var hs = collapseText(table),
                    link = DOMTools.parseHTML('<a href="#">' + hs + '</a>'),
                    fn = handleTable.bind(null, link, table);
                DOMTools.on(link, 'click.collapseLink', fn);
                
                var el = DOMTools.parseHTML('<span class="collapseLink"></span>');
                DOMTools.appendAll(el, [
                    document.createTextNode('['),
                    link,
                    document.createTextNode(']')
                ]);
                    
                DOMTools.appendTo(th, el);
                
                if (DOMTools.hasClass(table, 'collapsed')) {
                    DOMTools.css(DOMTools.query('td', table).parentElement, 'display', 'none');
                }
            }
            /**
             * Run
             */
            tables.forEach(appendCollapseLink);
        })();
        /**
         * Add account creation dates to the global edit count on user profiles.
         */
        ;(function () {
            var base = DOMTools.query('#UserProfileMasthead');
            if (!base) return;
            
            function getData (user) {
                var url = mw.util.wikiScript('api');
                url += '?action=query&list=users&usprop=registration';
                url += '&ususers=' + user + '&format=json';
                
                function cb (resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    
                    function load () {
                        var parsed = JSON.parse(xhr.responseText);
                        resolve(parsed);
                    }
                    
                    function error (e) {
                        reject(e, xhr);
                    }
                    
                    xhr.addEventListener('load', load);
                    xhr.addEventListener('error', error);
                    
                    xhr.open('GET', url, true);
                    xhr.send();
                }
                
                return new Promise(cb); // jshint ignore: line
            }
            
            function appendToGlobalCount (data) {
                var d = DOMTools.getProp(data, 'query.users.0.registration'),
                    date = new Date(d).toLocaleDateString('en-us', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    }),
                    target = DOMTools.query('.globaledit-label', base),
                    clone;
                
                if (!target) return Promise.reject(new Error('Unable to find label.')); // jshint ignore: line
                
                clone = target.cloneNode(true);
                DOMTools.text(clone, 'global edits since account creation');
                DOMTools.appendAll(clone, [
                    document.createElement('br'),
                    document.createTextNode(date)
                ]);
                target.replaceWith(clone);
                return Promise.resolve(clone); // jshint ignore: line
            }
            
            function removeLinkedCSS () {
                function filter (l) {
                    var ref = l.href;
                    return ref && ref.includes('GlobalEditcount');
                }
                
                var links = DOMTools.queryAll('link[type="text/css"][rel="stylesheet"]'),
                    link = links.find(filter);
                
                try {
                    link.parentElement.removeChild(link);
                    return Promise.resolve(true); // jshint ignore: line
                } catch(e) {
                    return Promise.reject(e); // jshint ignore: line
                }
            }
            
            function init (GlobalEditcount) {
				if (fired.exists('GlobalEditcount')) return;
                getData(GlobalEditcount.user)
                    .then(appendToGlobalCount, console.error)
                    .then(removeLinkedCSS, console.error);
				fired.set('GlobalEditcount', true);
            }
            
            mw.hook('GlobalEditcount.loaded').add(init);
        })();
        /**
         * Fix avatars in Thread History pages.
         */
        ;(function () {
            var fixDimensions, avatars;
            
            if (!document.getElementById('WallThreadHistory')) return;
            
            fixDimensions = function (avatar) {
                var src = avatar.getAttribute('src');
                avatar.setAttribute('height', '50');
                avatar.setAttribute('width', '50');
                avatar.setAttribute('src', src.slice(0, -2) + 50);
            };
            
            avatars = DOMTools.queryAll('.WallHistory #WallThreadHistory .avatar');
            avatars.forEach(fixDimensions);
        })();
        /**
         * Add Discord widget.
         * 
         * WidgetBot source: https://github.com/widgetbot-io/widgetbot
         * Crate: https://github.com/widgetbot-io/widgetbot/tree/2.5/packages/crate
         */
        ;(function () {
            var regex = /"(\w+)":/g;
            
            var crateOptions = {
                channel: '259951634652725248',
                server: '259951634652725248',
                shard: 'https://e.widgetbot.io',
                color: '#3e4a4c',
                location: ['bottom', 'right']
            };
            
            var options = JSON.stringify(crateOptions, null, 4);
            options = options.replace(regex, '$1:');
            
            var popupData = {
                content: 'Interested in Bloodborne? Come chat, or join our Discord server!',
                timeout: 10000,
                avatar: 'https://vignette.wikia.nocookie.net/bloodborne/images/3/3d/Bb_doll_art.jpg/revision/latest?cb=20190627220142'
            };
            
            var popup = JSON.stringify(popupData, null, 4);
            popup = popup.replace(regex, '$1:');
            
            var script = document.createElement('script');
            script.setAttribute('id', 'WidgetCrate');
            script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3');
            script.setAttribute('async', '');
            script.setAttribute('defer', '');
            script.textContent = 'var crate = new Crate(' + options + ');\n\n';
            script.textContent += 'crate.notify(' + popup + ')';
            
            DOMTools.appendTo(document.head, script);
        })();
        /**
         * Highlight-js and hljs
         */
        ;(function () {
            var operations = {
                addLines: function (hljs) {
                	return function (ln) {
						if (fired.exists('highlightjs')) return hljs;
						ln.process();
						operations.highlightBlocks(hljs);
						fired.set('highlightjs', true);
					};
                },
                highlightBlocks: function (hljs) {
                	var blocks = DOMTools.queryAll('code:not(.no-language) pre');
                	if (!blocks.length) return hljs;
                	blocks.forEach(function (block) {
					    hljs.highlightBlock(block);
                	});
                	return hljs;
                },
                initHighlights: function (hljs) {
                	mw.hook('wikipage.content').add(function ($content) {
                		if (!$content) $content = $('body');
                		operations.highlightBlocks(hljs);
                	});
                    mw.hook('dev.CodeblockLineNumbers').add(operations.addLines(hljs));
					fired.set('highlightjs-init', true);
                    return hljs;
                },
                init: function (hljs) {
					if (fired.exists('highlightjs-init')) return;
                    hljs.useTheme('atom-one-dark');
                    hljs.loadAllLanguages()
                        .then(operations.initHighlights, console.error)
                        .then(operations.addButtonListeners, console.error)
                        .fail(console.error);
                },
                addButtonListeners: function (hljs) {
                    var buttons = DOMTools.queryAll('.codeblock-theme-button'),
                        fn;
                        
                    if (!buttons.length) return;
                    buttons.forEach(function (button) {
                        fn = operations.buttonListener(button, hljs);
                        DOMTools.on(button, 'click.CodeBtnTheme', fn);
                    });
                },
                buttonListener: function (button, hljs) {
					return function () {
                    	var theme = button.getAttribute('data-theme');
                    	if (!theme) return;
                    	hljs.useTheme(theme);
					};
                }
            };
            
            mw.hook('dev.highlight').add(operations.init);
        })();
        ;(function () {
        	var url = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/highlight.min.js';
        	if (window.hljs || document.querySelector('[href="' + url + '"]')) return;
        	$
        	.getScript(url)
        	.then(function () {
        		mw.hook('wikipage.content').add(function ($content) {
        			if (!$content) $content = $('body');
        			$content.find('.mw-highlight pre').each(function (index, element) {
        				window.hljs.highlightBlock(element);
        			});
        		});
        	}, console.error);
        })();
		fired.set('DOMTools', true);
    }
	/**
	 * Wait for page ready and prepare hook.
	 */
	function wait () {
		if (document.readyState !== 'complete') return setTimeout(wait, 1000);
		/**
 		 * DOMTools own module hook.
 		 * Module source: https://bloodborne.fandom.com/wiki/MediaWiki:DOMTools.js
 		 */
    	mw.hook('DOMTools').add(ready);
	}
	
	wait();
})();
 
/*@end@*/