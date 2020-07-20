/*! Copyright (C) 2012 Lunarity
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*jshint smarttabs:true laxbreak:true laxcomma:true curly:false
  browser:true jquery:true es5:true
 */
/*global mediaWiki */

//
// Facepalm fix for Wikia's code.
// Observable is the base class for most of Wikia's complex JS code.
//
window.Observable.prototype.off = window.Observable.prototype.un;


/**
 * Hide Rail script.
 *
 * This script mainly exists to hide the Wikia Rail on Article pages to reduce the
 * amount of scrolling needed to read a long article. It also provides a collection
 * of related hiding features that can be optionally enabled as well.
 */
(function(window, $, mw) {
	"use strict";

	// JavaScript does not have block scoping, all variables exist even before the 'var'
	var document, jStorage,
	    settings, i18n,
	    ArticleClass, EditPlugin, EditClass, OasisWideMode, StorageManager;

	// Language translations
	i18n = {
		// English
		en: {
			expand: 'Expand Content',
			shrink: 'Shrink Content',
			widemode: 'Enable Wide Mode'
		},
		// Catalan [[User:Espartannoble6]]
		ca: {
			expand: 'Expandeix',
			shrink: 'Contrau',
			widemode: 'Mode Ampli'
		},
		// German [[User:Arkondi]]
		de: {
			expand: 'Seitenleiste ausblenden',
			shrink: 'Seitenleiste einblenden'
		},
		// Spanish [[User:JLSilver]]
		es: {
			expand: 'Expandir',
			shrink: 'Contraer',
			widemode: 'Modo Amplio'
		},
		// Hungarian [[User:TK-999]]
		hu: {
			expand: 'Tartalomtér növelése',
			shrink: 'Tartalomtér csökkentése',
			widemode: 'Széles mód'
		},
		// Lojban [[User:KamafaDelgato021469]]
		jbo: {
			expand: 'banro stuuiki',
			shrink: 'cmaro stuuiki',
			widemode: 'tadji ganra'
		},
		// Dutch [[User:Jens Ingels]]
		nl: {
			expand: 'Inhoud Uitbreiden',
			shrink: 'Inhoud Slinken'
		},
		// Polish [[User:Vuh]]
		pl: {
			expand: 'Rozwiń treść',
			shrink: 'Zwiń treść',
			widemode: 'Włącz szeroki tryb'
		},
		// Russian [[User:Unaited17]]
		ru: {
			expand: 'Развернуть',
			shrink: 'Сжать',
			widemode: 'Широкоэкранный режим'
		},
		// Turkish [[User:BaRaN6161TURK]]
		tr: {
			expand: 'İçeriği Genişlet',
			shrink: 'İçeriği Küçült',
			widemode: 'Geniş Modu Etkinleştir'
		},
		// Ukrainian [[User:Taichi Yaegashi]]
		uk: {
			expand: 'Розгорнути',
			shrink: 'Згорнути',
			widemode: 'Широкоекранний режим'
		}
	};

	//
	// Logger Singleton
	//
	var logger = { // IE8 only gains window.console when the console is open in the UI
		_console: window.console || { log: $.noop, warn: $.noop, info: $.noop, error: $.noop },
		_slice: [].slice,
		_log: function(fn, args) {
			args = this._slice.call(args);
			args[0] = 'HIDERAIL' + (args[0] ? '(' + args[0] + '):' : ':');
			return fn.apply(this._console, args);
		},
		log: function(/*component, ...*/) {
			return this._log(this._console.log, arguments);
		},
		inf: function(/*component, ...*/) {
			return this._log(this._console.info, arguments);
		},
		wrn: function(/*component, ...*/) {
			return this._log(this._console.warn, arguments);
		},
		err: function(/*component, ...*/) {
			return this._log(this._console.error, arguments);
		}
	};

	//
	// Execution context
	//
	document = window.document;
	jStorage = $.storage || { get: $.noop, set: $.noop, del: $.noop };

	function getBooleanStorageWithDefault(name, defaultValue) {
		var value = jStorage.get(name);
		return typeof(value) === 'boolean' ? value : !!defaultValue;
	}

	//
	// User configuration
	// We use mw.user.options for our settings, this allows a clean migration to
	// MW1.20's Options component for storing these on the server. Need a UI to
	// perform setting actions though.
	// TODO: Pecoes' preferences framework should be integrated. Performance
	//	considerations dictate that wideMode+defaultWideModwe MUST come from global
	//	conf so that we can calculate and apply the stylesheets immediately. Other
	//	options will just delay the DOM ready processing which is not so bad.
	//
	settings = $.extend({
		wideVisualEditor: true, // Enable edit page function?
		wideMode: 1, // 0=disabled, others are HD values (1-3)
		defaultWideMode: false, // Default OasisWideMode to on?
		defaultExpand: false, // Default Rail to hidden?
		// When expanding/widening, affect ALL tabs at once
		syncTabs: false,
		debug: false	// Internal Development flag.
	}, (function(opts) {
		var map = {
			HideRailWideVisualEditor: 'wideVisualEditor',
			HideRailWideMode: 'wideMode',
			HideRailStartWide: 'defaultWideMode',
			HideRailStartExpanded: 'defaultExpand',
			HideRailSyncAcrossTabs: 'syncTabs',
			HideRailDebug: 'debug'
		}, types = {
			HideRailWideMode: Number
		}, out = {}, Bool = Boolean, val;
		for (var key in map) {
			if (map.hasOwnProperty(key)) {
				val = opts.get(key);
				if (val === null) continue; // Non-existent
				out[map[key]] = (types[key] || Bool)(val);
			}
		}
		return out;
	})(mw.user.options));
	// Expose the internal state for inspection during debugging
	if (settings.debug) {
		window.HideRailJS = settings;
	}

	//
	// Collapse the resources so we only keep the ones we are actually going to use.
	// The others will be garbage collected.
	//
	i18n = (function(i18n) {
		// This is reverse order, last is most important, first is least
		var langs = [{}, i18n.en],
		    langCode,
		    i = 1,
		    l = arguments.length;

		for ( ; i < l ; ++i) {
			langCode = arguments[i] + '';
			if (i18n.hasOwnProperty(langCode)) langs.push(i18n[langCode]);
			else logger.wrn('i18n', 'No translation for language "' + langCode + '"');
		}

		// Result: user, wiki, english
		return $.extend.apply($, langs);
	})(i18n, mw.config.get('wgContentLanguage'), mw.config.get('wgUserLanguage'));

	//
	// Import the CSS style sheet that provides the default link appearance
	//
	importArticle({
	    type: 'style',
	    article: 'u:dev:MediaWiki:HideRail.css'
	});

	//
	// Code for managing a toolbar button on Wikia's Oasis Toolbar.
	// This is more complex than it seems because we have to deal with hooking
	// Wikia's code for when the toolbar is reconstructed via Customize and
	// deal with the weirdness for creating a popup menu.
	// id = HTML ID to stick on the LI
	// overflowable = Mutex with popup. Can this be added to the overflow spill menu?
	//
	function ToolbarMenuItem(id, overflowable) {
		this._$item = $(document.createElement('li'));
		this.$link = $(document.createElement('a'))
			.prop('href', '#')
			.appendTo(this._$item)
			;
		this._toolbarHook = null;

		// Attach ID if we have one
		if (id) this._$item.prop('id', id);

		// "We were hit with a .remove()" event
		// TODO: This is unnecessary now, remove
		this.eventsDestroyed = $.Callbacks()
			.add($.proxy(this._onEventsDestroyed, this))
			.fire()
			;

		// We need the Wikia Toolbar script to do this properly, although it only really
		// matters if we're using a popup
		this._findWikiaToolbarApp();
		if (overflowable) {
			this._$item.addClass('overflow');
		}

		return this;
	}
	$.extend(ToolbarMenuItem.prototype, {
		_onEventsDestroyed: function() {
			this.$link.click(false);
		},
		_findWikiaToolbarApp: function() {
			var toolbarObj;
			// Ugh. Wikia has an API but it's lame, it does not offer a
			// addCustomButton function or anything. (I found this reading the source)
			if (!(toolbarObj = window.WikiaFooterApp)
			 || !(toolbarObj = toolbarObj.tcToolbar)
			 || !toolbarObj.handleOverflowMenu
			 || !toolbarObj.el
			 || !toolbarObj.el.jquery
			 || !toolbarObj.el.length
			   ) {
				logger.err('ToolbarMenuItem', 'Wikia API Failure, WikiaFooterApp is unusable');
				toolbarObj = {
					el: $('#WikiaBarWrapper .toolbar > ul.tools'),
					handleOverflowMenu: $.noop
				};
				if (!toolbarObj.el.length) throw new Error("Direct search for Footer toolbar failed, it's missing from the DOM");
			}

			this._toolbarApp = toolbarObj;
		},
		_constructMenu: function() {
			if (!this._toolbarApp.menuGroup) throw new Error('Wikia TCToolbar not compatible');
			if (this._$submenu) throw new Error('Submenu already exists! Destroy it first');

			this._$submenu = $(document.createElement('ul'))
				.addClass('tools-menu')
				;
			this._$item
				.prepend('<span class="arrow-icon-ctr"><span class="arrow-icon arrow-icon-single"></span></span>')
				.append(this._$submenu)
				.removeClass('overflow')
				;
			if (this._$item.parent().length) {
				// Reattach the item in case it spilled and was moved to a spill menu
				this.attach();
				// If the button is already attached then we need to activate now
				this._toolbarApp.menuGroup.add(this._$item);
			}
		},
		destroyMenu: function() {
			// Detach the submenu if there is one
			if (this._$submenu) {
				// Menu is being destroyed whilst still attached so we need
				// to deregister the events
				if (this._$item.parent().length) {
					this._toolbarApp.menuGroup.remove(this._$item);
				}
				this._$submenu.remove();
				this._$item.find('> span.arrow-icon-ctr').remove();
				delete this._$submenu;
			}
			return this;
		},
		// Attaches the link-button to the Oasis toolbar
		attach: function() {
			var reattach = this._$item.parent().length !== 0;
			// el is a jQuery object
			this._toolbarApp.el.append(this._$item);

			// We invoke Wikia's overflow menu builder in case spillage happens
			// We also deal with a Wikia bug where every menu item spills into the overflow for no
			// reason. This is somewhat of a hack but is a nice convenience.
			var $overflow = this._toolbarApp.el.find('.overflow-menu');
			if ($overflow.is(':visible')) {
				$overflow.hide().find('> .tools-menu > li').each(function() {
					$overflow[0].parentNode.insertBefore(this, $overflow[0].parentNode.firstChild);
				});
			}
			// Respill if needed
			this._toolbarApp.handleOverflowMenu();

			// Attach the submenu if there is one
			if (this._$submenu && !reattach) {
				this._toolbarApp.menuGroup.add(this._$item);
			}

			// Avoid losing the button if the user reconfigures their toolbar.
			// There should be an event to hook but there doesn't seem to be one.
			//
			// After clicking Customize, pressing Save in the popup will
			// invoke load(html) with the new toolbar configuration received via
			// AJAX. We hook load, detach ourself from the toolbar, wait for load()
			// to complete then reattach ourself afterwards.
			if (this._toolbarHook === null) {
				var toolbarObj = this._toolbarApp
				  , realFunc = toolbarObj.load
				  , hookDisabled = false
				  , self = this;
				this._toolbarHook = toolbarObj.load = function() {
					// Detach ourself first so that we won't get .remove()-ed which
					// kills our event handlers'
					var safe = !hookDisabled;
					if (safe) self.detach();

					try {
						var r = realFunc.apply(this, arguments);
					} finally {
						// Now the toolbar is ready again, so we can just reattach to it.
						if (safe) self.attach();
					}
					return r;
				};
				this._toolbarHook.disable = function() {
					// We can only detach properly if there hasn't been a double
					// monkey patching.
					hookDisabled = true;
					if (toolbarObj.load === self._toolbarHook) {
						toolbarObj.load = realFunc;
						self._toolbarHook = null;
					}
				};
				this._toolbarHook.enable = function() {
					hookDisabled = false;
				};
			} else {
				this._toolbarHook.enable();
			}
			return this;
		},
		detach: function() {
			if (this._toolbarHook) this._toolbarHook.disable();
			if (this._$submenu) {
				this._toolbarApp.menuGroup.remove(this._$item);
			}
			this._$item.detach();
			return this;
		},
		destroy: function() {
			this.destroyMenu();
			this._$item.remove();
			this._$item = this.$link = null;
			return this;
		},
		// Add LIs to the submenu
		appendToSubmenu: function($nodes) {
			if (!this._$submenu) this._constructMenu();
			this._$submenu.append($nodes);
			return this;
		},
		prependToSubmenu: function($nodes) {
			if (!this._$submenu) this._constructMenu();
			this._$submenu.prepend($nodes);
			return this;
		},
		removeFromSubmenu: function($nodes, asDetach) {
			if (this._$submenu) {
				// Only remove stuff that is actually a child rather than random nodes
				if (this._$submenu.find($nodes)[asDetach ? 'detach' : 'remove']().length) {
					// If the menu is empty now, kill it
					if (!this._$submenu.find('> li').length) {
						this.destroyMenu();
					}
				}
			}
			return this;
		}
	});

	//
	// Class that implements the User Interface.
	// Does not contain any actual business logic, just manages the state of the buttons
	// and generates events when they change.
	//
	function ExpandButtons(isExpanded, isWide) {
		// Anti-badness defence
		if (!settings.debug && document.getElementById('HideRailJS_Menu')) {
			throw new Error('HideRail is already running');
		}

		// Create the base menu item
		this._toolbarItem = new ToolbarMenuItem('HideRailJS_Menu');
		this._toolbarItem.eventsDestroyed.add($.proxy(this._onEventsDestroyed, this));

		// Click handler for the base menu item, not in the popup
		this._$link = this._toolbarItem.$link;

		// Wide mode checkbox
		this._$wideCheckbox = $(document.createElement('input'))
			.prop('type', 'checkbox')
			;
		// NOTE: We wrap in an anchor as the menu expects anchors so won't style properly
		//	without one.
		this._$wideModeLi = $(document.createElement('li'))
			.append($(document.createElement('a'))
				.append(this._$wideCheckbox)
				.append(i18n.widemode)
			);

		this._onEventsDestroyed();

		// State change events
		this.wideStateChanged = $.Callbacks('memory');
		this.expandStateChanged = $.Callbacks('memory');

		// Configure initial state
		this.updateExpandButton(isExpanded);
		this.updateWideButton(isWide);

		// Delegate functions
		this.attachButton = $.proxy(this._toolbarItem.attach, this._toolbarItem);
		this.detachButton = $.proxy(this._toolbarItem.detach, this._toolbarItem);
		this.destroyButton = $.proxy(this._toolbarItem.destroy, this._toolbarItem);

		return this;
	}
	$.extend(ExpandButtons.prototype, {
		// Second stage init to enable the wide mode checkbox or not
		commitInit: function(aWideEnabled) {
			if (aWideEnabled) {
				this._toolbarItem.appendToSubmenu(this._$wideModeLi);
			} else {
				this._$wideModeLi.remove();
				delete this._$wideModeLi;
				delete this._$wideCheckbox;
				this.updateWideButton = $.noop;
			}
			return this;
		},

		// When Wikia's code tries to kill us, we have to rise from the ashes by
		// reattaching all the event handlers.
		_onEventsDestroyed: function() {
			this._$link.on('click.HideRailExpand', $.proxy(this._onExpandClicked, this));
			if (this._$wideCheckbox) {
				var $check = this._$wideCheckbox
					.change($.proxy(this._onWideCheckChanged, this))
					;
				$check.parent() // The anchor tag
					.click(function(e) {
						// If the checkbox was clicked directly then ignore it
						if (e.target === $check[0]) return;
						e.preventDefault();
						$check[0].checked = !$check[0].checked;
						$check.change(); // Signal manually
					})
					;
			}
		},

		// Event handler for link interaction
		_onExpandClicked: function(e) {
			e.preventDefault();
			this.updateExpandButton(!this._isExpanded, true);
		},
		_onWideCheckChanged: function() {
			this.updateWideButton(this._$wideCheckbox.prop('checked'), true);
		},

		// Updates the text on the button and fires the notification event that the state
		// has been changed
		updateExpandButton: function(aIsExpanded, aByEvent) {
			// NOTE: This equality test relies on this._isExpanded being undefined to start
			//	with so that the first call is always unconditional
			aIsExpanded = !!aIsExpanded;
			if (this._isExpanded === aIsExpanded) return this;
			var mode = aIsExpanded ? 'shrink' : 'expand',
			    $link = this._$link,
			    link = $link[0];

			link.className = link.className.replace(
				/(?:^|\s+)hiderail-link-[^\s]*\b/g, ''
			) + ' hiderail-link-' + mode;
			$link.text(i18n[mode]);
			this.expandStateChanged.fire( (this._isExpanded = aIsExpanded), !!aByEvent );
			return this;
		},
		// Flicks the checkbox to reflect the internal state and fires the change event
		updateWideButton: function(aIsWide, aByEvent) {
			aIsWide = !!aIsWide;
			if (aIsWide === this._isWide) return this;
			this._$wideCheckbox.prop('checked', aIsWide);
			this.wideStateChanged.fire( (this._isWide = aIsWide), !!aByEvent );
			return this;
		},

		// Switches the expand button to "dead" mode when it won't do anything
		// (i.e. no-one is going to listen for the events)
		killExpandButton: function() {
			this._$link
				.off('click.HideRailExpand')
				[0].className = 'hiderail-link-generic'
				;
			this.updateExpandButton = $.noop;
			return this;
		},

		// Query if the page is already expanded or not
		isExpanded: function() {
			return this._isExpanded;
		},
		isWide: function() {
			return this._isWide;
		}
	});


	// Class for handling Article pages.
	// Uses oasis-one-column to properly format the page in the absence of the rail
	// Handles the search box to keep it from disappearing with the rail by attaching
	// it to the Page Header (this keeps it in roughly the same pixel position).
	ArticleClass = function(buttonObj) {
		var header;

		this._$rail = $('.WikiaRail');
		this._$content = $('#WikiaMainContent');
		if (!this._$rail.length || !this._$content.length) throw new Error('No rail/content?');
		if (this._$rail.is(':hidden')) throw new Error('Rail is being hidden by something else?');

		header = document.getElementById('WikiaPageHeader');
		if (header === null) {
			// Blog post pages have a weird structure, keeping the search is harder
			header = $('#WikiaUserPagesHeader.WikiaBlogPostHeader');
			if (header.length) {
				header = $(document.createElement('div'))
					.css({
						'float': 'right',
						marginLeft: '10px'
					})
					.prependTo(header)
					[0]; // Extract DIV back out of jQuery
			} else {
				header = null;
			}
		}
		this._header = header;
		this._search = header && document.getElementById('WikiaSearch');

		this._button = buttonObj;
		buttonObj.expandStateChanged.add($.proxy(this._onStateChanged, this));

		return this;
	};
	$.extend(ArticleClass.prototype, {
		_onStateChanged: function(isExpanded) {
			var _search = this._search, $rail = this._$rail;
			if (isExpanded) {
				$rail.css('display', 'none');
				document.body.className += ' oasis-one-column';
				if (_search) this._header.appendChild(_search);
				// Grid layout uses CSS classes which make this a pain in the ass
				this._$content.removeClass('grid-4').addClass('grid-6');
			} else {
				if (_search) $rail.prepend(_search);
				$(document.body).removeClass('oasis-one-column');
				$rail.css('display', ''); // This ensures that CSS display none is honored
				this._$content.removeClass('grid-6').addClass('grid-4');
			}
		}
	});


	// Class for handling Edit pages.
	// Replaces Wikia's expand/contract feature in source mode and adds the ability
	// to hide the rail to the visual editor. This functionality replaces Wikia's
	// entirely, this is helpful because Wikia's expander phones home with AJAX
	// everytime you use it which causes unnecessary lag.
	// ASSUMPTION: Editor is not in wide page mode (wgEditPageIsWidePage != true)
	//
	// NOTES:
	// Toolbars are controlled by WikiaEditor.plugins.toolbarspaces, point of action
	// is "renderToolbars()". Data is sourced from config.toolbars which is a map of
	// "spaces" as per WikiaEditor.plugins.spaces, points of interest are are "toolbar"
	// and "rail" which contain modules from the module directory. There is no way to
	// purge toolbars but we don't really need to: just wipe out config.toolbars and
	// replace it with { toolbar: ['ToolbarWidescreen'] } then call renderToolbars()
	// to add the widescreen toolbar. >>>>We can then acquire the toolbar using
	// modules.ToolbarWidescreen.element which is a jQuery we can just wack with
	// .hide()/.show() when switching back and forth between wide and not-wide mode.<<<<
	// !!Module provides .show/.hide on the base class. Just wack the class itself instead.!!
	//
	// CAUTION: renderToolbars resets the .toolbars member which means that the existing
	//	toolbars are lost which is very bad (especially since we may want the .rail member
	//	of that later), have to capture that property before rendering then manual
	//	merge new and old.
	//
	// Editor comes from (x = WikiaEditor.getInstance())
	// x.config.toolbars, x.plugins
	// <<
	// Scratch that: The logic block is ugly as hell. We can do better by reimplementing
	// the renderChildren function:
	// toolbarspaces.toolbars.toolbar.module.modules.push(x = editorInst.modules.create('ToolbarWidescreen')); // May fail
	// toolbarspaces.toolbars.toolbar.module.moduleEls.push(y = x.render()); // x may fail
	// z = toolbarspaces.toolbars.toolbar.module.afterRenderChild('ToolbarWidescreen', x, y);
	// toolbarspaces.toolbars.toolbar.module.childEls.push(z);
	// toolbarspaces.toolbars.toolbar.module.el.append(z);
	// The x object can be used to .show/.hide, the y object can be used to query for the
	// categories module as a descendant of it.
	//
	// Key problem: Categories module refuses to duplicate, it MOVES from rail to
	// wide toolbar which is a problem, I'm not sure how to put it back in the rail
	// yet. I can manually dance it around with jQuery which works fine although,
	// since it's obviously self-aware, I should make it dance itself.
	// $('.cke_panel_dropdown .module.module_categories > .module_content').contents().appendTo(
	//   $('#EditPageRail .module.module_categories > .module_content')
	// );
	// The categories module has a #id which is what is causing the jump glitch. This
	// is not good as it'll probably cause double categories on saving. We may have to
	// strip the categories module from the wide toolbar then shift the category module
	// back and forth manually. This is another problem since we won't have the dropdown
	// panel if I do that; need to monkey patch the categories module so that it loads
	// but does not do anything important then do manual switching between real and fake
	// so that we only have one "real" instance that receives the saving event.
	// <<
	// Scratch that. Turns out #csMainModule is actually the same thing as the category
	// editor on article pages. It's referring to a global node/object pair window.cs*,
	// this is disgusting but it's simple enough: window.csType="module" followed by
	// window.initCatSelectForEdit(). This solves this problem nicely, we can just jQuery
	// the #csMainModule around freely without side-effects.
	//
	// Misc: x.plugins.autoresizer needs to have its rightrail property unset to avoid
	// screwing up when in wide mode [it'll keep trying to make the rail taller to match
	// the page height]. This needs to be reset, either by calling initDom
	// or manually when switching back to Rail mode. Makes sure to clear the height
	// style as well.
	// ----: Figure out what is responsible for .rail-auto-height
	//	> railminimumheight. Just hit it with display:none
	//
	// Architecture:
	// Plugin installed manually via initPlugin (CAUTION: Editor may not be ready,
	// where getInstance() returns null; TODO: Look for more events or just edit
	// wikiacore to depend on us and avoid the issue; check config.isMiniEditor is
	// false for thouroughness).
	// Plugin will need to depend on toolbarspaces and autoresizer.
	//
	// On init do the required manip [get categories .parent() for rail restore first],
	// then find the toolbar by digging in the .toolbars prop and call the module's hide().
	// Once the toolbar is ready, use jQuery to shift
	// the categories module back to the rail. [remember the .parent() as well]
	//
	// When widemode happens, shift categories to main toolbar, call .show on it,
	// poke the autoresizer to remove its rightrail property (set "false") then
	// remove the .style.height from the rail (can use the rightrail prop to do this).
	// Hide the rail-auto-height with display:none.
	// We need to partially reimplement mainpagewidemode which isn't hard since it
	// only calculates a min-height like we're already doing anyway.
	//
	// When switching back to normal, .hide the toolbar, shift the categories back,
	// clear the min-height style from the toolbar space, show the rail-auto-height,
	// call autoresizer.initDom().
	//
	// CAUTION: editpage-visualwidemode is mutex with sourcewidemode, make sure you strip
	//	those styles out to avoid glitches.
	//
	// Editor plugin will expose .wide() function as a getter/setter that toggles
	// this processing. EditClass will just attach the plugin and try to init it.
	//
	// TODO: // this.editor.initialized === true means we have to call initDom manually as all
			// events were already fired
	//
	if (typeof($.createClass) === 'function' && window.WikiaEditor) {
		EditPlugin = $.createClass(window.WikiaEditor.plugin, {
			// Dependencies
			// TODO: Drop the dep on sourcewidemode and test conditionally
			requires: ['spaces', 'toolbarspaces', 'autoresizer', 'sourcewidemode', 'ui'],
			
			// Don't ask, Firefox fails to execute $.createClass correctly, apparently
			// ({}).constructor !== Object.prototype.constructor even though it does.
			// Setting constructor to false bypasses the miscompilation/execution crap
			// and forces $.createClass to work.
			constructor: false,
			
			_initialised: false,
			_isWide: false,
			_wideCategories: $(),
			_railCategories: $(),
			
			// beforeInit
			init: function() {
				if (this.editor.ui.uiReadyFired) {
					return this._doInit();
				}
				var self = this;
				this.editor.on('uiReady', function callback() {
					self.editor.off('uiReady', callback);
					self._doInit();
				});
			},
			// initEditor
			// initDom
			// afterShow
			
			_doInit: function() {
				var editor = this.editor;
				// TODO: Better error handling
				
				// Disable self for mini-editors
				// NOTE: There should never be mini-editors on the Edit page.
				if (editor.config.isMiniEditor || this._initialised) {
					logger.log('Init Abort:', editor.config.isMiniEditor ? 'MiniEditor' : 'Double Init');
					return;
				}
				
				// Step 1: Find the categories module (should be somewhere in the Rail)
				// It will be moved into the toolbar during toolbar creation as it is
				// a global singleton. We need to be able to put it back in the rail.
				// NOTE: #csMainContainer is the node as defined in Wikia's code
				var rail = this._rail = editor.getSpace('rail');
				if (!rail) {
					logger.log('EditPlugin', 'No Rail?');
					return;
				}
				
				// Step 2: Create the widemode toolbar
				// Wikia's code is a mess, it is oddly complicated and can't be contorted
				// to create new toolbars without resetting the entire state so we'll poke
				// at the internals manually.
				// NOTE: toolbar is an instance of WikiaEditor.modules.Container
				var toolbar = editor.plugins.toolbarspaces.toolbars.toolbar.module,
				    name = 'ToolbarWidescreen',
				    wideToolbar = editor.modules.create(name),
				    wideToolbarEl = wideToolbar.render();
				// TODO: Error handling
				toolbar.modules[name] = wideToolbar;
				toolbar.moduleEls[name] = wideToolbarEl;
				var child = toolbar.afterRenderChild(name, wideToolbar, wideToolbarEl);
				toolbar.el.append(child);
				wideToolbar.afterAttach(); // 2nd stage processing
				wideToolbar.hide();
				this._wideToolbar = wideToolbar;
				
				// Step 3: Clean up the Wikia source expander which we are replacing
				// We need to get rid of the CSS classes (conflict) and remove the trigger
				// since it doesn't play nice is visualwidemode.
				var sourcewidemode = editor.plugins.sourcewidemode;
				sourcewidemode.trigger.off('click').css('display', 'none');
				editor.element.removeClass(
					sourcewidemode.className
					+ ' ' + sourcewidemode.wideClassName
					+ ' ' + sourcewidemode.narrowClassName
				);
				this.storageKey = sourcewidemode.storageEntry;
				
				// Step 4: Grab the autoresizer since we need to alter its configuration
				// whenever we switch.
				this._resizer = editor.plugins.autoresizer;
				
				// Now we're done. We just need to wait for the edit class to direct
				// us to expand or shrink
				this._initialised = true;
				EditPlugin.ready.fire(this);
			},
			wide: function(toWide) {
				// Getter
				if (toWide === void 0) {
					return this._isWide;
				}
				toWide = !!toWide;
				// Same, do nothing
				if (toWide === this._isWide) return;
				if (!this._initialised) {
					logger.wrn('EditPlugin', 'Attempted to change wide mode before initialised');
					return;
				}
				
				var $cats = $('#CategorySelect');
				if (toWide) {
					this._wideToolbar.show();
					if (!$cats.parent().is(this._wideCategories)) {
						this._railCategories = $cats.parent();
						this._wideCategories.append($cats);
					}
					this._rail.css('height', '')
						.find('.rail-auto-height').css('display', 'none');
					this._resizer.rightrail = false;
					this.editor.element.addClass('editpage-visualwidemode');
					// TODO: toolbar should be fetched in init and checked for fail
					// TODO: This is too simple, need to handle content-box calc
					//	(innerHeight() - height()) = padding; rail.outerHeight - padding = minHeight
					this.editor.getSpace('toolbar').css('minHeight', this._rail.outerHeight() + 'px');
					// NOTE: Copied from sourcewidemode, supposedly fixes a problem with IE
					if (this.editor.ck) this.editor.ck.fire('resize');
					// Get the resizer to fix the textbox height
					this._resizer.resize();
					// HACK: Transitions screw us here, we have to listen for the transition to end
					//	and fire the resize event, otherwise the editor will be left with a large
					//	whitespace area at the bottom
					// NOTE: Problem is caused by wide toolbar pushing down the content during transition,
					//	that happens because of the 300px right padding and the fact that it starts 300px
					//	from the right edge at the start of the transition (=600px from right edge, 66%).
					// TODO: This should be registered in the init instead, that's important because
					//	browsers without transitions or with transitions disabled will pile up more
					//	and more copies of this event handler since it never gets triggered
					$('#EditPageMain').on('transitionend.HACKHACKHACK', function() {
						$(this).off('.HACKHACKHACK');
						$(window).resize();
					});
				} else {
					this._wideToolbar.hide();
					// Migration happens the first time the toolbar drop down is expanded by the
					// user. We need to notice that and take notes on where it ended up.
					if (!$cats.parent().is(this._railCategories)) {
						this._wideCategories = $cats.parent();
						this._railCategories.append($cats);
					}
					this.editor.getSpace('toolbar').css('minHeight', '');
					this.editor.element.removeClass('editpage-visualwidemode');
					this._rail.find('.rail-auto-height').css('display', '');
					if (this.editor.ck) this.editor.ck.fire('resize');
					this._resizer.initDom();
				}
				$(window).resize();
				
				this._isWide = toWide;
			}
		});
		EditPlugin.ready = $.Callbacks('memory once');
	}
	EditClass = function(buttonObj, storeObj) {		
		if (!EditPlugin) throw new Error('No EditPlugin?');
		
		this._store = storeObj;
		this._button = buttonObj;
		
		// Wait for the plugin to become ready before proceeding
		EditPlugin.ready.add($.proxy(this._onPluginReady, this));
		
		// Install plugin
		var WE = window.WikiaEditor, plugName = 'HideRailEditorIntegration';
		logger.log('EditClass', 'Starting');
		window.GlobalTriggers.on('wikiaeditoraddons', function callback() {
			logger.log('EditClass', 'Addon Event Fired');
			window.GlobalTriggers.off('wikiaeditoraddons', callback);
			WE.plugins[plugName] = EditPlugin;
			WE.plugins.wikiacore.prototype.requires.push(plugName); // Register as required always
			
			// If the editor is already started then we need to do this the hard way
			// wpTextbox1 is the name of the primary Editor textbox for an article, so we
			// don't try to connect to a mini-editor or whatever.
			var WEI = WE.getInstance('wpTextbox1');
			if (WEI) {
				var plug = WEI.initPlugin(plugName);
				logger.log('EditClass', 'Instance exists, initialised:', WEI.initialized, 'State:', WEI.state);
				if (WEI.initialized) {
					plug.init();
				}
			}
		});

		return this;
	};
	$.extend(EditClass.prototype, {
		// Second stage init when the editor has come up
		_onPluginReady: function(plugin) {
			this._plugin = plugin;
			logger.log('EditClass', 'Plugin Ready');
			
			// We need to decide the initial editor mode (Flush first, to align with default)
			// Flushing is required since it glitches with the Rail hidden state
			this._button.updateExpandButton(false, false);
			this._button.updateExpandButton(this._isExpanded = !!jStorage.get(plugin.storageKey), true);
			
			// Register the event handlers (Remember: Fires immediately via memory)
			this._button.expandStateChanged.add($.proxy(this._onStateChanged, this));
			this._store.storageChanged.add($.proxy(this._onStorageChanged, this));
		},
		_onStateChanged: function(aIsExpanded, aByEvent) {
			logger.log('EditPlugin', "Expand:", aIsExpanded, "Event:", aByEvent);
			if (!aByEvent) {
				// If it was a programmatic change then revert it
				// CAUTION: This is an implicit recursion
				return this._button.updateExpandButton(this._isExpanded);
			}
			this._plugin.wide((this._isExpanded = aIsExpanded));
			jStorage.set(this._plugin.storageKey, aIsExpanded);
		},
		// We have our own local storage so we don't want to bother with the script's
		_onStorageChanged: function(evt) {
			if (evt.key !== this._plugin.storageKey) return;
			this._button.updateExpandButton(jStorage.get(this._plugin.storageKey), true);
		},
		// Internal storage, do not remember or set us
		hasOwnMemory: true
	});



	//
	// **************************************************************************
	// OasisWideMode
	// Rebuilds the document stylesheets to be wide if possible
	//
	OasisWideMode = function(buttonObj) {
		this._button = buttonObj;
		buttonObj.wideStateChanged.add($.proxy(this._onWideChanged, this));
		return this;
	};
	$.extend(OasisWideMode.prototype, {
		_onWideChanged: function(aIsWide) {
			// In the event of additional sheets added by AJAX or something
			this.SheetManager.processSASS(this.SheetManager.activeValue);
			// Toggle state
			$('#WikiaPage')[aIsWide ? 'addClass' : 'removeClass']('hiderail-wide-grid');
			this.SheetManager[aIsWide ? 'applySheets' : 'removeSheets']();
		}
	});

	//
	// Stylesheet Manager Singleton
	//
	OasisWideMode.prototype.SheetManager = {
		// HD is a reference to old name, was changed to 'widthType'
		_regexGetHD: /^(.*?\/sass\/(?:[^\/]+?%26)?widthType%3[dD])(\d+)([^\/]*\/.*)$/,
		sheets: [],
		applied: false,

		// Add/Change the 'widthType' SASS parameter
		// Values:
		// 0/Out-of-Range = Old (1000px)
		// 1 = WOWWiki (1200px)
		// 2 = Auto-width/Fluid (100%) [glitchy]
		// 3 = Wikia Grid Layout (1030px)
		//
		// Algorithm Note:
		// Altering the existing link node causes the page to unstyle and restyle.
		// As such, we add new nodes immediately after the existing ones which
		// causes the cascade to override properly without causing a FOUC.
		_buildSheets: function($links, value) {
			var linktag, text, match, newlink, links = [],
			    i = $links.length,
			    regexNoHD = /^(.*?\/sass\/)(.*)/,
			    regexGetHD = this._regexGetHD,
			    head = document.getElementsByTagName('head')[0];
			while (i--) {
				linktag = $links[i];
				text = linktag.href;
				match = regexGetHD.exec(text);
				if (match) {	// Param already exists?
					text = match[1] + value + match[3];
				} else {
					// We must add the HD parameter before the wordmark-font part
					// everything after that is interpreted as a file path.
					match = regexNoHD.exec(text);
					if (match) {
						text = match[1]
						     + 'widthType%3D' + value + '%26'
						     + match[2]
						     ;
					}
				}
				if (!match) continue;

				newlink = linktag.cloneNode();
				newlink.href = text;
				newlink.removeAttribute('id');
				links[links.length] = {
					wide: newlink,
					old: linktag
				};
				// Try to prevent FOUC by forcing loading/parsing to start now
				// We use insertBefore because Chrome will cascade the sheet IMMEDIATELY
				// then uncascade it which triggers transitions. Inserting the CSS at the
				// start of the head ensures the cascade has no effect.
				head.insertBefore(newlink, head.firstChild);
				head.removeChild(newlink);
			}
			return links;
		},
		processSASS: function(value) {
			var $links = $('link[href*="/sass/"][rel*="stylesheet"]');
			if (!$links.length) throw new Error('No SASS Sheets?');

			// Only need to do this once. It won't change once the page is loaded.
			if (this.originalValue === void 0) {
				var defaultHD = this._regexGetHD.exec($links.prop('href'));
				if (defaultHD) { // HD is already being used
					defaultHD = +defaultHD[2];
				} else { // HD is not being used
					defaultHD = 0;
				}
				this.originalValue = defaultHD;
			}
			var applied = this.applied;
			if (value !== this.activeValue) {
				this.activeValue = value;
				this.removeSheets();
				this.sheets = [];
			}

			var oldsheets = this.sheets;
			$links = $links.filter(function() { // Set complement, only new sheets (if any)
				var i = oldsheets.length;
				while (i--) { // Since our sheets are applied, don't match ourself
					if (oldsheets[i].old  === this || oldsheets[i].wide === this) return false;
				}
				return true;
			});

			this.sheets = oldsheets.concat(this._buildSheets($links, value));

			// Apply the new sheets, existing ones will just be reinserted in the same spot
			if (applied) this.applySheets();

			return this.originalValue;
		},

		applySheets: function() {
			var sheets = this.sheets, i = sheets.length, link, oldlink;
			while (i--) {
				link = sheets[i];
				oldlink = link.old;
				if (!oldlink.parentNode) {
					// <LINK> has been detached somehow. Throw it away.
					logger.info('SheetManager', 'Sheet lost:', oldlink.href);
					sheets.splice(i, 1);
					continue;
				}
				oldlink.parentNode.insertBefore(link.wide, oldlink.nextSibling);
			}
			this.applied = true;
			// Get Wikia JS to fix Editor
			// Since we're persisting the links, we can just do this right now since
			// there won't be a loading delay the 2nd+ time
			$(window).resize();
		},
		removeSheets: function() {
			var sheets = this.sheets, i = sheets.length, link;
			while (i--) {
				link = sheets[i].wide;
				if (!link.parentNode) continue;
				link.parentNode.removeChild(link);
			}
			this.applied = false;
			// No need to wait here. Styles should kick in immediately (removal)
			$(window).resize();
		}
	};

	//
	// Storage Management Object
	// This exists to contain all this crap in one place.
	//
	StorageManager = function() {
		this.storageChanged = $.Callbacks();
		return this;
	};
	$.extend(StorageManager.prototype, {
		expanded: 'HideRailJS_Expanded',
		widened: 'HideRailJS_Widened',

		// Functions to attach memory event catchers
		// So we can store the state to local storage
		attachForStateMemory: function(buttonObj, noSave) {
			if (this._buttonObj) throw new Error('Already attached');
			this._buttonObj = buttonObj;
			this._callbacks = [
				this._makeSaveHandler(this.expanded, 'defaultExpand'),
				this._makeSaveHandler(this.widened, 'defaultWideMode'),
				$.proxy(this._onStorage, this)
			];
			logger.log('StorageManager', 'noSave:', noSave);
			if (!noSave) {
				buttonObj.expandStateChanged.add(this._callbacks[0]);
			}
			this._noSave = noSave;
			buttonObj.wideStateChanged.add(this._callbacks[1]);

			// Try to catch storage change events so we can keep tabs
			// consistent with each other
			if (settings.syncTabs) {
				$(window).on('storage', this._callbacks[2]);
			}
			return this;
		},
		detachStateMemory: function() {
			$(window).off('storage', this._callbacks[2]);
			this._buttonObj.expandStateChanged.remove(this._callbacks[0]);
			this._buttonObj.wideStateChanged.remove(this._callbacks[1]);
			delete this._callbacks;
			delete this._buttonObj;
			return this;
		},

		// When localstorage is changed by a different tab, this event fires
		// NOTE: Some browsers are buggy and fire in same tab as well so beware the
		//	recursion devil.
		_onStorage: function(evt) {
			// evt has .newValue and .oldValue but it's the raw JSON string, plus we
			// we have to deal with the default or not-default algorithm
			switch (evt.originalEvent.key) {
			case this.expanded:
				if (this._noSave) break;
				this._buttonObj.updateExpandButton(this.getIsExpanded());
				break;

			case this.widened:
				this._buttonObj.updateWideButton(this.getIsWide());
				break;

			default:
				this.storageChanged.fire(evt.originalEvent);
			}
		},

		_makeSaveHandler: function(key, defaultKey) {
			return function(aIsWide) {
				jStorage[aIsWide !== settings[defaultKey] ? 'set' : 'del'](key, aIsWide);
			};
		},

		getIsWide: function() {
			return getBooleanStorageWithDefault(this.widened, settings.defaultWideMode);
		},
		getIsExpanded: function() {
			return getBooleanStorageWithDefault(this.expanded, settings.defaultExpand);
		}
	});

	// OASISWIDEMODE START
	// We need to start doing the Wide mode work ASAP to avoid weirdness as much as possible.
	// We don't want the UI to pop wider only after the DOM is fully displayed...
	// "hiderail-transitions-on" prevents the page from widening when the wide sheets load,
	// otherwise EVERY page will slowly transition wide when it loads which sucks. We add
	// the enable switch class on "onload" so that won't happen.
	if (settings.wideMode) (function(man) {
		/*jshint bitwise:false */
		var mode = Math.max(Math.min(settings.wideMode | 0, 3), 1)
		  , Oasis = OasisWideMode
		  ;
		OasisWideMode = null; // Clear so that it stays null on an error
		// (Hopefully enough of the DOM is loaded that Oasis.scss is accessible,
		// this assumption SHOULD hold as global.js and global.css should come after Oasis)
		try {
			if (man.processSASS(mode) === mode) {
				return logger.log('OasisWideMode', 'Page is already wide. [Disabled]');
			}
			if (man.sheets.length === 0) {
				return logger.err('OasisWideMode', 'Internal error, incompatible SASS paths');
			}
		} catch(e) {
			return logger.err('OasisWideMode', 'Crash:', e, e.stack || e.stacktrace);
		}

		if (new StorageManager().getIsWide()) {
			// Apply the wide sheets right now before the page begins to load fully
			man.applySheets();

			// Requery after DOM Ready to catch any added sheets
			$($.proxy(man.processSASS, man, mode));
			// Try waiting for the document's load event to refresh the editor and toolbar
			// position (once the CSS has all loaded)
			$(window).on('load.OasisWideMode', function() {
				$(window).off('load.OasisWideMode').resize();
				man.processSASS(mode);
				// This is a pain, the transitions will enable instantly which means the
				// page will still transition unless all the stylesheets are completely
				// done. Firefox at least seems to lag on this with onload firing whilst
				// the last bit of processing is still pending, so we need to delay until
				// Fx gets its crap together.
				window.setTimeout(function() {
					$(document.body).addClass('hiderail-transitions-on');
				}, 500);
			});
		} else {
			$(document.body).addClass('hiderail-transitions-on');
		}

		// Put it back if we got here without an error
		OasisWideMode = Oasis;
	})(OasisWideMode.prototype.SheetManager); else {
		$(document.body).addClass('hiderail-transitions-on');
	}


	//
	// Instantiate the appropriate class (if any) and clean everything else up
	// once the DOM becomes available.
	//
	$(function(/*$*/) {
		try {
			var storeObj = new StorageManager()
			  , buttonObj = new ExpandButtons(storeObj.getIsExpanded(), storeObj.getIsWide())
			  , pageObj
			  , oasisObj
			  ;

			try {
				// Message Walls claim to be edit pages but aren't (Wut?). Fortunately,
				// we can catch them just by checking for oasis-one-column since REAL
				// edit pages have that, Message Walls don't.
				if (!/\boasis-one-column\b/.test(document.body.className)) {
					logger.inf(0, 'Article Page');
					pageObj = new ArticleClass(buttonObj);
				} else if (({edit:1,editredlink:1,submit:1})[mw.config.get('wgAction')] === 1) {
					// Some Edit pages are wider than normal like for the main page. We
					// don't do anything on those pages.
					if (settings.wideVisualEditor && !mw.config.get('wgEditPageIsWidePage')) {
						logger.inf(0, 'Edit Page');
						pageObj = new EditClass(buttonObj, storeObj);
					}
				}
			} catch(e) {
				logger.err(0, 'Page Expander failed to initialise', e, e.stack || e.stacktrace);
			}
			// Create the OasisWideMode manager now
			if (OasisWideMode !== null) {
				oasisObj = new OasisWideMode(buttonObj);
			}
			buttonObj.commitInit(oasisObj);
			// If there is no page expander then we'll disable the button entirely since it's useless.
			if (!pageObj) {
				buttonObj.killExpandButton();
			}
			// Attach button to the page
			ArticleClass = EditClass = OasisWideMode = null;
			if (pageObj || oasisObj) {
				storeObj.attachForStateMemory(buttonObj, !pageObj || pageObj.hasOwnMemory);
				buttonObj.attachButton();

				settings.buttonObj = buttonObj;
				settings.pageObj = pageObj;
				settings.oasisObj = oasisObj;
				settings.storeObj = storeObj;
				settings.detachCleanly = function() {
					storeObj.detachStateMemory();
					buttonObj.detachButton();
					// Remove wide stylesheets from OasisWideMode
					buttonObj
						.updateWideButton(false, true)
						.destroyButton()
						;
				};
			} else if (settings.debug) {
				logger.inf(0, 'Nothing to do here');
			}
		} catch(e) {
			logger.err(0, 'Initialisation failed:', e, e.stack || e.stacktrace);
		}
	});
})(window, jQuery, mediaWiki);