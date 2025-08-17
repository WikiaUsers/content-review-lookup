$(function () {
  if (mw.config.get('wgNamespaceNumber') === 0) { // 0 = espace principal (articles)
    var banner = $('<div>')
      .addClass('custom-global-banner')
      .html('📌 <b>Note :</b> Cet article concerne</b>.')
      .css({
        backgroundColor: '#ffffff',
        border: '2px solid #0000ff',
        padding: '8px',
        margin: '10px 0',
        textAlign: 'center',
        fontSize: '1em'
      });

    $('#mw-content-text').prepend(banner);
  }
});
/* global mw, jQuery */
(function ($, mw) {
  // N'affiche pas sur les pages spéciales ni en mode non "view"
  if (mw.config.get('wgNamespaceNumber') < 0 || mw.config.get('wgAction') !== 'view') return;

  mw.loader.using(['mediawiki.util']).then(function () {

    // Styles du bandeau (évite le inline CSS)
    mw.util.addCSS(
      '#tintin-move-banner{background:#fff3cd;border:2px solid #f28500;padding:10px;text-align:center;font-size:110%;font-weight:700;margin-bottom:10px}' +
      '#tintin-move-banner a{color:#d35400;text-decoration:none;border-bottom:1px dotted #d35400}'
    );

    function injectBanner($root) {
      if (document.getElementById('tintin-move-banner')) return; // évite les doublons
      var html = '⚠️ Ce site web a déménagé ! Retrouvez-nous sur ' +
                 '<a href="https://tintinpedia.fr" rel="nofollow">Tintinpédia</a>';
      var $banner = $('<div>', { id: 'tintin-move-banner', html: html });
      $root.prepend($banner);
    }

    // S'accroche au bon conteneur selon la page/skin
    function addNow() {
      var $target = $('#mw-content-text, .mw-parser-output').first();
      if ($target.length) injectBanner($target);
    }

    // 1) au chargement initial
    addNow();
    // 2) si Fandom réinjection dynamique du contenu
    mw.hook('wikipage.content').add(function ($content) {
      injectBanner($content);
    });
  });
})(jQuery, mw);