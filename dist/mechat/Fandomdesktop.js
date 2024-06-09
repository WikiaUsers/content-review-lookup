$(document).ready(function () {
  // Set initial state (expanded) and create [Collapse] button for headers with .mw-headline
  $('h2, h3, h4').each(function () {
    if ($(this).find('.mw-headline').length > 0) {
      $(this).data('isExpanded', true); // Initialize as expanded
      var toggleButton = $('<button class="ntoggler">Collapse</button>');
      $(this).append(toggleButton); // Add the toggle button
    }
  });

  // Attach the click event to the ntoggler button inside headers
  $('body').on('click', 'button.ntoggler', function (event) {
    event.stopPropagation(); // Prevent event propagation

    var $header = $(this).closest('h2, h3, h4'); // Get the parent header
    var headerTag = $header.prop('tagName'); // Get the header tag name (e.g., 'H2')
    var level = parseInt(headerTag.charAt(1)); // Extract level (e.g., 2 for 'H2')
    var isExpanded = $header.data('isExpanded');
    var buttonText = isExpanded ? 'Expand' : 'Collapse'; // Determine the new button text

    // Update the button text
    $(this).text(buttonText);

    // Toggle the state
    $header.data('isExpanded', !isExpanded);

    // Collapse or expand all subsequent headers of a lower level
    $header.nextAll().each(function () {
      var nextHeaderTag = $(this).prop('tagName');
      var nextLevel = parseInt(nextHeaderTag.charAt(1));

      if (nextLevel <= level) {
        return false; // Stop if encountering a header of the same or higher level
      }

      if (isExpanded) {
        // Collapse
        $(this).slideUp('fast');
        $(this).find('button.ntoggler').text('Expand');
        $(this).data('isExpanded', false);
      } else {
        // Expand
        $(this).slideDown('fast');
        $(this).find('button.ntoggler').text('Collapse');
        $(this).data('isExpanded', true);
      }
    });
  });

  // Prevent collapse on .mw-headline or .mw-editsection clicks
  $('body').on('click', '.mw-headline, .mw-editsection', function (event) {
    event.stopPropagation(); // Prevent triggering collapse
  });
});