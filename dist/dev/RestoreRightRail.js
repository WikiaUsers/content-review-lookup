// <pre>
/**
 * Restore Right Rail for pages that do not have a right rail.
 * Mostly using code by Fandom (because DRY),
 * with tweaks to make it work on "any page" (even the Main Page).
 */
$(function () {
	'use strict';
	if ($('.page.has-right-rail').length) return;

	// @TODO: Add config to not restore rail on pages, such as main page.
	// Counter argument: They can just collapse the rail.
	// Counter-counter: There's a small width taken up by the collapsed rail.

	// lazy JS modules
	var PreferencesHelper, // for remembering toggle preference.
		tooltips, // for toggle "show"/"hide" tooltip.
		ofType, // some "[Rail] Ready" thingy, not really sure if needed.
		sponsoredContent, // for popular pages, aka "sponsored content".
		mustache, // also for popular pages.
		vignette, // also for popular pages.

		// won't change without reloading page so we can cache if user is anon.
		isAnon = mw.user.isAnon();

	// First ensure the aside element exists.
	function init() {
		var isVisible = mw.user.options.get('rightrailvisible') === 'visible';

		$('main.page__main').after(
			$('<aside>', {
				'class': 'page__right-rail'
			}).toggleClass('is-rail-hidden', !isVisible).append([
				$('<button>', {
					'class': 'right-rail-toggle',
					'data-wds-tooltip': mw.msg(isVisible ? 'hide' : 'show'),
					'data-wds-tooltip-position': 'bottom'
				}).append(
					$('<svg class="wds-icon wds-icon-tiny"><use xlink:href="#wds-icons-menu-control-tiny"></use></svg>')
				),
				$('<div>', {
					'class': 'right-rail-wrapper WikiaRail'
				}).append([
					$('<div>', { id: 'rail-boxad-wrapper' }),
					$('<div>', { id: 'WikiaRail' })
				])
			])
		).parent().addClass('has-right-rail');
		cmRefresh();
	}

	// Re-implemented for the following reason(s):
	// 1. mw.config.get('wgRailModuleList') is null on pages without a rail.
	// 2. Doesn't feel right to track custom rail.
	// @See https://community.fandom.com/load.php?debug=false&lang=en&modules=skin.fandomdesktop.rail.lazyRail.js&skin=fandomdesktop
	function addLazyRail() {
		if ($('#p-tb').length) return;
		var sponsoredItemTemplate = '<a href="{{url}}" title="{{title}}" class="sponsored-content" data-tracking-label="sponsored-content">\n\t<img src="{{thumbnailUrl}}" alt="{{title}}">\n\t<div class="sponsored-content__details">\n\t\t<div class="sponsored-content__title">{{title}}</div>\n\t\t{{#attribution}}\n\t\t\t<span class="sponsored-content__attribution">{{attributionLabel}} {{attribution}}</span>\n\t\t{{/attribution}}\n\t</div>\n</a>\n',
			RIGHT_RAIL_SELECTOR = '.right-rail-wrapper',
			SPONSORED_ITEM_THUMBNAIL_SIZE = 53;

		function loadRail() {
			var def = $.Deferred(),
				searchParams = new URLSearchParams(window.location.search);
			$.get(mw.util.wikiScript('wikia'), {
				'controller': 'Fandom\\FandomDesktop\\Rail\\RailController',
				'method': isAnon ? 'renderLazyContentsAnon' : 'renderLazyContents',
				// 'modules': mw.config.get('wgRailModuleList'),
				'modules': isAnon ? [
					'Fandom\\FandomDesktop\\Rail\\PopularPagesModuleService'
				] : [
					'Fandom\\FandomDesktop\\Rail\\PageToolsModuleService',
					'Fandom\\FandomDesktop\\Rail\\RecentActivityModuleService'
				],
				'params': mw.config.get('wgRailModuleParams'),
				'fdRightRail': searchParams.get('fdRightRail'),
				'uselang': searchParams.get('uselang'),
				'useskin': 'fandomdesktop'
			}).done(function (rail) {
				rail = $(rail);
				// Populate rail page tools with hidden page tools.
				var hiddenPageTools = $('ul.page__hidden-page-tools'),
					railPageTools = $('#p-tb > ul', rail);
				railPageTools.append(hiddenPageTools.children());
				def.resolve(rail);
			});
			return def.promise();
		}

		// Sponsored Content (Popular Pages) only applies to anons...
		// ...yet Fandom doesn't have this simple check...
		// ...instead `renderSponsoredContent` determines whether it's added...
		// ...so a network request is always sent...
		// ...even if it's ~714 bytes per page load...
		// ...surely that adds up in the long run...?
		function loadSponsored() {
			return isAnon ? sponsoredContent.fetch() : Promise.resolve(false);
		}

		function renderSponsoredContent(e) {
			var t = $('.popular-pages__item', RIGHT_RAIL_SELECTOR);
			if (t.length) {
				if (e.thumbnailUrl && vignette.Vignette) {
					e.thumbnailUrl = vignette.Vignette.getThumbURL(e.thumbnailUrl, {
						mode: vignette.Vignette.mode.smart,
						height: SPONSORED_ITEM_THUMBNAIL_SIZE,
						width: SPONSORED_ITEM_THUMBNAIL_SIZE
					});
				}
				t.html(mustache.mustache.render(sponsoredItemTemplate, e));
				// if (e.pixelContent) {
				// 	sponsoredContent.insertTrackingPixel(e.pixelContent, e.pixelType);
				// }
				// trackSponsoredContent(e.url);
			}
		}

		$(function () {
			$.when(loadRail(), loadSponsored()).done(function (rail, sponsored) {
				$(RIGHT_RAIL_SELECTOR).append(rail);
				// ...What is this dispatch actually for...?
				ofType.communicationService.dispatch({
					type: '[Rail] Ready'
				});
				if (sponsored) {
					renderSponsoredContent(sponsored);
				}
				// trackLazyRail();
				$('#WikiaRail').addClass('is-ready').trigger('afterLoad.rail');
			});
		});
	}

	// Re-implemented for the following reason(s):
	// 1. Doesn't feel right to track custom rail.
	// @See https://community.fandom.com/load.php?debug=false&lang=en&modules=skin.fandomdesktop.rail.toggle.js&skin=fandomdesktop
	function addToggle() {
		var HIDDEN_CLASS = 'is-rail-hidden',
			RAIL_OPTION_NAME = 'rightrailvisible',
			RAIL_VISIBLE = 'visible',
			RAIL_HIDDEN = 'hidden';

		function setRightRailPreference(isVisible) {
			PreferencesHelper.setPreference(RAIL_OPTION_NAME, isVisible ? RAIL_HIDDEN : RAIL_VISIBLE);
		}

		var rightRailToggle = $('.right-rail-toggle'),
			pageRightRail = $('.page__right-rail');
		rightRailToggle.on('click', function () {
			var isVisible = pageRightRail.toggleClass(HIDDEN_CLASS).hasClass(HIDDEN_CLASS);
			pageRightRail.attr('data-wds-tooltip', mw.msg(isVisible ? 'show' : 'hide'));
			setRightRailPreference(isVisible);
			// trackClick(isVisible);

			setTimeout(function () {
				cmRefresh();
				var ev = new Event('FandomDesktopContentSize');
				window.dispatchEvent(ev);
			}, 300);
		});
	}

	// Helper function to bulk import modules with RNG hash suffix in name.
	function loadModules(names) {
		names = names.filter(Boolean);
		var moduleNames = mw.loader.getModuleNames(),
			fullNames = names.map(function (name) {
				return moduleNames.find(function (mod) {
					return mod === name || mod.startsWith(name + '-');
				});
			});
		return mw.loader.using(fullNames).then(function (require) {
			var modules = {};
			for (var i in names) {
				modules[names[i]] = require(fullNames[i]);
			}
			return modules;
		});
	}

	// Helper function to refresh CodeMirror after adding rail.
	// See: https://codemirror.net/5/doc/manual.html#refresh
	function cmRefresh() {
		if (window.CodeMirror) {
			var cm = $('.CodeMirror');
			if (cm.length && cm[0].CodeMirror)
				cm[0].CodeMirror.refresh();
		} else if (window.ace) {
			// handle resizing in Ace editor
			ace.edit($('.ace_editor')[0]).resize();
		}
	}

	loadModules([
		'skin.fandomdesktop.rail.css',
		!isAnon && 'skin.fandomdesktop.rail.recentActivity.css',
		isAnon && 'skin.fandomdesktop.rail.popularPages.css',
		'PreferencesHelper',
		'tooltips',
		'ofType',
		isAnon && 'mustache',
		isAnon && 'vignette',
		isAnon && 'sponsoredContent'
	]).then(function (modules) {
		// Assign modules to variables.
		PreferencesHelper = modules.PreferencesHelper;
		tooltips = modules.tooltips;
		ofType = modules.ofType;
		mustache = modules.mustache;
		vignette = modules.vignette;
		sponsoredContent = modules.sponsoredContent;
		// Begin the rail DOM stuff.
		init();
		addLazyRail(); // 'skin.fandomdesktop.rail.lazyRail.js'
		addToggle(); // 'skin.fandomdesktop.rail.toggle.js'
		tooltips.handleAllElementsWithTooltip();
	});
});
// </pre>