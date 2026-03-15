/**
 * @name            BalancedContentReview
 * @author          [[User:ClodaghelmC]]
 * @description     Clean UI for JS management
 */
 
(function(window, $, mw) {
	'use strict';
	
	if (window.balancedContentReviewLoaded) return;
	window.balancedContentReviewLoaded = true;
	
	var init = function() {
		var $title = $('.content-review__widget h2'),
			$table = $('.content-review__table'),
			$oldHelp = $('.content-review__widget__help'),
			conf = mw.config.get([
				'wgNamespaceNumber',
				'wgTitle',
				'wgPageName'
			]);
			
		// Class the table on [[Special:JSPages]]
		if ($table.length) {
			$table.addClass('wikitable');
		}
		
		if ($title.length && !$title.find('.wds-icon').length) {
			$title.prepend('<svg class="wds-icon wds-icon-small" style="margin-right: 6px; opacity: 0.75; vertical-align: middle;"><use xlink:href="#wds-icons-review-requests"></use></svg>');
		}
		
		/**
		 * [[MediaWiki:AddRightSideTool]]
		 * Check if the utility is available. If not, wait.
		 */
		if (window.dev && window.dev.addRightSideTool) {
			// Always trigger to ensure the rail toggle is standardized
			window.dev.addRightSideTool();
			
			// Only inject tools if the help link is found
			if ($oldHelp.length || isJSPage) {
				if ($oldHelp.length) $oldHelp.remove();
				
				var tools = [
					{
						id: 'bcr-tool-jspages',
						icon: 'preformat-small',
						text: 'JavaScript pages',
						link: 'Special:JSPages'
					},
					{
						id: 'bcr-tool-importjs',
						icon: 'gear-small',
						text: 'ImportJS',
						link: 'MediaWiki:ImportJS'
					},
					{
						id: 'bcr-tool-help',
						icon: 'question-small',
						text: 'Help',
						href: 'https://community.fandom.com/wiki/Help:CSS_and_JS_customization'
					}
				];
				
				tools.forEach(function(tool) {
					window.dev.addRightSideTool({
						id: tool.id,
						icon: tool.icon,
						tooltipText: tool.text,
						href: tool.href || mw.util.getUrl(tool.link)
					});
				});
			}
		} else {
			// If utility isn't loaded yet, retry in 2s
			setTimeout(init, 200);
		}
	};
	
	mw.loader.using(['mediawiki.util']).then(function() {
		importArticle({
			type: 'style',
			article: 'u:clodaghelm:MediaWiki:BalancedContentReview.css'
		});
		
		// Initialize on content load and rail ready
		mw.hook('wikipage.content').add(init);
		mw.hook('wikia.rail.ready').add(init);
		
		// Safety execution
		init();
	});

}(this, jQuery, mediaWiki));