/* Any JavaScript here will be loaded for all users on every page load. */

/**
 * common l10n factory
 */
var l10nFactory = function($lang, $data) {
    return function ($key) {
        return $data[$key] && ($data[$key][$lang] || $data[$key]['en']) || '';
    };
};

// AJAX tables
$(function() {
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
		if (needLink) {
			headerLinks.html('[<a href="javascript:;" class="ajax-load-link">show data</a>]');
		}
		table.find(".ajax-load-link").parent().addBack().filter('a').click(function(event) {
			event.preventDefault();
			var sourceTitle = table.data('ajax-source-page'), baseLink = mw.config.get('wgScript') + '?';
			cell.text('Please wait, the content is being loaded...');
			$.get(baseLink + $.param({ action: 'render', title: sourceTitle }), function (data) {
				if (!data) {
					return;
				}
				cell.html(data);
				cell.find('.ajaxHide').remove();
				cell.find('.mod-logo').remove(); // remove mod logo image
				cell.find('.terraria:not(.ajaxForceTerraria)').removeClass('terraria');
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
					cell.toggle(shown);
					$(this).text(shown ? "hide" : "show");
				}).appendTo(headerLinks);
				headerLinks.append(document.createTextNode(']'));
			}).error(function() {
				cell.text('Unable to load table; the source article for it might not exist.');
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * custom control for {{Template:sound}}
 * Original ported from https://minecraft.gamepedia.com/MediaWiki:Gadget-sound.js.
 */
$(function(){
    var l10n = l10nFactory(mw.config.get( 'wgUserLanguage' ),{
        'playTitle': {
            'en': 'Click to play',
            'de': 'Zum Abspielen anklicken',
            'fr': 'Cliquer pour jouer',
            'pt': 'Clique para jogar',
            'pl': 'Naciśnij by odtworzyć',
            'ru': 'Щёлкните, чтобы воспроизвести',
            'zh': '点击播放',
            'zh-cn': '点击播放'
        },
        'stopTitle': {
            'en': 'Click to stop',
            'de': 'Zum Beenden anklicken',
            'fr': 'Cliquer pour arrêter',
            'pt': 'Clique para parar',
            'pl': 'Naciśnij by zatrzymać',
            'ru': 'Щёлкните, чтобы остановить',
            'zh': '点击停止',
            'zh-cn': '点击停止'
        }
    });

    $('.mw-parser-output .sound').prop('title', l10n('playTitle')).on('click', function(e){
        // Ignore links
        if (e.target.tagName === 'A') {
            return;
        }
        var audio = $(this).find('.sound-audio')[0];
        if (audio) {
            audio.paused ? audio.play() : audio.pause();
        }
    }).find('.sound-audio').on('play', function(){
        // Stop any already playing sounds
        var playing = $('.sound-playing .sound-audio')[0];
        playing && playing.pause();
        $(this).closest('.sound').addClass('sound-playing').prop('title', l10n('stopTitle'));
    }).on('pause', function(){
        // Reset back to the start
        this.currentTime = 0;
        $(this).closest('.sound').removeClass('sound-playing').prop('title', l10n('playTitle'));
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////