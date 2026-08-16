/* Any JavaScript here will be loaded for all users on every page load. */
//Test for tooltip that goes beyond the edges
mw.hook('wikipage.content').add(function($content) {

    function checkBoundary($text) {
        if (!$text.length) return;

         // Reset classes to for flips
        $text.removeClass('flip-left flip-right');

        var rect = $text[0].getBoundingClientRect();
        var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

        if (rect.right > viewportWidth - 15) {
            $text.addClass('flip-left');
        } else if (rect.left < 15) {
            $text.addClass('flip-right');
        }
    }

    var $tooltips = $content.find('.tooltip');

    $tooltips.each(function() {
        checkBoundary($(this).children('.tooltiptext'));
    });

    $tooltips.on('mouseenter', function() {
        checkBoundary($(this).children('.tooltiptext'));
    });
});

// Blocks the page jump completely
mw.hook('wikipage.content').add(function($content) {
  $content.find('.no-snap a[href^="#"], a.no-snap[href^="#"]').on('click', function(e) {
    e.preventDefault(); 
    
    var targetId = $(this).attr('href'); 
    
    if (targetId && targetId !== '#') {
      var $target = $(targetId);
      
      if ($target.length) {
        
        $target.siblings().each(function() {
          this.style.setProperty('display', 'none', 'important');
        });
        
        $target[0].style.setProperty('display', 'block', 'important');
        
        history.pushState(null, null, targetId);
      }
    }
  });
});

// Back to top button
window.BackToTopModern = true;
// to use modern

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BackToTopButton/code.js'
    ]
});