
+function(t,e,n,o){function i(){return typeof wikiMod!==n?wikiMod:t.wikiMod||e.wikiMod||(a?a.wikiMod:null)}function r(){f||(f=!0,o(t.jQuery||t.$||e.jQuery||e.$||null,i()))}function u(t){t=t||1;try{if(!f&&!i()&&35>t)return setTimeout(function(e){u((e||t)+1)},25,t)}catch(e){console.log(d);}r()}function c(){var o=t[s],i=e[s],c=a?a[s]:null,f=!0;try{if(o===!0||i===!0||c===!0)return r();try{e[s]=r}catch(d){console.log(d);}if(n!=typeof e[s]&&e[s]!==r&&(f=!1),o===!1||"function"!=typeof o){try{t[s]=r}catch(d){console.log(d);}n!=typeof t[s]&&t[s]!==r&&(f=!1)}}catch(d){console.log(d);}f&&u()}var a=typeof unsafeWindow!==n&&"window"===Object.prototype.toString.call(unsafeWindow).replace(/^\[object |\]$/g,"").toLowerCase()?unsafeWindow:null,s="onWikiModReady",f=!1;c()}(this,window,"undefined",
function($,wikiMod){
	var global = this,
		debug = false,
		_undefined = "undefined",
		uw = typeof unsafeWindow !== _undefined && (Object.prototype.toString.call(unsafeWindow).replace(/^\[object |\]$/g,'').toLowerCase() === "window") ? unsafeWindow : null;
 
	var wikiMainContent, $wikiMainContent, observer, isObserving,
		baseExtensionLoaded = false,
		mutationClassPatt = /(?:[^\w]|^)(tabBody|tabs|editable-tabs|WikiaArticle)(?:[^\w]|$)/ig,
		observerTryTimeout = 100, observerTryMax = 25,
		customCSS, doc,
		isChecking = 0,
		customTabViewScriptAdded = false,
		customCSSAdded = false,
		tabViewDefaultCSSAdded = false,
		working = {},
		isFirefox = false,
		isChrome = false,
		observerConfig = {
			attributes: true,
			childList: true,
			subtree: true,
			attributeFilter: ["data-tab-body"]
		},
		settings = {
			afterscriptexecute: true, // Exec on afterscriptexecute event
			DOMContentLoaded: true, // Exec on DOMContentLoaded event
			watch_mutation: true, // Exec on mutation events
			init_timeout: 500, // Timeout before initial tab check. (disable with -1)
 
 
			//fixMobileView: 2, // 0 = disable | 1 = Only when adding edit button | 2 = always fix when TabView element is detected
 
			defaultMode: 'edit', // vde, edit, none
 
			color: {
				link: '#51956a',
				vde_missing: '#C20'
			},
			edit: {
				text: 'Edit',
				title: 'Edit Page'
			},
			vde: {
				view_title: 'View this page',
				view_text: 'v',
				discuss_title: 'Discuss this page',
				discuss_text: 'd',
				edit_title: 'Edit this page',
				edit_text: 'e'
			}
		};
 
	try {
		doc = (typeof document !== _undefined ? document : (window.document || global.document || wikiMod.document || uw ? uw.document : null));
	} catch(e) {
		return;
	}
 
	try {
		isFirefox = (typeof navigator != _undefined ? navigator : (window.navigator || uw.navigator)).userAgent.toLowerCase().indexOf('firefox') > -1;
	} catch(e) {}
 
	try {
		isChrome = (typeof navigator != _undefined ? navigator : (window.navigator || uq.navigator)).userAgent.toLowerCase().indexOf('chrome') > -1;
	} catch(e) {}
 
 
	window.JSExtensionConfig = window.JSExtensionConfig || {};
 
	if(typeof TABVIEW_EDIT_BUTTONS !== _undefined){
		settings = wikiMod.extend(true, settings, TABVIEW_EDIT_BUTTONS);
	}
 
	settings = wikiMod.extend(true, settings, window.JSExtensionConfig.TabViewEditButtons || {});
 
	function getWikiMainContent(){
		if($wikiMainContent && wikiMainContent && $wikiMainContent.length > 0){
			return $wikiMainContent;
		}
		$wikiMainContent = $('#WikiaMainContent', doc); // oasis
		if(!$wikiMainContent || $wikiMainContent.length == 0){
			$wikiMainContent = $('#wkMainCnt', doc); // mobile
		}
 
		if(!$wikiMainContent || $wikiMainContent.length == 0){
			$wikiMainContent = $('#content', doc); // monobook
		}
 
		try {
			wikiMainContent = $wikiMainContent[0];
		} catch(e) {
			wikiMainContent = null;
		}
		return ($wikiMainContent && $wikiMainContent.length > 0 ? $wikiMainContent : null);
	}
 
	function createObserver(){
		if(observer != null){
			return observer;
		}
 
		getWikiMainContent();
 
		if(wikiMainContent) {
			observer = new MutationObserver(function(mutations) {
				for(var x = 0; x < mutations.length; x++){
					var mutation = mutations[x].target;
					if(mutationClassPatt.test(mutation.className)){
						checkTabViews($wikiMainContent || null);
					}
				}
			});
			return observer;
			//observer.observe(wikiMainContent, observerConfig);
		}
		return null;
	}
 
	if (window.location.search.indexOf('veaction=edit') > -1) {
		return;
	}
 
	//wgAction == "view"
 
	//console.log('TabViewBeta Start');
 
	function wikiPageExists(pageTitle){
		//http://en.wikipedia.org/w/api.php?action=query&titles=Doesntexist%7CMain%20Page%7CTalk:&format=jsonfm
		//new wikiMod.Promise(function(resolve, reject) {
		var wgServer = wikiMod.wg("wgServer");
		var ePageTitle = escape(pageTitle);
		var url = wgServer + '/api.php?action=query&prop=info|revisions&inprop=created&titles=' + ePageTitle + '&format=json&rvprop=timestamp&rvlimit=1';
		return new wikiMod.Promise(function(resolve, reject) {
			wikiMod.setAsap(function(){
				$.ajax({
					dataType: "json",
					url: url,
					cache: false,
					crossDomain: true
				}).done(function(data, textStatus, jqXHR){
					if(data.query && data.query.pages){
						for(var id in data.query.pages){
							if(data.query.pages.hasOwnProperty(id)){
								if('missing' in data.query.pages[id] || id == '-1' || !data.query.pages[id].pageid){
									return resolve(false);
								}
							}
						}
					}
					resolve(true);
				}).fail(function(jqXHR, textStatus, errorThrown){
					console.log('jqXHR, textStatus, errorThrown', jqXHR, textStatus, errorThrown);
					reject([jqXHR, textStatus, errorThrown]);
				});
			});
		});
	}
 
	function addTabViewDefaultCSS(){
		if(tabViewDefaultCSSAdded)
			return;
		tabViewDefaultCSSAdded = true;
		wikiMod.CSS = ''
			+'ul.tabs,ol.tabs{margin:0}'
			+'.tabs{'
				+'zoom:1;'
				+'border-bottom:1px solid #4c4c4c;' // To Do: Dynamic color based on setting or computed style of page
				+'overflow:visible;'
				+'padding-left:5px;'
			+'}'
			+'.tabs:after{'
				+'clear:both;'
				+'content:" ";'
				+'display:block;'
				+'height:0;'
				+'overflow:hidden;'
				+'visibility:hidden;'
			+'}'
			+'.tabs li{'
				+'float:left;'
				+'list-style:none;'
				+'margin:0 1px;'
				+'padding:0;'
				+'position:relative;'
			+'}'
			+'.tabs li a{'
				+'border:1px solid transparent;'
				+'border-top-left-radius:4px;'
				+'border-top-right-radius:4px;'
				+'cursor:pointer;'
				+'display:inline-block;'
				+'font-size:14px;'
				+'line-height:23px;'
				+'padding:6px 12px 3px;'
				+'position:relative;'
				+'top:1px;'
			+'}'
			+'.tabs li .chevron{display:none}'
			+'.tabs .selected a{'
				+'border-bottom:1px solid transparent;'
				+'border-left:1px solid #4c4c4c;' // To Do: Dynamic color based on setting or computed style of page
				+'border-right:1px solid #4c4c4c;' // To Do: Dynamic color based on setting or computed style of page
				+'border-top:1px solid #4c4c4c;' // To Do: Dynamic color based on setting or computed style of page
				+'background:#202020;' // To Do: Dynamic color based on setting or computed style of page
				+'color:#d5d4d4;'
				+'cursor:text;'
				+'font-weight:bold;'
				+'text-decoration:none;'
			+'}'
			+'.tabs .selected a:hover{padding-bottom:3px}'
			+'.tabs .accent{background-color:transparent}'
			+'.tabs .disabled a{color:#8f8f8f;pointer-events:none}' // To Do: Dynamic color based on setting or computed style of page
			+''
			+'.tabBody{display: none;}'
			+'.tabBody.selected{display:block;}'
			+'.sprite.edit-pencil {'
				+'background-position: -1000px -48px;'
				+'height: 16px;'
				+'width: 16px;'
				+'background-color: transparent;'
				+'background-image: url("https://images.wikia.nocookie.net/common/skins/shared/images/sprite.png");'
				+'background-repeat: no-repeat;'
			+'}'
 
			+'.wikiaThrobber{background:url("https://images.wikia.nocookie.net/common/skins/common/images/ajax.gif") no-repeat scroll center #202020;height:100%;left:0;opacity:.75;position:absolute;top:0;width:100%;z-index:2}'
		;
 
	}
 
	function getSkinName(){
		var wgAvailableSkins, tSkinKeyName = window.skin || global.skin || '';
		try {
			wgAvailableSkins = wikiMod.wg('wgAvailableSkins');
 
			if(wgAvailableSkins && tSkinKeyName && wgAvailableSkins[tSkinKeyName]){
				return wgAvailableSkins[tSkinKeyName] || tSkinKeyName;
			}
		} catch(e) {}
 
		return tSkinKeyName;
	}
 
	//function genEditButton(url, callback, text, title) {
	function genEditButton(data) {
		var text = data.text || "Edit";
		var title = data.title || "";
 
		var newUrl = data.url.split("?")[0];
		newUrl += '?action=edit';
 
		var editBtn = {
			type: 'span',
			className: 'extendtabtitle edittabsection',
			innerHTML: {
				type: 'a',
				className: 'notabstyle',
				attributes: {
					href: newUrl,
					title: title || settings.edit.title
				},
				innerHTML: [
					{
						type: 'span',
						className: 'sprite edit-pencil'
					},
					(text || settings.edit.text)
				],
				EventListeners: {
					click: data.callback,
					touchstart: data.callback
				}
			}
		};
 
		return editBtn;
	}
 
	var talkNamespaces = [
		{
			regex: /\/wiki\/Template\:/,
			replace: '/wiki/Template_talk:'
		},
		{
			regex: /\/wiki\/User\:/,
			replace: '/wiki/User_talk:'
		},
		{
			regex: /\/wiki\/File\:/,
			replace: '/wiki/File_talk:'
		},
		{
			regex: /\/wiki\/Talk\:/,
			replace: '/wiki/Talk:'
		},
		{
			regex: /\/wiki\//,
			replace: '/wiki/Talk:'
		}
	];
	//function genVDE(url, callback, view_title, discuss_title, edit_title) {
	function genVDE(data) {
		var i = 0,
			baseURL = data.url.split("?")[0],
			viewURL = baseURL + '',
			discussURL = baseURL + '',
			editURL = baseURL + '?action=edit';
 
		for( ; i < talkNamespaces.length; i++){
			if(talkNamespaces[i].regex.test(discussURL)){
				discussURL = discussURL.replace(talkNamespaces[i].regex, talkNamespaces[i].replace);
				break;
			}
		}
 
		var vdeStyle = 'padding-left:1.2em; padding-right:1.2em;;padding-left:0.0em; padding-right:0.0em;background:none transparent;';
 
		var dot = {
			type: 'span',
			style: 'padding-left:1.2em; padding-right:1.2em;;padding-left:0.0em; padding-right:0.0em;;background:none transparent;border:none;font-size:100%;vertical-align: sub;cursor: default;',
			innerHTML: {
				type: 'b',
				innerHTML: '&#183;'
			}
		};
 
		var vdeEl = {
			type: 'span',
			className: 'extendtabtitle vdesection',
			style: 'white-space:nowrap;word-spacing:-.22em;',
			innerHTML: [
				{
					type: 'a',
					className: 'notabstyle vde_view',
					attributes: {
						href: viewURL
					},
					innerHTML: {
						type: 'span',
						style: vdeStyle,
						attributes: {
							title: (data.view_title || settings.vde.view_title)
						},
						innerHTML: settings.vde.view_text
					},
					EventListeners: {
						click: {
							callback: data.callback
						}
					}
				},
				dot,
				{
					type: 'a',
					className: 'notabstyle vde_discuss',
					attributes: {
						href: discussURL
					},
					innerHTML: {
						type: 'span',
						style: vdeStyle,
						attributes: {
							title: (data.discuss_title || settings.vde.discuss_title)
						},
						innerHTML: settings.vde.discuss_text
					},
					EventListeners: {
						click: {
							callback: data.callback
						}
					}
				},
				dot,
				{
					type: 'a',
					className: 'notabstyle vde_edit',
					attributes: {
						href: editURL
					},
					innerHTML: {
						type: 'span',
						style: vdeStyle,
						attributes: {
							title: (data.edit_title || settings.vde.edit_title)
						},
						innerHTML: settings.vde.edit_text
					},
					EventListeners: {
						click: {
							callback: data.callback
						}
					}
				}
			]
		}
		return vdeEl;
	}
 
	var __editableUlTabs = '.editable-tabs > div[id^="flytabs"]:first-of-type > ul.tabs';
 
	customCSS = ''
			+''+__editableUlTabs+' > li.selected > a {'
				+'cursor: default;'
			+'}'
			+''+__editableUlTabs+' > li.selected .extendtabtitle {'
				+'display: inline-block;'
				+'height: 16px !important;'
				+'line-height: 16px !important;'
			+'}'
			+''+__editableUlTabs+' > li:not(.selected) .extendtabtitle {'
				+'display: none;'
			+'}'
			+'.editable-tabs .notabstyle {'
				+'border 0 none !important;'
				+'border-width: 0 !important;'
				+'border-style: none !important;'
				+'cursor: pointer;'
				+'display: inline-block;'
				+'font-size: 14px;'
				+'line-height: 23px;'
				+'padding: 0px !important;'
				+'top: auto;'
				+'position: relative;'
			+'}'
			+'.editable-tabs .extendtabtitle {'
				+'margin-left: 10px;'
			+'}'
			+'.editable-tabs .extendtabtitle.vdesection a, .editable-tabs .extendtabtitle.vdesection span, .editable-tabs .extendtabtitle.vdesection b {'
				+'font-style:normal;'
				+'font-weight:400;'
				+'font-size: 0.85em;'
				+'text-decoration: none;'
			+'}'
			+'.editable-tabs .extendtabtitle.vdesection a, .editable-tabs .extendtabtitle.vdesection a > span {'
				+'color: '+settings.color.link+';'
				+'cursor: pointer;'
			+'}'
			+''+__editableUlTabs+' > li.selected .extendtabtitle.edittabsection > a {'
				+'font-style:normal;'
				+'font-weight:400;'
				+'color: '+settings.color.link+';'
			+'}'
			+''+__editableUlTabs+' > li.selected .extendtabtitle.edittabsection > a:hover {'
				+'font-style:normal;'
				+'font-weight:400;'
				+'color: '+settings.color.link+';'
				+'text-decoration: underline;'
				+'cursor: pointer;'
			+'}'
			+''+__editableUlTabs+' > li.selected .extendtabtitle.edittabsection .sprite {'
				+'display: inline-block;'
				+'vertical-align: text-top;'
				+'margin-right: 1px;'
			+'}'
			+'.tabs > li.tabLoading .tabThrobber {'
				+'display: inline-block !important;'
			+'}'
			+'.tabs > li.tabLoading .tabThrobber .wikiaThrobber {'
				+'display: block !important;'
			+'}'
			+'.tabs > li:not(.tabLoading) .tabThrobber, .tabs > li:not(.tabLoading) .tabThrobber .wikiaThrobber {'
				+'display: none !important;'
			+'}'
		;
 
	function loadCustomTabViewScript(){
		var tmpServer = wikiMod.wg('wgServer') || 'http://suggestion.wikia.com';
		//console.log('tmpServer', tmpServer);
 
		if(customTabViewScriptAdded){
			return wikiMod.Promise.resolve(true);
		}
 
		if(working.loadCustomTabViewScript){
			return working.loadCustomTabViewScript;
		}
 
		working.loadCustomTabViewScript = new wikiMod.Promise(function(resolve, reject) {
			var tmp = $('script[src*="/extensions/wikia/TabView/js/TabView.js"]', wikiMod.document);
 
			var newScript = "+(function(){"
					+"var stylepath = wgCdnApiUrl + \"/common/skins\";"
					+"if(!$.fn.startThrobbing){$.fn.startThrobbing=function(){return $(this).append('<div style=\"position:absolute;\"><div class=\"wikiaThrobber\"></div></div>')};}"
					+"if(!$.fn.startThrobbingNoContainer){$.fn.startThrobbingNoContainer=function(){return $(this).append('<div class=\"wikiaThrobber\"></div>')};}"
					+"if(!$.fn.startThrobbingMobile){$.fn.startThrobbingMobile=function(){return $(this).append('<div class=\"wkMblThrobber cntr\"><span></span></div>')};}"
					//+"if(!$.fn.startThrobbingContained){$.fn.startThrobbingContained=function(){return $(this).append('<div style=\"position:absolute;\"><div class=\"wikiaThrobber\"></div></div>')};}"
					+"if(!$.fn.stopThrobbing){$.fn.stopThrobbing=function(){$(this).find(\".wikiaThrobber\").parent().remove();return this};}"
					+"if(!$.fn.stopThrobbingMobile){$.fn.stopThrobbingMobile=function(){$(this).find(\".wkMblThrobber\").parent().remove();return this};}"
					+"if(!$.fn.preloadThrobber){$.preloadThrobber=function(){var img=new Image();img.src=stylepath+\"/common/images/ajax.gif\"};}"
					+"if(!$.createClass){$.createClass=function(sc,o){var constructor=o.constructor;if(typeof constructor!==\"function\"||constructor==Object.prototype.constructor){constructor=function(){sc.apply(this,arguments)}}var bc=constructor;var f=function(){};f.prototype=sc.prototype||{};bc.prototype=new f();if(typeof o.statics==\"object\"){bc=$.extend(bc,o.statics);delete o.statics}for(var m in o){bc.prototype[m]=o[m]}bc.prototype.constructor=bc;bc.superclass=sc.prototype;return bc;};}";
 
			var newScriptSuffix = "window.TabView = {init: function (options) {return new TabViewClass(options);}};" // Actually return the new TabView Object
								+"})();";
			if(!tmp || tmp.length == 0){
				$.ajax({
					url: tmpServer + '/extensions/wikia/TabView/js/TabView.js',
					type: "GET",
					crossDomain: true,
					cache: true,
					dataType: "text",
					success: function( data ) {
 
							newScript += data + newScriptSuffix;
 
							customTabViewScriptAdded = true;
							working.loadCustomTabViewScript = null;
							try {
								(uw || window).eval(newScript);
 
								setTimeout(function(){
 
									resolve(true);
								}, 0);
							} catch(e) {
								console.log('Load Custom Tab View Script Fail', e);
								reject(e);
							}
					},
					error: function(xhr, txt, e){
						console.log(xhr, txt, e);
						customTabViewScriptAdded = true;
						working.loadCustomTabViewScript = null;
						reject(false);
					}
				});
 
			} else {// if(getSkinName().toLowerCase() == "monobook")
				newScript += newScriptSuffix;
 
				customTabViewScriptAdded = true;
				working.loadCustomTabViewScript = null;
				try {
					(uw || window).eval(newScript);
 
					setTimeout(function(){
						resolve(true);
					}, 0);
				} catch(e) {
					console.log('Load Custom Tab View Script Fail', e);
					reject(e);
				}
			}
		});
 
		return working.loadCustomTabViewScript;
	}
 
	function manuallyHandleTabEvents($ctx){
		if(working.manuallyHandleTabEvents){
			return working.manuallyHandleTabEvents;
		}
 
		if(!$ctx || $ctx.length == 0) {
			$ctx = getWikiMainContent();
		}
 
		working.manuallyHandleTabEvents = new wikiMod.Promise(function(resolve, reject) {
			var _manuallyHandleTabEvents = function(){
 
				var $tabsToInit = $ctx.find('div[id^="flytabs_"]:not([id$="-content-wrapper"])');
				$tabsToInit.each(function(index) {
 
					var $tmpTab = $(this);
					var tmpTab = $tmpTab[0];
					var $liLinks = $tmpTab.find('li > a:first-of-type');
					$liLinks.each(function(){
						wikiMod.addEventListener($(this)[0], "click", function(e){
							try {
								tmpTab._TabView(this);
								wikiMod.eventCancel(e);
							} catch(e) {}
						}, true);
					});
 
					var options = {id: $tmpTab.attr("id"), selected: 0};
 
					if(getSkinName().toLowerCase() == "wikiamobile"){
						var tabViewInstance = (uw || window).TabView.init(typeof cloneInto !== "undefined" ? cloneInto(options, uw || window, {cloneFunctions: true, wrapReflectors: true}) : options);
					}
					var onLinkClick = function(target){
						var $target = $(target);
						var $parent = $target.parent();
						var $tabBody = $('[data-tab-body="'+$parent.attr("data-tab")+'"]');
						var $tabThrobber = $target.children('.tabThrobber');
 
						if(!$tabThrobber || $tabThrobber.length == 0){
							$tabThrobber = $('<span class="tabThrobber"><div class="wikiaThrobber"></div></span>');
							$target.append($tabThrobber);
						}
 
						var showNewTab = function(){
							$parent.siblings("li").removeClass("selected");
							$tabBody.siblings(".tabBody").removeClass("selected");
							$parent.addClass("selected");
							$tabBody.addClass("selected");
							setTimeout(initTabberTabs, 250);
						};
 
						var tabUrl = $target.attr('href');
 
						// if content not loaded, make AJAX request
						if ($tabBody.data('loaded') !== true) {
							$tabBody.startThrobbingMobile();
							$parent.addClass('tabLoading');
 
							wikiMod.requestAnimationFrame(function(){
								showNewTab();
							});
 
							$.get(tabUrl, function (html) {
								wikiMod.setAsap(function(){
									$tabBody.html(html).data('loaded', true).stopThrobbingMobile();
									$parent.removeClass('tabLoading');
 
									// fire event when new article comment is/will be added to DOM
									try {
										(wikiMod.mw || window.mw || mw).hook('wikipage.content').fire($tabBody);
									} catch(e) {}
								});
							});
 
						} else {
							showNewTab();
							$parent.removeClass('tabLoading');
						}
 
					};
					tmpTab._TabView = typeof exportFunction !== "undefined" && typeof unsafeWindow !== "undefined" ? exportFunction(onLinkClick, unsafeWindow, {
							allowCallbacks: true,
							allowCrossOriginArguments: true
						}) : onLinkClick;
 
					setTimeout(function(){
						try {
							if(uw) uw.JSSnippets.init();
							else (window.JSSnippets || global.JSSnippets).init();
						} catch(e) {
							try {
								setTimeout(function(){
									(window.JSSnippets || global.JSSnippets).init();
								}, 10);
							} catch(a) {}
						}
					}, 0);
				});
				/*
				setTimeout(function(){
					isChecking = 0;
					checkTabViews();
				}, 25);
				*/
				resolve(true);
 
			};
 
			loadCustomTabViewScript().then(function(){
				_manuallyHandleTabEvents();
			}, function(e){ // catch
				reject(e);
			});
		});
 
		return working.manuallyHandleTabEvents;
	}
 
	function fixMobileDevice($ctx){
		if(!$ctx || $ctx.length == 0) {
			$ctx = getWikiMainContent();
		}
 
		if(working.fixMobileDevice){
			return working.fixMobileDevice;
		}
 
		if(!customCSSAdded){
			customCSSAdded = true;
			wikiMod.addCSS(customCSS);
		}
 
		if(baseExtensionLoaded){
			return wikiMod.Promise.resolve($ctx);
		}
 
		working.fixMobileDevice = new wikiMod.Promise(function(resolve, reject) {
			wikiMod.setAsap(function(){
				var tmp = $('script[src$="/extensions/wikia/TabView/js/TabView.js"]', wikiMod.document);
				if(!tmp || tmp.length == 0 || getSkinName().toLowerCase() == "monobook"){
					if(!wikiMod.mw){
						wikiMod.load("mediawiki");
					}
 
					addTabViewDefaultCSS();
 
 
					manuallyHandleTabEvents().then(function(){
						baseExtensionLoaded = true;
						working.fixMobileDevice = null;
						resolve(true)
					}, function(e){
						baseExtensionLoaded = true;
						working.fixMobileDevice = null;
						reject(e);
					});
 
 
				} else {
					baseExtensionLoaded = true;
					working.fixMobileDevice = null;
					resolve(true);
				}
			});
		});
 
		return working.fixMobileDevice;
	}
 
	function fixMonoBook($ctx){
		if(!$ctx || $ctx.length == 0) {
			$ctx = getWikiMainContent();
		}
 
		if(!customCSSAdded){
			customCSSAdded = true;
			wikiMod.addCSS(customCSS);
		}
 
		if(working.fixMonoBook){
			return working.fixMonoBook;
		}
 
		working.fixMonoBook = new wikiMod.Promise(function(resolve, reject) {
			wikiMod.setAsap(function(){
				if(!wikiMod.mw){
					wikiMod.load("mediawiki");
				}
 
				addTabViewDefaultCSS();
				wikiMod.CSS = ''
					+'ul.tabs {'
						+'left:0 !important;'
					+'}'
					;
 
				manuallyHandleTabEvents().then(function(){
					baseExtensionLoaded = true;
					working.fixMonoBook = null;
					resolve(true)
				}, function(e){
					baseExtensionLoaded = true;
					working.fixMonoBook = null;
					reject(e);
				});
			});
		});
 
		return working.fixMonoBook;
	}
 
	var skinFixesAdded = false;
	function skinSpecificFixes(){
 
		if(skinFixesAdded){
			return wikiMod.Promise.resolve(true);
		}
 
		if(working.skinSpecificFixes){
			return working.skinSpecificFixes;
		}
 
		working.skinSpecificFixes = new wikiMod.Promise(function(resolve, reject){
			wikiMod.setAsap(function(){
				var skinName = getSkinName().toLowerCase();
 
				var respond = function(a, b){
					skinFixesAdded = true;
					working.skinSpecificFixes = null;
					if(b === false){
						return reject(a);
					}
					resolve(a);
				};
 
				switch(skinName){
					case 'wikiamobile':
						fixMobileDevice().then(function(a){
							respond(a);
						}, function(e){
							respond(e, false);
						});
						break;
					case 'monobook':
						fixMonoBook().then(function(a){
							respond(a);
						}, function(e){
							respond(e, false);
						});
						break;
					default:
						if(!wikiMod.mw){
							wikiMod.load("mediawiki");
						}
						if(!customCSSAdded){
							customCSSAdded = true;
							wikiMod.addCSS(customCSS);
						}
						return respond(true);
						break;
				}
 
			});
		});
 
		return working.skinSpecificFixes;
	}
 
 
 
	var $TabViewElements;
	var tabViewClassInstances = [];
 
	function TabViewBlockClass(el){
		var _this = this;
		_this.working = {};
		_this.$el = $(el);
		_this.el = _this.$el[0];
		_this.tabs = [];
 
		if(!$TabViewElements){
			$TabViewElements = $(_this.el);
		} else {
			if(TabViewBlockClass.hasElement(_this.$el)){
				return null;
			}
			$TabViewElements.add(_this.el);
		}
 
		//_this.$el.parent().addClass('editable-tabs vde');
 
		_this.mode = (_this.$el.closest('.vde').length > 0 ? 'vde' : settings.defaultMode || 'none');
 
 
 
		_this.$el.addClass('TVEB');
 
		/*
		var $tContWrap = $(_this.$el.attr('id') + '-content-wrapper');
		if($tContWrap && $tContWrap.length > 0){
			$tContWrap.remove();
		}
		*/
 
		_this.initialized = false;
 
		tabViewClassInstances.push(_this);
		return _this;
	};
 
	TabViewBlockClass.hasElement = function($el){
		for(var i = 0; i < tabViewClassInstances.length; i++){
			if(tabViewClassInstances[i].$el.attr('id') == $el.attr('id')){
				return true;
			}
		}
		return false;
	};
 
	TabViewBlockClass.getInstance = function(_el){
		var i = 0,
			$el = $(el),
			el = $el[0];
 
		for( ; i < tabViewClassInstances.length; i++){
			if(tabViewClassInstances[i].$el.is(el)){
				return tabViewClassInstances[i];
			}
		}
 
		return null;
	};
 
	TabViewBlockClass.prototype.init = function($ctx){
		var _this = this;
 
		if(_this.working.init){
			return _this.working.init;
		}
 
		if(_this.initialized){
			return wikiMod.Promise.resolve($ctx);
		}
 
		if(!$ctx || $ctx.length == 0){
			$ctx = getWikiMainContent();
		}
 
		_this.working.init = new wikiMod.Promise(function(resolve, reject) {
			var respond = function(a, b){
				setTimeout(initTabberTabs, 200);
				_this.working.init = null;
				if(b === false){
					return reject(a);
				}
				resolve(a);
			};
			wikiMod.setAsap(function(){
				//console.log('TabViewBlock init', _this);
				//fixMobileDevice().then(function(){
				skinSpecificFixes().then(function(){
					//console.log('TabViewBlock fixMobileDevice done');
 
					var $tabElements = _this.getTabElements();
					if($tabElements && $tabElements.length > 0){
						if(!customCSSAdded){
							customCSSAdded = true;
							wikiMod.addCSS(customCSS);
						}
						_this.initialized = true;
						$tabElements.each(function(){
							var $tabEl = $(this);
							var $tabLink = $tabEl.children('a');
							var $tabTextEl = $tabLink.children('span');
							var tabText = $tabTextEl.text();
							_this.tabs.push({
								'$el': $tabEl,
								'$tabLink': $tabLink,
								'$tabTextEl': $tabTextEl,
								id: $tabEl.attr('id'),
								href: $tabLink.attr('href'),
								text: tabText
							});
						});
 
						_this.initTabs();
					} else {
						return respond('no tabs found', false);
					}
 
					//console.log('_this.tabs', _this.tabs);
					respond($ctx);
				}, function(e) {
					console.log('TabViewBlock fixMobileDevice error', e);
					respond(e, false);
				});
			});
		});
 
		return _this.working.init;
	};
 
 
	TabViewBlockClass.prototype.initTabs = function($ctx){
		var _this = this;
 
		if(_this.working.initTabs){
			return _this.working.initTabs;
		}
 
		if(_this.initializedTabs){
			return wikiMod.Promise.resolve($ctx);
		}
 
		if(!$ctx || $ctx.length == 0){
			$ctx = getWikiMainContent();
		}
 
		_this.working.initTabs = new wikiMod.Promise(function(resolve, reject) {
			var respond = function(a, b){
				_this.working.initTabs = null;
				if(b === false){
					return reject(a);
				}
				resolve(a);
			};
 
			wikiMod.setAsap(function(){
 
				for(var i = 0; i < _this.tabs.length; i++){
					_this.initTab(_this.tabs[i]);
				}
 
				_this.initializedTabs = true;
				return respond(true);
			});
		});
 
	};
 
	TabViewBlockClass.prototype.initTab = function(tabData){
		var _this = this;
 
		var $tab = tabData.$el;
		var $link = tabData.$tabLink;
 
		$tab.attr('data-edit-btn-added', 'true');
 
		if(_this.mode == 'vde'){
			var linkCallback = function(e){
				wikiMod.eventCancel(e);
				var linkhref = this.href;// || $clickedLink.attr('href');
				window.location.href = linkhref;
			}
			var newVDEArgs = genVDE({url: tabData.href, callback: linkCallback});
			//function genVDE(url, callback, view_title, discuss_title, edit_title)
 
			var newVDE = wikiMod.createNewElement(newVDEArgs);
			$link.append(newVDE);
 
 
 
			var $viewLink = $link.find('.vde_view');
			var $discussLink = $link.find('.vde_discuss');
			var $editLink = $link.find('.vde_edit');
			var pageNameRegex = /\/wiki\/(.*?)(?:\?|\#|$)/i;
 
 
			var tDiscussPageName = pageNameRegex.exec($discussLink.attr('href'));
			var tViewPageName = pageNameRegex.exec($viewLink.attr('href'));
 
 
			if(tDiscussPageName && tDiscussPageName.length > 1){
				wikiPageExists(tDiscussPageName[1]).then(function(val){
					//console.log('Page Exists value', val);
					if(!val){
						$discussLink.children().css({
							color: settings.color.vde_missing
						});
					}
				}, function(e){
					//console.log('Page Exists error', e);
				});
			}
 
			if(tViewPageName && tViewPageName.length > 1){
				wikiPageExists(tViewPageName[1]).then(function(val){
					if(!val){
						$viewLink.children().css({
							color: settings.color.vde_missing
						});
 
						$editLink.children().css({
							color: settings.color.vde_missing
						});
					}
				}, function(e){
					//console.log('Page Exists error', e);
				});
			}
 
		} else if(_this.mode == 'edit') {
			var linkCallback = function(e){
				var touch, linkhref = this.href;// || $clickedLink.attr('href');
				try{
					touch = e.touches[0];
				} catch(e) {}
 
				if(touch && e.type == "touchstart"){
					//console.log('touchstart', e);
					var _timeoutCTX,
						willTriggerClick = true,
						touchEndHandle = function(e2){
							if(_timeoutCTX)
								clearTimeout(_timeoutCTX);
 
							wikiMod.removeEventListener(e.target, 'touchend', touchEndHandle);
							wikiMod.removeEventListener(e.target, 'touchcancel', cancelFunction);
 
							try {
								wikiMod.eventCancel(e2);
							} catch(e) {}
 
							try {
								wikiMod.eventCancel(e);
							} catch(e) {}
 
 
							if(willTriggerClick){
								window.location.href = linkhref;
							}
						};
 
 
					var cancelFunction = function(e_cancel){
						_timeoutCTX = null;
						willTriggerClick = false;
						wikiMod.removeEventListener(e.target, 'touchend', touchEndHandle);
						wikiMod.removeEventListener(e.target, 'touchcancel', cancelFunction);
					};
 
					wikiMod.addEventListener(e.target, 'touchend', touchEndHandle);
					wikiMod.addEventListener(e.target, 'touchcancel', cancelFunction);
					_timeoutCTX = setTimeout(cancelFunction, 1000);
				} else {
					wikiMod.eventCancel(e);
					window.location.href = linkhref;
				}
			};
			//function genEditButton(url, callback, text, title)
			var newButtonArgs = genEditButton({url: tabData.href, callback: linkCallback});
 
			var newButton = wikiMod.createNewElement(newButtonArgs);
 
			$link.append(newButton);
		}
	};
 
	TabViewBlockClass.prototype.getTabElements = function(){
		var _this = this;
		//return _this.$el.find('.tabs > li:not([data-edit-btn-added])');
		return _this.$el.find('.tabs > li');
	};
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
	function processTabElement(el, $ctx){
		if(!$ctx || $ctx.length == 0){
			$ctx = getWikiMainContent();
		}
		var tTabViewBlock = new TabViewBlockClass(el);
 
		if(tTabViewBlock){
			//console.log('tTabViewBlock', tTabViewBlock);
			wikiMod.setAsap(function(){
				tTabViewBlock.init($ctx);
			});
		}
	}
 
	function findTabViewElements($ctx){
		if(!$ctx || $ctx.length == 0){
			$ctx = getWikiMainContent();
		}
 
		//var $editableTabs = $ctx.find('.editable-tabs > div[id^="flytabs"]:first-of-type');
		var $tabs = $ctx.find('div[id^="flytabs"]:first-of-type').not('.TVEB');
 
		if($tabs && $tabs.length > 0){
			$tabs.each(function(){
				var $this = $(this);
				//$this.addClass('editable-tabs');
				if($this.closest('.editable-tabs').length > 0){
					processTabElement(this, $ctx);
				}
			});
		}
	}
 
	function checkTabViews($ctx){
		if(!$ctx || $ctx.length == 0){
			$ctx = getWikiMainContent();
		}
		findTabViewElements($ctx);
	}
 
	var TabViewScriptPatt = /TabView\/js\/TabView\.js$/i;
 
	if(settings.afterscriptexecute) {
		// Check for tabs after the TabView script executes
		try {
			wikiMod.addEventListener(window, isFirefox ? 'afterscriptexecute' : 'beforescriptexecute', function(e){
				if(TabViewScriptPatt.test(e.target.src)) {
					setTimeout(checkTabViews, isFirefox ? 0 : 100);
				}
			}, false);
		} catch(e) {}
	}
	if(settings.DOMContentLoaded){
		// Check for tabs after the DOM loads
		try {
			wikiMod.addEventListener(window, 'DOMContentLoaded', function(e){
				wikiMod.setAsap(checkTabViews);
			}, false);
		} catch(e) {}
	}
 
	function startObserving(count) {
		count = count || 1;
		if(isObserving || count > observerTryMax) {
			return;
		}
 
		if(!observer) {
			createObserver();
		}
 
		if(observer) {
			try {
				observer.observe(wikiMainContent, observerConfig);
				isObserving = true;
			} catch(e) {}
		} else {
			//setTimeout(startObserving, observerTryTimeout, count + 1); // Params for callback not supported in old IE
			setTimeout(function(_count) {
				startObserving((_count || count) + 1);
			}, observerTryTimeout, count);
		}
	}
 
	$(doc || document).ready(function(){
		// Detect when TabView script changes attributes of its elements
		if(settings.watch_mutation) {
			startObserving();
		}
 
		if(typeof settings.init_timeout == "number" && settings.init_timeout > -1) {
			// Manually check after a timeout
			setTimeout(checkTabViews, settings.init_timeout);
		}
	});
 
	function initTabberTabs(){
		var tbFn = "tabberAutomaticOnLoad";
		try {
			(uw && uw[tbFn] ? uw[tbFn] : (global[tbFn] || window[tbFn]))();
		} catch(e) {}
	}
 
 
	if(!wikiMod.$('script[src*="tabber/tabber.js"]')){
		wikiMod.addStylesheet('https://images.wikia.nocookie.net/extensions/3rdparty/tabber/tabber.css');
		wikiMod.addScript(undefined, 'https://images.wikia.nocookie.net/extensions/3rdparty/tabber/tabber.js');
	} else if(!wikiMod.$('link[href*="tabber/tabber.css"]')){
		wikiMod.addStylesheet('https://images.wikia.nocookie.net/extensions/3rdparty/tabber/tabber.css');
	}
 
	skinSpecificFixes().then(function(){
		if(debug) console.log('Skin Fixes Added');
	}, function(e){
		console.log('Skin Fixes Error', e);
	});
	function onLoadFn(){
		// Fix Tabber Also
		var loadjQueryUIFn = ($.loadJQueryUI || (uw && uw.jQuery ? uw.jQuery.loadJQueryUI : null));
 
		try{loadjQueryUIFn();}catch(e){
			wikiMod.load('jqueryloaders');
			wikiMod.load('jqueryui');
		}
 
		setTimeout(initTabberTabs, 400);
		//checkTabViews();
	}
 
	var initialized = false;
	function init(){
		if(!initialized){
			initialized = true;
			try {
				onLoadFn();
			} catch(e) {
				console.log('Error onLoadFn', e);
			}
 
			//$(getWikiMainContent()).addClass('editable-tabs');
		}
	}
 
	try {
		wikiMod.onLoad = init;
	} catch(e) {
		setTimeout(init, 100);
	}
 
	init();
});