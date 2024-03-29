/* Any JavaScript here will be loaded for all users on every page load. */

// AJAX tables (for Template:Ajax)
function addAjaxDisplayLink() {
	$("table.ajax").each(function (i) {
		var table = $(this).attr("id", "ajaxTable" + i);
		table.find(".nojs-message").remove();
		var headerLinks = $('<span style="float: right;">').appendTo(table.find('th').first());
		var cell = table.find("td").first(), needLink = true;
		cell.parent().show();
		if (cell.hasClass("showLinkHere")) {
			var old = cell.html(), rep = old.replace(/\[link\](.*?)\[\/link\]/, '<a href="javascript:;" class="ajax-load-link">$1</a>');
			if (rep != old) {
				cell.html(rep);
				needLink = false;
			}
		}
		if (needLink) headerLinks.html('[<a href="javascript:;" class="ajax-load-link">show data</a>]');
		table.find(".ajax-load-link").parent().addBack().filter('a').click(function(event) {
			event.preventDefault();
			var sourceTitle = table.data('ajax-source-page'), baseLink = mw.config.get('wgScript') + '?';
			cell.text('Please wait, the content is being loaded...');
			$.get(baseLink + $.param({ action: 'render', title: sourceTitle }), function (data) {
				if (data) {
					cell.html(data);
					cell.find('.ajaxHide').remove();
					cell.find('.terraria').removeClass('terraria');
					if (cell.find("table.sortable").length) {
						mw.loader.using('jquery.tablesorter', function() {
							cell.find("table.sortable").tablesorter();
						});
					}
					headerLinks.text('[');
					headerLinks.append($('<a>edit</a>').attr('href', baseLink + $.param({ action: 'edit', title: sourceTitle })));
					headerLinks.append(document.createTextNode(']\u00A0['));
					var shown = true;
					$("<a href='javascript:;'>hide</a>").click(function() {
						shown = !shown;
						shown ? cell.show() : cell.hide();
						$(this).text(shown ? "hide" : "show");
					}).appendTo(headerLinks);
					headerLinks.append(document.createTextNode(']'));
				}
			}).error(function() {
				cell.text('Unable to load table; the source article for it might not exist.');
			});
		});
	});
}

$(addAjaxDisplayLink);

   //main page header.
   var $btn = $('#mf-wikiheader #mf-wikiheader-toggle-link');
   if($btn.length){
      var $box = $('#mf-wikiheader');
      $btn.css('display', 'inline');
      if($box.innerHeight() > 180){
         $box.addClass('collapsed');
      }
      $btn.on('click', function(){
         $box.toggleClass('collapsed');
      });
   }


// Recipe finder functionality - by Philo04
if(mw.config.get('wgPageName') == "Calamity_Mod_Wiki:Recipe_Finder"){
	var RecipeFinderSearchBox = $("<input>")
		.addClass("mw-inputbox-input mw-ui-input mw-ui-input-inline")
		.css("vertical-align", "top")
		.attr("id", "RecipeFinderSearchInput")
		.attr("autocomplete", "off");
	var RecipeFinderSearchButton = $("<button>")
		.addClass("mw-ui-button mw-ui-progressive")
		.attr("id", "RecipeFinderSearchButton")
		.attr("title", "Search")
		.append("Search");
	$("#RecipeFinderInput").append(RecipeFinderSearchBox, RecipeFinderSearchButton);

	function FindRecipes(){
		var RecipeFinderSearchQuery = $("#RecipeFinderSearchInput").val().trim();
		new mw.Api().get({
			action: "parse",
			text: "{{#if:{{recipes/exist|ingredient=" + RecipeFinderSearchQuery + "}}|{{recipes|ingredient=" + RecipeFinderSearchQuery + "|title={{item|" + RecipeFinderSearchQuery.replace(/^#/, "") + "|note=({{recipes/count|ingredient=" + RecipeFinderSearchQuery + "}} recipes)}}}}|<span style=\"color:red;font-weight:bold;\">Recipes: No result</span>}}",
			disablelimitreport: true,
			format: "json"
		}).then(function(data){
			$("#RecipeFinderOutput").empty();
			$("#RecipeFinderOutput").append(data.parse.text['*']);
			mw.loader.using(["jquery.tablesorter"], function(){// have to load separately to make the table sortable
				$("#RecipeFinderOutput table.sortable").tablesorter();
			});
		});
	}

	$("#RecipeFinderSearchButton").on("click", FindRecipes);
	
	$("#RecipeFinderSearchInput").on("keyup", function(event){
		if(event.key == "Enter"){
			FindRecipes();
		}
	});
}

//original image - taken from Thorium Wiki's Common.js
$(function(){
	//Infobox images
	$(".pi-image-thumbnail").each(function(){
		var srcsetvar = $(this).attr("srcset");
		var srcarray = srcsetvar.split(" ");
		$(this).attr("srcset", srcarray[0]+"&format=original");
	});
	//other images
	var pattern = /(?:static|vignette|images)\.wikia\.nocookie\.net/;
	$("img").each(function(){
		var $this = $(this);
		var srcattr = $this.hasClass('lazyload') ? 'data-src' : 'src';
		var srcvar = $this.attr(srcattr);
		if (srcvar && !srcvar.endsWith('format=original') && pattern.exec(srcvar)) {
			$this.attr(srcattr, srcvar+(srcvar.includes('?')?'&':'?')+'format=original');
		}
	});
});

//Automatically expand pages to full-width and hide right bar on FandomDesktop by default
$(function() {
    if( !$('body.skin-fandomdesktop').length ){
        return;
    }
	//common.js is loaded BEFORE skin.fandomdesktop.js module.
	mw.loader.using("skin.fandomdesktop.js").then(function(){
	    if( !$('.is-content-expanded').length ){
	        if( ((mw.config.get("wgUserName") === null) ? localStorage.contentwidth : mw.user.options.get('contentwidth')) !== "collapsed"){
	        	$("button.content-size-toggle").click();
	    	}
	    }
	    if( !$('aside.page__right-rail.is-rail-hidden').length ){
	    	if( (mw.config.get("wgUserName") !== null) && (mw.user.options.get('rightrailvisible') !== "visible") ){
	    		$("button.right-rail-toggle").click();
	    	}
	    }
	});
	// page tools into header (place here to init dropdown function properly.)
	if(!$('aside.page__right-rail.is-rail-hidden').length){
		return;
	}
	var $box = $('.page-header__top');
	if(!$box.length){
		return;
	}
	$("#WikiaRail").on("afterLoad.rail", function(){
		var $pageTools = $('#p-tb');
		if(!$pageTools.length){
			return;
		}
		var $t = $('<div class="page-header__pagetools"><div class="wds-dropdown"><div class="wds-dropdown__toggle">'+$pageTools.find('h2').text()+'<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg></div><div class="wds-dropdown__content wds-is-not-scrollable"></div></div></div>');
		$pageTools.find('ul').clone().removeClass().addClass('wds-list wds-is-linked').appendTo($t.find("div.wds-dropdown__content"));
		var $cate = $box.find('.page-header__meta');
		if($cate.length){
			$cate.after($t);
		}
		else{
			$box.prepend($t);
		}
	});
	
});