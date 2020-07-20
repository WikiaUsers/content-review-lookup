$(function() {
    'use strict';

    function init(i18n) {
        $(window.copyButtonPosition || 'div.mw-geshi.mw-content-ltr.pi-data-value').prepend($('<div>', {
            id: 'CopyCodeButton',
            text: i18n.msg('copy').plain()
        }));

        $('#CopyCodeButton').prepend($('<span>', {
            id: 'CopyCodeButtonHover'
        }));

        if ($('#CopyCodeButton').exists()) {
            document.querySelector('#CopyCodeButton').addEventListener('click', function() {
                $('#CopyCodeButton').click();
                var range = document.createRange();
                range.selectNode(document.querySelector(window.syntaxHighLightArea || 'div.javascript.source-javascript'));
                window.getSelection().addRange(range);
                try {
                    document.execCommand('copy');
                } catch(err) {
                    console.log(i18n.msg('error').plain());
                }
                window.getSelection().removeAllRanges();
            });
        }
    }
    mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('CopyCodeButton').then(init);
	});
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:CopyCodeButton.css'
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
});