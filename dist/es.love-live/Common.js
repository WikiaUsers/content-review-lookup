window.railWAM = {
    logPage:"Project:WAM Log"
};
mw.hook('wikipage.content').add(function() {
  if ($('#mw-content-text').find('.pagetabs').length) {
    $('body').addClass('has-pagetabs');
  }
});