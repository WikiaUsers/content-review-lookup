/**
 * @name   CheckJStatus
 * @desc   Provides a tool that can check the status of the local JavaScript pages without leaving current page
 * @author Kofirs2634
 * @author Caburum
 * @docs   [[w:c:dev:CheckJStatus]]
 */
$(function() {
	if (window.CheckJSPage || !$('#my-tools-menu').length) return;
	window.CheckJSPage = true;

    var c = mw.config.get(['wgTitle', 'wgArticlePath', 'wgUserLanguage']),
		pages = {},
		checkJSmodal, i18n, target;

    function makeRequest() {
		$('#cjsm-result').empty();
		target = $('#cjsm-input').val();
		target = target.charAt(0).toUpperCase() + target.slice(1) + '.js';

		// Add spinner
		var spinner = '<svg class="wds-spinner wds-spinner__block" width="78" height="78" viewBox="0 0 78 78" xmlns="http://www.w3.org/2000/svg"><g transform="translate(39, 39)"><circle class="wds-spinner__stroke" fill="none" stroke-width=""stroke-dasharray="238.76104167282426" stroke-dashoffset="238.76104167282426"stroke-linecap="round" r="38"></circle></g></svg>';
		$('<div>', {
		    css: {
		        'background': 'rgba(255, 255, 255, 0.5)',
		        'position': 'fixed',
		        'height': '100%',
		        'width': '100%',
		        'left': '0',
		        'top': '0',
		        'z-index': '1000000000'
		    },
		    html: spinner,
		    id: 'cjs-spinner'
		}).appendTo(document.body);

		$.get(mw.util.getUrl('Special:JSPages', {
			uselang: c.wgUserLanguage
		}), function(data) {
			var $data = $(data);

			$data.find('table.content-review__table > tbody > tr').each(function() {
				var $children = $(this).children(),
				$page = $children.eq(0);

				pages[$page.text().trim()] = {
					latestStatus: $children.eq(1).html(),
					lastStatus: $children.eq(2).html(),
					liveStatus: $children.eq(3).html()
				};
			});
		}).done(function(data) {
			var basePath = 'MediaWiki:' + target;

            $('#cjsm-result').append($('<div>', { id: 'cjsm-nav' }));

            // Navigation
            $('#cjsm-nav').append($('<a>', {
                href: c.wgArticlePath.replace('$1', basePath),
                text: target
            })).append($('<span>', { text: ' (' }))
            .append($('<a>', {
                href: c.wgArticlePath.replace('$1', basePath + '?action=edit'),
                text: i18n.msg('links-edit').plain()
            })).append($('<span>', { text: ' | ' }))
            .append($('<a>', {
                href: c.wgArticlePath.replace('$1', basePath + '?action=raw'),
                text: i18n.msg('links-raw').plain()
            })).append($('<span>', { text: ' | ' }))
            .append($('<a>', {
                href: c.wgArticlePath.replace('$1', basePath + '?action=history'),
                text: i18n.msg('links-history').plain()
            })).append($('<span>', { text: ')' }));

            // Statuses
            if(pages[target]) {
	            $('#cjsm-result').append(pages[target].latestStatus)
	            .append(pages[target].lastStatus)
	            .append(pages[target].liveStatus);
            } else {
            	var none = '<div class="content-review__status content-review__status--none">' + i18n.msg('none').plain() + '</div>'
            	$('#cjsm-result').append(none).append(none).append(none);
            }

            // Remove spinner
            $('#cjs-spinner').remove();
        });
    }

    function showModal() {
    	if (checkJSmodal) {
    		checkJSmodal.show();
    		return;
    	}
        checkJSmodal = new window.dev.modal.Modal({
            title: i18n.msg('modal-title').plain(),
            content: '<div id="cjsm-container"></div>',
            size: 'medium',
            id: 'checkJSmodal',
            buttons: [{
                primary: true,
                text: i18n.msg('check').plain(),
                id: 'cjsm-get',
                event: 'req'
            }],
            events: { req: makeRequest }
        });
        checkJSmodal.create();
        $('#cjsm-container').append($('<a>', {
            href: c.wgArticlePath.replace('$1', 'Special:JSPages'),
            text: i18n.msg('all-pages').plain(),
            style: 'float: right'
        }))
        .append($('<span>', {
            text: 'MediaWiki:',
            style: 'font-weight: bold'
        }))
        .append($('<input>', { id: 'cjsm-input' }))
        .append($('<span>', {
            text: '.js',
            style: 'font-weight: bold'
        }))
        .append($('<div>', { id: 'cjsm-result' }));
        checkJSmodal.show();
    }

	function init() {
	    $('#my-tools-menu').prepend($('<li>', { 'class': 'custom' })
	    .append($('<a>', {
	        href: '#',
	        text: 'Check JStatus',
	        click: showModal
	    })));
	}

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Modal.js',
            'u:dev:MediaWiki:I18n-js/code.js'
        ]
    });
    importArticle({
		type: 'style',
		article: 'u:dev:MediaWiki:CheckJStatus.css'
    });
    mw.hook('dev.i18n').add(function(i18np) {
        i18np.loadMessages('CheckJStatus').then(function(i18np) {
            i18n = i18np;
            i18n.useUserLang();
            mw.hook('dev.modal').add(function() { init() });
        });
    });
});