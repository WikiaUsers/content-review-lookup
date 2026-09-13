/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

// Test Tabber
mw.hook('wikipage.content').add(function ($content) {
    $content.find('.GJtabber').each(function () {
        var $tabber = $(this);
        $tabber.find('.GJtabber-tab-btn').on('click', function () {
            var idx = $(this).data('tab');
            $tabber.find('.GJtabber-tab-btn').removeClass('active');
            $tabber.find('.GJtabber-panel').removeClass('active');
            $(this).addClass('active');
            $tabber.find('.GJtabber-panel[data-tab="' + idx + '"]').addClass('active');
        });
    });
});

// Викификатор
if (wikiconfig.wgAction == 'edit' || wikiconfig.wgAction == 'submit') {
	importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Gadget-wikificator.js&action=raw&ctype=text/javascript');
}