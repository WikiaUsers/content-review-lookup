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
// Test2
document.addEventListener('click', function (e) {
  var img = e.target.closest('.fw-icons img');
  if (!img) return;

  var name = img.alt
    .replace(/^False Frights\s*-\s*/i, '')   // Убирает префикс False Frights
    .replace(/\s*(FW\s*)?Icon\s*$/i, '')     // То же, но префикс FW или Icon
    .trim();

  document.querySelectorAll('.fw-panel-wrap .fw-slide').forEach(function (slide) {
    slide.style.display = (slide.dataset.name === name) ? 'block' : 'none';
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var first = document.querySelector('.fw-panel-wrap .fw-slide');
  if (first) first.style.display = 'block';
});


// Викификатор
if (wikiconfig.wgAction == 'edit' || wikiconfig.wgAction == 'submit') {
	importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Gadget-wikificator.js&action=raw&ctype=text/javascript');
}