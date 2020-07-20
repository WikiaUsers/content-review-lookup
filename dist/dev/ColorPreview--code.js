(function () {
    if (
        window.ColorPreviewLoaded ||
        (mw.config.get('wgAction') !== 'edit' && mw.config.get('wgAction') !== 'submit')
    ) {
        return;
    }
    function init (i18n) {
        $('#mw-content-text').prepend(
            $('<h2>', {
                text: i18n.msg('colorPreview').plain()
            }),
            $('<div>', {
                id: 'colorbox'
            }).append(
                $('<p>', {
                    id: 'sample'
                }),
                $('<textarea>', {
                    id: 'colorhex',
                    rows: '1'
                })
            ),
            $('<hr/>')
        );
        $('#colorhex').keyup(function() {
            var hexColor,
                value = $('#colorhex').val();
            if (value[0] === '#') {
                hexColor = $('#colorhex').val();
            } else if (value !== '') {
                hexColor = '#' + $('#colorhex').val();
            } else {
                hexColor = '';
            }
            $('#sample').html('<span style="color:' + hexColor + '; background-color:' + hexColor + ';">' + hexColor + '</span>');
        });
    }
	mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('ColorPreview').then(init);
	});
	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})();