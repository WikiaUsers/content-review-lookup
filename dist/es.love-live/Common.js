window.railWAM = {
    logPage:"Project:WAM Log"
};
mw.hook('wikipage.content').add(function() {
  if ($('#mw-content-text').find('.pagetabs').length) {
    $('body').addClass('has-pagetabs');
  }
  if ($('#mw-content-text').find('.sunshine').length) {
    $('html').addClass('sunshine_bg');
  }
  if ($('#mw-content-text').find('.nijigaku').length) {
    $('html').addClass('nijigaku_bg');
  }
});