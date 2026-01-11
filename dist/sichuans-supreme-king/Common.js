// Load Developer Wiki scripts
importArticles({
  type: 'script',
  articles: [
    'u:dev:BackToTopButton/code.js',       // Adds a back-to-top button
    'u:dev:ReferencePopups/code.js',       // Enables popups for references
    'u:dev:DisplayClock/code.js'           // Adds a live UTC clock to header
  ]
});

// Example: Custom JS for highlighting the main heading
$(document).ready(function () {
  $('.main-page h1').css('border-bottom', '2px solid #3498db');
});


$(document).ready(function() {
  $('.collapsible-section').each(function() {
    var $header = $(this);
    var $content = $header.nextUntil('h2, .collapsible-section');
    $content.wrapAll('<div class="collapsible-content"></div>');
    var $wrapper = $header.next('.collapsible-content');
    $wrapper.hide();

    $header.css('cursor', 'pointer').append('<span class="toggle-arrow"> ▼</span>');
    $header.on('click', function() {
      $wrapper.slideToggle();
      var $arrow = $header.find('.toggle-arrow');
      $arrow.text($wrapper.is(':visible') ? ' ▲' : ' ▼');
    });
  });
});