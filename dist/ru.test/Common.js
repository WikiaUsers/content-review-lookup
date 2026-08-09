/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

// Test Tabber
$(document).on('click', '.GJtabber-tab-btn', function () {
    var $btn = $(this);
    var $tabber = $btn.closest('.mytabber');
    var idx = $btn.data('tab');
    $tabber.find('.GJtabber-tab-btn').removeClass('active');
    $tabber.find('.GJtabber-panel').removeClass('active');
    $btn.addClass('active');
    $tabber.find('.GJtabber-panel[data-tab="' + idx + '"]').addClass('active');
});

// Викификатор
if (wikiconfig.wgAction == 'edit' || wikiconfig.wgAction == 'submit') {
	importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Gadget-wikificator.js&action=raw&ctype=text/javascript');
}