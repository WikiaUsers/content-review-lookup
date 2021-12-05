/* 
 * HydraRevived
 * 
 * Introduces some elements from the legacy Hydra skin to FandomDesktop
 * 
 * This script is NOT intended to re-create Hydra pixel for pixel, but rather to 
 * provide an experience similar to Hydra while retaining useful and important
 * features from FandomDesktop.
 * 
 * @author Joritochip
 */

/* TODO: Move tools and language select to sidebar */

$(function() {
	var config = mw.config.get([
			'skin',
			'wgRailModuleParams',
			'wgSiteName',
			'wgUserLanguage',
			'wgWikiaBarSkinData'
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

    /* Make sidebar dropdowns collapsible */
    $('.fandom-community-header .fandom-community-header__local-navigation .wds-dropdown').each(function(index, element) {
        var $element = $(element);
        $element.addClass('wds-collapsible-panel');
        $element.find('.wds-dropdown__toggle.first-level-item').addClass('wds-collapsible-panel__header');
        $element.find('.wds-dropdown__content').attr('class', 'wds-is-not-scrollable wds-collapsible-panel__content');
        $element.find('.wds-dropdown__toggle.first-level-item > .wds-dropdown__toggle-chevron').replaceWith(
            $('<svg class="wds-icon wds-icon-tiny wds-collapsible-panel__chevron"><use xlink:href="#wds-icons-menu-control-tiny"></use></svg>')
        );
    });

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
            action: '/index.php',
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
                    value: 'Go',
                    title: 'Go to a page with this exact name if it exists',
                    id: 'searchButton',
                    class: 'searchButton'
                })
            ],
            appendTo: $form
        }),
        $box = $('<input>', {
            type: 'search',
            name: 'search',
            placeholder: 'Search ' + config.wgSiteName,
            title: 'Search ' + config.wgSiteName,
            id: 'searchInput',
            tabindex: '1',
            autocomplete: 'off',
            prependTo: $bar
        });

    $right.append($form);
    $('.resizable-container .page').prepend($head);

    /* Enable autocomplete */
    mw.loader.using('mediawiki.searchSuggest');
});