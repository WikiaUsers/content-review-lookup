// Set initial state (expanded) and create [Collapse] button
$('h2, h3, h4, h5, h6').each(function () {
  // Check if the heading is created by ==text==
  if ($(this).find('.mw-headline').length > 0) {
    $(this).data('isExpanded', true);

    var toggleButton = $('<button class="ntoggler">Collapse</button>');
    $(this).append(toggleButton);
  }
});

// Attach the click event to h2, h3, h4, h5, h6 headers
$('body').on('click', 'h2, h3, h4, h5, h6', function () {
  // Check if the heading is created by ==text==
  if ($(this).find('.mw-headline').length > 0) {
    // Select everything until the next heading of the same level
    var $contentToToggle = $(this).nextUntil(this.tagName);

    // Toggle the visibility of the content
    $contentToToggle.slideToggle('fast');

    // Toggle the text of the button (Collapse / Expand)
    var buttonText = $(this).data('isExpanded') ? 'Expand' : 'Collapse';
    $(this).find('.ntoggler').text(buttonText);

    // Toggle the state
    $(this).data('isExpanded', !$(this).data('isExpanded'));
  }
});