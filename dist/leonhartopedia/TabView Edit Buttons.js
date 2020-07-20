// ==UserScript==
// @name        Wikia TabView Edit Buttons
// @description Adds edit buttons to active tabs created by the TabView extension
// @namespace   jgjake2
// @include     http://deadisland.wikia.com/wiki/User:Jgjake2
// @include     http://deadisland.wikia.com/wiki/User:Jgjake2/Sandbox
// @include     /^https?:\/\/deadisland\.wikia\.com\/wiki\/User:Jgjake2\/Sandbox(?:\?.*?|\#.*?)?$/
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @require     http://deadisland.wikia.com/index.php?title=User:Jgjake2/js/wikiMod.js&action=raw&ctype=text/javascript
// @version     1
// @grant       unsafeWindow
// @run-at      document-end
// ==/UserScript==

// Can run as a UserScript (for dev/testing) or as a standalone site extension
+function(global){
	function isWindow(obj){return (Object.prototype.toString.call(obj).replace(/^\[object |\]$/g,'').toLowerCase() === "window");}
	
	var _undefined = "undefined",
		uw = typeof unsafeWindow !== _undefined && isWindow(unsafeWindow) ? unsafeWindow : null;

	if(uw){
		uw.TABVIEW_EDIT_BUTTONS_DISABLE = (window || global).TABVIEW_EDIT_BUTTONS_DISABLE = true;
		uw.MobileDeviceJSLoader = (window || global).MobileDeviceJSLoader = true;
	}

	var TVEB_init = function($, wikiMod) {
		if(!$) {
			console.log("Error! No jQuery!!");
			return;
		}
		
		if(!wikiMod){
			console.log("Error! No wikiMod!!");
			return;
		}
		/*
		console.log('unsafeWindow', unsafeWindow);
		console.log('window', window);
		console.log('global', this);
		console.log('$', $);
		*/
		
		var wikiMainContent, $wikiMainContent, observer, isObserving,
			baseExtensionLoaded = false,
			mutationClassPatt = /(?:[^\w]|^)(tabBody|tabs|editable-tabs|WikiaArticle)(?:[^\w]|$)/ig,
			observerTryTimeout = 100, observerTryMax = 25,
			customCSS, doc,
			isChecking = 0,
			customCSSAdded = false;
			isFirefox = false,
			isChrome = false,
			observerConfig = {
				attributes: true,
				childList: true,
				subtree: true,
				attributeFilter: ["data-tab-body"]
			},
		// Default Settings
		settings = {
			afterscriptexecute: true, // Exec on afterscriptexecute event
			DOMContentLoaded: true, // Exec on DOMContentLoaded event
			watch_mutation: true, // Exec on mutation events
			init_timeout: 1000, // Timeout before initial tab check. (disable with -1)
			fixMobileView: 2, // 0 = disable | 1 = Only when adding edit button | 2 = always fix when TabView element is detected
			color: {
				link: '#51956a'
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
		
		var wikiLogger = new wikiMod.logger({
			iconURL: 'https://vignette.wikia.nocookie.net/deadisland/images/6/64/Favicon.ico/revision/latest',
			title: 'TabView Edit Button (Dead Island)'
		});
		
		if((window.TABVIEW_EDIT_BUTTONS_DISABLE || global.TABVIEW_EDIT_BUTTONS_DISABLE) === true && !uw){
			return;
		}
		
		(window || global).TABVIEW_EDIT_BUTTONS_DISABLE = true;
		if(uw){
			uw.TABVIEW_EDIT_BUTTONS_DISABLE = true;
		}

		// Disable script running on wikia if running a userscript (dev)

		
		try {
			doc = (typeof document !== _undefined ? document : (window.document || global.document || uw ? uw.document : null));
		} catch(e) {
			return;
		}
		
		try {
			isFirefox = (typeof navigator != _undefined ? navigator : (window.navigator || uw.navigator)).userAgent.toLowerCase().indexOf('firefox') > -1;
		} catch(e) {}
		
		try {
			isChrome = (typeof navigator != _undefined ? navigator : (window.navigator || uq.navigator)).userAgent.toLowerCase().indexOf('chrome') > -1;
		} catch(e) {}
		
		
		if(typeof TABVIEW_EDIT_BUTTONS !== _undefined){
			settings = $.extend(true, settings, TABVIEW_EDIT_BUTTONS);
		}
		
		function getWikiMainContent(){
			if($wikiMainContent && wikiMainContent && $wikiMainContent.length > 0){
				return $wikiMainContent;
			}
			$wikiMainContent = $('#WikiaMainContent', wikiMod.document);
			if(!$wikiMainContent || $wikiMainContent.length == 0){
				$wikiMainContent = $('#wkMainCnt', wikiMod.document);
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
		
		function wikiPageExists(pageTitle, onTrue, onFalse){
			var url = wgServer + '/api.php?action=query&prop=info|revisions&inprop=created&titles=' + page + '&format=json&rvprop=timestamp&rvlimit=1';
		}
		
		function genEditButton(url, callback, text, title) {
			text = text || "Edit";
			title = title || "";
			
			var newUrl = url.split("?")[0];
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
						click: callback,
						touchstart: callback
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
		function genVDE(url, callback, view_title, discuss_title, edit_title) {
			var i = 0,
				baseURL = url.split("?")[0],
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
						className: 'notabstyle',
						attributes: {
							href: viewURL
						},
						innerHTML: {
							type: 'span',
							style: vdeStyle,
							attributes: {
								title: (view_title || settings.vde.view_title)
							},
							innerHTML: settings.vde.view_text
						},
						EventListeners: {
							click: {
								callback: callback
							}
						}
					},
					dot,
					{
						type: 'a',
						className: 'notabstyle',
						attributes: {
							href: discussURL
						},
						innerHTML: {
							type: 'span',
							style: vdeStyle,
							attributes: {
								title: (discuss_title || settings.vde.discuss_title)
							},
							innerHTML: settings.vde.discuss_text
						},
						EventListeners: {
							click: {
								callback: callback
							}
						}
					},
					dot,
					{
						type: 'a',
						className: 'notabstyle',
						attributes: {
							href: editURL
						},
						innerHTML: {
							type: 'span',
							style: vdeStyle,
							attributes: {
								title: (edit_title || settings.vde.edit_title)
							},
							innerHTML: settings.vde.edit_text
						},
						EventListeners: {
							click: {
								callback: callback
							}
						}
					}
				]
			}
			return vdeEl;
		}
		
		customCSS = ''
				+'.editable-tabs > div[id^="flytabs"]:first-of-type > ul.tabs > li.selected > a {'
					+'cursor: default;'
				+'}'
				+'.editable-tabs > div[id^="flytabs"]:first-of-type > ul.tabs > li.selected .extendtabtitle {'
					+'display: inline-block;'
				+'}'
				+'.editable-tabs > div[id^="flytabs"]:first-of-type > ul.tabs > li:not(.selected) .extendtabtitle {'
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
				+'.editable-tabs > div[id^="flytabs"]:first-of-type > ul.tabs > li.selected .extendtabtitle.edittabsection > a {'
					+'font-style:normal;'
					+'font-weight:400;'
					+'color: '+settings.color.link+';'
				+'}'
				+'.editable-tabs > div[id^="flytabs"]:first-of-type > ul.tabs > li.selected .extendtabtitle.edittabsection > a:hover {'
					+'font-style:normal;'
					+'font-weight:400;'
					+'color: '+settings.color.link+';'
					+'text-decoration: underline;'
					+'cursor: pointer;'
				+'}'
				+'.editable-tabs > div[id^="flytabs"]:first-of-type > ul.tabs > li.selected .extendtabtitle.edittabsection .sprite {'
					+'display: inline-block;'
					+'vertical-align: text-top;'
					+'margin-right: 1px;'
				+'}'
			;
		

		//
		// Fix mobile wiki tabs!!!
		// TabView is not loaded on mobile devices. This completely breaks any page using TabView considering it chooses to link
		// directly to the render page. Thus any user following this link on a mobile device will only see the rendered html of
		// that page.
		//
		// This is an awful bug and needs to be addressed, otherwise the TabView extension is useless.
		//
		function fixMobileDevice($ctx){
			if(!$ctx || $ctx.length == 0) {
				$ctx = getWikiMainContent();
			}
			if(!baseExtensionLoaded){
				var tmp = $('script[src$="/extensions/wikia/TabView/js/TabView.js"]', wikiMod.document);
				if(!tmp || tmp.length == 0){
					if(!wikiMod.mw){
						wikiMod.load("mediawiki");
					}
					
					//var _wgResourceBasePath = wikiMod.wg("wgResourceBasePath");// typeof wgResourceBasePath !== "undefined" ? wgResourceBasePath : (window.wgResourceBasePath || uw.wgResourceBasePath);
					
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
							+'background-image: url("'+wikiMod.wg("wgResourceBasePath")+'/skins/shared/images/sprite.png");'
							+'background-repeat: no-repeat;'
						+'}'
					;
					
					baseExtensionLoaded = true;

					$.ajax({
						url: "http://deadisland.wikia.com/extensions/wikia/TabView/js/TabView.js",
						type: "GET",
						crossDomain: true,
						cache: true,
						dataType: "text",
						success: function( data ) {
							var newScript = "+(function(){"
									+"var stylepath = wgCdnApiUrl + \"/common/skins\";"
									+"if(!$.fn.startThrobbing){$.fn.startThrobbing=function(){return this.append('<div class=\"wikiaThrobber\"></div>')};}"
									+"if(!$.fn.stopThrobbing){$.fn.stopThrobbing=function(){this.find(\".wikiaThrobber\").remove();return this};}"
									+"if(!$.fn.preloadThrobber){$.preloadThrobber=function(){var img=new Image();img.src=stylepath+\"/common/images/ajax.gif\"};}"
									+"if(!$.createClass){$.createClass=function(sc,o){var constructor=o.constructor;if(typeof constructor!==\"function\"||constructor==Object.prototype.constructor){constructor=function(){sc.apply(this,arguments)}}var bc=constructor;var f=function(){};f.prototype=sc.prototype||{};bc.prototype=new f();if(typeof o.statics==\"object\"){bc=$.extend(bc,o.statics);delete o.statics}for(var m in o){bc.prototype[m]=o[m]}bc.prototype.constructor=bc;bc.superclass=sc.prototype;return bc;};}"
									+data
									+"window.TabView = {init: function (options) {return new TabViewClass(options);}};" // Actually return the new TabView Object
								+"})();";
							//wikiMod.addScript(newScript, undefined, "_TabViewExt");
							(uw || window).eval(newScript);
							setTimeout(function(){
								var $tabsToInit = $ctx.find('div[id^="flytabs_"]:not([id$="-content-wrapper"])');
								$tabsToInit.each(function(index) {
									var $tmpTab = $(this);
									var tmpTab = $tmpTab[0];
									var $liLinks = $tmpTab.find('li > a:first-of-type');
									$liLinks.each(function(){
										wikiMod.addEventListener($(this)[0], "click", function(e){
											tmpTab._TabView(this);
										}, true);
									});
									
									var options = {id: $tmpTab.attr("id"), selected: 0};
									
									var tabViewInstance = (uw || window).TabView.init(typeof cloneInto !== "undefined" ? cloneInto(options, uw || window, {cloneFunctions: true, wrapReflectors: true}) : options);
									var onLinkClick = function(target){
										var $target = $(target);
										var $parent = $target.parent();
										var $tabBody = $('[data-tab-body="'+$parent.attr("data-tab")+'"]');
										$parent.siblings("li").removeClass("selected");
										$tabBody.siblings(".tabBody").removeClass("selected");
										$parent.addClass("selected");
										$tabBody.addClass("selected");
										
										try {
											tabViewInstance.loadContent(typeof cloneInto !== "undefined" ? cloneInto($target, uw || window, {cloneFunctions: true, wrapReflectors: true}) : $target);
										} catch(e) {}
										setTimeout(initTabberTabs, 200);
										setTimeout(initTabberTabs, 800);
									};
									tmpTab._TabView = typeof exportFunction !== "undefined" && typeof unsafeWindow !== "undefined" ? exportFunction(onLinkClick, unsafeWindow, {
											allowCallbacks: true,
											allowCrossOriginArguments: true
										}) : onLinkClick;
									
									setTimeout(function(){
										try {
											uw.JSSnippets.init();
										} catch(e) {
											try {
												window.JSSnippets.init();
											} catch(a) {}
										}
									}, 0);
								});
								
								setTimeout(function(){
									isChecking = 0;
									checkTabViews();
								}, 25);
							}, 0);
							
						},
						error: function(xhr, txt, e){
							console.log(xhr, txt, e);
						}
					});
					
					
				}
			}
		}
		
		
		function checkTabViews($ctx) {
			isChecking++;
			
			if(isChecking > 1) {
				return;
			}
			
			if(!$ctx || $ctx.length == 0){ // || $ctx.type == "DOMAttrModified")
				$ctx = getWikiMainContent();
			}
			
			if(!$ctx || $ctx.length == 0) {
				isChecking = 0;
				return;
			}
			
			try {
				var $editableTabs = $ctx.find('.editable-tabs > div[id^="flytabs"]:first-of-type');
				
				if(!baseExtensionLoaded) {
					var tmp = $('script[src$="/extensions/wikia/TabView/js/TabView.js"]', wikiMod.document);
					if(!tmp || tmp.length == 0){
						var $allTabs = $ctx.find('div[id^="flytabs_"] > ul.tabs');
						if(settings.fixMobileView > 0 &&
							(($editableTabs && $editableTabs.length > 0) ||
							($allTabs && $allTabs.length > 0 && settings.fixMobileView >= 2))
						) {
							fixMobileDevice($ctx);
						} else {
							isChecking = 0;
						}
						return;
					}
				}
			
				
				if($editableTabs) {
					
					if(!customCSSAdded) {
						customCSSAdded = true;
						//wikiMod.CSS = customCSS;
						wikiMod.addCSS(customCSS);
					}
					$editableTabs.each(function(index) {
						var $this = $(this);
						var $tabList = $this.find('.tabs > li:not([data-edit-btn-added])');
						if($tabList && $tabList.length > 0) {
							$tabList.each(function(i) {
								var $tab = $(this);
								$tab.attr('data-edit-btn-added', 'true');
								var $link = $tab.children('a').first();
								var href = $link.attr('href');
								
								if($this.parent().hasClass('vde')){
									var linkCallback = function(e){
										wikiMod.eventCancel(e);
										var linkhref = this.href || $clickedLink.attr('href');
										window.location.href = linkhref;
									}
									var newVDEArgs = genVDE(href, linkCallback);
									
									var newVDE = wikiMod.createNewElement(newVDEArgs);
									$link.append(newVDE);
								} else {
									var linkCallback = function(e){
										var touch, linkhref = this.href || $clickedLink.attr('href');
										try{
											touch = e.touches[0];
										} catch(e) {}
										
										if(touch && e.type == "touchstart"){
											console.log('touchstart', e);
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
									}
									var newButtonArgs = genEditButton(href, linkCallback);
									
									var newButton = wikiMod.createNewElement(newButtonArgs);
									
									$link.append(newButton);
								}
							});
						}
						
					});
					
				}
			} catch(e) {
				console.log("Error!", e);
			}
			
			// If a lot of check attempts were made (because of mutation events), then check again after a timeout
			if(isChecking > 3) {
				setTimeout(checkTabViews, 1);
			}
			isChecking = 0;
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
					setTimeout(checkTabViews, 0);
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
		}
		
		function onLoadFn(){
			// Fix Tabber Also
			var loadjQueryUIFn = ($.loadJQueryUI || (uw && uw.jQuery ? uw.jQuery.loadJQueryUI : null));
			
			try{loadjQueryUIFn();}catch(e){
				wikiMod.load('jqueryloaders');
				wikiMod.load('jqueryui');
			}
			
			setTimeout(initTabberTabs, 800);
			checkTabViews();
		}
		
		var isInit = false;
		function init(){
			if(!isInit){
				isInit = true;
				onLoadFn();
			}
		}
		
		try {
			wikiMod.onLoad = init;
		} catch(e) {
			setTimeout(init, 500);
		}
		
	}.bind(global);
	
	function getWM(){return (typeof wikiMod !== _undefined ? wikiMod : (global.wikiMod || window.wikiMod || (uw ? uw.wikiMod : null)));}
	
	var started = false;
	function start(){
		if(!started){
			started = true;
			TVEB_init(uw && typeof jQuery !== _undefined ? jQuery.noConflict() : (global.jQuery || global.$ || window.jQuery || window.$ || null),getWM());
		}
	}
	
	function waitForWikiMod(count){
		count = count || 1;
		try {if(!started && !getWM() && count < 35){return setTimeout(function(_count){waitForWikiMod((_count || count) + 1);}, 25, count);}} catch(e) {}
		start();
	}
	
	function addStartHooks(){
		var rName = "onWikiModReady",gReady = global[rName],wReady = window[rName],uReady = uw ? uw[rName] : undefined;
		try {
			if(gReady === true || wReady === true || uReady === true){
				return start();
			} else {
				if(typeof gReady!=_undefined) {
					global[rName] = start;
					if(global[rName] !== start) return;
				}
				if(!uw && typeof wReady!=_undefined) {
					window[rName] = start;
					if(window[rName] !== start) return;
				}
			}
		} catch(e) {}
		waitForWikiMod();
	}
	addStartHooks();
	
}(this);
@import url("/load.php?mode=articles&articles=u:dev:MediaWiki:FandomizedTabs/tabviews.css&only=styles");