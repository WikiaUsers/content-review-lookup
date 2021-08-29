$(function(){

if( mw.config.get("skin") !== "fandomdesktop" ){
	return;
}
if("ontouchstart" in window){ // only when this is not registered in common.js
	return;
}

//this is much faster than mw.loadMessage
var l10n = (function(){
	var data = {
		en: {
			watchlist: 'My Watchlist', // in my account droplist
			view: 'View', // in right tabs
			more: 'More', // in right tabs
			share: 'Share', // in left tabs
			pagetools: 'Page Tools', // in sidebar, section heading
			'cargo-pagevalues': 'Page values', //in sidebar, under "Page Tools"
			'recentchangeslinked': 'Related changes', //in sidebar, under "Page Tools"
			searchText: 'Search '+mw.config.get('wgSiteName'), //placeholder for search box
			searchGo: 'Go', //text for search button in search box 
			searchGoTitle: 'Go to a page with this exact name if it exists' //hover text for search button
		},
		zh: {
			watchlist: '我的监视列表',
			view: '查看',
			more: '更多',
			share: '分享',
			pagetools: '页面工具', 
			'cargo-pagevalues': '页面值',
			'recentchangeslinked': '相关更改',
			searchText: '搜索 '+mw.config.get('wgSiteName'),
			searchGo: '搜索',
			searchGoTitle: '若存在标题完全匹配的页面，则直接前往该页面'
		}		
	};
	var lang = mw.config.get("wgUserLanguage");
	return function (key) {
		// (null==undefined) is true,(null===undefined) is false
		return (data[lang] && data[lang][key] != null) ? data[lang][key] : data.en[key];
	};
})();

//unused, remove
$('.fandom-sticky-header').remove();

(function(){
	var $netbar = $('.global-navigation__links');
	//move gp logo to top bar
	$('.fandom-community-header__top-container').appendTo($netbar);
	//move wiki tools to aside, theme switch to netbar
	var $box = $('.fandom-community-header__local-navigation .extra-large-navigation > :first-child .wds-list');
	$('.wiki-tools').first()
		.find('a').removeClass('wds-button')
		.appendTo($box).wrap('<li></li>')
		.filter('.wiki-tools__theme-switch')
		.appendTo($netbar);
	$box.find('a[data-tracking="explore-main-page"]').parent().after(
		$box.find('a[data-tracking="recent-changes"]').parent(),
		$box.find('a[data-tracking="explore-random"]').parent()
	);
	
})();

(function(){
	var $list = $('#global-navigation-user-signout').parent();
	$('.wds-avatar').append($('<a></a>', {href: $list.find('a[data-tracking-label="account.profile"]').attr('href')}));
	var actions = mw.config.get('wgWikiaPageActions') || [];
	for(var i in actions){
		var info = actions[i];
        if(info.id === 'special:watchlist'){
            $('<li></li>').append($('<a></a>', {text: l10n('watchlist'), href: info.href})).insertBefore($list.find('[data-tracking-label="account.talk"]').parent());
            break;
        }
    }
})();

//index wiki nav sections:(for collapsed/expanded status memory)
$(".fandom-community-header__local-navigation .extra-large-navigation > .wds-dropdown").each(function(index, div){
	div.dataset.index = index;
	if($.cookie('hydra-nav-'+index) === "y"){
		$(div).addClass('collapsed').find('.wds-dropdown__content').css('display', 'none');
	}
});

//build page tools on aside (faster than move from right rail after it loaded.)
(function(){
	var tools = mw.config.get("wgRailModuleParams");
	if(!tools){ return; }
	tools = tools.toolbox;
	var $box = $(
		'<div class="wds-dropdown" data-index="pagetools">'+
		'<div class="wds-tabs__tab-label wds-dropdown__toggle first-level-item">'+
		'<a href="#"><span>'+l10n('pagetools')+'</span></a>'+
		'<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg>'+
		'</div>'+
		'<div class="wds-dropdown__content wds-is-not-scrollable">'+
		'<ul class="wds-list wds-is-linked"></ul>'+
		'</div>'+
		'</div>')
		.appendTo($('.fandom-community-header__local-navigation .extra-large-navigation'))
		.find('ul.wds-list');
	$.each(tools, function(key, item){
		$('<a></a>', {
			href: item.href,
			text: l10n(key) || item.text || item.msg,
			id: item.id,
			rel: item.rel
		}).appendTo($box).wrap('<li></li>');
	});
	if($box.children().length === 0){
		$box.closest('div.wds-dropdown').remove();
	}
	else{
		if($.cookie('hydra-nav-pagetools') === "y"){
			$box.closest('.wds-dropdown').addClass('collapsed')
				.find('.wds-dropdown__content').css('display', 'none');
		}
	}
})();

//move language interwiki links to aside:
(function(){
	var $languages = $('.page-footer__languages');
	if(!$languages.length){ return; }
	$languages.removeClass().addClass('wds-dropdown page-footer__languages').attr('data-index', 'languages')
		.appendTo($('.fandom-community-header__local-navigation .extra-large-navigation'));
	var $header = $languages.find('.wds-collapsible-panel__header');
	$('<div class="wds-tabs__tab-label wds-dropdown__toggle first-level-item">'+
		'<a href="#"><span>'+$header.text()+'</span></a>'+
		'<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg>'+
		'</div>').prependTo($languages);
	$header.remove();
	$languages.find('.wds-collapsible-panel__content')
		.removeClass().addClass('wds-dropdown__content wds-is-not-scrollable')
		.find('a').wrap('<li></li>');
	$languages.find('.wds-dropdown__content li')
		.wrapAll('<ul class="wds-list wds-is-linked"></ul>');
	if($.cookie('hydra-nav-languages') === "y"){
		$languages.addClass('collapsed')
			.find('.wds-dropdown__content').css('display', 'none');
	}
})();

//click to toggle expand/collapse for local nav dropdown lists:
$(".fandom-community-header__local-navigation").on("click", '.wds-dropdown__toggle.first-level-item', function(event){
	event.stopPropagation();
	var $item = $(this).closest('.wds-dropdown');
	$item.toggleClass('collapsed').find('.wds-dropdown__content').slideToggle('fast');
	$.cookie('hydra-nav-' + $item[0].dataset.index, $item.hasClass('collapsed')?"y":"n", {expires: 365, path: '/'});
});

//remove empty <li> from aside nav.
$(".fandom-community-header__local-navigation li:empty").remove();


//build topbar.
var $topbar = (function(){
	var $topbar = $('.page-side-tools__wrapper');
	if(!$topbar.length){ return; }

	var $left = $('<ul class="left-tabs"></ul>');
	var $right = $(
		'<ul class="right-tabs">'+
		'<li class="wds-dropdown">'+
		'<div class="wds-dropdown__toggle"><span>' + l10n('more') + '</span><svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg></div>'+
		'<div class="wds-dropdown__content"><ul class="wds-list wds-is-linked"></ul></div>'+
		'</li>'+
		'</ul>');
	$topbar.empty().append($left, $right);
	var $more = $right.find('.wds-list');
	var $cactions = $('#p-cactions');

	var actions = mw.config.get('wgWikiaBarSkinData');
	actions = actions && actions.contentActions;
	var watch_accesskey = (function(){
		if(!actions){ return; }
		//build left/right tabs:
		var watch_accesskey;
		delete actions['cargo-purge']; //there is actions.purge already
		//since the order of scripts loaded, watch/unwatch built here will not work in gadget script:
		watch_accesskey = (actions.watch || actions.unwatch || {}).accesskey;
		delete actions.watch; delete actions.unwatch;
		var $target = $left;
		$.each(actions, function(key, item){
			if(key.substring(0,8) === 'varlang-'){ return; } //skip language variants
			if(key === 'share'){
				$('<li class="wds-dropdown" id="ca-share">'+
					'<div class="wds-dropdown__toggle">'+
					'<span>' + l10n('share') + '</span>'+
					'<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg>'+
					'</div>'+
					'<div class="wds-dropdown__content">' + item.html + '</div>'+
					'</li>').appendTo($left);
				return;
			}
			if(key === 'edit' || key === 'viewsource'){
				$target = $right;
			}else if(!item.primary && key !== 'history'){
				$target = $more;
			}
			var $z = $cactions.find('#'+item.id);
			if($z.length){
				$z.closest('li').appendTo($target); //reuse the item from the dropdown list
			}
			else{
				//build a new one
				var $a = $('<a></a>', {
					accesskey: item.accesskey,
					id: item.id,
					class: (item.class||'') + (item.exists===false?' new':''),
					href: item.href,
					text: item.text,
				});
				if(item.data){
					$.each(item.data, function(index) {
						$a.attr('data-'+index, item.data[index]);
					});
				}
				$('<li></li>',{class: $a.attr('class')}).append($a).appendTo($target);
			}
		});
		return watch_accesskey;
	})();
	//Is there anything left in "old" dropdown list?
	$cactions.find('ul li').appendTo($more);
	//removed old p-views area.
	$('#p-views').remove();
	$more.attr('id', 'p-cactions');
	$right.attr('id', 'p-views');

	//need "view" for right tabs?
	(function(){
		if(!(actions.edit || actions.viewsource)){
			return;
		}
		var $view = $left.find('li.selected').clone().attr('id', 'ca-view').prependTo($right);
		$view.find('a').text(l10n('view'));
		if($right.find('li.selected').length > 1){
			$view.removeClass('selected');
		}
	})();

	//language variants to left tabs (for some non-English languages such as Chinese)
	(function(){
		var $variants = $('.page-header__top .page-header__variants .wds-dropdown');
		if($variants.length === 0){ return; }
		$('<li class="wds-dropdown" id="p-variants"></li>').append($variants.children()).appendTo($left)
		.find('.wds-dropdown__toggle').children().first().wrap('<span></span>');
		//move share to the end
		$left.find('#ca-share').appendTo($left);
	})();

	//merge my tools bar to top right bar:
	(function(){
		var $mytools = $('#WikiaBar ul.tools');
		$mytools.find('li.overflow').each(function(index, li){
			var $li = $(li);
			var $a = $li.find('a');
			var id = $a.attr('id') || 'ca-'+$a.attr('data-name');
			if(id){
				if($right.find('#'+id).length){
					return;
				}
				$a.attr('id', id);
			}
			$li.appendTo($li.parent().hasClass('wds-list') ? $more : $right);
		});
		var $watch = $right.find('a.mw-watchlink').attr('accesskey', watch_accesskey);
		$watch.attr('title', $watch.text().trim())
		.closest('li').addClass('mw-watchlink').attr('id', $watch.attr('id'));
		if($more.children().length){
			$more.closest('.wds-dropdown').appendTo($right); //move to the end
			mw.loader.using("ext.fandom.wikiaBar.js").then(function(){
				$more.append($mytools.find('li.tools-customize'));
			});
		}
		else{
			$more.closest('.wds-dropdown').remove();
		}
	})();
	return $topbar;
})(); //end toolbar


//Search form:
(function(){
	/** taked from Joritochip's HydraRevived (https://dev.fandom.com/wiki/HydraRevived) **/
	var sitename = mw.config.get('wgSiteName');
	$('<form></form>', {action: mw.config.get('wgScript'), id: 'searchform'}).appendTo($topbar).append(
		$('<div></div>', {id: 'simpleSearch'}).append(
			$('<input/>', {
				type: 'search',
				name: 'search',
				placeholder: l10n('searchText'),
				title: l10n('searchText'),
				id: 'searchInput',
				tabindex: '1',
				accesskey: 'f',
				autocomplete: 'off'
			}),
			$('<input/>', {
				type: 'hidden',
				value: 'Special:Search',
				name: 'title'
			}),
			$('<input/>', {
				type: 'submit',
				name: 'go',
				value: l10n('searchGo'),
				title: l10n('searchGoTitle'),
				id: 'searchButton',
				class: 'searchButton'
			})
		)
	);
	/* Enable autocomplete */
	mw.loader.using('mediawiki.searchSuggest');
})();

//add a flag class to body element for other scripts.
$('body').addClass('hydralized'); 

}); //end $()