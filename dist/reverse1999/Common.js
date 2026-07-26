/* Any JavaScript here will be loaded for all users on every page load. */

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