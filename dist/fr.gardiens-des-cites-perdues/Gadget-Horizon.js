/*** HYDRAREVIVED ***/

$(function() {
	var config = mw.config.get([
			'skin',
			'wgRailModuleParams',
			'wgSiteName',
			'wgUserLanguage',
			'wgWikiaBarSkinData',
			'wgArticlePath'
		]);
    
	if (window.HydraRevivedReady || config.skin !== 'fandomdesktop') return;
	window.HydraRevivedReady = true;
	
	function msg(key, params) {
		return new Promise(function(resolve) {
			if (mw.message(key, params).exists()) {
				resolve(mw.message(key, params).text());
			} else {
				var name = key + '__' + config.wgUserLanguage;
				var val = $.cookie(name);
				if (val) {
					mw.messages.set({key: val});
					resolve(val);
				} else {
					mw.loader.using('mediawiki.api').done(function() {
						new mw.Api().loadMessagesIfMissing([key]).done(function() {
							var msg = mw.message(key, params);
							if (msg.exists()) $.cookie(name, msg.text(), { 
								expires: 7, 
								domain: 'fandom.com', 
								path: '/'
							});
							resolve(msg.text());
						});
					});
				}
			}
		});
	}
	
    /* Append body class */
    $('body').addClass('hydra-revived-ready');

    /* Add fancy tooltips for wiki tools */
    $('.fandom-community-header .wiki-tools .wds-button').each(function(index, element) {
        var $element = $(element);
        $element.attr('data-title', $element.attr('title'));
        $element.removeAttr('title');
    });

    /* Add page head */
	var $head = $('<div class="page__head">'),
        $left = $('<div class="page-tabs__left">').appendTo($head),
        $right = $('<div class="page-tabs__right page-header__actions" id="p-views">').appendTo($head),
        $more = $('<div class="wds-dropdown more-actions">' + 
					'<div class="wds-dropdown__toggle"><span class="head-tab">More</span></div>' + 
					'<div class="wds-dropdown__content wds-is-not-scrollable"><ul class="wds-list wds-is-linked" id="p-cactions"></ul></div>' +
				'</div>'),
		$moreList = $more.find('.wds-list');
		
	msg('fd-community-header-more').then(function(text) {
		$more.find('.wds-dropdown__toggle span').text(text);
	});

	var actions = config.wgWikiaBarSkinData.contentActions,
		$views = $('#p-views');
		$cactions = $('#p-cactions');
		
	if (actions) {
		$.each(actions, function(key, action) {
			var $tab = $cactions.find('#' + action.id).removeClass().addClass(action.class);
			
			if (!$tab.length) {
				if (key == 'share') {
					$tab = $('<div class="wds-dropdown" id="ca-share">' + 
							'<div class="wds-dropdown__toggle"><span class="head-tab">Share</span></div>' + 
							'<div class="wds-dropdown__content wds-is-not-scrollable">' + action.html + '</div>' +
						'</div>');
						
					msg('sharing').then(function(text) {
						$tab.find('.wds-dropdown__toggle span').text(text);
					});
				} else {
					$tab = $('<a>', {
						class: action.class,
						id: action.id,
						accesskey: action.accesskey,
						href: action.href,
						text: action.text
					});
				}
			}
			
			if (key.indexOf('nstab') > -1 || key === 'talk' || key === 'share') {
				if (!$tab.hasClass('wds-dropdown')) $tab.addClass('head-tab');
				$tab.appendTo($left);
			} else if (action.primary || key === 'history') {
				if (!$tab.hasClass('wds-dropdown')) $tab.addClass('head-tab');
				$tab.addClass('head-tab').appendTo($right);
			} else {
				$('<li>').append($tab).appendTo($moreList);
			}
		});
	}
	
	/* Append remaining items from more dropdown */
	$cactions.find('.wds-list > li:not(:empty)').appendTo($moreList);
	
	/* Append more dropdown */
	if ($moreList.children().length) {
		$more.appendTo($right);
	}
	
	/* Remove old action area */
	$views.remove();

    /** Search **/
    var $form = $('<form>', {
            action: config.wgArticlePath.replace('$1', 'Special:Search'),
            id: 'searchform'
        }),
        $bar = $('<div>', {
            id: 'simpleSearch',
            append: [
                $('<input>', {
                    type: 'hidden',
                    value: 'Special:Search',
                    name: 'title'
                }),
                $('<input>', {
                    type: 'submit',
                    name: 'go',
                    value: 'Rechercher',
                    title: 'Rechercher',
                    id: 'searchButton',
                    class: 'searchButton'
                })
            ],
            appendTo: $form
        }),
        $box = $('<input>', {
            type: 'search',
            name: 'search',
            placeholder: 'Rechercher sur ' + config.wgSiteName,
            title: 'Rechercher sur ' + config.wgSiteName,
            id: 'searchInput',
            tabindex: '1',
            prependTo: $bar
        }).attr('autocomplete', 'off');

    $right.append($form);
    $('.resizable-container .page').prepend($head);

    /* Enable autocomplete */
    mw.loader.using('mediawiki.searchSuggest');
});