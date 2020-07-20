(function() {
    var config = mw.config.get([
        'wgNamespaceNumber',
        'wgCityId',
        'wgPageName',
        'wgServer'
    ]);
    
    if (config.wgNamespaceNumber !== 500) {
        return;
    }
    var i18n;
    function addAnnouncement() {
        var ajaxProps = {
            action: 'parse',
            page: config.wgPageName,
            format: 'json',
            section: 0,
            disablepp: 1
        };
        $.get(mw.util.wikiScript('api'), ajaxProps, function(res) {
            var text = $(res.parse.text['*']).text().trim();
            if(!text.length) {
                ajaxProps.section = 1;
                $.get(mw.util.wikiScript('api'), ajaxProps, function(res) {
                    var html = $.parseHTML(res.parse.text['*']);
                    // remove headline
                    html.shift();
                    var text = $('<div />').append(html).text().trim();
                    if(text.length > 100) {
                        text = text.slice(0, 99) + '\u2026';
                    }
                    confirmDialog(text);			
                });
                return;
            }
            else if(text.length > 100) {
                text = text.slice(0, 99) + '\u2026';
            }
            confirmDialog(text);
        });
    }
 
    function saveAnnouncement(text, dialog) {
        var isWikiaOrg = config.wgServer.indexOf('wikia.org') !== -1;
        
        dialog.find('.wds-button[data-action="ok"]').prop('disabled', true);
		dialog.find('.wds-dialog__notification').hide();
        $.ajax({
            url: 'https://services.' + (isWikiaOrg ? 'wikia.org' : 'fandom.com') + '/announcements/' + config.wgCityId + '/announcements',
            type: 'POST',
            contentType: 'application/json',
            processData: false,
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify({
                text: text,
                url: window.location.href
            }),
            success: function(res) {
                dialog.find('.wds-dialog__notification').text(i18n.msg('success').plain()).css('color', '#4cda9a').show(); // $wds-color-success
            },
            error: function(e) {
                dialog.find('.wds-dialog__notification').empty().append(i18n.msg('error').plain(), '<br />', JSON.parse(e.responseText).title).css('color', '#d71035').show(); // $wds-color-alert
                console.error(JSON.parse(e.responseText).title);
            },
            dataType: 'json'	
        });
    }
    
    function confirmDialog(text) {
        var dialog = $('<div />', { class: 'wds-dialog__curtain' });
        dialog.append(
        	$('<div />', { class: 'wds-dialog__wrapper' }).append(
        		$('<div />', { class: 'wds-dialog__title', text: i18n.msg('confirm-title').plain() }),
        		$('<div />', { class: 'wds-dialog__content' }).append(
					$('<p />', { class: 'wds-dialog__notification' }).hide(),
					$('<p />', { text: i18n.msg('confirm-text').plain() })
				),
        		$('<div />', { class: 'wds-dialog__actions' }).append(
        			$('<button />', { class: 'wds-button wds-is-text wds-dialog__actions-button', 'data-action': 'abort', text: i18n.msg('abort').plain() }).click(function() {
        				dialog.detach();
                    }),
        			$('<button />', { class: 'wds-button wds-is-text wds-dialog__actions-button', 'data-action': 'ok', text: i18n.msg('ok').plain() }).click(saveAnnouncement.bind(this, text, dialog))
        		)
            )
        ).appendTo(mw.util.$content);
    }
 
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('AddAnnouncement').done(function(d) {
            i18n = d;
                $('<button />', {
					type: 'checkbox',
					id: 'addAnnouncement',
					text: i18n.msg('add').plain()
				}).click(addAnnouncement).appendTo(mw.util.$content);
        });
    });
    importArticle({ type:'script', article: 'u:dev:I18n-js/code.js' });
})();