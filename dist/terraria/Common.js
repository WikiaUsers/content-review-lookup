/**
 * For language wikis, use <code>mw.loader.load("https://terraria.fandom.com/wiki/MediaWiki:Common.js?action=raw\u0026ctype=text/javascript");<code>
 * as the content of common.js to import from this script.
 *
 * See [https://terraria.fandom.com/zh/wiki/MediaWiki:Common.js zh wiki] for example.
 */

var l10nFactory = function($lang, $data) {
	return function ($key) {
		// (null==undefined) is true,(null===undefined) is false
		return ($data[$lang] && $data[$lang][$key] != null) ? $data[$lang][$key] : $data.en[$key];
	};
};

// AJAX tables
$(function() {
	var l10n = l10nFactory(mw.config.get( 'wgPageContentLanguage' ),{
		en: {
			showData: 'show data',
			wait: 'Please wait, the content is being loaded...',
			edit: 'edit',
			hide: 'hide',
			show: 'show',
			error: 'Unable to load table; the source article for it might not exist.'
		},
		de: {
			showData: 'Daten anzeigen',
			wait: 'Bitte warten, der Inhalt wird geladen...',
			edit: 'bearbeiten',
			hide: 'verbergen',
			show: 'anzeigen',
			error: 'Kann Tabelle nicht laden; möglicherweise existiert der Quellartikel nicht.'
		},
		fr: {
			showData: 'affiche les données',
			wait: 'Veuillez patienter pendant le chargement du contenu...',
			edit: 'modifier',
			hide: 'masquer',
			show: 'afficher',
			error: 'Impossible de charger cette table; l\'article originel ne semble pas exister.'
		},
		pt: {
			wait: 'Por favor espere, o conteúdo está sendo carregado...',
			edit: 'Editar',
			hide: 'Esconder',
			show: 'Mostrar',
			error: 'Não é possível a carregar tabela; o artigo fonte pode não existir.'
		},
		zh: {
			showData: '显示数据',
			wait: '请稍候，正在加载内容……',
			edit: '编辑',
			hide: '隐藏',
			show: '显示',
			error: '无法加载表格，其源文章可能不存在。'
		}
	});
	$("table.ajax").each(function (i) {
		var table = $(this).attr("id", "ajaxTable" + i);
		table.find(".nojs-message").remove();
		var headerLinks = $('<span style="float: right;">').appendTo(table.find('th').first());
		var cell = table.find("td").first();
		var needLink = true;
		cell.parent().show();
		if (cell.hasClass("showLinkHere")) {
			var old = cell.html();
			var rep = old.replace(/\[link\](.*?)\[\/link\]/, '<a href="javascript:;" class="ajax-load-link">$1</a>');
			if (rep !== old) {
				cell.html(rep);
				needLink = false;
			}
		}
		if (needLink){
			headerLinks.html('[<a href="javascript:;" class="ajax-load-link">'+l10n('showData')+'</a>]');
		}
		table.find(".ajax-load-link").parent().andSelf().filter('a').click(function(event) {
			event.preventDefault();
			var sourceTitle = table.data('ajax-source-page'), baseLink = mw.config.get('wgScript') + '?';
			cell.text(l10n('wait'));
			$.get(baseLink + $.param({ action: 'render', title: sourceTitle }), function (data) {
				if (!data) {
					return;
				}
				cell.html(data);
				cell.find('.ajaxHide').remove();
				cell.find('.terraria:not(.ajaxForceTerraria)').removeClass('terraria');
				if (cell.find("table.sortable").length) {
					mw.loader.using('jquery.tablesorter', function() {
						cell.find("table.sortable").tablesorter();
					});
				}
				headerLinks.text('[');
				headerLinks.append($('<a>'+l10n('edit')+'</a>').attr('href', baseLink + $.param({ action: 'edit', title: sourceTitle })));
				headerLinks.append(document.createTextNode(']\u00A0['));
				var shown = true;
				$("<a href='javascript:;'>"+l10n('hide')+"</a>").click(function() {
					shown = !shown;
					cell.toggle(shown);
					$(this).text(shown ? l10n('hide') : l10n('show'));
				}).appendTo(headerLinks);
				headerLinks.append(document.createTextNode(']'));
			}).error(function() {
				cell.text(l10n('error'));
			});
		});
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
	
});

//Main page responsive layout. Ports breakpoints for hydra skin to all skins.
$(function() {
	var $btn = $('#box-wikiheader #box-wikiheader-toggle-link');
	if(!$btn.length) {
		return;
	}
	var $content = $('#content');
	var $header = $('#box-wikiheader');
	
	$(window).on('resize', function(){
		var $width = $content.width();
		var $offset = $width > 980 ? 250 : ($width > 500 ? 42: 12); // (fullwidth - content width) on hydra skin.
		
		//header
		$header.toggleClass('collapsable', $width < 1300);
		$header.toggleClass('collapsed', $width < 730);
		
		//row breaks of flexboxes 
		$content
			.toggleClass('box-row-l', ($width <= 3500-$offset) && ($width >= 2400-$offset) )
			.toggleClass('box-row-m', ($width <= 2399-$offset) && ($width >= 1670-$offset) )
			.toggleClass('box-row-s', ($width <= 1669-$offset) );
		
		$('#box-game')
			.toggleClass('width-a', ($width <= 4500-$offset) && ($width >= 3250-$offset) )
			.toggleClass('width-b', ($width <= 3249-$offset) && ($width >= 1670-$offset) )
			.toggleClass('width-c', ($width <= 1669-$offset) )
			.toggleClass('width-d', ($width <= 1200-$offset) )
			.toggleClass('width-e', ($width <= 1160-$offset) )
			.toggleClass('width-f', ($width <=  700-$offset) )
			.toggleClass('width-g', ($width <=  540-$offset) );
		
		$('#box-news')
			.toggleClass('width-a', ($width >= 1750-$offset) || ($width <= 1669-$offset) )
			.toggleClass('width-b', ($width <=  400-$offset) );

		$('#box-items')
			.toggleClass('width-a', ($width <= 4500-$offset) && ($width >= 3250-$offset) )
			.toggleClass('width-b', ($width <= 1769-$offset) )
			.toggleClass('width-c', ($width <= 1669-$offset) )
			.toggleClass('width-d', ($width <= 1320-$offset) )
			.toggleClass('width-e', ($width <= 1140-$offset) )
			.toggleClass('width-f', ($width <= 1040-$offset) )
			.toggleClass('width-g', ($width <=  980-$offset) )
			.toggleClass('width-h', ($width <=  870-$offset) )
			.toggleClass('width-i', ($width <=  620-$offset) )
			.toggleClass('width-j', ($width <=  450-$offset) );

		$('#box-biomes')
			.toggleClass('width-a', ($width <= 3250-$offset) && ($width >= 2560-$offset) )
			.toggleClass('width-b', ($width <= 1769-$offset) )
			.toggleClass('width-c', ($width <= 1669-$offset) )
			.toggleClass('width-d', ($width <= 1320-$offset) )
			.toggleClass('width-e', ($width <= 1140-$offset) )
			.toggleClass('width-f', ($width <= 1040-$offset) )
			.toggleClass('width-g', ($width <=  980-$offset) )
			.toggleClass('width-h', ($width <=  830-$offset) )
			.toggleClass('width-i', ($width <=  630-$offset) )
			.toggleClass('width-j', ($width <=  428-$offset) );
			
		$('#box-mechanics')
			.toggleClass('width-a', ($width <= 4500-$offset) && ($width >= 3250-$offset) || $width <= 1470-$offset )
			.toggleClass('width-b', ($width <= 1769-$offset) && ($width >= 1670-$offset) )
			.toggleClass('width-c', ($width <= 1080-$offset) )
			.toggleClass('width-d', ($width <=  750-$offset) )
			.toggleClass('width-e', ($width <=  550-$offset) )
			.toggleClass('width-f', ($width <=  359-$offset) );

		$('#box-npcs')
			.toggleClass('width-a', ($width <= 4500-$offset) && ($width >= 3250-$offset) )
			.toggleClass('width-b', ($width <= 3249-$offset) && ($width >= 2560-$offset) )
			.toggleClass('width-c', ($width <= 1470-$offset) )
			.toggleClass('width-d', ($width <= 1080-$offset) )
			.toggleClass('width-e', ($width <=  720-$offset) )
			.toggleClass('width-f', ($width <=  570-$offset) )
			.toggleClass('width-g', ($width <=  350-$offset) );

		$('#box-bosses')
			.toggleClass('width-a', ($width <= 4500-$offset) && ($width >= 3250-$offset) )
			.toggleClass('width-b', ($width <= 3249-$offset) && ($width >= 2560-$offset) )
			.toggleClass('width-c', ($width <= 1669-$offset) )
			.toggleClass('width-d', ($width <= 1365-$offset) )
			.toggleClass('width-e', ($width <=  800-$offset) )
			.toggleClass('width-f', ($width <=  720-$offset) )
			.toggleClass('width-g', ($width <=  480-$offset) );

		$('#box-events')
			.toggleClass('width-a', ($width <= 4500-$offset) && ($width >= 3250-$offset) )
			.toggleClass('width-b', ($width <= 1669-$offset) )
			.toggleClass('width-c', ($width <= 1365-$offset) )
			.toggleClass('width-d', ($width <=  800-$offset) )
			.toggleClass('width-e', ($width <=  720-$offset) )
			.toggleClass('width-f', ($width <=  650-$offset) )
			.toggleClass('width-g', ($width <=  540-$offset) );

		$('#sect-ext')
			.toggleClass('width-a', $width >= 2300-$offset );

		$('#box-software')
			.toggleClass('width-a', ($width <= 2299-$offset) )
			.toggleClass('width-b', ($width <= 1100-$offset) )
			.toggleClass('width-c', ($width <=  680-$offset) );

		$('#box-wiki')
			.toggleClass('width-a', ($width <= 2299-$offset) )
			.toggleClass('width-b', ($width <= 1499-$offset) )
			.toggleClass('width-c', ($width <=  680-$offset) );			
	}).triggerHandler('resize');
	$btn.on('click', function(){
		$header.toggleClass('collapsed');
	});
});

// translation project banner
$(window).on('load', function(){
	var $btn = $('#indic-project #indic-project-flag');
	if (!$btn.length) {
		return;
	}
	var $text = $('#indic-project');
	var $indic = $('#mw-indicator-translation-project');
	$btn.css('display', 'inline').on('click', function () {
		$text.toggleClass('collapsed');
		$indic.toggleClass('expanded');
	});
});

//sidebar height fix. only for hydra skins.
$(window).on('load', function(){
	if(!$('body.skin-hydra, body.skin-hydradark').length) {
		return;
	}
	//override left-sidebar resize handle.
	var $sidebar = $('#mw-panel');
	var $wrapper = $('#global-wrapper');
	var $footer = $('#curse-footer');
	$footer.css('margin-top', '0');
	var $top = 0;
	$(window).on('resize', function() {
		var $sidebar_bottom = $sidebar.offset().top + $sidebar.outerHeight(true);
		if ($sidebar_bottom > $footer.offset().top - $top){
			$top = $sidebar_bottom - $wrapper.offset().top;
			$wrapper.css('min-height', $top+'px');
		}
	}).triggerHandler('resize');
});

/* Document.ready */
$(function() {

	// Disable triggering of new browser tab when clicking URL links that point to internal wiki addresses (purge, edit, etc)
	$('a[href^="//terraria.fandom.com/"]').removeAttr('target');

	// Select links to new tabs for Template:ilnt and Template:elnt
	$('.linkNewTab a').attr('target','_blank');

	// desktop view for mobile screen. only for hydra skins.
	if($('body.skin-hydra, body.skin-hydradark').length) {
		$('#mw-panel').append('<div id="menu-toggle-button"></div>');
		$('#menu-toggle-button').on('click', function () {
			$('#mw-panel').toggleClass('on');
		});
	}

	// Hyperlink required modules in Module namespace
	// Author: RheingoldRiver
	if (mw.config.get('wgCanonicalNamespace') === 'Module') {
		$('.s1, .s2').each(function () {
			var html = $(this).html();
			// the module name is surrounded by quotes, so we have to remove them
			var quote = html[0];
			var quoteRE = new RegExp('^' + quote + '|' + quote + '$', 'g');
			var name = html.replace(quoteRE, ""); // remove quotes
			// link the module name
			if (name.startsWith("Module:")) {
				var target = encodeURIComponent(name);
				var url = mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=' + target;
				$(this).html(quote + '<a href="' + url + '">' + name + '</a>' + quote);
			}
		});
	}

	// mode tabs switch for npcinfobox/npcinfobtable
	$('.infobox .modetabs .tab, .infotable.npc .modetabs .tab').on('click', function(){
		var $this = $(this);
		if($this.hasClass('current')){
			return;
		}
		$this.parent().children().removeClass('current');
		$this.addClass('current');
		$this.closest('.infobox, .infotable').removeClass('c-expert c-master c-normal').addClass($this.hasClass('normal')?'c-normal':($this.hasClass('expert')?'c-expert':'c-master'));
	});

	//spoiler
	$('.spoiler-content').on('click', function(){
		$(this).toggleClass('show');
	});

});

//l10n_data_table(template:l10n_subtemplate)
$(function() {
	$('.l10n-data-table th.lang').on('click', function(){
		var $this = $(this);
		var $lang = $this.attr('lang');
		if($lang === 'en'){
			return;
		}
		$this.toggleClass('shrinked')
			.closest('table.l10n-data-table').find('td.'+$lang).toggleClass('shrinked');
	});
	$('.l10n-data-table th.all-lang').on('click', function(){
		var $this = $(this);
		$this.toggleClass('shrinked');
		if($this.hasClass('shrinked')){
			$this.closest('table.l10n-data-table').find('td.l, th.lang').addClass('shrinked');
			$this.closest('table.l10n-data-table').find('td.en, th.en').removeClass('shrinked');
		}else{
			$this.closest('table.l10n-data-table').find('td.l, th.lang').removeClass('shrinked');
		}
	});
	//only expand current language
	$('.l10n-data-table').each(function(){
		var $this = $(this);
		var $lang = $this.attr('lang');
		if($lang === 'en'){
			return;
		}
		var $th = $this.find('th.lang.'+$lang);
		if ($th.length){
			$this.find('th.all-lang').click();
			$th.click();
		}
	});
});


// Hair Dyes slider
$(function() {
	var $sliders = $(".hair-dye-slider-wrapper .slider");
	if(!$sliders.length){
		return;
	}
	var l10n = l10nFactory(mw.config.get( 'wgPageContentLanguage' ), {
		// time format: prefix + <time> + postfix
		en: {
			amPrefix: "",
			amPostfix: "&nbsp;AM",
			pmPrefix: "",
			pmPostfix: "&nbsp;PM"
		},
		zh: {
			amPrefix: "上午&nbsp;",
			amPostfix: "",
			pmPrefix: "下午&nbsp;",
			pmPostfix: ""
		}
	});
	var textTime = function(slidervalue) {
		var time = slidervalue*864 + 16200;
		time -= (time > 86400 ? 86400 : 0);
		if (time < 3600) {
			return l10n('amPrefix')
				+ Math.floor(time/3600 + 12) + ":" + Math.round((time/3600 + 12 - Math.floor(time/3600 + 12))*60).toString().padStart(2,0)
				+ l10n('amPostfix');
		} else if (time < 43200) {
			return l10n('amPrefix')
				+ Math.floor(time/3600) + ":" + Math.round((time/3600 - Math.floor(time/3600))*60).toString().padStart(2,0)
				+ l10n('amPostfix');
		} else if (time < 46800) {
			return l10n('pmPrefix')
				+ Math.floor(time/3600) + ":" + Math.round((time/3600 - Math.floor(time/3600))*60).toString().padStart(2,0)
				+ l10n('pmPostfix');
		} else {
			return l10n('pmPrefix')
				+ Math.floor(time/3600 - 12) + ":" + Math.round((time/3600 - 12 - Math.floor(time/3600 - 12))*60).toString().padStart(2,0)
				+ l10n('pmPostfix');
		}
	};
	var colorSpeed = function(slidervalue) {
		var num = slidervalue * 0.1;
		var num2 = 10;
		var num3 = num / num2;
		var num4 = 1 - num3;
		var playerHairColor = { "R": 215, "G": 90, "B": 55 };
		var newColor = { "R": 255, "G": 255, "B": 255 };
		newColor.R = (75 * num3 + playerHairColor.R * num4);
		newColor.G = (255 * num3 + playerHairColor.G * num4);
		newColor.B = (200 * num3 + playerHairColor.B * num4);
		return "rgb(" + newColor.R + "," + newColor.G + "," + newColor.B + ")";
	};
	var colorTime = function(slidervalue) {
		var time = slidervalue*864 + 16200;
		time -= (time > 86400 ? 86400 : 0);
		var color4 = { "R": 1, "G": 142, "B": 255 };
		var color5 = { "R": 255, "G": 255, "B": 0 };
		var color6 = { "R": 211, "G": 45, "B": 127 };
		var color7 = { "R": 67, "G": 44, "B": 118 };
		var newColor = { "R": 255, "G": 255, "B": 255 };
		if (time >= 16200 && time < 70200) {
			if (time < 43200) {
				var num5 = time / 43200;
				var num6 = 1 - num5;
				newColor.R = (color4.R * num6 + color5.R * num5);
				newColor.G = (color4.G * num6 + color5.G * num5);
				newColor.B = (color4.B * num6 + color5.B * num5);
			} else {
				var num7 = 43200;
				var num8 = ((time - num7) / (70200 - num7));
				var num9 = 1 - num8;
				newColor.R = (color5.R * num9 + color6.R * num8);
				newColor.G = (color5.G * num9 + color6.G * num8);
				newColor.B = (color5.B * num9 + color6.B * num8);
			}
		} else {
			if (time >= 70200 && time < 86400) {
				var num10 = (time / 86400);
				var num11 = 1 - num10;
				newColor.R = (color6.R * num11 + color7.R * num10);
				newColor.G = (color6.G * num11 + color7.G * num10);
				newColor.B = (color6.B * num11 + color7.B * num10);
			} else {
				var num12 = 0;
				var num13 = ((time - num12) / (16200 - num12));
				var num14 = 1 - num13;
				newColor.R = (color7.R * num14 + color4.R * num13);
				newColor.G = (color7.G * num14 + color4.G * num13);
				newColor.B = (color7.B * num14 + color4.B * num13);
			}
		}
		return "rgb(" + newColor.R + "," + newColor.G + "," + newColor.B + ")";
	};
	var colorFunc = function ($type, $value) {
		switch($type) {
			case "health":
				return "rgb(" + ($value * 2.35 + 20) + ",20,20)";
			case "mana":
				return "rgb(" + (250 - $value * 2) + "," + (255 - $value * 1.80) + ",255)";
			case "speed":
				return colorSpeed($value);
			case "time":
				return colorTime($value);
			default:
				return "#0ff";
		}
	};
	var textFunc = function ($type, $value) {
		// return the function from the textFunctions table if the id is correct
		// otherwise, return a fallback function that just returns the raw, unchanged slider value
		switch($type) {
			case "speed":
				return (($value === 100) ? "≥ 51" : Math.round($value/10 * 3.75*(15/11)));
			case "time":
				return textTime($value);
			default:
				return $value;
		}
	};
	var update = function($slider){
		var $value = parseInt($slider.data('input').val());
		var $type = $slider.data('type');
		// update color display
		$slider.data('colorBox').css('background-color', colorFunc($type, $value));
		// update text display
		$slider.data('valueBox').html(textFunc($type, $value));
	};
	// create all sliders and make them visible
	$sliders.each(function(){
		var $slider = $(this).append($("<input type='range' style='margin: auto 0.5em'/>"));
		var $wrapper = $slider.parents('.hair-dye-slider-wrapper').show();
		var $valueBox = $wrapper.find(".inputvalue");
		var $input = $slider.find('input').val($valueBox.text()).on('input', function() {
			update($slider);
		});
		$slider.val($valueBox.text()).data({
			valueBox: $valueBox,
			colorBox: $wrapper.find(".color-box"),
			input: $input,
			type: $wrapper.attr('id')
		});
		update($slider);
	});
});

/* broken under new fandom skin, waiting for fix.
// for mobile
$(function(){
    if( !$('body.skin-fandomdesktop').length ){
        return;
    }
	if("ontouchstart" in window){
		//click event can toggle hover effect.
		var procRule = function($rule){
			switch($rule.constructor.name){
				case "CSSStyleRule":
			  		if( $rule.selectorText.indexOf(':hover') == -1){
			  			return;
			  		}
			  		$rule.selectorText = $rule.selectorText.split(',').map(function($item){
			  			if($item.indexOf(':hover')){
			  				return $item + ', ' + $item.replace(':hover', '.hoverhover');
			  			}else{
			  				return $item;
			  			}
			  		}).join(', ');
			  		break;
			  	case "CSSMediaRule":
			  		for (var i = 0; i < $rule.cssRules.length; i++) {
						procRule( $rule.cssRules[i]);
					}
					break;
		  		default:
		  			//skip.
			  		break;
			  }
		}
		for (var i = 0; i < document.styleSheets.length; i++) {
			var styleSheet = document.styleSheets[i];
			try{
				for (var j = 0; j < styleSheet.cssRules.length; j++) {
						procRule( styleSheet.cssRules[j], styleSheet );
			
				}
			}
			catch(e){//cross domain
				//console.log('Access to stylesheet %s is denied. Ignoring...', styleSheet.href);
			}
		}
		
		$(".fandom-community-header__local-navigation .wds-dropdown__content .wds-list.wds-is-linked .wds-dropdown-level-2").on("click", function(event){
			$(this).toggleClass("expanded");
			event.preventDefault();
			event.stopPropagation();
		});
		$(".fandom-community-header__local-navigation .wds-dropdown__content .wds-list.wds-is-linked .wds-dropdown-level-2 > div").on("click", function(event){
			event.stopPropagation();
		});
		
		var $hoverhoverElement = null; 
		$("body, .fandom-community-header__local-navigation .more-menu .wds-dropdown__toggle").on("click", function(){
			if(!$hoverhoverElement){
				return;
			}
			$hoverhoverElement.removeClass('hoverhover');
			$hoverhoverElement.find('.expanded').removeClass('expanded');
			$hoverhoverElement = null;
		});
		$(".wds-dropdown:not(.more-menu) .wds-dropdown__toggle").click(function(event){
			var $box = $(this).closest(".wds-dropdown");
			if($hoverhoverElement && ($hoverhoverElement.get(0) != $box.get(0))){
				$hoverhoverElement.removeClass('hoverhover');
				$hoverhoverElement = null;
			}
			$box.toggleClass('hoverhover');
			if($box.hasClass('hoverhover')){
				$hoverhoverElement = $box;
			}
			event.preventDefault();
			event.stopPropagation();
		});
	}
});
*/