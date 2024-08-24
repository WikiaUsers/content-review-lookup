/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/** Discord banner invite fixed **/
window.DiscordBannerSettings = {
  inviteLink: '2K5gqJ5Wt6'
}

/** Embed music list **/
;(function () {
  'use strict';

  function createUrl (params) {
    var url = new URL('https://music.snh48.today/'),
      esc = mw.html.escape;

    if (['track', 'playlist'].includes(params.type) && params.id) url.searchParams.append('p', 'embed/' + esc(params.type) + '/' + esc(params.id));
    if (['picture', 'classic', 'mini'].includes(params.style)) url.searchParams.append('type', esc(params.style));
    if (params.color) url.searchParams.append('color', esc(params.color));
    
    return decodeURIComponent(url.toString());
  }

  function parse(_content) {
    var content = _content[0],
      tags = content.querySelectorAll('.snh48-music:not(.loaded)');
    tags.forEach(function (tag) {
      var url = createUrl(tag.dataset),
        iframe = document.createElement('iframe');
      iframe.src = url;
      if (tag.dataset.width) iframe.width = parseInt(tag.dataset.width, 10);
      if (tag.dataset.height) iframe.height = parseInt(tag.dataset.height, 10);

      tag.replaceWith(iframe);
      tag.classList.add('loaded');
    });
  }

  mw.hook('wikipage.content').add(parse);
})();