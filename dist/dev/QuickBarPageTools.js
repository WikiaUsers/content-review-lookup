/* 
 * QuickBarPageTools
 * 
 * @description Moves links from the Page Tools rail module on FandomDesktop to a dropdown in the QuickBar
 * @author Joritochip
 * @author Dorumin
 */

$(function() {
	if (
		mw.config.get('skin') !== 'fandomdesktop' || 
		window.QuickBarPageToolsLoaded ||
		!($('#WikiaRail').length)
	) return;
	window.QuickBarPageToolsLoaded = true; 
	
	var bar_toggle = $('<li class="pagetools menu"><svg class="wds-icon wds-icon-tiny arrow-icon"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg><a href="#">Page tools</a></li>').appendTo($('#WikiaBar .tools')),
		bar_list = $('<ul id="page-tools-menu" class="tools-menu"></ul>').appendTo(bar_toggle);
	
	function awaitRail() {
		var rail = $('#WikiaRail');
		
		return new Promise(function(resolve) {
			var observer = new MutationObserver(function() {
				if (rail.hasClass('is-ready')) {
					resolve();
					observer.disconnect();
				}
			});
			observer.observe(rail[0], {
				attributes: true,
				attributeFilter: ['class']
			});
		});
	}
	
	function observeTools() {
		var list = $('#page-tools-module .rail-module__list');
		if (list.length) {
			list.children().appendTo(bar_list);
			
			new MutationObserver(function() {
				list.children().appendTo(bar_list);
			}).observe(list[0], {
				childList: true 
			});
		}
	}
	
	awaitRail().then(observeTools);
	
	mw.util.addCSS('#page-tools-module {display:none}li.pagetools:hover #page-tools-menu {display:block}li.pagetools:hover svg {transform:rotate(180deg)}');
});