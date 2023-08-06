mw.hook('wikipage.content').add(function($content) {
  $content.find('.deezerwidget').each(function() {
      var $this = $(this),
          data = $this.data(),
          uri = new mw.Uri('https://www.deezer.com/plugins/player');
 
      if (data.loaded) {
          return;
      }
 
      uri.query = {
          format: ('' + data.playlist).trim(),
          autoplay: window.DeezerWidgetDisableAutoplay ? 'false' : ('' + data.autoplay).trim(),
          playlist: ('' + data.playlist).trim(),
          color: ('' + data.color).trim(),
          layout: ('' + data.layout).trim(),
          size: ('' + data.size).trim(),
          type: ('' + data.type).trim(),
          emptyPlayer: ('' + data.emptyPlayer).trim(),
          id: ('' + data.id).trim(),
          app_id: '1'
      };
 
      $this.html(mw.html.element('iframe', {
          scrolling: 'no',
          frameborder: '0',
          allowTransparency: 'true',
          src: uri.toString(),
          width: ('' + data.width).trim(),
          height: ('' + data.height).trim()
      }));
      data.loaded = true;
  });
});