function lol_recipe_tabber_init() {
	var tabbers = $('.lolwiki-recipetabber')
	if(tabbers.length==0) return false;
	for(var x=0;x<tabbers.length;x++) {
		var tabber = $(tabbers[x]);
		var contentwraper = tabber.find('> .recipetabs-contentwraper')
		var tabs = tabber.find('> .recipetabs > LI')
		for(var y=0;y<tabs.length;y++) {
			var tab = $(tabs[y]);
			var link = tab.find('.recipetab-link');
			var content = tab.find('.recipetab-content');
			link[0].tabcontent = content[0];
			contentwraper.append(content);
			var onclk = function () {
				var link = $(this);
				link = link.closest('.recipetab-link')
				
				if(link.hasClass('selected')) return false;
				link.closest('.recipetabs').find('> LI > .recipetab-link.selected').removeClass('selected');
				link.closest('.lolwiki-recipetabber').find('> .recipetabs-contentwraper > .recipetab-content.selected').removeClass('selected');
				
				link.addClass('selected');
				$(link[0].tabcontent).addClass('selected');
				return false;
			}
			link.find('A').click(onclk);
			link.click(onclk);
		}
	}
}
addOnloadHook(lol_recipe_tabber_init);