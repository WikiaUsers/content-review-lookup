/* põe a última aba como aberta por padrão em infoboxes específicas */
mw.hook('wikipage.content').add(function() {
  var piLastTab = $('.portable-infobox.type-last-tab');
  if (!piLastTab.length || !!$('.disable_last-tab').length) return;
  $(piLastTab).find('.pi-image-collection .wds-tabs').each(function(_, tabs) {
    $(tabs).animate({ scrollLeft: tabs.scrollWidth });
    $(tabs).find('.wds-tabs__tab').last().trigger('click');
  });
});