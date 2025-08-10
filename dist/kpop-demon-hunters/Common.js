mw.hook('wikipage.content').add(function ($c) {
  var $tocs = $c.find('#toc, .toc');
  if (!$tocs.length) return;

  // start closed
  $tocs.removeClass('toc-open');

  // toggle when clicking the title row—except the native [hide] control
  $c.on('click', '#toctitle, .toctitle', function (e) {
    if ($(e.target).closest('.toctoggle').length) return; // let [hide] work
    var $box = $(this).closest('#toc, .toc');
    $box.toggleClass('toc-open');
    $(this).attr('aria-expanded', $box.hasClass('toc-open') ? 'true' : 'false');
  });
});