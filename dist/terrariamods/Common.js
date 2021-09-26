/* Any JavaScript here will be loaded for all users on every page load. */
// AJAX tables
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
		table.find(".ajax-load-link").parent().andSelf().filter('a').click(function(event) {
			event.preventDefault();
			var sourceTitle = table.data('ajax-source-page'), baseLink = mw.config.get('wgScript') + '?';
			cell.text('Please wait, the content is being loaded...');
			$.get(baseLink + $.param({ action: 'render', title: sourceTitle }), function (data) {
				if (data) {
					cell.html(data);
					cell.find('.ajaxHide').remove();
					cell.find('.mod-logo').remove();//remove mod logo image.
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
		var $cate = $box.find('.page-header__categories');
		if($cate.length){
			$cate.after($t);
		}
		else{
			$box.prepend($t);
		}
	});
	
});