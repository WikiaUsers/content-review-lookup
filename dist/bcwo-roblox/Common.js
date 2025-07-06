/* Any JavaScript here will be loaded for all users on every page load. */
mw.loader.getScript('https://bcwo-roblox.fandom.com/index.php?title=MediaWiki:Calculator.js&action=raw&ctype=text/javascript');

(function($) {
	importArticle({
		type: 'style',
		article: 'u:dev:MediaWiki:BalancedTabber.css'
	});

	$(function() {
		$('.tabs').on('click', 'ul.tabs__caption li:not(.active)', function() {
			const $tab = $(this),
			      $container = $tab.closest('.tabs'),
			      target = $tab.data('tabtarget');

			$tab.addClass('active').siblings().removeClass('active');
			$container.find('.tabs__content').removeClass('active');
			$container.find(`.tabs__content[data-tabtarget="${target}"]`).addClass('active');
		});
	});
})(jQuery);