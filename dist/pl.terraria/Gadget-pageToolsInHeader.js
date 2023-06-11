$(function(){
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