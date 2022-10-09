/* Any JavaScript here will be loaded for all users on every page load. */

/* Table Filter */
importArticles(
    {    
        type: 'script',
        articles: [   
            'u:pad:MediaWiki:FilterTable.js'
        ]
    }
);

/* Gallery Swap */
;(function(mw, $) {
  var swap = function(el) {
    $el = $(el);
    $active = $el.find('.active');
    $next = $active.next();
    if ($next.length === 0 ) {
      $next = $el.children().first();
    }
    $active.removeClass('active');
    $next.addClass('active');
  }

  $('.gallery-swap-images').each(function() {
    var self = this;
    var delay = $(this).hasClass('gallery-swap-images--speed-fast') ? 2000 : 7000;
    if ($(this).hasClass('gallery-swap-images--shuffle')) {
    	$(this).html(
    		$(this).children().sort(function() { return Math.random() - 0.5; })
    	);
    }
    $(this).addClass('enabled');
    $(this).children().first().addClass('active');
    setInterval(function() {
      swap(self);
    }, delay);
  });
})(mediaWiki, jQuery);