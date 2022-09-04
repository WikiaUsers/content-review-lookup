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
			whatlinkshere: 'What links here',
			'cargo-pagevalues': 'Page values', //in sidebar, under "Page Tools"
			'recentchangeslinked': 'Related changes', //in sidebar, under "Page Tools"
			'log': 'Logs',
			searchText: 'Search '+mw.config.get('wgSiteName'), //placeholder for search box
			searchGo: 'Go', //text for search button in search box 
			searchGoTitle: 'Go to a page with this exact name if it exists', //hover text for search button
			darkTheme: 'Dark Theme',
			lightTheme: 'Light Theme'
		},
		uk: {
			watchlist: 'Список спостереження', // in my account droplist
			view: 'Читати', // in right tabs
			more: 'Більше', // in right tabs
			share: 'Поділитися', // in left tabs
			pagetools: 'Інструменти', // in sidebar, section heading
			whatlinkshere: 'Посилання сюди',
			'cargo-pagevalues': 'Page values', //in sidebar, under "Page Tools"
			'recentchangeslinked': 'Пов’язані редагування', //in sidebar, under "Page Tools"
			'log': 'Logs',
			searchText: 'Пошук '+mw.config.get('wgSiteName'), //placeholder for search box
			searchGo: 'Go', //text for search button in search box 
			searchGoTitle: 'Перейти до сторінки, що точно має таку назву', //hover text for search button
			darkTheme: 'Темна тема',
			lightTheme: 'Світла тема'
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
	//move wiki tools to aside:
	var $box = $('.fandom-community-header__local-navigation > ul').find('.explore-menu');
	var $wikitools = $('.wiki-tools').first().find('a').removeClass('wds-button');
	// theme switch to top bar
	var $themeswitch = $wikitools.filter('.wiki-tools__theme-switch').appendTo($netbar);
	
		// .appendTo($netbar);   $('.wiki-tools').first()
		// .find('a').removeClass('wds-button')
		// .appendTo($box).wrap('<li></li>')
		// .filter('.wiki-tools__theme-switch')
		// .appendTo($netbar);
	var $recent = $wikitools.filter('[data-tracking="recent-changes"]').first().wrap('<li></li>');
	
	$('<span></span>', {text: $recent.attr('title').split('[')[0]}).appendTo($recent.empty());
	// sort in this way: main - recent - random - all 
	$box.find('a[data-tracking="explore-main-page"]').parent().after(
		$recent.parent(),
		$box.find('a[data-tracking="explore-random"]').parent()
	);
	$wikitools.not('.wiki-tools__theme-switch, [data-tracking="recent-changes"]').appendTo($box.find('.wds-list')).wrap('<li></li>');
	
	//theme switch without reloading:
	var s = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
	if(!$('#wds-icons-moon-small').length){
		$(s).attr({id:"wds-icons-moon-small", viewbox:"0 0 18 18"}).html('<path d="M9 17C6.97016 16.9786 5.02436 16.1863 3.55687 14.7837C2.08938 13.3812 1.20995 11.4732 1.09679 9.44639C0.983621 7.41959 1.64518 5.42556 2.94741 3.86835C4.24965 2.31113 6.09516 1.3072 8.11 1.05996C8.30858 1.03515 8.51004 1.07049 8.68832 1.16141C8.86659 1.25233 9.01349 1.39465 9.11 1.56996C9.204 1.74498 9.24374 1.94403 9.22414 2.14172C9.20455 2.33942 9.12652 2.5268 9 2.67996C8.3519 3.47677 7.99868 4.47286 8 5.49996C8.00265 6.69263 8.4776 7.83568 9.32094 8.67903C10.1643 9.52237 11.3073 9.99732 12.5 9.99996C13.5271 10.0013 14.5232 9.64806 15.32 8.99996C15.4742 8.87503 15.6621 8.7988 15.8598 8.78099C16.0574 8.76319 16.2559 8.8046 16.43 8.89996C16.6053 8.99648 16.7476 9.14337 16.8386 9.32165C16.9295 9.49993 16.9648 9.70138 16.94 9.89996C16.719 11.8518 15.7877 13.6541 14.3234 14.9635C12.8591 16.2728 10.9643 16.9977 9 17V17ZM6.27 3.64996C5.42973 4.08218 4.70343 4.70674 4.15023 5.47279C3.59703 6.23884 3.23257 7.12471 3.08655 8.05828C2.94053 8.99184 3.01706 9.94669 3.30992 10.8451C3.60278 11.7435 4.10368 12.56 4.77183 13.2281C5.43999 13.8963 6.2565 14.3972 7.15489 14.69C8.05328 14.9829 9.00813 15.0594 9.94169 14.9134C10.8753 14.7674 11.7611 14.4029 12.5272 13.8497C13.2932 13.2965 13.9178 12.5702 14.35 11.73C13.7498 11.9098 13.1265 12.0007 12.5 12C10.7769 11.9973 9.12515 11.3116 7.90673 10.0932C6.68832 8.87482 6.00265 7.22306 6 5.49996C5.99925 4.87342 6.09021 4.25015 6.27 3.64996V3.64996Z"/>').appendTo($('body > svg').first());
	}
	if(!$('#wds-icons-sun-small').length){
		$(s).attr({id:"wds-icons-sun-small", viewbox:"0 0 18 18"}).html('<path d="M9,14a5,5,0,1,1,5-5A5,5,0,0,1,9,14ZM9,6a3,3,0,1,0,3,3A3,3,0,0,0,9,6Zm.2-4a.64.64,0,0,0,.18-.06l.18-.09.15-.12A1.05,1.05,0,0,0,10,1,1,1,0,0,0,9.92.62,1,1,0,0,0,9.71.29L9.56.17,9.38.08A.64.64,0,0,0,9.2,0a1,1,0,0,0-.58.06,1.15,1.15,0,0,0-.33.21,1,1,0,0,0-.21.33A1,1,0,0,0,8,1a1,1,0,0,0,.08.38,1.15,1.15,0,0,0,.21.33A1.05,1.05,0,0,0,9,2Zm.51,15.73a1.15,1.15,0,0,0,.21-.33A1,1,0,0,0,10,17a1,1,0,0,0-1.71-.71A1.05,1.05,0,0,0,8,17a1,1,0,0,0,.08.38,1.15,1.15,0,0,0,.21.33,1,1,0,0,0,1.42,0Zm8-8a1.58,1.58,0,0,0,.12-.15.76.76,0,0,0,.09-.18A.64.64,0,0,0,18,9.2,1.5,1.5,0,0,0,18,9a1,1,0,1,0-2,0,1.5,1.5,0,0,0,0,.2.64.64,0,0,0,.06.18.76.76,0,0,0,.09.18l.12.15a1,1,0,0,0,1.42,0Zm-16,0,.12-.15a.76.76,0,0,0,.09-.18A.64.64,0,0,0,2,9.2,1.5,1.5,0,0,0,2,9a.84.84,0,0,0-.08-.38,1,1,0,0,0-.21-.33,1,1,0,0,0-1.42,0,1,1,0,0,0-.21.33A1,1,0,0,0,0,9a1.5,1.5,0,0,0,0,.2.64.64,0,0,0,.06.18.76.76,0,0,0,.09.18l.12.15a1,1,0,0,0,.33.21A.84.84,0,0,0,1,10,1.05,1.05,0,0,0,1.71,9.71ZM14.85,4.32,15,4.27a1,1,0,0,0,.17-.1.44.44,0,0,0,.15-.12l.13-.15a1.4,1.4,0,0,0,.09-.17,1.39,1.39,0,0,0,.06-.19,1.36,1.36,0,0,0,0-.2A1,1,0,0,0,15.58,3a.87.87,0,0,0-.22-.32.64.64,0,0,0-.15-.13A.91.91,0,0,0,15,2.42l-.19-.06a1,1,0,0,0-.58.06.87.87,0,0,0-.32.22,1,1,0,0,0-.29.7.68.68,0,0,0,0,.2,1.33,1.33,0,0,0,.05.19l.1.17a.79.79,0,0,0,.12.15,1,1,0,0,0,.32.22,1.07,1.07,0,0,0,.39.07A.62.62,0,0,0,14.85,4.32Zm-10.8,11a1,1,0,0,0,.29-.7,1.07,1.07,0,0,0-.07-.39A1,1,0,0,0,4.05,14a1,1,0,0,0-1.41,0,.87.87,0,0,0-.22.32,1.09,1.09,0,0,0-.08.39,1,1,0,0,0,.08.38.87.87,0,0,0,.22.32,1,1,0,0,0,1.41,0Zm11.31,0a1,1,0,0,0,.3-.7,1.09,1.09,0,0,0-.08-.39.87.87,0,0,0-.22-.32A1,1,0,0,0,14,14a1,1,0,0,0-.22.32,1.07,1.07,0,0,0-.07.39,1,1,0,0,0,.07.38,1,1,0,0,0,.22.32,1,1,0,0,0,1.41,0ZM4.05,4.05a.79.79,0,0,0,.12-.15l.1-.17a1.33,1.33,0,0,0,.05-.19.68.68,0,0,0,0-.2,1,1,0,0,0-.29-.7.87.87,0,0,0-.32-.22,1,1,0,0,0-.77,0,.87.87,0,0,0-.32.22A.87.87,0,0,0,2.42,3a1,1,0,0,0-.08.38,1.36,1.36,0,0,0,0,.2l.06.19a1.4,1.4,0,0,0,.09.17l.13.15A1,1,0,0,0,3,4.27a1,1,0,0,0,1.09-.22Z"/>').appendTo($('body > svg').first());
	}	
	$themeswitch.on('click', function(event){
		event.preventDefault();
		var targetTheme = $("body").hasClass("theme-fandomdesktop-light") ? "dark" : "light";
		var $this = $(this);
		$.when(
			$.get(mw.util.wikiScript("wikia") + "?controller=ThemeApi&method=themeVariables&variant=" + targetTheme + "&cb=" + (new Date().getTime())),
			$.get(mw.util.wikiScript("load") + "?modules=ext.fandom.DesignSystem.GlobalNavigation.brand." + targetTheme + ".css%7Cext.fandom.DesignSystem.brand." + targetTheme + ".css&only=styles")
		).done(function(wikiCss, brandCss) {
			var combinedCss = wikiCss[0] + brandCss[0];
			var $s = $("#theme-swapper")[0] || $("<style>").attr("id", "theme-swapper").appendTo("body");
			$($s).text(combinedCss);
			$("body").removeClass("theme-fandomdesktop-light theme-fandomdesktop-dark").addClass("theme-fandomdesktop-" + targetTheme);
			$this.attr('title', targetTheme === "dark" ? l10n("lightTheme") : l10n("darkTheme")).empty().append($('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-'+(targetTheme==="dark"?"sun":"moon")+'-small"></use></svg>'));
			var THEME_OPTION_NAME = "theme";
			if(mw.user.isAnon()){
				$.cookie(THEME_OPTION_NAME, targetTheme, {expires: 7, path: '/', domain: mw.config.get("wgCookieDomain")});
			}
			else{
				(new mw.Api()).saveOption(THEME_OPTION_NAME, targetTheme);
			}		
		});
		event.stopPropagation();
	});
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

// js review gadget:
$('.content-review__widget').insertBefore($('#content')).wrap('<div class="wrap-content-review__widget"></div>');

//index wiki nav sections:(for collapsed/expanded status memory)
$(".fandom-community-header__local-navigation > ul > .wds-dropdown").each(function(index, div){
	div.dataset.index = index;
	if($.cookie('hydra-nav-'+index) === "y"){
		$(div).addClass('collapsed').find('.wds-dropdown__content').css('display', 'none');
	}
});

//build page tools on aside (faster than move from right rail after it loaded.)
(function(){
	var tools = mw.config.get("wgRailModuleParams");
	if(tools){
		tools = tools.toolbox;
	}
	else{
		tools = mw.config.get("wgWikiaBarSkinData").navUrls;
	}
	delete tools.mainpage;
	delete tools.upload;
	delete tools.specialpages;
	var $box = $(
		'<li class="wds-dropdown" data-index="pagetools">'+
		'<div class="wds-tabs__tab-label wds-dropdown__toggle first-level-item">'+
		'<a href="#"><span>'+l10n('pagetools')+'</span></a>'+
		'<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg>'+
		'</div>'+
		'<div class="wds-dropdown__content wds-is-not-scrollable">'+
		'<ul class="wds-list wds-is-linked"></ul>'+
		'</div>'+
		'</li>')
		.appendTo($('.fandom-community-header__local-navigation > ul'))
		.find('ul.wds-list');
	$.each(tools, function(key, item){
		if(!item){
			return;
		}
		$('<a></a>', {
			href: item.href,
			text: item.text || l10n(key) || item.msg,
			id: item.id || 't-'+key,
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
		$box
		.prepend( $box.find('#t-whatlinkshere').parent(), $box.find('#t-recentchangeslinked').parent() )
		.append( $box.find('#t-info').parent(), $box.find('#t-cargopagevalueslink').parent() );
	}
})();

//move language interwiki links to aside:
(function(){
	var $languages = $('.page-footer__languages');
	if(!$languages.length){ return; }
	var $header = $languages.find('.wds-collapsible-panel__header');
	var $box = $(
		'<li class="wds-dropdown" data-index="languages">'+
		'<div class="wds-tabs__tab-label wds-dropdown__toggle first-level-item">'+
		'<a href="#"><span>'+$header.text()+'</span></a>'+
		'<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg>'+
		'</div>'+
		'<div class="wds-dropdown__content wds-is-not-scrollable">'+
		'<ul class="wds-list wds-is-linked"></ul>'+
		'</div>'+
		'</li>')
		.appendTo($('.fandom-community-header__local-navigation > ul'))
		.find('ul.wds-list');
	$header.remove();
	$languages.find('.wds-collapsible-panel__content a')
		.appendTo($box).wrap('<li></li>');
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
	(function(){
		if(!actions){ return; }
		//build left/right tabs:
		delete actions['cargo-purge']; //there is actions.purge already
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
			if(key === 'edit' || key === 'viewsource' || key === 'history' || key === 'addsection'){
				$target = $right;
			}else if(!key.startsWith('nstab-') && !item.primary){
				$target = $more;
			}
			var $z = $cactions.find('#'+item.id);
			if($z.length){
				//reuse the item from the dropdown list
				$z.closest('li').attr('class', $z.attr('class')).appendTo($target); 
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
			//workaround for watch/unwatch: take out watch/unwatch from more menu, and set id/class on li element to make mediawiki.page.watch.ajax work properly.
			var $watch = $more.find('a.mw-watchlink');
			$watch.closest('li').addClass('mw-watchlink').attr('id', $watch.attr('id')).appendTo($right);
			$watch.attr('id', null);
		});
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
		if($more.children().length){
			$more.closest('.wds-dropdown').appendTo($right); //move more menu to the end
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
	/* autocomplete
	 * (based on mediawiki.searchSuggest: 
	 * https://gerrit.wikimedia.org/r/plugins/gitiles/mediawiki/core/+/refs/heads/master/resources/src/mediawiki.searchSuggest/searchSuggest.js)
	 */
	var searchNS = $.map(mw.config.get('wgFormattedNamespaces'), function(nsName, nsID) {
		if (nsID >= 0 && mw.user.options.get('searchNs' + nsID)) {
			return Number(nsID);
		}
	});
	mw.searchSuggest = {
		request: function(api, query, response, maxRows, namespace) {
			return api.get({
				formatversion: 2,
				action: 'opensearch',
				search: query,
				namespace: namespace || searchNS,
				limit: maxRows,
				suggest: !0
			}).done(function(data, jqXHR) {
				response(data[1], {
					type: jqXHR.getResponseHeader('X-OpenSearch-Type'),
					searchId: jqXHR.getResponseHeader('X-Search-ID'),
					query: query
				});
			});
		}
	};

	var api, searchboxesSelectors, $searchRegion = $('#simpleSearch, #searchInput').first(),
		$searchInput = $('#searchInput'),
		previousSearchText = $searchInput.val();

	function getFormData(context) {
		var $form, baseHref, linkParams;
		if (!context.formData) {
			$form = context.config.$region.closest('form');
			baseHref = $form.attr('action');
			baseHref += baseHref.indexOf('?') > -1 ? '&' : '?';
			linkParams = $form.
			serializeObject();
			context.formData = {
				textParam: context.data.$textbox.attr('name'),
				linkParams: linkParams,
				baseHref: baseHref
			};
		}
		return context.formData;
	}

	function onBeforeUpdate() {
		var searchText = this.val();
		if (searchText && searchText !== previousSearchText) {
			mw.track('mediawiki.searchSuggest', {
				action: 'session-start'
			});
		}
		previousSearchText = searchText;
	}

	function getInputLocation(context) {
		return context.config.$region.closest('form').find('[data-search-loc]').data('search-loc') || 'header';
	}

	function onAfterUpdate(metadata) {
		var context = this.data('suggestionsContext');
		mw.track('mediawiki.searchSuggest', {
			action: 'impression-results',
			numberOfResults: context.config.suggestions.length,
			resultSetType: metadata.type || 'unknown',
			searchId: metadata.searchId || null,
			query: metadata.query,
			inputLocation: getInputLocation(context)
		});
	}

	function renderFunction(text, context) {
		var formData = getFormData(context),
			textboxConfig = context.data.$textbox.data('mw-searchsuggest') || {};
		formData.linkParams[formData.textParam] = text;
		mw.track(
			'mediawiki.searchSuggest', {
				action: 'render-one',
				formData: formData,
				index: context.config.suggestions.indexOf(text)
			});
		this.text(text);
		if (textboxConfig.wrapAsLink !== false) {
			this.wrap($('<a>').attr('href', formData.baseHref + $.param(formData.linkParams)).attr('title', text).addClass('mw-searchSuggest-link'));
		}
	}

	function selectFunction($input, source) {
		var context = $input.data('suggestionsContext'),
			text = $input.val();
		if (source !== 'keyboard') {
			mw.track('mediawiki.searchSuggest', {
				action: 'click-result',
				numberOfResults: context.config.suggestions.length,
				index: context.config.suggestions.indexOf(text)
			});
		}
		return true;
	}

	function specialRenderFunction(query, context) {
		var $el = this,
			formData = getFormData(context);
		formData.linkParams[formData.textParam] = query;
		mw.track('mediawiki.searchSuggest', {
			action: 'render-one',
			formData: formData,
			index: context.config.suggestions.indexOf(query)
		});
		if ($el.children().length === 0) {
			$el.append($('<div>').addClass('special-label').text(mw.msg('searchsuggest-containing')), $('<div>').addClass(
				'special-query').text(query)).show();
		} else {
			$el.find('.special-query').text(query);
		}
		if ($el.parent().hasClass('mw-searchSuggest-link')) {
			$el.parent().attr('href', formData.baseHref + $.param(formData.linkParams) + '&fulltext=1');
		} else {
			$el.wrap($('<a>').attr('href', formData.baseHref + $.param(formData.linkParams) + '&fulltext=1').addClass('mw-searchSuggest-link'));
		}
	}
	searchboxesSelectors = ['#searchInput', '.mw-searchInput'];
	$(searchboxesSelectors.join(', ')).suggestions({
		fetch: function(query, response, maxRows) {
			var node = this[0];
			api = api || new mw.Api();
			$.data(node, 'request', mw.searchSuggest.request(api, query, response, maxRows));
		},
		cancel: function() {
			var node = this[0],
				request = $.data(node, 'request');
			if (request) {
				request.abort();
				$.removeData(node, 'request');
			}
		},
		result: {
			render: renderFunction,
			select: function() {
				return true;
			}
		},
		update: {
			before: onBeforeUpdate,
			after: onAfterUpdate
		},
		cache: !0,
		highlightInput: !0
	}).on('paste cut drop', function() {
		$(this).trigger('keypress');
	}).each(function() {
		var $this = $(this);
		$this.data(
			'suggestions-context').data.$container.css('fontSize', $this.css('fontSize'));
	});
	if ($searchRegion.length === 0) {
		return;
	}
	$searchInput.suggestions({
		update: {
			before: onBeforeUpdate,
			after: onAfterUpdate
		},
		result: {
			render: renderFunction,
			select: selectFunction
		},
		special: {
			render: specialRenderFunction,
			select: function($input, source) {
				var context = $input.data('suggestionsContext'),
					text = $input.val();
				if (source === 'mouse') {
					mw.track('mediawiki.searchSuggest', {
						action: 'click-result',
						numberOfResults: context.config.suggestions.length,
						index: context.config.suggestions.indexOf(text)
					});
				} else {
					$input.closest('form').append($('<input>').prop({
						type: 'hidden',
						value: 1
					}).attr('name', 'fulltext'));
				}
				return true;
			}
		},
		$region: $searchRegion
	});
	$searchInput.closest('form').on('submit', function() {
		var context = $searchInput.data('suggestionsContext');
		mw.track('mediawiki.searchSuggest', {
			action: 'submit-form',
			numberOfResults: context.config.suggestions.length,
			$form: context.config.$region.closest('form'),
			inputLocation: getInputLocation(context),
			index: context.config.suggestions.indexOf(context.data.$textbox.val())
		});
	}).find('.mw-fallbackSearchButton').remove();
})();

//expand?
(function(){
	$body = $('body');
	$('<div id="hydralize-size-toggle">'+
	'<svg class="wds-icon wds-icon-small"><use href="#wds-icons-zoom-out-small"></use></svg>'+
	'<svg class="wds-icon wds-icon-small"><use href="#wds-icons-zoom-in-small"></use></svg>'+
	'</div>')
	.prependTo($topbar)
	.on('click', function(){
		$body.toggleClass('hydralize-content-expanded');
		//$.cookie('hydralize-content-expanded', $body.hasClass('hydralize-content-expanded')?"y":"n", {expires: 365, path: '/'});
	});
	//$body.toggleClass('hydralize-content-expanded', $.cookie('hydralize-content-expanded') === "y");
})();

//add a flag class to body element for other scripts.
$('body').addClass('hydralized'); 

}); //end $()