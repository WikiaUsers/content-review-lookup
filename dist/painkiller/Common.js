/* Any JavaScript here will be loaded for all users on every page load. */

//Note: Common.js uses Wikia.css instead of Common.css

$numberOfModPagesRequest = $.ajax({
	type: "GET",
	url: mw.util.wikiScript("api"),
	data: {
		action: "parse",
	    text: "{{PAGESINCATEGORY:Mods|pages}}",
	    contentmodel: "wikitext",
	    prop: "text",
	    preview: true,
	    format: "json"
	}
});

;(function($, mw) {

Main = {
    
    WaitForElementToDisplay: function(selector, callback, check, timeout) {
		var start = Date.now();
		(function loopSearch() {
			if (document.querySelector(selector) != null) {
				callback();
				return;
			}
			else {
				setTimeout(function () {
					if (timeout && Date.now() - start > timeout)
						return;
					loopSearch();
				}, check);
			}
		})();
	},
    
    SetNumberOfArticles: function(value) {
    	$numberOfPages = parseInt($('.page-counter__value').text());
    	$numberOfModPages = value;
    	$('.page-counter').wrapInner('<a href="/Special:AllPages?namespace=112" class="mod-counter"></a>');
    	$('.page-counter__value').html($numberOfModPages);
    	$('.page-counter__label').html("mod pages");
    	$('.page-counter').after('<div style="font-weight: 500; line-height: 1; margin-right: 6px; text-align: right; text-transform:uppercase;"><a href="/Special:AllPages?namespace=0"><div class="page-counter__value-revised">'+ ($numberOfPages - $numberOfModPages) +'</div><div class="page-counter__label-revised">pages</div></a></div>');
    	$('.page-counter').addClass('page-counter-revised').removeClass('page-counter');
    	$('.page-counter__value').addClass('page-counter__value-revised').removeClass('page-counter__value');
    	$('.page-counter__label').addClass('page-counter__label-revised').removeClass('page-counter__label');
    	$('.fandom-community-header__local-navigation .wds-tabs__tab:nth-last-child(2)').remove();
    	$('.fandom-community-header__local-navigation .wds-tabs__tab:last-child').remove();
    	
    },
    
    UpdateNumberOfArticles: function() {
	    $.when( $numberOfModPagesRequest ).done(function($data) {
      		Main.SetNumberOfArticles(parseInt($($data.parse.text['*']).text()));
    	});
    },
    
    AddMapButtons: function() {
    	var data = $('.multiple-maps').data();
		
		if( ($(".interactive-maps-container").length > 0) && (data !== undefined) )
		{
			Main.WaitForElementToDisplay(".leaflet-top.leaflet-left",function(){
				for(var i in data){
				$(".leaflet-top.leaflet-left").append( '<div class="interactive-maps__edit-control interactive-maps__selector" data-image="' + data[i] +'">' + i +'</div>' );
				}
				$(".interactive-maps__selector").click(function(){
					var image = $(this).data("image");
					$(".leaflet-pane.leaflet-overlay-pane img").attr("src", image);
				});
			},1000,10000);
		}
    }
};

Main.UpdateNumberOfArticles();
Main.AddMapButtons();

})(this.jQuery, this.mediaWiki);

window.tooltips_config = {
    noCSS: true,
    waitForImages: true,
};