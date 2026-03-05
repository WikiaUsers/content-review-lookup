mw.hook('wikipage.content').add(function ($content) {
  $content.find('.rarity-nav-wrapper').each(function () {
    var $wrapper = $(this);
    var $items = $wrapper.find('.rarity-item');
    var $label = $wrapper.find('.rarity-label');

    var pageName = mw.config.get('wgPageName') || '';
    pageName = pageName.replace(/_/g, ' ').toLowerCase();

    function selectItem($item) {
      $items.removeClass('selected');
      $item.addClass('selected');

      var tier = $item.data('tier');
      var text = $item.data('label');

      $label
        .text(text)
        .removeClass()
        .addClass('rarity-label color-' + tier);
    }

    var matched = false;

    var pageWords = pageName.split(/\s+/);
    
    $items.each(function () {
      var $item = $(this);
      var label = ($item.data('label') || '').toLowerCase();
      
      for (var i = 0; i < pageWords.length; i++) {
        if (pageWords[i] === label) {
          selectItem($item);
          matched = true;
          return false;
        }
      }
    });

    if (!matched) {
      selectItem($items.first());
    }

    $items.on('mouseenter', function () {
      selectItem($(this));
    });
  });
});