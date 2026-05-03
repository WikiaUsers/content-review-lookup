/* Wyrdverse — Contents tab toggle */
$(function () {
  $(document).on('click', '.page-side-tools__wrapper', function (e) {
    if (e.target !== this) return;
    var $toc = $('#toc, .toc').first();
    if ($toc.length) {
      $toc.toggleClass('wv-toc-open');
      $('body').toggleClass('wv-toc-visible');
    }
  });
});