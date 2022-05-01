mw.loader.using(['mediawiki.util', 'mediawiki.api'], function() {
    var config = mw.config.get([
        'wgNamespaceNumber',
        'wgTitle',
        'wgPageName'
    ]);
	
    if (
        window.AddArticleToCategoryLoaded ||
        config.wgNamespaceNumber !== 14
    ) return;
    window.AddArticleToCategoryLoaded = true;
	
	var lastSearch = 0,
		api,
		timeout,
		modal,
		wds,
		i18n;
		
	function searchResults(query) {
		var dropdown = $('#article-search-dropdown'),
			list = dropdown.find('.wds-list'),
			box = $('#article-search-form #article-search'),
			url = mw.util.wikiScript('wikia') + 
				'?controller=UnifiedSearchSuggestionsController&method=getSuggestions&format=json&query=' + 
				encodeURI(query);
				
		lastSearch = Date.now();
		
		$.get(url, function(data) {
			var suggestions = data.suggestions;
			list.empty();
			
			for (var index in suggestions) {
				list.append(
					$('<li>').append(
						$('<a>', {
							style: 'cursor: pointer',
							text: suggestions[index],
							click: function(e) { 
								e.preventDefault();
								e.stopImmediatePropagation();
								box.val($(this).text());
								dropdown.removeClass('wds-is-active');
								list.empty();
							}
						})
					)
				);
			}
			
			if (suggestions.length) {
				dropdown.addClass('wds-is-active');
			} else {
				dropdown.removeClass('wds-is-active');
			}
		});
	}
	
    function callback() {
		var dropdown = $('#article-search-dropdown'),
			list = dropdown.find('.wds-list'),
			box = $('#article-search-form #article-search');
			
		box.on("input", function() {
			var query = $(this).val(),
				elapsed = Date.now() - lastSearch;
			
			if (timeout) clearTimeout(timeout);
			if (elapsed > 1000) {
				searchResults(query);
			} else {
				timeout = setTimeout(function() {
					searchResults(query);
				}, 1000 - elapsed);
			}
		});
		box.on("blur", function() {
			if (!box.parent().is(":hover")) dropdown.removeClass('wds-is-active');
		});
		box.on("focus", function() {
			if (list.children().length) dropdown.addClass('wds-is-active');
		});
		
		$('.add-to-new').click(function(e) {
			e.preventDefault();
			appendCategory($('#article-search-form #article-search').val(),true);
		});
    }
	
    function appendCategory(page, isNew) {
        var options = {
            action: 'edit',
            title: page,
            summary: i18n.inContentLang().msg('summary').plain(),
            appendtext: '\n[[' + config.wgPageName + ']]',
            token: mw.user.tokens.get('csrfToken'),
            format: 'json'
        };
        $.post(mw.util.wikiScript('api'), options, function() {
            if (isNew) {
                window.location.href = mw.util.getUrl(page, {
                    action: 'edit'
                });
            } else {
                window.location.reload();
            }
        },'json');
    }
	
    function init(imports) {
		api = new mw.Api();
		wds = imports[1];
		i18n = imports[2];
		
		modal = new imports[0].Modal({
			id: 'article-search-form',
			title: i18n.msg('choose').escape(),
			size: 'small',
			content: $('<div>').append($('<div>', {
				style: 'text-align: center'
			}).append(
				$('<div>', {
					id: 'article-search-dropdown',
					'class': 'wds-dropdown wds-has-dark-shadow wds-no-chevron wds-is-not-hoverable'
				}).append(
					$('<input>', {
						type: 'text',
						id: 'article-search',
						style: 'width: 90%'
					}),
					$('<div>', {
						'class': 'wds-dropdown__content'
					}).append(
						$('<div>', {
							'class': 'wds-list wds-is-linked'
						})
					)
				),
                $('<br>'),
                $('<a>', {
                    'class': 'wds-button wds-is-secondary wds-is-squished add-to-new'
                }).append(
					wds.icon('add-small'),
                    $('<span>', { text: i18n.msg('insert').plain() })
                ).click(function() {
                    appendCategory($('#article-search-form #article-search').val(),true);
                })
            )).html()
		});
		modal.create();
		callback();
		
        $('.page-header__actions .wds-dropdown .wds-list').append(
            $('<li>').append(
                $('<a>', {
                    id: 'ca-add2cat',
                    text: i18n.msg('text').plain(),
                    click: function() { modal.show(); }
                })
            )
        );
		
		mw.util.addCSS('#article-search-form .oo-ui-dialog-content>.oo-ui-window-body,#article-search-form .oo-ui-window-content{overflow:visible}#article-search-form .oo-ui-window-body{z-index:4;border:1px solid var(--theme-border-color);border-left:none;border-right:none}#article-search-form .oo-ui-window-foot,#article-search-form .oo-ui-window-head{outline:0}');
    }
	
	Promise.all([
		new Promise(function(resolve) {
			mw.hook('dev.modal').add(resolve);
		}),
		new Promise(function(resolve) {
			mw.hook('dev.wds').add(resolve);
		}),
		new Promise(function(resolve) {
			mw.hook('dev.i18n').add(function(lib) {
				lib.loadMessages('AddArticleToCategory').done(resolve);
			});
		})
	]).then(init);
	
    importArticles({
        type: 'script',
        articles: [
			'u:dev:MediaWiki:I18n-js/code.js',
			'u:dev:MediaWiki:Modal.js',
			'u:dev:MediaWiki:WDSIcons/code.js'
		]
    });
});