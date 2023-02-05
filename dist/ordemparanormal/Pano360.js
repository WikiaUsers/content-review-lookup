$(function() {
  var loadScript = function(url) {
    return $.ajax({
      url: url,
      dataType: 'script',
      cache: true
    });
  };

  $.when(
    mw.loader.load('https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css', 'text/css'),
    loadScript('https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js')
  ).then(function() {
    pannellum.viewer('panorama', {
      'type': 'equirectangular',
      'panorama': $('#panorama').data('imageUrl'),
      'autoLoad': true
    });
  });
});