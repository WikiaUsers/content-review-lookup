/* Opens the last tab as default in specific infoboxes */
mw.hook('wikipage.content').add(function() {
  var piLastTab = $('.portable-infobox.type-last-tab');
  if (!piLastTab.length || !!$('.disable_last-tab').length) return;
  $(piLastTab).find('.pi-image-collection .wds-tabs').each(function(_, tabs) {
    $(tabs).animate({ scrollLeft: tabs.scrollWidth });
    $(tabs).find('.wds-tabs__tab').last().trigger('click');
  });
});