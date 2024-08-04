(function(window, $, mw) {
  'use strict';
  function mediaTags($content) {
    $content.find('.html5-audio').each(function() {
      var esc = mw.html.escape,
        $this = $(this),
        options = esc($this.attr('data-options') || ''),
        src = esc($this.attr('data-src') || ''),
        type = esc($this.attr('data-type') || '');
      $this.html('<audio ' + options + '><source src="' + src + '" type="' + type + '"></audio>');
    });
    $content.find('.html5-video').each(function() {
      var esc = mw.html.escape,
        $this = $(this),
        width = esc($this.attr('data-width') || ''),
        height = esc($this.attr('data-height') || ''),
        options = esc($this.attr('data-options') || ''),
        src = esc($this.attr('data-src') || ''),
        type = esc($this.attr('data-type') || '');
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
})(window, jQuery, mediaWiki);

$('.norc').bind('contextmenu', function(e) {
    return false;
});