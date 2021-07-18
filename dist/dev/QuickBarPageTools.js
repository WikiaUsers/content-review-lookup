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
	
	var bar_toggle = $('<li class="pagetools menu wds-dropdown wds-is-flipped"><span class="wds-dropdown__toggle"><svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg><a id="pagetools-title" href="#">Page tools</a></span></li>').appendTo($('#WikiaBar .tools')).hide(),
		bar_list = $('<ul id="page-tools-menu" class="tools-menu wds-list wds-is-linked"></ul>').appendTo($('<div class="wds-dropdown__content"></div>').appendTo(bar_toggle));
	
	function awaitRail() {
		var rail = $('#WikiaRail');
		if (rail.hasClass('is-ready')) return Promise.resolve();
		
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
	
	function observeTools(ret) {
		var i18n = ret[0],
			list = $('#p-tb .rail-module__list'),
			title = $('.pagetools #pagetools-title');
			
		if (list.length) {
			title.text(i18n.msg('toggle').plain());
			bar_toggle.show();
			
			list.children().appendTo(bar_list);
			
			new MutationObserver(function() {
				list.children().appendTo(bar_list);
			}).observe(list[0], {
				childList: true 
			});
		}
	}
	
	Promise.all([
		new Promise(function(resolve) {
			mw.hook('dev.i18n').add(function(lib) {
				lib.loadMessages('QuickBarPageTools').done(resolve);
			});
		}),
		awaitRail()
	]).then(observeTools);
	
    importArticles({
    	type: 'script',
    	articles: [
    		'u:dev:MediaWiki:I18n-js/code.js'
    	]
    });
	
	mw.util.addCSS('#p-tb {display:none}#WikiaBar #page-tools-menu{width:155px}#WikiaBar #page-tools-menu li,#WikiaBar #page-tools-menu li a{white-space: unset}');
});