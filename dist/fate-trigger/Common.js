/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function () {
  $('.filter-button').on('click', function () {
    var filter = $(this).data('filter');

    $('.character-card').each(function () {
      var type = $(this).data('type');
      if (filter === 'all' || filter === type) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});

$(document).ready(function () {
  $('.skilltabs-container').each(function () {
    const $container = $(this);
    const color = $container.data('skill-color') || '#0073e6';


    $container.css('--skill-color', color);

    const $buttons = $container.find('.skilltab-btn');
    const $contents = $container.find('.skilltabs-content');

    $buttons.on('click', function () {
      const tab = $(this).data('tab');

      $buttons.removeClass('active');
      $(this).addClass('active');

      $contents.removeClass('active');
      $container.find('#' + tab).addClass('active');
    });
  });
});