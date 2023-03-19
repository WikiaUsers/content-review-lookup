// Rastreamento de cliques / pixels para o Portal:página DC_Vacation_Guide
if(mw.config.get('wgPageName') === "Portal:DC_Vacation_Guide") {
	// Força a miniatura do mapa para o inglês
	$('.wikia-interactive-map-thumbnail figcaption div p').text('Hilton - DC Vacation Guide');
	$('.wikia-interactive-map-thumbnail figcaption div span').html('<img width="20" height="20" alt="Created by MarkvA" src="https://images.wikia.nocookie.net/8ce180b6-fba4-4069-ae6d-48cf06dc9038/scale-to-width-down/20">Created by MarkvA');
	$('.wikia-interactive-map-thumbnail figcaption .view').text('View');
 
	// Tema de anúncio clicável
	var timestamp = Date.now();
	var targetURL = 'https://ad.doubleclick.net/ddm/clk/310846689;131859303;n';
	$('body').prepend('<a href="' + targetURL + '"><div class="clickable-skin"></div></a>');
	$('.clickable-skin').css({
		'height': '100%',
		'position': 'absolute',
		'width': '100%',
		'z-index': '1'
	});
 
	// Adicionar pixels de rastreamento
	// Cabeçalho
	$('body').append('<a href="https://ad.doubleclick.net/ddm/jump/N5552.143372WIKIAINC/B9307442.131858844;sz=1x1;ord=' + timestamp + '?"><img src="https://ad.doubleclick.net/ddm/ad/N5552.143372WIKIAINC/B9307442.131858844;sz=1x1;ord=' + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?" border=0 width=1 height=1 alt="Advertisement"></a><script language="JavaScript1.1" src="https://pixel.adsafeprotected.com/rjss/st/50294/10740913/skeleton.js"></script><noscript><img src="https://pixel.adsafeprotected.com/rfw/st/50294/10740912/skeleton.gif" border=0 width=1 height=1 alt=""></noscript>');
	// Skin
	$('body').append('<a href="https://ad.doubleclick.net/ddm/jump/N5552.143372WIKIAINC/B9307442.131859303;sz=1x1;ord=' + timestamp + '?"><img src="https://ad.doubleclick.net/ddm/ad/N5552.143372WIKIAINC/B9307442.131859303;sz=1x1;ord=' + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?" border=0 width=1 height=1 alt="Advertisement"></a><script language="JavaScript1.1" src="https://pixel.adsafeprotected.com/rjss/st/50294/10740893/skeleton.js"></script><noscript><img src="https://pixel.adsafeprotected.com/rfw/st/50294/10740892/skeleton.gif" border=0 width=1 height=1 alt=""></noscript>');
}