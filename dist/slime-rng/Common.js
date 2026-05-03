/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function () {
  var tabScrollPos = 0;

  $(document).on('click', '.wds-tabs__tab', function () {
    tabScrollPos = $('.wds-tabs__content').scrollTop();
    setTimeout(function () {
      $('.wds-tabs__content').scrollTop(tabScrollPos);
    }, 50);
  });
});