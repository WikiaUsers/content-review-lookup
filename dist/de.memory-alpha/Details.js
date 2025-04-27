$(function () {
  console.log("✅ Details.js geladen");

  $('.details .toggle-text').on('click', function () {
    var $details = $(this).closest('.details');
    var $content = $details.find('.details-content');
    var $text = $(this);

    $details.toggleClass('open');

    if ($details.hasClass('open')) {
      $content.slideDown(200);
      $text.text('[Einklappen]');
    } else {
      $content.slideUp(200);
      $text.text('[Ausklappen]');
    }
  });
});