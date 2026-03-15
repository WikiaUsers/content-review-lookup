/**
 * @name            AddRightSideTool
 * @author          [[User:ClodaghelmC]]
 * @description     Integrates tools into the right rail
 */
 
(function (window, $, mw) {
	'use strict';

	window.dev = window.dev || {};
	if (window.dev.addRightSideTool) return;

	var addRightSideTool = function (options) {
		var $rightRail = $('.page-side-tools__right');
		
		/**
		 * Standardize the legacy toggle
		 */
		var fixToggle = function () {
			var $toggle = $('.right-rail-toggle');
			if ($toggle.length && !$toggle.hasClass('page-side-tool')) {
				$toggle.addClass('page-side-tool')
					.attr('data-wds-tooltip-position', 'left')
					.removeAttr('style');
			}
		};
		
		// Polling . . if rail isn't ready, retry in 500ms
		if (!$rightRail.length) {
			setTimeout(function () {
				addRightSideTool(options);
			}, 500);
			return;
		}
		
		fixToggle();
		
		// Exit if no new tool to create or if it already exists
		if (!options || !options.id || $('.' + options.id).length) return;
		
		// Create the tool element
		var $tool = $('<a>', {
			'class': 'page-side-tool ' + options.id,
			'href': options.href || '#',
			'style': 'position: relative;'
		}).append(
			$('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-' + options.icon + '"></use></svg>')
		);
		
		// Create the tooltip element
		var $tooltip = $('<div>', {
			'class': 'wds-tooltip is-left',
			'text': options.tooltipText
		});
		
		$tool.append($tooltip)
			.on('mouseenter', function () { $tooltip.show(); })
			.on('mouseleave', function () { $tooltip.hide(); });
			
		$rightRail.append($tool);
	};
	
	window.dev.addRightSideTool = addRightSideTool;
	
	mw.loader.using(['mediawiki.util']).then(function () {
		importArticle({
			type: 'style',
			article: 'u:clodaghelm:MediaWiki:AddRightSideTool.css'
		});
		
		// Immediate run to catch the toggle
		addRightSideTool();
	});
	
}(this, jQuery, mediaWiki));