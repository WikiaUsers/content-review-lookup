/*importArticles({
    type: "script",
    article: ["MediaWiki:StratagemOverview.js"]
},
{
	type: "style",
    article: [""]
});*/

/* namespace improvements */
var check112 = document.querySelector(".ns-112");
var check113 = document.querySelector(".ns-113");
if (check112 != undefined || check113 != undefined) {
	var html = document.querySelector(".client-js");
	html.style.scrollbarColor = '#e7b780 #1b1b1b';
}


/* the following makes up gameList class tabbers*/
function getUrl(url, number) {
	$.getJSON(url, function(data) {
				var rawPath = data.url.split('/revision')[0]
				
				oldHTML = tabsList[number].innerHTML
				tabsList[number].innerHTML = '<img src="'+ rawPath +'"/>' + oldHTML
			});
}

tabbersList = document.getElementsByClassName('gameList withIcons')
for (var i = 0; i < tabbersList.length; i++) {
	tabsList = tabbersList[i].getElementsByClassName('wds-tabs__tab')
	for (var k = 0; k < tabsList.length; k++) {
		
		frameIndex = Math.floor(Math.random() * 4) + 1;
		tabsList[k].classList.add('gameListFrame' + frameIndex);
		
		name = tabsList[k].querySelector('a').innerHTML
		url = '/wikia.php?controller=CuratedContent&method=getImage&title=File:' + name + '_Icon.png';
		
		getUrl(url, k)
	}
}


/* the following styles stratagem videos */
var videos = document.getElementsByClassName("StratagemOverview");
for (var i = 0; i < videos.length; i++) {
	var video = videos.item(i).querySelector("video");
	if (video != undefined) {
	video.autoplay = video.loop = video.muted = true;
	video.controls = false;
	video.style.width = video.style.height = "auto";
	video.play();
		
	}
}

/* the following makes a cut on overview infobox border */
/*var infoboxList = document.getElementsByClassName("gameOverviewInfobox")
for (var i = 0;i<infoboxList.length;i++) {
	var infobox = infoboxList[i]
	var infoboxHeader = infoboxList[i].querySelector(".gameInfoboxHeader")
	var infoboxBody = infoboxList[i].querySelector(".gameInfoboxBody")
	var headerStyle = infoboxHeader.currentStyle || window.getComputedStyle(infoboxHeader);
	var clipStart = headerStyle.marginLeft.toString().split("px")[0] - 2;
	var clipEnd = clipStart + infoboxHeader.innerHTML.length*12 - 6;
	infoboxBody.style.clipPath = 'polygon(0 0, ' + clipStart + 'px 0, ' + clipStart + 'px 5px, ' + clipEnd + 'px 5px, ' + clipEnd + 'px 0, 100% 0, 100% 100%, 0 100%)';
}*/





/*mapsExtended config*/
window.mapsExtendedConfig =
{
    sortMarkers: "longitude",
    enableTooltips: true,
    tooltipDirection: "bottom",
    openPopupsOnHover: false,
    enableFullscreen: false,
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

/*Wiki Activity config */
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
/*mw.loader.using( ['jquery.cookie']);

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
});*/