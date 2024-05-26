importArticles({
    type: "script",
    article: ["MediaWiki:Breadcrumbs.js"]
},
{
	type: "style",
    article: [""]
});

window.mapsExtendedConfig =
{
    sortMarkers: "longitude",
    enableTooltips: true,
    tooltipDirection: "bottom",
    openPopupsOnHover: false,
    enableFullscreen: true,
    fullscreenMode: "window",
    enableSearch: true,
    zoomLayers:
    [
    	{
    	    "id": 1,
    	    "minZoom": 0.5,
    	    "categories": [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"]
    	},
    	{
    	    "id": 2,
    	    "maxZoom": 0.5,
    	    "categories": [ "18" ]
    	}
	]
};

window.rwaOptions = {
    limit : 50,
    namespaces : [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
    autoInit : true,
    themeName : "main",
    showBotEdits : false,
    loadModule : false,
    customRendering : { },
    headerLink : false,
    refresh : false,
    refreshDelay : 5 * 60 * 1000,
    timeout : 10 * 1000
};

/**
 * sliders using jquery
 * Credited author <dragonage.fandom.com/wiki/User:Tierrie
 */
mw.loader.using( ['jquery.cookie']);

mw.loader.using( ['jquery.ui.tabs'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );

  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});