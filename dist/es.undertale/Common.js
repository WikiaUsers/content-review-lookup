window.ajaxSpecialPages = ['Recentchanges', 'WikiActivity', 'Log', 'Contributions'];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 30000;
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'Act. automát.',
    'ajaxrc-refresh-hover': 'Refrescar esta página automáticamente',
}}}}});

(function(window, $, mw) {
  'use strict';
  var $rail = $('#WikiaRail');
  function mediaTags($content) {
    $content.find('.html5-audio').each(function() {
      var esc = mw.html.escape,
        $this = $(this),
        src = esc($this.data('src')),
        type = esc($this.data('type')),
        controls = esc($this.attr('data-controls') || ''),
        autoplay = esc($this.attr('data-autoplay') || ''),
        loop = esc($this.attr('data-loop') || '');
        var options = controls === 'true' ? 'controls' : '' + ' ' + autoplay === 'true' ? 'autoplay' : '' + ' ' + loop === 'true' ? 'loop' : '' + ' ';
      $this.html('<audio ' + options + '><source src="' + src + '" type="' + type + '"></audio>');
    });
    $content.find('.html5-video').each(function() {
      var esc = mw.html.escape,
        $this = $(this),
        width = esc($this.data('width')),
        height = esc($this.data('height')),
        options = esc($this.data('options')),
        src = esc($this.data('src')),
        type = esc($this.data('type'));
      $this.html(
        '<video width="' +
          width +
          '" height="' +
          height +
          '" ' +
          options +
          '><source src="' +
          src +
          '" type="' +
          type +
          '"></video>'
      );
    });
  }
  mw.hook('wikipage.content').add(mediaTags);
  if ($rail.hasClass('loaded')) {
    mediaTags($rail);
  } else if ($rail.exists()) {
    $rail.on('afterLoad.rail', $.proxy(mediaTags, null, $rail));
  }
})(window, jQuery, mediaWiki);