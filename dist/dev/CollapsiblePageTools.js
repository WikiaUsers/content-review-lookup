/* 
 * CollapsiblePageTools
 * 
 * @description Collapses the FandomDesktop rail Page Tools module by default and allows them to be uncollapsed
 * @author Joritochip
 */

$(function() {
	if (mw.config.get('skin') !== 'fandomdesktop' || window.CollapsiblePageToolsLoaded) return;
	window.CollapsiblePageToolsLoaded = true; 
	
	var doCollapse = !(window.CollapsiblePageToolsCollapsed === false),
		interval;
	
	interval = setInterval(function() {
		if ($('.WikiaRail .sticky-modules-wrapper').children().length) {
			if (!$('#page-tools-module').length) return;
			clearInterval(interval);
			
			var panel = $('<div class="wds-collapsible-panel' + (doCollapse ? ' wds-is-collapsed' : '') + '"></div>');
		    $('<div class="wds-collapsible-panel__header" style="padding: 0; align-items: start;"></div>').append(
				$('#page-tools-module .rail-module__header'), 
				$('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-menu-control-small"></use></svg>')
			).appendTo(panel);
		    $('#page-tools-module .rail-module__list').addClass('wds-collapsible-panel__content').appendTo(panel);
			$('#page-tools-module').empty().append(panel);
		}
	}, 100);
});