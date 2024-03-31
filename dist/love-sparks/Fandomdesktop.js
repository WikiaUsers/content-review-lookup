/* Copied from MeChat Wiki */
// Set initial state (expanded) and create [Collapse] button
$('h2, h3').each(function () {
  // Check if the heading is created by ==text==
  if ($(this).find('.mw-headline').length > 0) {
    $(this).data('isExpanded', true);

    var toggleButton = $('<button class="ntoggler">Collapse</button>');
    $(this).append(toggleButton);
  }
});

// Attach the click event to h2, h3 headers
$('body').on('click', 'h2, h3', function (event) {
  // Check if the heading is created by ==text==
  if ($(this).find('.mw-headline').length > 0) {
    // Check if the click target is the text
    if ($(event.target).hasClass('mw-headline')) {
      // If so, proceed with editing
      return;
    }

    // Check if the click target is the editing symbol
    if ($(event.target).closest('.mw-editsection').length > 0) {
      // If the header is expanded, proceed with editing
      if ($(this).data('isExpanded')) {
        return;
      }
      // If the header is collapsed, navigate to the edit page
      event.preventDefault();
      window.location.href = $(event.target).closest('.mw-editsection').find('a').attr('href');
      return;
    }
  }
});

// Attach the click event only to .ntoggler buttons
$('body').on('click', '.ntoggler', function () {
  var $header = $(this).closest('h2, h3');

  // Toggle the visibility of the content
  $header.nextUntil($header.nextAll('h2, h3')).slideToggle('fast');

  // Toggle the text of the button (Collapse / Expand)
  var buttonText = $header.data('isExpanded') ? 'Expand' : 'Collapse';
  $(this).text(buttonText);

  // Toggle the state
  $header.data('isExpanded', !$header.data('isExpanded'));
});