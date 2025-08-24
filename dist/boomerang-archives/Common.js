(function () {
  function init($root) {
    ($root || $(document)).find('.mw-spoiler-modal-wrapper').each(function () {
      var $wrap = $(this);
      if ($wrap.data('spoiler-ready')) return;
      $wrap.data('spoiler-ready', true);

      // Unique modal ID
      var modalId = 'mw-spoiler-modal-' + Math.random().toString(36).slice(2, 9);
      var $modal = $wrap.find('.mw-spoiler-modal');
      $modal.attr('id', modalId);

      var $btn = $wrap.find('.mw-spoiler__trigger');
      $btn.attr('aria-controls', modalId);

      // Open
      $btn.on('click', function () {
        $modal.show();
      });

      // Close (X button)
      $wrap.find('.mw-spoiler-modal__close').on('click', function () {
        $modal.hide();
      });

      // Close when clicking backdrop
      $modal.on('click', function (e) {
        if ($(e.target).is($modal)) {
          $modal.hide();
        }
      });
    });
  }

  if (window.mw && mw.hook) {
    mw.hook('wikipage.content').add(init);
  } else {
    $(init);
  }
})();